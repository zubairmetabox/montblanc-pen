'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

export function NavigationProgress() {
    const pathname = usePathname()
    const [isNavigating, setIsNavigating] = useState(false)
    const [isFinishing, setIsFinishing] = useState(false)
    const previousPathname = useRef(pathname)

    useEffect(() => {
        if (previousPathname.current !== pathname) {
            // Route changed — finish the animation
            setIsNavigating(false)
            setIsFinishing(true)
            previousPathname.current = pathname

            const timeout = setTimeout(() => {
                setIsFinishing(false)
            }, 300)

            return () => clearTimeout(timeout)
        }
    }, [pathname])

    useEffect(() => {
        // Intercept link clicks to start the progress bar
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a')
            if (!target) return

            const href = target.getAttribute('href')
            if (!href) return

            // Only trigger for internal navigation links
            if (
                href.startsWith('/') &&
                !href.startsWith('//') &&
                href !== pathname &&
                !target.hasAttribute('download') &&
                target.target !== '_blank'
            ) {
                setIsNavigating(true)
                setIsFinishing(false)
            }
        }

        document.addEventListener('click', handleClick, true)
        return () => document.removeEventListener('click', handleClick, true)
    }, [pathname])

    if (!isNavigating && !isFinishing) return null

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-[2px]">
            <div
                className={`h-full bg-gradient-to-r from-primary via-primary/80 to-primary ${isFinishing ? 'nav-progress-finish' : 'nav-progress'
                    }`}
                style={{
                    boxShadow: '0 0 8px hsl(var(--primary) / 0.4)',
                }}
            />
        </div>
    )
}
