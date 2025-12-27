'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import type { ServiceSection } from '@/data/ServiceSectionData';

type Props = {
    data: ServiceSection[];
};

export default function ServiceRecommendation({ data }: Props) {
    return (
        <section className="space-y-6">
            {/* ===== GRID ===== */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-xl border border-[#E0D4C6] bg-white"
                    >
                        {/* ===== IMAGE ===== */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={`/${item.imageUrl}`}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* ===== CONTENT ===== */}
                        <div className="flex items-center justify-between px-5 py-4">
                            <h3 className="text-sm font-semibold capitalize text-gray-900">
                                {item.title}
                            </h3>

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
