import { Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const metadata = {
    title: 'Contact Us | Montblanc Pens',
    description: 'Reach out to our specialists for assistance with your Montblanc collection.',
}

export default function ContactPage() {
    return (
        <div className="container py-12 md:py-24">
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-16 md:grid-cols-2">
                    {/* Contact Info */}
                    <div>
                        <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                            Get in Touch
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            Whether you&apos;re looking for a specific vintage model or need advice
                            on starting your collection, our specialists are here to help.
                        </p>

                        <div className="mt-12 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-hero">Email Us</h3>
                                    <p className="text-sm text-muted-foreground">specialist@montblanc-pens.example.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-hero">Call Us</h3>
                                    <p className="text-sm text-muted-foreground">+1 (555) 000-0000</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-hero">Boutique</h3>
                                    <p className="text-sm text-muted-foreground">123 Pen Avenue, Luxury District, NY 10001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                        <form className="grid gap-6">
                            <div className="grid gap-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <Input id="name" placeholder="Enter your full name" />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" type="email" placeholder="email@example.com" />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                <Input id="subject" placeholder="What can we help you with?" />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <Textarea id="message" placeholder="Describe your inquiry..." className="min-h-[150px]" />
                            </div>
                            <Button size="lg" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
