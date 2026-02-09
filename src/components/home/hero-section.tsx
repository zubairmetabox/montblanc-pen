'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'

interface HeroSectionProps {
    title?: string
    subtitle?: string
    ctaText?: string
    ctaHref?: string
    backgroundImage?: string
}

export function HeroSection({
    title = 'The Art of Writing',
    subtitle = 'Discover our curated collection of premium Montblanc fountain pens, hand-selected for discerning executives and collectors.',
    ctaText = 'Explore Collections',
    ctaHref = '/collections',
    backgroundImage,
}: HeroSectionProps) {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted" />

            {/* Optional background image with overlay */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}

            {/* Content */}
            <div className="container relative z-10 text-center max-w-4xl">
                <motion.h1
                    className="font-serif text-hero mb-6 text-balance"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    {title}
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                >
                    <Button size="xl" asChild>
                        <Link href={ctaHref}>{ctaText}</Link>
                    </Button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 1, duration: 0.5 },
                    y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
                }}
            >
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
        </section>
    )
}
