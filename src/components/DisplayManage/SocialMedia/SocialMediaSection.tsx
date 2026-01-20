'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import {
    PencilSquareIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline';
import {
    Instagram,
    Youtube,
    Link as LinkIcon,
} from 'lucide-react';

import type { SocialMediaData } from '@/data/SocialMediaData';

type Props = {
    data: SocialMediaData[];
};

const iconMap: Record<string, ReactNode> = {
    email: <EnvelopeIcon className="h-4 w-4" />,
    instagram: <Instagram className="h-4 w-4" />,
    youtube: <Youtube className="h-4 w-4" />,
    tiktok: <LinkIcon className="h-4 w-4" />,
};

export default function SocialMediaSection({ data }: Props) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#E6D8C9] bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-[#FBF6F0]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8B6F56]">
                                Platform
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8B6F56]">
                                URL
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#8B6F56]">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#EFE3D7]">
                        {data.map((item) => (
                            <tr
                                key={item.id}
                                className="transition hover:bg-[#FBF6F0]/60"
                            >
                                {/* Platform */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3E7DB] text-[#7A3E2C]">
                                            {iconMap[item.name.toLowerCase()] ?? (
                                                <LinkIcon className="h-4 w-4" />
                                            )}
                                        </span>
                                        <span className="font-medium capitalize text-gray-800">
                                            {item.name}
                                        </span>
                                    </div>
                                </td>

                                {/* URL */}

                                {/* URL */}
                                <td className="px-6 py-4 max-w-xs">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block truncate text-sm text-[#7A3E2C] hover:underline"
                                    >
                                        {item.url}
                                    </a>
                                </td>

                                {/* Action */}
                                <td className="px-6 py-4 text-center">
                                    <Link
                                        href={`/beranda/display/social-media/${item.id}/edit`}
                                        className="inline-flex items-center gap-2 rounded-lg border border-[#E2C9B4] px-3 py-1.5 text-xs font-medium text-[#7A3E2C] hover:bg-[#F7EBE1] transition"
                                    >
                                        <PencilSquareIcon className="h-4 w-4" />
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
