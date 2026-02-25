import React from 'react';

const SectionSkeleton = ({ title }: { title: string }) => (
    <div className="overflow-hidden rounded-3xl border border-[#E9D6C6] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#FAF4EC] bg-[#FAF4EC]/50 px-8 py-4">
            <div className="h-6 w-32 animate-pulse rounded bg-[#EFE3D7]" />
            <div className="h-8 w-24 animate-pulse rounded-xl bg-[#EFE3D7]" />
        </div>
        <div className="p-0">
            {/* Content Skeleton Placeholder */}
            {/* We will customize inner content based on section type in a real app, 
                but a generic large block is fine for now or we can pass children */}
            <div className="h-[400px] w-full animate-pulse bg-[#FAF4EC]" />
        </div>
    </div>
);

export default function BrandEthosSkeleton() {
    return (
        <div className="mx-auto max-w-9xl space-y-12 pb-20">
            {/* HERO SKELETON */}
            <div className="overflow-hidden rounded-3xl border border-[#E9D6C6] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#FAF4EC] bg-[#FAF4EC]/50 px-8 py-4">
                    <div className="h-6 w-32 animate-pulse rounded bg-[#EFE3D7]" />
                    <div className="h-8 w-24 animate-pulse rounded-xl bg-[#EFE3D7]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col justify-center p-16 space-y-6">
                        <div className="h-4 w-24 animate-pulse rounded bg-[#EFE3D7]" />
                        <div className="h-12 w-3/4 animate-pulse rounded bg-[#EFE3D7]" />
                        <div className="space-y-3">
                            <div className="h-4 w-full animate-pulse rounded bg-[#F5E4D6]" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-[#F5E4D6]" />
                            <div className="h-4 w-4/6 animate-pulse rounded bg-[#F5E4D6]" />
                        </div>
                    </div>
                    <div className="min-h-[450px] animate-pulse bg-[#FAF4EC]" />
                </div>
            </div>

            {/* INTRODUCTION SKELETON */}
            <div className="overflow-hidden rounded-3xl border border-[#E9D6C6] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#FAF4EC] bg-[#FAF4EC]/50 px-8 py-4">
                    <div className="h-6 w-40 animate-pulse rounded bg-[#EFE3D7]" />
                    <div className="h-8 w-24 animate-pulse rounded-xl bg-[#EFE3D7]" />
                </div>
                <div className="px-16 py-10 space-y-16">
                    <div className="flex justify-center">
                        <div className="h-6 w-32 animate-pulse rounded-full bg-[#EFE3D7]" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        <div className="space-y-6">
                            <div className="h-8 w-3/4 animate-pulse rounded bg-[#EFE3D7]" />
                            <div className="h-6 w-2/3 animate-pulse rounded bg-[#EFE3D7]" />
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <div className="h-4 w-full animate-pulse rounded bg-[#F5E4D6]" />
                                <div className="h-4 w-full animate-pulse rounded bg-[#F5E4D6]" />
                                <div className="h-4 w-5/6 animate-pulse rounded bg-[#F5E4D6]" />
                            </div>
                            <div className="pt-8 border-t border-[#FAF4EC] space-y-4">
                                <div className="h-3 w-32 animate-pulse rounded bg-[#EFE3D7]" />
                                <div className="flex flex-wrap gap-3">
                                    <div className="h-8 w-24 animate-pulse rounded-xl bg-[#F5E4D6]" />
                                    <div className="h-8 w-24 animate-pulse rounded-xl bg-[#F5E4D6]" />
                                    <div className="h-8 w-24 animate-pulse rounded-xl bg-[#F5E4D6]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOUNDERS STORY SKELETON */}
            <SectionSkeleton title="Founders' Story" />

            {/* VISION & MISSION SKELETON */}
            <SectionSkeleton title="Vision & Mission" />

            {/* GALLERY SKELETON */}
            <SectionSkeleton title="Immersive Gallery" />

            {/* CLOSING STATEMENT SKELETON */}
            <div className="overflow-hidden rounded-3xl border border-[#E9D6C6] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#FAF4EC] bg-[#FAF4EC]/50 px-8 py-4">
                    <div className="h-6 w-40 animate-pulse rounded bg-[#EFE3D7]" />
                    <div className="h-8 w-24 animate-pulse rounded-xl bg-[#EFE3D7]" />
                </div>
                <div className="bg-[#FAF4EC] p-24 lg:p-32 text-center relative overflow-hidden flex flex-col items-center justify-center space-y-6">
                    <div className="h-4 w-32 animate-pulse rounded bg-[#EFE3D7]" />
                    <div className="h-8 w-2/3 animate-pulse rounded bg-[#EFE3D7]" />
                </div>
            </div>
        </div>
    );
}
