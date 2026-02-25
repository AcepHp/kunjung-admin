'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PencilSquareIcon, PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import type { ServiceRecommendationApiResponse } from '@/services/ServiceRecommendationService';

type Props = {
    data: ServiceRecommendationApiResponse[];
};

export default function ServiceRecommendation({ data }: Props) {
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E0D4C6] bg-white py-16 text-center shadow-sm">
                <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-lg font-semibold text-[#2E2620]">No Service Recommendations Found</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-sm px-6">
                    It looks like you haven't added any service recommendations yet. Start by adding your first service.
                </p>
                <Link href="/beranda/display/service-section/add" className="mt-8">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#7A3E2C] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all uppercase tracking-widest"
                    >
                        <PlusIcon className="h-5 w-5" />
                        <span>Add New Service</span>
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <section className="space-y-6">
            {/* ===== GRID ===== */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-xl border border-[#E0D4C6] bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        {/* ===== IMAGE ===== */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={item.imageUrl.startsWith('http') ? item.imageUrl : `/${item.imageUrl}`}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* ===== CONTENT ===== */}
                        <div className="flex items-center justify-between px-5 py-4">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold capitalize text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="text-[11px] text-gray-500 font-medium">
                                    {item.subtitle}
                                </p>
                            </div>

                            <Link
                                href={`/beranda/display/service-section/${item.id}/edit`}
                            >
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 rounded-md border border-[#E2C9B4] px-3 py-1.5 text-xs font-medium text-[#7A3E2C] hover:bg-[#F7EBE1] transition"
                                >
                                    <PencilSquareIcon className="h-4 w-4" />
                                    Edit
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
