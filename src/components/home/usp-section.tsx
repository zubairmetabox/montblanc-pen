'use client'

import { motion } from 'framer-motion'
import { Award, Shield, Truck, HeartHandshake } from 'lucide-react'

const usps = [
    {
        icon: Award,
        title: 'Curated Selection',
        description: 'Hand-picked fountain pens chosen for their heritage and craftsmanship.',
    },
    {
        icon: HeartHandshake,
        title: 'Concierge Service',
        description: 'Personal consultation for pen selection and expert guidance on nib sizes.',
    },
    {
        icon: Shield,
        title: 'Authenticity Guaranteed',
        description: 'Every pen comes with documentation and authenticity certificates.',
    },
    {
        icon: Truck,
        title: 'White Glove Delivery',
        description: 'Premium packaging and secure worldwide shipping.',
    },
]

export function UspSection() {
    return (
        <section className="py-24">
            <div className="container">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-h2 font-serif mb-4">Why Choose Us</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        More than just a purchase—an investment in the art of writing.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {usps.map((usp, index) => {
                        const Icon = usp.icon
                        return (
                            <motion.div
                                key={usp.title}
                                className="text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                                    <Icon className="h-7 w-7" />
                                </div>
                                <h3 className="font-semibold mb-2">{usp.title}</h3>
                                <p className="text-sm text-muted-foreground">{usp.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
