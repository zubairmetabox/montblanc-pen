export default function CollectionDetailLoading() {
    return (
        <div className="py-12">
            {/* Hero banner skeleton */}
            <div className="skeleton h-64 md:h-96 mb-12 rounded-none" />

            {/* Products grid skeleton */}
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-3">
                            <div className="skeleton aspect-square rounded-lg" />
                            <div className="space-y-2 p-1">
                                <div className="skeleton h-4 w-3/4" />
                                <div className="skeleton h-3 w-1/2" />
                                <div className="skeleton h-5 w-20" />
                            </div>
                            <div className="skeleton h-9 w-full rounded-md" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
