import React from 'react';

export default function HeroCopywritingEditSkeleton() {
    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white p-5 sm:p-6 shadow-sm animate-pulse">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <div className="h-5 w-40 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-56 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
                {/* Headline */}
                <div>
                    <div className="h-3 w-16 bg-gray-200 rounded mb-1"></div>
                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                </div>

                {/* Description */}
                <div>
                    <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                    <div className="h-20 w-full bg-gray-200 rounded"></div>
                </div>

                {/* Signature */}
                <div>
                    <div className="h-3 w-16 bg-gray-200 rounded mb-1"></div>
                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Footer actions */}
            <div className="mt-6 flex justify-end gap-2">
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
        </section>
    );
}
