import React from 'react';

export default function BrandStatementSkeleton() {
    return (
        <section className="relative w-full min-h-[400px] rounded-2xl bg-gray-200 animate-pulse overflow-hidden">
            {/* Edit Button */}
            <div className="absolute top-4 right-4 h-9 w-20 bg-gray-300 rounded-lg"></div>

            <div className="p-10">
                {/* Content */}
                <div className="max-w-3xl space-y-4">
                    <div className="h-12 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                </div>
            </div>

            {/* Footer Location */}
            <div className="absolute bottom-6 left-6 h-6 w-24 bg-gray-300 rounded"></div>
            <div className="absolute bottom-6 right-6 h-6 w-24 bg-gray-300 rounded"></div>
        </section>
    );
}
