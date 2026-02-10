export default function CollectionsLoading() {
    return (
        <div className="py-12">
            <div className="container">
                {/* Header skeleton */}
                <div className="text-center mb-12 space-y-4">
                    <div className="skeleton h-10 w-56 mx-auto" />
                    <div className="skeleton h-5 w-96 mx-auto" />
                </div>

                {/* Collections grid skeleton */}
                <section className="py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="skeleton aspect-[3/4] rounded-lg" />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
