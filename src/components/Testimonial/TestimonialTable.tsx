'use client';

import { useMemo, useState } from 'react';
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    ArrowsUpDownIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';
import TableSearch from '@/components/Common/TableSearch';
import Pagination from '@/components/Common/Pagination';
import Link from 'next/link';
import { Testimonial } from '@/data/TestimonialData';
import DeleteConfirmModal from '@/components/Common/DeleteConfirmModal';

type Props = {
    testimonials: Testimonial[];
};

type SortKey = 'name' | 'date' | 'rating';
type SortDirection = 'asc' | 'desc';

export default function TestimonialTable({ testimonials }: Props) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const [sortConfig, setSortConfig] = useState<{
        key: SortKey;
        direction: SortDirection;
    }>({
        key: 'date',
        direction: 'desc',
    });

    /* ================= DELETE MODAL STATE ================= */
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Testimonial | null>(null);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleOpenDelete = (item: Testimonial) => {
        setSelectedItem(item);
        setOpenDelete(true);
    };

    const handleConfirmDelete = async () => {
        setLoadingDelete(true);

        // 🔹 Simulasi proses delete
        await new Promise((res) => setTimeout(res, 1000));

        console.log('Deleted testimonial:', selectedItem);

        setLoadingDelete(false);
        setOpenDelete(false);
        setSelectedItem(null);
    };

    /* ================= SORT ================= */
    const handleSort = (key: SortKey) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
        setPage(1);
    };

    /* ================= FILTER + SORT ================= */
    const processedData = useMemo(() => {
        const term = search.trim().toLowerCase();

        const filtered = term
            ? testimonials.filter(
                (t) =>
                    t.name.toLowerCase().includes(term) ||
                    t.content.toLowerCase().includes(term) ||
                    t.rating.toString().includes(term)
            )
            : testimonials;

        return [...filtered].sort((a, b) => {
            let aVal: string | number = '';
            let bVal: string | number = '';

            switch (sortConfig.key) {
                case 'name':
                    aVal = a.name.toLowerCase();
                    bVal = b.name.toLowerCase();
                    break;
                case 'date':
                    aVal = new Date(a.date).getTime();
                    bVal = new Date(b.date).getTime();
                    break;
                case 'rating':
                    aVal = a.rating;
                    bVal = b.rating;
                    break;
            }

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [testimonials, search, sortConfig]);

    /* ================= PAGINATION ================= */
    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return processedData.slice(start, start + pageSize);
    }, [processedData, page]);

    return (
        <>
            <section className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm">
                {/* Header */}
                <div className="flex flex-col gap-3 border-b border-[#EFE3D7] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold text-[#2E2620]">
                            Testimonials
                        </h2>
                        <p className="mt-1 text-xs sm:text-sm text-gray-500">
                            Manage customer testimonials and reviews.
                        </p>
                    </div>

                    <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
                        <TableSearch
                            value={search}
                            onChange={(val) => {
                                setSearch(val);
                                setPage(1);
                            }}
                            placeholder="Search testimonial..."
                        />

                        {/* Sync Button */}
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#E2C9B4] bg-white px-4 py-1.5 text-xs font-medium text-[#5C2D20] hover:bg-[#F7EBE1] transition"
                        >
                            <ArrowPathIcon className="h-4 w-4" />
                            Sync
                        </button>

                        {/* Add Testimonial */}
                        <Link href="/beranda/testimonial/add-testi">
                            <button
                                type="button"
                                className="whitespace-nowrap rounded-full bg-[#7A3E2C] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#5C2D20] transition"
                            >
                                + Add Testimonials
                            </button>
                        </Link>
                    </div>
                </div>


                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#FAF4EC]">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold uppercase text-[#8B6F56]">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-xs font-semibold uppercase text-[#8B6F56]">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-[#8B6F56]">
                                    Rating
                                </th>
                                <th className="px-6 py-3 text-xs font-semibold uppercase text-[#8B6F56]">
                                    Review
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-[#8B6F56]">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#EFE3D7]">
                            {paginatedData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-[#FAF4EC]/50 transition"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {item.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {item.date}
                                    </td>

                                    <td className="px-6 py-4 text-center font-semibold">
                                        ⭐ {item.rating}
                                    </td>

                                    <td className="px-6 py-4 max-w-md truncate text-gray-700">
                                        {item.content}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <Link href={`/testimonial/${item.id}`}>
                                                <button className="inline-flex items-center gap-1.5 rounded-md border border-[#E2C9B4] px-3 py-1.5 text-xs text-[#7A3E2C] hover:bg-[#F7EBE1]">
                                                    <EyeIcon className="h-4 w-4" />
                                                    Detail
                                                </button>
                                            </Link>

                                            <Link
                                                href={`/testimonial/${item.id}/edit`}
                                            >
                                                <button className="inline-flex items-center gap-1.5 rounded-md border border-[#E2C9B4] px-3 py-1.5 text-xs text-[#7A3E2C] hover:bg-[#F7EBE1]">
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                    Edit
                                                </button>
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleOpenDelete(item)
                                                }
                                                className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="border-t border-[#EFE3D7] px-6 py-3">
                    <Pagination
                        page={page}
                        total={processedData.length}
                        pageSize={pageSize}
                        onPageChange={setPage}
                    />
                </div>
            </section>

            {/* ===== DELETE MODAL ===== */}
            <DeleteConfirmModal
                open={openDelete}
                title="Delete Testimonial"
                description={`Are you sure you want to delete testimonial from "${selectedItem?.name}"? This action cannot be undone.`}
                loading={loadingDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}
