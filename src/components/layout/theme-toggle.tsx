'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/theme-context'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()

    const cycleTheme = () => {
        if (theme === 'light') setTheme('dark')
        else if (theme === 'dark') setTheme('system')
        else setTheme('light')
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="relative"
            aria-label={`Current theme: ${theme}. Click to change.`}
        >
            <Sun
                className={`h-5 w-5 transition-all ${resolvedTheme === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
                    }`}
            />
            <Moon
                className={`absolute h-5 w-5 transition-all ${resolvedTheme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
                    }`}
            />
        </Button>
    )
}
