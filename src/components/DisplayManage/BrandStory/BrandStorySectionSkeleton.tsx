export default function BrandStorySectionSkeleton() {
    return (
        <div className="relative rounded-xl border border-[#E0D4C6] bg-white p-6 animate-pulse">
            <div className="space-y-5 max-w-3xl">
                {/* Brand Name */}
                <div className="h-4 w-32 bg-gray-200 rounded"></div>

                {/* Headline */}
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>

                {/* Subheadline */}
                <div className="h-6 w-1/2 bg-gray-200 rounded"></div>

                {/* Description */}
                <div className="space-y-3 pt-2">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
}
