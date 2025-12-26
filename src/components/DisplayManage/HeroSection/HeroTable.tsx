'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { HeroSlide } from '../../../data/HeroSectionData';
import {
    PencilSquareIcon,
    ArrowsUpDownIcon,
    TrashIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';
import Pagination from '@/components/Common/Pagination';
import TableSearch from '@/components/Common/TableSearch';
import Link from 'next/link';

type Props = {
    slides: HeroSlide[];
};

type SortKey = 'order' | 'villa' | 'status';
type SortDirection = 'asc' | 'desc';

export default function HeroTable({ slides }: Props) {
    const [sortConfig, setSortConfig] = useState<{
        key: SortKey;
        direction: SortDirection;
    }>({
        key: 'order',
        direction: 'asc',
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
                const name = s.villaName.toLowerCase();
                const subtitle = s.villaSubtitle.toLowerCase();
                return (
                    name.includes(term) ||
                    subtitle.includes(term) ||
                    s.order.toString().includes(term)
                );
            })
            : slides;

        return [...filtered].sort((a, b) => {
            const { key, direction } = sortConfig;
            let aVal: string | number = '';
            let bVal: string | number = '';

            switch (key) {
                case 'order':
                    aVal = a.order;
                    bVal = b.order;
                    break;
                case 'villa':
                    aVal = a.villaName.toLowerCase();
                    bVal = b.villaName.toLowerCase();
                    break;
                case 'status':
                    aVal = a.isActive ? 1 : 0;
                    bVal = b.isActive ? 1 : 0;
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
                    <TableSearch
                        value={search}
                        onChange={(val) => {
                            setSearch(val);
                            setPage(1);
                        }}
                        placeholder="Search slides..."
                    />
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
                            <SortHeader label="Status" sortKey="status" />
                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-[#8B6F56]">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#EFE3D7]">
                        {paginatedSlides.map((slide) => (
                            <tr
                                key={slide.id}
                                className="hover:bg-[#FAF4EC]/50 transition"
                            >
                                <td className="px-6 py-4 font-medium text-[#2E2620]">
                                    {slide.order}
                                </td>

                                <td className="px-6 py-4">
                                    <p className="font-semibold text-[#2E2620]">
                                        {slide.villaName}
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-500">
                                        {slide.villaSubtitle}
                                    </p>
                                </td>

                                <td className="px-6 py-4 align-middle">
                                    <div className="flex justify-center items-center">
                                        <div className="relative h-12 w-20 overflow-hidden rounded-lg border">
                                            <Image
                                                src={slide.image.url}
                                                alt={slide.image.alt}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </td>


                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${slide.isActive
                                            ? 'bg-green-50 text-green-700'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {slide.isActive ? 'Active' : 'Inactive'}
                                    </span>
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
                        ))}
                    </tbody>
                </table>
            </div>

        </section>
    );
}
