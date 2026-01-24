'use client';

import { useMemo, useState } from 'react';
import {
    ArrowsUpDownIcon,
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import TableSearch from '@/components/Common/TableSearch';
import Pagination from '@/components/Common/Pagination';
import { villas as initialVillas } from '@/data/villas';
import DeleteConfirmModal from '@/components/Common/DeleteConfirmModal';
import Link from 'next/link';
import Image from 'next/image';

type Villa = typeof initialVillas[0];
type SortKey = 'name' | 'location' | 'weekdayPrice' | 'weekendPrice';
type SortDirection = 'asc' | 'desc';

export default function VillaSection() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // Local state for managing villa data
    const [villas, setVillas] = useState(initialVillas);

    // Modal states
    const [villaToDelete, setVillaToDelete] = useState<Villa | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [sortConfig, setSortConfig] = useState<{
        key: SortKey;
        direction: SortDirection;
    }>({
        key: 'name',
        direction: 'asc',
    });

    /* ================= MODAL HANDLERS ================= */
    const handleDeleteClick = (villa: Villa) => {
        setVillaToDelete(villa);
    };

    const handleConfirmDelete = async () => {
        if (!villaToDelete) return;

        setIsDeleting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setVillas((prev) => prev.filter((v) => v.id !== villaToDelete.id));
        setIsDeleting(false);
        setVillaToDelete(null);
    };

    const handleCloseDeleteModal = () => {
        setVillaToDelete(null);
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
            ? villas.filter(
                (v) =>
                    v.name.toLowerCase().includes(term) ||
                    v.location.toLowerCase().includes(term)
            )
            : villas;

        return [...filtered].sort((a, b) => {
            let aVal: string | number = '';
            let bVal: string | number = '';

            switch (sortConfig.key) {
                case 'name':
                    aVal = a.name.toLowerCase();
                    bVal = b.name.toLowerCase();
                    break;
                case 'location':
                    aVal = a.location.toLowerCase();
                    bVal = b.location.toLowerCase();
                    break;
                case 'weekdayPrice':
                    aVal = parseInt(a.weekdayPrice.replace(/\D/g, '')) || 0;
                    bVal = parseInt(b.weekdayPrice.replace(/\D/g, '')) || 0;
                    break;
                case 'weekendPrice':
                    aVal = parseInt(a.weekendPrice.replace(/\D/g, '')) || 0;
                    bVal = parseInt(b.weekendPrice.replace(/\D/g, '')) || 0;
                    break;
            }

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [search, sortConfig, villas]);

    /* ================= PAGINATION ================= */
    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return processedData.slice(start, start + pageSize);
    }, [processedData, page]);

    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex flex-col gap-3 border-b border-[#EFE3D7] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-base sm:text-lg font-semibold text-[#2E2620]">
                        Property Management
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">
                        Manage your property listings, prices, and availability.
                    </p>
                </div>

                <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
                    <TableSearch
                        value={search}
                        onChange={(val) => {
                            setSearch(val);
                            setPage(1);
                        }}
                        placeholder="Search properties..."
                    />

                    {/* Add Property */}
                    <Link href="/beranda/manage-property/add">
                        <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#7A3E2C] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#5C2D20] transition">
                            <PlusIcon className="h-4 w-4" />
                            Add Property
                        </button>
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-[#FAF4EC]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#8B6F56]">
                                Property Info
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#8B6F56]">
                                Category
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#8B6F56] cursor-pointer hover:text-[#7A3E2C]"
                                onClick={() => handleSort('location')}
                            >
                                <div className="flex items-center gap-2">
                                    Location
                                    <ArrowsUpDownIcon className="h-3 w-3" />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#8B6F56]">
                                Capacity
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#8B6F56] cursor-pointer hover:text-[#7A3E2C]"
                                onClick={() => handleSort('weekdayPrice')}
                            >
                                <div className="flex items-center gap-2">
                                    Weekday Price
                                    <ArrowsUpDownIcon className="h-3 w-3" />
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#8B6F56] cursor-pointer hover:text-[#7A3E2C]"
                                onClick={() => handleSort('weekendPrice')}
                            >
                                <div className="flex items-center gap-2">
                                    Weekend Price
                                    <ArrowsUpDownIcon className="h-3 w-3" />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-[#8B6F56]">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#EFE3D7]">
                        {paginatedData.map((villa) => (
                            <tr
                                key={villa.id}
                                className="hover:bg-[#FAF4EC]/50 transition"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            <Image
                                                src={villa.image}
                                                alt={villa.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="font-medium text-[#1E1E1E]">
                                            {villa.name}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-full bg-[#FAF4EC] px-2.5 py-0.5 text-xs font-medium text-[#7A3E2C]">
                                        {villa.category.name}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-[#1E1E1E]">
                                    {villa.location}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    <div className="flex flex-col text-xs">
                                        <span>{villa.guests} Guests</span>
                                        <span>{villa.bedrooms} Bedrooms</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="text-xs font-medium text-[#7A3E2C]">
                                        {villa.weekdayPrice}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="text-xs font-medium text-gray-700">
                                        {villa.weekendPrice}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">


                                        <Link href={`/beranda/manage-property/edit/${villa.id}`}>
                                            <button className="inline-flex items-center gap-1.5 rounded-md border border-[#E2C9B4] px-3 py-1.5 text-xs text-[#7A3E2C] hover:bg-[#F7EBE1]">
                                                <PencilSquareIcon className="h-4 w-4" />
                                                Edit
                                            </button>
                                        </Link>

                                        <button
                                            onClick={() => handleDeleteClick(villa)}
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

            <DeleteConfirmModal
                open={!!villaToDelete}
                title={`Delete ${villaToDelete?.name || 'Property'}`}
                description={`Are you sure you want to delete ${villaToDelete?.name}? This action will remove the property from the listing.`}
                loading={isDeleting}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </section>
    );
}
