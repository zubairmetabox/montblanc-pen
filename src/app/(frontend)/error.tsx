'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="py-24">
            <div className="container text-center max-w-2xl">
                <h1 className="text-h1 font-serif mb-4">Something went wrong</h1>
                <p className="text-muted-foreground mb-8">
                    We apologize for the inconvenience. Please try again or return home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={reset}>Try Again</Button>
                    <Button variant="outline" asChild>
                        <Link href="/">Return Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
