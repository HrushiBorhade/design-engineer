import { useCallback, useEffect, useRef, useState } from "react"

interface RecorderState {
    isRecording: boolean
    recordingTime: number
    audioBlob: Blob | null
    audioUrl: string | null
    waveformHistory: number[]
    error: string | null
}

interface RecorderActions {
    startRecording: () => Promise<void>
    stopRecording: () => Promise<Blob | null>
    resetRecording: () => void
}
const DEFAULT_RECORDER_STATE = {
    isRecording: false,
    recordingTime: 0,
    audioBlob: null,
    audioUrl: null,
    waveformHistory: [],
    error: null
}

const useAudioRecorder = (): [RecorderState, RecorderActions] => {
    const [state, setState] = useState<RecorderState>(DEFAULT_RECORDER_STATE)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const mediaStreamRef = useRef<MediaStream | null>(null)
    const audioContextRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const dataArrayRef = useRef<Uint8Array | null>(null)
    const audioChunksRef = useRef<Blob[]>([])
    const timerRef = useRef<number | null>(null)
    const waveformTimerRef = useRef<number | null>(null)
    const audioUrlRef = useRef<string | null>(null)

    const cleanUp = useCallback(() => {
        // Stop all timers
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }

        if (waveformTimerRef.current) {
            clearInterval(waveformTimerRef.current);
            waveformTimerRef.current = null
        }

        // Stop all media tracks
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop())
            mediaStreamRef.current = null;
        }

        // close audio context
        if (audioContextRef.current) {
            audioContextRef.current.close().catch(err => console.error("Error closing AudioContext", err))
            audioContextRef.current = null
        }

        // Revoke object URL
        if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current)
        }

        //Reset refs
        analyserRef.current = null
        dataArrayRef.current = null
        mediaRecorderRef.current = null
        audioChunksRef.current = []
    }, [])

    //clean up on unmount
    useEffect(() => {
        return cleanUp
    }, [cleanUp])

    // Update audioUrlRef when state.audioUrl changes
    useEffect(() => {
        audioUrlRef.current = state.audioUrl
    }, [state.audioUrl])

    const getAudioContext = useCallback((): AudioContext => {
        return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }, [])

    // Browser compatibility check function
    const checkBrowserCompatibility = useCallback(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error("Browser does not support audio recording")
        }
        if (!window.MediaRecorder) {
            throw new Error("Browser does not support MediaRecorder")
        }
        if (!window.AudioContext) {
            throw new Error("Browser does not support AudioContext")
        }
    }, [])

    // Start recording function

    const startRecording = useCallback(async () => {
        try {
            // Check browser compatibility
            checkBrowserCompatibility()
            // Reset state
            cleanUp()
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
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(error => {
                if (error.name === "NotAllowedError") {
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

            // create media recorder with optimal mime type


        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error"
            console.error("Error in starting to record:", errorMessage)
            cleanUp()
            setState(DEFAULT_RECORDER_STATE)
            throw error
        }
    }, [cleanUp, checkBrowserCompatibility, getAudioContext])
    const stopRecording = () => { return Promise.resolve(null) }

    // Reset recording function
    const resetRecording = useCallback(() => {
        cleanUp()
        setState(DEFAULT_RECORDER_STATE)
    }, [cleanUp])



    return [state, { startRecording, stopRecording, resetRecording }];
}

export default useAudioRecorder
