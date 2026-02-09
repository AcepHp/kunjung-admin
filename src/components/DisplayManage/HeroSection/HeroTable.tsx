'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
    PencilSquareIcon,
    ArrowsUpDownIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import Pagination from '@/components/Common/Pagination';
import TableSearch from '@/components/Common/TableSearch';
import Link from 'next/link';
import { HeroSlideApiResponse } from '@/services/HeroSectionService';
import HeroTableSkeleton from './HeroTableSkeleton';

type Props = {
    slides: HeroSlideApiResponse[];
    isLoading?: boolean;
};

type SortKey = 'order' | 'villa' | 'status';
type SortDirection = 'asc' | 'desc';

export default function HeroTable({ slides, isLoading }: Props) {
    const [sortConfig, setSortConfig] = useState<{
        key: SortKey;
        direction: SortDirection;
    }>({
        key: 'order',
        direction: 'desc',
    });

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const pageSize = 10; // default 10 per halaman

    const handleSort = (key: SortKey) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc',
                };
            }
            return { key, direction: 'asc' };
        });
        setPage(1);
    };

    // 🔍 Filter + sort
    const processedSlides = useMemo(() => {
        const term = search.trim().toLowerCase();

        const filtered = term
            ? slides.filter((s) => {
                const name = s.title.toLowerCase();
                const subtitle = s.subtitle.toLowerCase();
                return (
                    name.includes(term) ||
                    subtitle.includes(term)
                );
            })
            : slides;

        return [...filtered].sort((a, b) => {
            const { key, direction } = sortConfig;
            let aVal: string | number = '';
            let bVal: string | number = '';

            switch (key) {
                case 'order':
                    // API doesn't have order, let's use createdAt or just 0
                    aVal = a.createdAt;
                    bVal = b.createdAt;
                    break;
                case 'villa':
                    aVal = a.title.toLowerCase();
                    bVal = b.title.toLowerCase();
                    break;
                case 'status':
                    aVal = a.status ? 1 : 0;
                    bVal = b.status ? 1 : 0;
                    break;
            }

            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [slides, sortConfig, search]);

    // 🔹 Pagination
    const paginatedSlides = useMemo(() => {
        const start = (page - 1) * pageSize;
        return processedSlides.slice(start, start + pageSize);
    }, [processedSlides, page]);

    const SortHeader = ({
        label,
        sortKey,
        alignRight,
    }: {
        label: string;
        sortKey: SortKey;
        alignRight?: boolean;
    }) => {
        const isActive = sortConfig.key === sortKey;
        const isDesc = isActive && sortConfig.direction === 'desc';

        return (
            <th
                className={`px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#8B6F56] ${alignRight ? 'text-right' : 'text-left'
                    }`}
            >
                <button
                    type="button"
                    onClick={() => handleSort(sortKey)}
                    className="inline-flex items-center gap-1.5 group"
                >
                    <span className={isActive ? 'text-[#5C2D20]' : ''}>
                        {label}
                    </span>
                    <ArrowsUpDownIcon
                        className={[
                            'h-3.5 w-3.5 transition-transform',
                            isActive
                                ? 'text-[#7A3E2C]'
                                : 'text-[#C3A086] group-hover:text-[#7A3E2C]',
                            isDesc ? 'rotate-180' : '',
                        ].join(' ')}
                    />
                </button>
            </th>
        );
    };

    if (isLoading) return <HeroTableSkeleton />;

    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm">
            {/* Header + Search */}
            <div className="flex flex-col gap-3 border-b border-[#EFE3D7] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-base sm:text-lg font-semibold text-[#2E2620]">
                        Hero Slides
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">
                        Manage hero slider images and villa information.
                    </p>
                </div>

                <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
                    
                    
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-[#FAF4EC]">
                        <tr>
                            <SortHeader label="Order" sortKey="order" />
                            <SortHeader label="Villa" sortKey="villa" />
                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-[#8B6F56]">
                                Image
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-[#8B6F56]">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#EFE3D7]">
                        {paginatedSlides.length > 0 ? (
                            paginatedSlides.map((slide, index) => (
                                <tr
                                    key={slide.id}
                                    className="hover:bg-[#FAF4EC]/50 transition"
                                >
                                    <td className="px-6 py-4 font-medium text-[#2E2620]">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-[#2E2620]">
                                            {slide.title}
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-500">
                                            {slide.subtitle}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4 align-middle">
                                        <div className="flex justify-center items-center">
                                            <div className="relative h-12 w-20 overflow-hidden rounded-lg border">
                                                <Image
                                                    src={slide.imageUrl}
                                                    alt={slide.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                    </td>


                                    

                                    <td className="px-6 py-4 align-middle">
                                        <div className="flex justify-center items-center gap-2">
                                            {/* Detail */}
                                            <Link href={`/beranda/display/hero/${slide.id}`}>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-1.5 rounded-md border border-[#E2C9B4] px-3 py-1.5 text-xs font-medium text-[#7A3E2C] hover:bg-[#F7EBE1] transition"
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                    Detail
                                                </button>
                                            </Link>


                                            {/* Edit */}
                                            <Link href={`/beranda/display/hero/${slide.id}/edit-slide`}>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-1.5 rounded-md border border-[#E2C9B4] px-3 py-1.5 text-xs font-medium text-[#7A3E2C] hover:bg-[#F7EBE1] transition"
                                                >
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                    Edit
                                                </button>
                                            </Link>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <p className="text-gray-500">No slides found.</p>
                                        <Link href="/beranda/display/hero/add-slide">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-lg bg-[#7A3E2C] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5C2D20] transition"
                                            >
                                                <PlusIcon className="h-5 w-5" />
                                                Add Your First Slide
                                            </button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div className="border-t border-[#EFE3D7] px-6 py-4">
                <Pagination
                    page={page}
                    total={processedSlides.length}
                    pageSize={pageSize}
                    onPageChange={setPage}
                />
            </div>
        </section>
    );
}
