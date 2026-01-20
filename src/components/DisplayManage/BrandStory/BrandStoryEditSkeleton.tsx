import React from 'react';

export default function BrandStoryEditSkeleton() {
    return (
        <section className="rounded-xl border border-[#E0D4C6] bg-white p-6 space-y-6 animate-pulse">

            {/* Brand Name */}
            <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-10 w-full bg-gray-200 rounded border border-[#E0D4C6]"></div>
            </div>

            {/* Headline */}
            <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-10 w-full bg-gray-200 rounded border border-[#E0D4C6]"></div>
            </div>

            {/* Sub Headline */}
            <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-10 w-full bg-gray-200 rounded border border-[#E0D4C6]"></div>
            </div>

            {/* Description (TinyMCE) */}
            <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-64 w-full bg-gray-200 rounded border border-[#E0D4C6]"></div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
                <div className="h-9 w-20 bg-gray-200 rounded"></div>
                <div className="h-9 w-32 bg-gray-200 rounded"></div>
            </div>
        </section>
    );
}
