import ThemeModeToggle from '@/components/theme/theme-toggle'
import { siteConfig } from '@/config/site'
import Link from 'next/link'

export default function Home() {
  return (
    <div className=" flex flex-1 flex-col ">
      <div className='w-full h-12 border-b border-dashed relative'>
        <div className='absolute right-2 top-1'>
          <ThemeModeToggle />
        </div>
      </div>
      <main className='max-w-[1400px] min-[1800px]:max-w-screen-2xl min-[1400px]:border-x border-border/70 dark:border-border mx-auto w-full border-dashed flex-1'>
      </main>
      <div className='relative w-full h-12 border-t border-dashed flex items-center justify-between gap-2'>
        <div className='flex-1 flex items-center justify-center h-full'>
          <span className='font-mono text-sm tracking-tight '>Built by <Link href={siteConfig.links.github} className='font-bold underline decoration-amber-300 underline-offset-4'>Hrushi</Link></span>
        </div>
      </div>
    </div>
  )
}
