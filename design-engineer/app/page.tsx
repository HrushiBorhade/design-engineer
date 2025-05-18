import AudioRecorder from '@/components/audio'
import { BouncingDots, TypingDots } from '@/components/dots'
import { AnimatedWand, WandSparkles } from '@/components/icons/wand'
import ItemLink from '@/components/item-link'
import { PulseDotLoader, PulseLoader } from '@/components/pulse'
import { TextShimmerLoader } from '@/components/shimmer-text'
import ThemeModeToggle from '@/components/theme/theme-toggle'
import { WaveLoader } from '@/components/wave'
import { siteConfig } from '@/config/site'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col h-[100dvh] w-full relative isolate">

      {/* Main content */}
      <main className='max-w-[1400px] min-[1800px]:max-w-screen-2xl min-[1400px]:border-x  mx-auto w-full border-dashed flex-1 flex flex-col gap-2 p-4'>
        <ItemLink text='hover link' src='' />
        <TextShimmerLoader />
        <WaveLoader />
        <BouncingDots />
        <TypingDots />
        <PulseLoader />
        <PulseDotLoader />
        <AnimatedWand />
        <WandSparkles />
        <AudioRecorder />
      </main>

      {/* Footer */}
      <div className='relative w-full h-12 border-t border-dashed flex items-center justify-between gap-2'>
        <div className='flex-1 flex items-center justify-center h-full'>
          <span className='font-mono text-sm tracking-tight'>Built by <Link href={siteConfig.links.github} className='font-bold underline decoration-amber-300 underline-offset-4 decoration-wavy it'>Hrushi</Link></span>
        </div>
        <div className='absolute right-2 top-1'>
          <ThemeModeToggle />
        </div>
      </div>

      {/* Background noise - will be behind due to DOM order */}
      <div className='absolute inset-0 w-full h-full -z-10 dark:bg-radial-[ellipse_at_top] from-neutral-100 via-neutral-50 to-neutral-100 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-900'
      >
        <Image alt='bg-noise'
          src="/noise.png"
          layout="fill"
          objectFit="cover"
          priority
          className='opacity-[0.05] dark:opacity-[0.3]'
          quality={100} />
      </div>
    </div>
  )
}
