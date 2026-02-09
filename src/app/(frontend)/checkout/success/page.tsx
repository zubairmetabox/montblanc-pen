import { Suspense } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SuccessPageProps {
    searchParams: Promise<{ orderNumber?: string }>
}

async function SuccessContent({ orderNumber }: { orderNumber?: string }) {
    return (
        <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                <CheckCircle className="h-10 w-10" />
            </div>

            <h1 className="text-h1 font-serif mb-4">Thank You!</h1>

            <p className="text-lg text-muted-foreground mb-2">
                Your inquiry has been submitted successfully.
            </p>

            {orderNumber && (
                <p className="text-muted-foreground mb-8">
                    Order Reference: <strong className="text-foreground">{orderNumber}</strong>
                </p>
            )}

            <p className="max-w-md mx-auto text-sm text-muted-foreground mb-8">
                A member of our team will reach out to you within 24-48 hours to discuss
                your order and arrange payment. For urgent inquiries, please contact us directly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                    <Link href="/collections">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        </div>
    )
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const { orderNumber } = await searchParams

    return (
        <div className="py-24">
            <div className="container max-w-2xl">
                <Suspense fallback={<div className="text-center">Loading...</div>}>
                    <SuccessContent orderNumber={orderNumber} />
                </Suspense>
            </div>
        </div>
    )
}
