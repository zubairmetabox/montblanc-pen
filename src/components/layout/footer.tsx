import Link from 'next/link'

const footerLinks = {
    collections: [
        { name: 'Meisterstück', href: '/collections/meisterstuck' },
        { name: 'StarWalker', href: '/collections/starwalker' },
        { name: 'Heritage', href: '/collections/heritage' },
        { name: 'Writers Edition', href: '/collections/writers-edition' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ],
}

export function Footer() {
    return (
        <footer className="border-t border-border bg-card">
            <div className="container py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
                            MONTBLANC
                        </Link>
                        <p className="mt-4 max-w-md text-sm text-muted-foreground">
                            Discover our curated collection of premium Montblanc fountain pens.
                            Hand-selected writing instruments for discerning executives and collectors.
                        </p>
                        <p className="mt-4 text-sm text-muted-foreground">
                            <strong>Contact:</strong> info@montblanc-pens.example.com
                        </p>
                    </div>

                    {/* Collections */}
                    <div>
                        <h3 className="font-semibold mb-4">Collections</h3>
                        <ul className="space-y-2">
                            {footerLinks.collections.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Montblanc Pens. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
