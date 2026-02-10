export default function HomeLoading() {
    return (
        <>
            {/* Hero skeleton */}
            <section className="relative h-[80vh] flex items-center justify-center">
                <div className="skeleton absolute inset-0 rounded-none" />
                <div className="relative z-10 text-center space-y-4 px-4">
                    <div className="skeleton h-12 w-80 mx-auto" />
                    <div className="skeleton h-6 w-96 mx-auto" />
                    <div className="skeleton h-12 w-48 mx-auto mt-4 rounded-full" />
                </div>
            </section>

            {/* Collections grid skeleton */}
            <section className="py-24">
                <div className="container">
                    <div className="text-center mb-16 space-y-4">
                        <div className="skeleton h-10 w-64 mx-auto" />
                        <div className="skeleton h-5 w-96 mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="skeleton aspect-[3/4] rounded-lg" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured products skeleton */}
            <section className="py-24">
                <div className="container">
                    <div className="text-center mb-16 space-y-4">
                        <div className="skeleton h-10 w-72 mx-auto" />
                        <div className="skeleton h-5 w-80 mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-3">
                                <div className="skeleton aspect-square rounded-lg" />
                                <div className="skeleton h-4 w-3/4" />
                                <div className="skeleton h-3 w-1/2" />
                                <div className="skeleton h-5 w-20" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
