export default function ProductDetailLoading() {
    return (
        <div className="py-12">
            <div className="container">
                {/* Product main section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Gallery skeleton */}
                    <div className="space-y-3">
                        <div className="skeleton aspect-square rounded-lg" />
                        <div className="grid grid-cols-4 gap-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="skeleton aspect-square rounded-md" />
                            ))}
                        </div>
                    </div>

                    {/* Product info skeleton */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="skeleton h-8 w-3/4" />
                            <div className="skeleton h-7 w-32" />
                        </div>
                        <div className="skeleton h-px w-full" />
                        <div className="space-y-2">
                            <div className="skeleton h-4 w-full" />
                            <div className="skeleton h-4 w-5/6" />
                            <div className="skeleton h-4 w-4/6" />
                        </div>
                        <div className="skeleton h-px w-full" />
                        {/* Specs skeleton */}
                        <div className="space-y-3">
                            <div className="skeleton h-6 w-40" />
                            <div className="grid grid-cols-2 gap-3">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="skeleton h-3 w-16" />
                                        <div className="skeleton h-4 w-24" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="skeleton h-12 w-full rounded-md" />
                    </div>
                </div>

                {/* Related products skeleton */}
                <section className="pt-12 border-t border-border">
                    <div className="skeleton h-8 w-52 mb-8" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="space-y-3">
                                <div className="skeleton aspect-square rounded-lg" />
                                <div className="skeleton h-4 w-3/4" />
                                <div className="skeleton h-5 w-20" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
