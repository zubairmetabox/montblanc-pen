import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="py-24">
            <div className="container text-center max-w-2xl">
                <h1 className="text-hero font-serif mb-4">404</h1>
                <h2 className="text-h2 mb-4">Page Not Found</h2>
                <p className="text-muted-foreground mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                        <Link href="/">Return Home</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/collections">Browse Collections</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
