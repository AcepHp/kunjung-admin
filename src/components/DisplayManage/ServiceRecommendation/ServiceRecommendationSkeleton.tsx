'use client';

import React from 'react';

export default function ServiceRecommendationSkeleton() {
    return (
        <section className="space-y-6">
            {/* Header with Add Button Skeleton */}
            

            {/* ===== GRID SKELETON ===== */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="overflow-hidden rounded-xl border border-[#E9D6C6] bg-white shadow-sm"
                    >
                        {/* IMAGE SKELETON */}
                        <div className="h-48 w-full animate-pulse bg-[#FAF4EC]" />

                        {/* CONTENT SKELETON */}
                        <div className="flex items-center justify-between px-5 py-4">
                            <div className="h-5 w-24 animate-pulse rounded bg-[#F5E4D6]" />
                            <div className="h-8 w-16 animate-pulse rounded-md bg-[#EFE3D7]" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
