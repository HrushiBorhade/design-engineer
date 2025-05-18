"use client"

import { useState, useRef, useEffect, useCallback } from "react"

interface RecordingState {
    isRecording: boolean
    recordingTime: number
    audioBlob: Blob | null
    audioUrl: string | null
    waveformHistory: number[]
    error: string | null
}

interface AudioRecorderActions {
    startRecording: () => Promise<void>
    stopRecording: () => Promise<Blob | null>
    resetRecording: () => void
}

export function useAudioRecorder(): [RecordingState, AudioRecorderActions] {
    const [state, setState] = useState<RecordingState>({
        isRecording: false,
        recordingTime: 0,
        audioBlob: null,
        audioUrl: null,
        waveformHistory: [],
        error: null
    })

    // Refs for maintaining state between renders
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const mediaStreamRef = useRef<MediaStream | null>(null)
    const audioContextRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const dataArrayRef = useRef<Uint8Array | null>(null)
    const audioChunksRef = useRef<Blob[]>([])
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const waveformTimerRef = useRef<NodeJS.Timeout | null>(null)
    const audioUrlRef = useRef<string | null>(null)

    // Update audioUrlRef when state.audioUrl changes
    useEffect(() => {
        audioUrlRef.current = state.audioUrl
    }, [state.audioUrl])

    // Browser compatibility check function
    const checkBrowserCompatibility = useCallback(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error("Your browser doesn't support audio recording")
        }
        if (!window.MediaRecorder) {
            throw new Error("Your browser doesn't support MediaRecorder")
        }
        if (!window.AudioContext && !(window as any).webkitAudioContext) {
            throw new Error("Your browser doesn't support AudioContext")
        }
    }, [])

    // Get AudioContext with proper fallback
    const getAudioContext = useCallback((): AudioContext => {
        return new (window.AudioContext ||
            ((window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext))()
    }, [])

    // Cleanup function - optimized with no dependencies
    const cleanup = useCallback(() => {
        // Stop all timers
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }

        if (waveformTimerRef.current) {
            clearInterval(waveformTimerRef.current)
            waveformTimerRef.current = null
        }

        // Stop all media tracks
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop())
            mediaStreamRef.current = null
        }

        // Close audio context
        if (audioContextRef.current) {
            audioContextRef.current.close().catch(err => console.error("Error closing AudioContext:", err))
            audioContextRef.current = null
        }

        // Revoke object URL
        if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current)
        }

        // Reset refs
        analyserRef.current = null
        dataArrayRef.current = null
        mediaRecorderRef.current = null
        audioChunksRef.current = []
    }, [])

    // Start recording function
    const startRecording = useCallback(async () => {
        try {
            // Check browser compatibility
            checkBrowserCompatibility()

            // Reset state
            cleanup()
            setState(prev => ({
                ...prev,
                audioBlob: null,
                audioUrl: null,
                waveformHistory: [],
                recordingTime: 0,
                error: null
            }))
            audioChunksRef.current = []

            // Get media stream
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
                .catch(error => {
                    if (error.name === 'NotAllowedError') {
                        throw new Error("Microphone access was denied")
                    }
                    throw error
                })
            mediaStreamRef.current = stream

            // Set up audio context and analyzer for visualization
            const audioContext = getAudioContext()
            const analyser = audioContext.createAnalyser()
            analyser.fftSize = 256
            const bufferLength = analyser.frequencyBinCount
            const dataArray = new Uint8Array(bufferLength)

            const source = audioContext.createMediaStreamSource(stream)
            source.connect(analyser)

            audioContextRef.current = audioContext
            analyserRef.current = analyser
            dataArrayRef.current = dataArray

            // Create media recorder with optimal mime type
            const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
                ? "audio/webm;codecs=opus"
                : "audio/webm"

            const mediaRecorder = new MediaRecorder(stream, { mimeType } as MediaRecorderOptions)
            mediaRecorderRef.current = mediaRecorder

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data)
                }
            }

            mediaRecorder.onerror = (event) => {
                const errorMessage = event.error?.message || "Recording error occurred"
                console.error("MediaRecorder error:", errorMessage)
                cleanup()
                setState(prev => ({
                    ...prev,
                    error: errorMessage,
                    isRecording: false
                }))
            }

            // Start recording
            mediaRecorder.start(100) // Collect data every 100ms
            setState(prev => ({ ...prev, isRecording: true }))

            // Start timer
            timerRef.current = setInterval(() => {
                setState(prev => ({ ...prev, recordingTime: prev.recordingTime + 1 }))
            }, 1000)

            // Start waveform sampling
            waveformTimerRef.current = setInterval(() => {
                if (analyserRef.current && dataArrayRef.current) {
                    analyserRef.current.getByteTimeDomainData(dataArrayRef.current)

                    let maxAmplitude = 0
                    for (let i = 0; i < dataArrayRef.current.length; i++) {
                        const amplitude = Math.abs(dataArrayRef.current[i] - 128)
                        if (amplitude > maxAmplitude) {
                            maxAmplitude = amplitude
                        }
                    }

                    const normalizedValue = Math.max(5, Math.min(100, (maxAmplitude / 128) * 100))

                    setState(prev => {
                        const newHistory = [...prev.waveformHistory, normalizedValue]
                        // More efficient array handling
                        if (newHistory.length > 100) {
                            return { ...prev, waveformHistory: newHistory.slice(-100) }
                        } else {
                            return { ...prev, waveformHistory: newHistory }
                        }
                    })
                }
            }, 100)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error"
            console.error("Error accessing microphone:", errorMessage)
            cleanup()
            setState(prev => ({
                ...prev,
                error: `Failed to start recording: ${errorMessage}`,
                isRecording: false
            }))
            throw error
        }
    }, [cleanup, checkBrowserCompatibility, getAudioContext])

    // Stop recording function
    const stopRecording = useCallback(async (): Promise<Blob | null> => {
        if (!mediaRecorderRef.current || !state.isRecording) {
            return Promise.resolve(null)
        }

        return new Promise<Blob | null>((resolve) => {
            // Stop all timers first
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
            if (waveformTimerRef.current) {
                clearInterval(waveformTimerRef.current)
                waveformTimerRef.current = null
            }

            // Add onstop handler
            mediaRecorderRef.current!.onstop = () => {
                try {
                    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
                    const url = URL.createObjectURL(audioBlob)

                    // Batch state updates
                    setState(prev => ({
                        ...prev,
                        audioBlob,
                        audioUrl: url,
                        isRecording: false
                    }))

                    // Stop media stream tracks
                    if (mediaStreamRef.current) {
                        mediaStreamRef.current.getTracks().forEach(track => track.stop())
                    }

                    resolve(audioBlob)
                } catch (error) {
                    console.error("Error processing recording:", error)
                    setState(prev => ({
                        ...prev,
                        isRecording: false,
                        error: "Error processing recording"
                    }))
                    resolve(null)
                }
            }

            // Stop the media recorder
            try {
                mediaRecorderRef.current!.stop()
            } catch (error) {
                console.error("Error stopping media recorder:", error)
                cleanup()
                setState(prev => ({
                    ...prev,
                    isRecording: false,
                    error: "Error stopping recording"
                }))
                resolve(null)
            }
        })
    }, [state.isRecording, cleanup])

    // Reset recording function
    const resetRecording = useCallback(() => {
        cleanup()
        setState({
            isRecording: false,
            recordingTime: 0,
            audioBlob: null,
            audioUrl: null,
            waveformHistory: [],
            error: null
        })
    }, [cleanup])

    // Clean up on unmount
    useEffect(() => {
        return cleanup
    }, [cleanup])

    return [state, { startRecording, stopRecording, resetRecording }]
}