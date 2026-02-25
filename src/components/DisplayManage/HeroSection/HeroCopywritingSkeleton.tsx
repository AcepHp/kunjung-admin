import React from 'react';

export default function HeroCopywritingSkeleton() {
    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white p-5 sm:p-6 shadow-sm animate-pulse">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <div className="h-5 w-32 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-7 w-16 bg-gray-200 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="space-y-4">
                {/* Headline */}
                <div>
                    <div className="h-3 w-16 bg-gray-200 rounded mb-1"></div>
                    <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                </div>

                {/* Description */}
                <div>
                    <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                    <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>

                {/* Signature */}
                <div className="pt-2 border-t border-[#F0E0D1]">
                    <div className="h-3 w-16 bg-gray-200 rounded mb-1"></div>
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        </section>
    );
}
