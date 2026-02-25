'use client';

import { useMemo, useState } from 'react';
import {
    ArrowsUpDownIcon,
    EyeIcon,
    PowerIcon,
} from '@heroicons/react/24/outline';
import TableSearch from '@/components/Common/TableSearch';
import Pagination from '@/components/Common/Pagination';
import { userGuests } from '@/data/UserGuest';
import StatusConfirmModal from '@/components/Common/StatusConfirmModal';
import Link from 'next/link';

type Guest = typeof userGuests[0];

type SortKey = 'name' | 'date' | 'status';
type SortDirection = 'asc' | 'desc';

export default function UserGuestSection() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // Local state for managing guest data
    const [guests, setGuests] = useState(userGuests);

    // Modal states
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [pendingStatusChange, setPendingStatusChange] = useState<{
        guestId: string;
        isActivating: boolean;
    } | null>(null);

    const [sortConfig, setSortConfig] = useState<{
        key: SortKey;
        direction: SortDirection;
    }>({
        key: 'date',
        direction: 'desc',
    });

    /* ================= MODAL HANDLERS ================= */
    const handleOpenStatusModal = (guest: Guest) => {
        setSelectedGuest(guest);
        setPendingStatusChange({
            guestId: guest.id,
            isActivating: !guest.status.isActive,
        });
        setShowStatusModal(true);
    };

    const handleConfirmStatusChange = () => {
        if (pendingStatusChange) {
            setGuests((prev) =>
                prev.map((g) =>
                    g.id === pendingStatusChange.guestId
                        ? { ...g, status: { ...g.status, isActive: !g.status.isActive } }
                        : g
                )
            );
        }
        setShowStatusModal(false);
        setPendingStatusChange(null);
        setSelectedGuest(null);
    };

    const handleCloseStatusModal = () => {
        setShowStatusModal(false);
        setPendingStatusChange(null);
        setSelectedGuest(null);
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
            ? guests.filter(
                (g) =>
                    `${g.personalInfo.firstName} ${g.personalInfo.lastName}`.toLowerCase().includes(term) ||
                    g.personalInfo.email.toLowerCase().includes(term) ||
                    (g.personalInfo.phoneNumber && g.personalInfo.phoneNumber.includes(term))
            )
            : guests;

        return [...filtered].sort((a, b) => {
            let aVal: string | number = '';
            let bVal: string | number = '';

            switch (sortConfig.key) {
                case 'name':
                    aVal = `${a.personalInfo.firstName} ${a.personalInfo.lastName}`.toLowerCase();
                    bVal = `${b.personalInfo.firstName} ${b.personalInfo.lastName}`.toLowerCase();
                    break;
                case 'date':
                    aVal = new Date(a.createdAt).getTime();
                    bVal = new Date(b.createdAt).getTime();
                    break;
                case 'status':
                    aVal = a.status.isActive ? 1 : 0;
                    bVal = b.status.isActive ? 1 : 0;
                    break;
            }

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [search, sortConfig, guests]);

    /* ================= PAGINATION ================= */
    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return processedData.slice(start, start + pageSize);
    }, [processedData, page]);

    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-[#EFE3D7] px-8 py-5 sm:flex-row sm:items-center sm:justify-between bg-[#FAF4EC]/30">
                <div>
                    <h2 className="text-lg font-serif font-bold text-[#1E1E1E]">
                        Guest Database
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Overview of users registered as guests.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <TableSearch
                        value={search}
                        onChange={(val) => {
                            setSearch(val);
                            setPage(1);
                        }}
                        placeholder="Search guests..."
                        className="w-full sm:w-64"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-[#FAF4EC] border-b border-[#E9D6C6]">
                            <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#8B6F56]">
                                Order
                            </th>
                            <th
                                className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#8B6F56] cursor-pointer hover:text-[#7A3E2C]"
                                onClick={() => handleSort('name')}
                            >
                                <div className="flex items-center gap-2">
                                    Guest Name
                                    <ArrowsUpDownIcon className="h-3 w-3" />
                                </div>
                            </th>
                            <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#8B6F56]">
                                Contact Info
                            </th>
                            <th
                                className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#8B6F56] cursor-pointer hover:text-[#7A3E2C]"
                                onClick={() => handleSort('date')}
                            >
                                <div className="flex items-center gap-2">
                                    Join Date
                                    <ArrowsUpDownIcon className="h-3 w-3" />
                                </div>
                            </th>
                            <th
                                className="px-8 py-4 text-center text-[10px] font-bold uppercase tracking-widest text-[#8B6F56] cursor-pointer hover:text-[#7A3E2C]"
                                onClick={() => handleSort('status')}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    Status
                                    <ArrowsUpDownIcon className="h-3 w-3" />
                                </div>
                            </th>
                            <th className="px-8 py-4 text-center text-[10px] font-bold uppercase tracking-widest text-[#8B6F56]">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#EFE3D7]">
                        {paginatedData.map((guest, index) => (
                            <tr
                                key={guest.id}
                                className="hover:bg-[#FAF4EC]/30 transition-colors"
                            >
                                <td className="px-8 py-5 font-medium text-[#2E2620]">
                                    {(page - 1) * pageSize + index + 1}
                                </td>

                                <td className="px-8 py-5">
                                    <p className="font-serif font-bold text-[#1E1E1E]">
                                        {guest.personalInfo.firstName} {guest.personalInfo.lastName}
                                    </p>
                                </td>

                                <td className="px-8 py-5">
                                    <p className="text-[#1E1E1E] font-medium">{guest.personalInfo.email}</p>
                                    <p className="text-gray-400 text-xs mt-0.5">
                                        {guest.personalInfo.phoneNumber || 'No phone provided'}
                                    </p>
                                </td>

                                <td className="px-8 py-5 text-gray-600">
                                    {new Date(guest.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </td>

                                <td className="px-8 py-5 text-center">
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${guest.status.isActive
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : 'bg-gray-50 text-gray-500 border-gray-200'
                                        }`}>
                                        <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${guest.status.isActive ? 'bg-emerald-500' : 'bg-gray-400'
                                            }`} />
                                        {guest.status.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>

                                <td className="px-8 py-5">
                                    <div className="flex justify-center gap-2">
                                        {/* Details Button */}
                                        <Link href={`/beranda/manage-user/guest/${guest.id}`}>
                                            <button
                                                className="inline-flex items-center gap-1.5 rounded-md border border-[#E2C9B4] px-3 py-1.5 text-xs font-medium text-[#7A3E2C] hover:bg-[#F7EBE1] transition active:scale-95"
                                                title="View Details"
                                            >
                                                <EyeIcon className="h-4 w-4" />
                                                Detail
                                            </button>
                                        </Link>

                                        {/* Toggle Status Button */}
                                        <button
                                            onClick={() => handleOpenStatusModal(guest)}
                                            className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition active:scale-95 ${guest.status.isActive
                                                ? 'border-red-200 text-red-700 hover:bg-red-50'
                                                : 'border-green-200 text-green-700 hover:bg-green-50'
                                                }`}
                                            title={guest.status.isActive ? 'Deactivate' : 'Activate'}
                                        >
                                            <PowerIcon className="h-4 w-4" />
                                            {guest.status.isActive ? 'Inactive' : 'Active'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="border-t border-[#EFE3D7] bg-[#FAF4EC]/10 px-8 py-4">
                <Pagination
                    page={page}
                    total={processedData.length}
                    pageSize={pageSize}
                    onPageChange={setPage}
                />
            </div>

            {/* Status Confirmation Modal */}
            <StatusConfirmModal
                open={showStatusModal}
                isActivating={pendingStatusChange?.isActivating ?? false}
                guestName={
                    selectedGuest
                        ? `${selectedGuest.personalInfo.firstName} ${selectedGuest.personalInfo.lastName}`
                        : ''
                }
                onClose={handleCloseStatusModal}
                onConfirm={handleConfirmStatusChange}
            />
        </section>
    );
}
