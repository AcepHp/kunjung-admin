'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PencilSquareIcon, PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { BrandStoryApiResponse } from '@/services/BrandStoryService';

type Props = {
    data: BrandStoryApiResponse | null;
    images?: { // Optional for now, as API doesn't return images yet
        id: string;
        url: string;
        isActive: boolean;
    }[];
};

export default function BrandStorySection({ data, images = [] }: Props) {
    if (!data || !data.brandName) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E0D4C6] bg-white py-16 text-center shadow-sm">
                <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-lg font-semibold text-[#2E2620]">No Brand Story Found</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-sm px-6">
                    Define your brand's unique story and history to connect with your visitors.
                </p>
                <Link href="/beranda/display/brand-story/add" className="mt-8">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#7A3E2C] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all uppercase tracking-widest"
                    >
                        <PlusIcon className="h-5 w-5" />
                        <span>Add Brand Story</span>
                    </button>
                </Link>
            </div>
        );
    }
    return (
        <section className="space-y-8">
            {/* ===== BRAND TEXT PREVIEW ===== */}
            <div className="relative rounded-xl border border-[#E0D4C6] bg-white p-6">
                {/* 🔹 Edit Button */}
                <Link href="/beranda/display/brand-story/edit">
                    <button
                        type="button"
                        className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-md border border-[#E2C9B4] bg-white px-3 py-1.5 text-xs font-medium text-[#7A3E2C] hover:bg-[#F7EBE1] transition"
                    >
                        <PencilSquareIcon className="h-4 w-4" />
                        Edit Content
                    </button>
                </Link>

                <div className="space-y-5 max-w-3xl">
                    <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                        {data.brandName}
                    </span>

                    <h2 className="text-3xl font-bold text-gray-900">
                        {data.headlineStory}
                    </h2>

                    <p className="text-lg italic text-gray-600">
                        {data.subHeadlineStory}
                    </p>

                    <div
                        className="space-y-3 text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: data.descriptionStory }}
                    />
                </div>
            </div>

            {/* ===== IMAGE TABLE ===== */}
            <div className="rounded-xl border border-[#E0D4C6] bg-white">
                <div className="border-b border-[#EFE3D7] px-6 py-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                        Brand Images
                    </h3>
                    <p className="text-xs text-gray-500">
                        Manage images shown in brand story section.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#FAF4EC]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#8B6F56]">
                                    Preview
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-[#8B6F56]">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#EFE3D7]">
                            {images.map((img) => (
                                <tr
                                    key={img.id}
                                    className="hover:bg-[#FAF4EC]/50 transition"
                                >
                                    <td className="px-6 py-4">
                                        <div className="relative h-16 w-24 overflow-hidden rounded-lg border">
                                            <Image
                                                src={img.url}
                                                alt="Brand image"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <Link
                                            href={`/beranda/display/brand-story/image/${img.id}/edit`}
                                        >
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-1.5 rounded-md border border-[#E2C9B4] px-3 py-1.5 text-xs font-medium text-[#7A3E2C] hover:bg-[#F7EBE1] transition"
                                            >
                                                <PencilSquareIcon className="h-4 w-4" />
                                                Edit
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
