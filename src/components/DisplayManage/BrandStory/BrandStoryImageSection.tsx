'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { BrandImageApiResponse } from '@/services/BrandImageService';

type Props = {
    images: BrandImageApiResponse[];
};

export default function BrandStoryImageSection({ images }: Props) {
    return (
        <div className="rounded-xl border border-[#E0D4C6] bg-white">
            <div className="flex items-center justify-between border-b border-[#EFE3D7] px-6 py-4">
                <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                        Brand Images
                    </h3>
                    <p className="text-xs text-gray-500">
                        Manage images shown in brand story section.
                    </p>
                </div>
                {images.length === 0 && (
                    <Link href="/beranda/display/brand-story/image/add">
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#7A3E2C] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#5C2D20] transition-all"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Add Images
                        </button>
                    </Link>
                )}
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
                                    <div className="relative h-16 w-24 overflow-hidden rounded-lg border bg-gray-50">
                                        <Image
                                            src={img.brandImageUrl}
                                            alt="Brand image"
                                            fill
                                            className="object-cover"
                                            unoptimized
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
                        {images.length === 0 && (
                            <tr>
                                <td colSpan={2} className="px-6 py-8 text-center text-gray-400 italic">
                                    No images available. Click "Add Image" to create one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
