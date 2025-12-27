'use client';

import Image from 'next/image';
import type { HeroSlide } from '@/data/HeroSectionData';
import {
    InformationCircleIcon,
    PhotoIcon,
} from '@heroicons/react/24/outline';

type Props = {
    slide: HeroSlide;
};

export default function HeroSlideDetail({ slide }: Props) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#C3A086]">
                        Hero Slide Details
                    </p>
                    <h1 className="mt-1 text-xl sm:text-2xl font-semibold text-[#2E2620]">
                        {slide.villaName}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 max-w-2xl">
                        {slide.villaSubtitle}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:justify-end">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                            slide.isActive
                                ? 'bg-green-50 text-green-700 border border-green-100'
                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                    >
                        <InformationCircleIcon className="h-4 w-4" />
                        {slide.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
                {/* Image Preview */}
                <div className="relative h-64 sm:h-80 lg:h-[380px] w-full overflow-hidden rounded-2xl border border-[#E9D6C6] bg-[#FDF7F0]">
                    <Image
                        src={slide.image.url}
                        alt={slide.image.alt}
                        fill
                        className="object-cover"
                    />

                    {/* Hero Overlay Preview */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-6 pb-5 pt-16">
                        <p className="text-xs uppercase tracking-[0.16em] text-[#FDEBD1]">
                            Hero Preview
                        </p>
                        <h2 className="mt-1 text-xl sm:text-2xl font-semibold text-white">
                            {slide.villaName}
                        </h2>
                        <p className="mt-1 text-sm text-gray-100 line-clamp-2">
                            {slide.villaSubtitle}
                        </p>
                    </div>
                </div>

                {/* Detail Information */}
                <div className="space-y-4 rounded-2xl border border-[#E9D6C6] bg-[#FFFBF6] p-5">
                    <h3 className="text-sm font-semibold text-[#2E2620] flex items-center gap-2">
                        <PhotoIcon className="h-4 w-4 text-[#C3A086]" />
                        Slide Information
                    </h3>

                    {/* Info Rows */}
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                            <div className="w-32 text-gray-500">Title</div>
                            <div className="flex-1 text-[#2E2620] font-medium">
                                {slide.villaName}
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-32 text-gray-500">Subtitle</div>
                            <div className="flex-1 text-[#2E2620]">
                                {slide.villaSubtitle}
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-32 text-gray-500">Status</div>
                            <div className="flex-1">
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                                        slide.isActive
                                            ? 'bg-green-50 text-green-700 border border-green-100'
                                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                                    }`}
                                >
                                    {slide.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
