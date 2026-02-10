import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
    title: 'Our Story | Montblanc Pens',
    description: 'The history and craftsmanship behind our curated Montblanc collection.',
}

export default function AboutPage() {
    return (
        <div className="flex flex-col gap-16 py-8 md:gap-24 md:py-12">
            {/* Hero Section */}
            <section className="container">
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[600px]">
                    <Image
                        src="https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=2000"
                        alt="Antique fountain pen on a desk"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                        <h1 className="font-serif text-4xl font-bold tracking-tight md:text-6xl">
                            A Legacy of Excellence
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
                            Crafting instruments that capture the soul of writing since 1906.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="container">
                <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
                    <div>
                        <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-hero">
                            The Art of Mastery
                        </h2>
                        <div className="mt-6 space-y-4 text-muted-foreground">
                            <p>
                                At the heart of every Montblanc creation is a commitment to the highest
                                standards of craftsmanship. Our pens are not merely writing instruments;
                                they are timeless pieces of art that bridge generations.
                            </p>
                            <p>
                                From the iconic Meisterstück to contemporary limited editions, each piece
                                is meticulously crafted in Hamburg, Germany, by master artisans who
                                bring decades of experience to every nib, barrel, and cap.
                            </p>
                            <p>
                                We believe that writing is a form of self-expression that deserves the
                                finest tools. Our mission is to provide you with a writing experience
                                that is as smooth as it is inspiring.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[400px] overflow-hidden rounded-xl bg-muted">
                        <Image
                            src="https://images.unsplash.com/photo-1511108620888-03823769c735?q=80&w=1200"
                            alt="Handcrafted pen nib"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-muted/50 py-16 md:py-24">
                <div className="container">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="text-xl font-bold">1</span>
                            </div>
                            <h3 className="mt-4 font-serif text-xl font-semibold">Tradition</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Honoring techniques passed down through a century of master craftsmanship.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="text-xl font-bold">2</span>
                            </div>
                            <h3 className="mt-4 font-serif text-xl font-semibold">Precision</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Every nib is hand-tested to ensure a perfectly consistent ink flow and weight.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="text-xl font-bold">3</span>
                            </div>
                            <h3 className="mt-4 font-serif text-xl font-semibold">Legacy</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Designed to be cherished for a lifetime and passed as an heirloom to the next.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container pb-16 md:pb-24">
                <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-16">
                    <h2 className="font-serif text-3xl font-bold md:text-4xl">
                        Discover Your Perfect Instrument
                    </h2>
                    <p className="mt-4 mx-auto max-w-xl text-muted-foreground">
                        Experience the weight, the balance, and the soul of a true masterpiece.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href="/collections">Shop Collections</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/contact">Contact Specialist</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
