'use client';

import { useMemo, useState } from 'react';
import {
    ArrowsUpDownIcon,
} from '@heroicons/react/24/outline';
import TableSearch from '@/components/Common/TableSearch';
import Pagination from '@/components/Common/Pagination';
import { bookingsData, BookingStatus, BookingSource } from '@/data/bookings.data';
import { userGuests } from '@/data/UserGuest';
import { villas } from '@/data/villas';

type SortKey = 'id' | 'guest' | 'villa' | 'checkIn' | 'status' | 'total' | 'source';
type SortDirection = 'asc' | 'desc';

export default function ReservationSection() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const [sortConfig, setSortConfig] = useState<{
        key: SortKey;
        direction: SortDirection;
    }>({
        key: 'checkIn',
        direction: 'desc',
    });

    /* ================= GET RELATED DATA ================= */
    const getGuestName = (guestId: string) => {
        const guest = userGuests.find((g) => g.id === guestId);
        return guest ? `${guest.personalInfo.firstName} ${guest.personalInfo.lastName}` : 'Unknown Guest';
    };

    const getVillaName = (villaId: number) => {
        const villa = villas.find((v) => v.id === villaId);
        return villa ? villa.name : 'Unknown Villa';
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
            ? bookingsData.filter((b) => {
                const guestName = getGuestName(b.guestId).toLowerCase();
                const villaName = getVillaName(b.villaId).toLowerCase();
                return (
                    b.id.toLowerCase().includes(term) ||
                    guestName.includes(term) ||
                    villaName.includes(term) ||
                    b.source.toLowerCase().includes(term)
                );
            })
            : bookingsData;

        return [...filtered].sort((a, b) => {
            let aVal: string | number = '';
            let bVal: string | number = '';

            switch (sortConfig.key) {
                case 'id':
                    aVal = a.id;
                    bVal = b.id;
                    break;
                case 'guest':
                    aVal = getGuestName(a.guestId);
                    bVal = getGuestName(b.guestId);
                    break;
                case 'villa':
                    aVal = getVillaName(a.villaId);
                    bVal = getVillaName(b.villaId);
                    break;
                case 'checkIn':
                    aVal = new Date(a.bookingDate.checkInDate).getTime();
                    bVal = new Date(b.bookingDate.checkInDate).getTime();
                    break;
                case 'status':
                    aVal = a.status;
                    bVal = b.status;
                    break;
                case 'total':
                    aVal = a.price.total;
                    bVal = b.price.total;
                    break;
                case 'source':
                    aVal = a.source;
                    bVal = b.source;
                    break;
            }

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [search, sortConfig]);

    /* ================= PAGINATION ================= */
    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return processedData.slice(start, start + pageSize);
    }, [processedData, page]);

    const getStatusColor = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.CONFIRMED:
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case BookingStatus.WAITING_CONFIRMATION:
                return 'bg-amber-50 text-amber-700 border-amber-200';
            case BookingStatus.CANCELLED:
                return 'bg-red-50 text-red-700 border-red-200';
            case BookingStatus.COMPLETED:
                return 'bg-blue-50 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getSourceStyle = (source: BookingSource) => {
        switch (source) {
            case BookingSource.AIRBNB:
                return 'text-[#FF5A5F] bg-[#FF5A5F]/5 border-[#FF5A5F]/20';
            case BookingSource.BOOKING_COM:
                return 'text-[#003580] bg-[#003580]/5 border-[#003580]/20';
            case BookingSource.DIRECT:
                return 'text-[#7A3E2C] bg-[#7A3E2C]/5 border-[#7A3E2C]/20';
            case BookingSource.TRAVELOKA:
                return 'text-[#0194F3] bg-[#0194F3]/5 border-[#0194F3]/20';
            case BookingSource.AGODA:
                return 'text-[#61498C] bg-[#61498C]/5 border-[#61498C]/20';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-[#EFE3D7] px-8 py-5 sm:flex-row sm:items-center sm:justify-between bg-[#FAF4EC]/30">
                <div>
                    <h2 className="text-lg font-serif font-bold text-[#1E1E1E]">
                        Reservation Database
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage and track all villa bookings.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <TableSearch
                        value={search}
                        onChange={(val) => {
                            setSearch(val);
                            setPage(1);
                        }}
                        placeholder="Search reservations..."
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
                                onClick={() => handleSort('guest')}
                            >
                                <div className="flex items-center gap-2">
                                    Guest
                                    <ArrowsUpDownIcon className="h-3 w-3" />
                                </div>
                            </th>
                            <th
                                className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#8B6F56] cursor-pointer hover:text-[#7A3E2C]"
                                onClick={() => handleSort('villa')}
                            >
                                <div className="flex items-center gap-2">
                                    Villa
                                    <ArrowsUpDownIcon className="h-3 w-3" />
                                </div>
                            </th>
                            <th
                                className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#8B6F56] cursor-pointer hover:text-[#7A3E2C]"
                                onClick={() => handleSort('source')}
                            >
                                <div className="flex items-center gap-2">
                                    Source
                                    <ArrowsUpDownIcon className="h-3 w-3" />
                                </div>
                            </th>
                            <th
                                className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#8B6F56] cursor-pointer hover:text-[#7A3E2C]"
                                onClick={() => handleSort('checkIn')}
                            >
                                <div className="flex items-center gap-2">
                                    Check In
                                    <ArrowsUpDownIcon className="h-3 w-3" />
                                </div>
                            </th>
                            <th
                                className="px-8 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#8B6F56] cursor-pointer hover:text-[#7A3E2C]"
                                onClick={() => handleSort('total')}
                            >
                                <div className="flex items-center justify-end gap-2">
                                    Total
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
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#EFE3D7]">
                        {paginatedData.map((booking, index) => (
                            <tr
                                key={booking.id}
                                className="hover:bg-[#FAF4EC]/30 transition-colors"
                            >
                                <td className="px-8 py-5 font-medium text-[#2E2620]">
                                    {(page - 1) * pageSize + index + 1}
                                </td>

                                <td className="px-8 py-5">
                                    <p className="font-serif font-bold text-[#1E1E1E]">
                                        {getGuestName(booking.guestId)}
                                    </p>

                                </td>

                                <td className="px-8 py-5">
                                    <p className="text-[#1E1E1E] font-medium">{getVillaName(booking.villaId)}</p>
                                    <p className="text-gray-400 text-xs mt-0.5">
                                        {booking.guests} Guests
                                    </p>
                                </td>

                                <td className="px-8 py-5">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold border ${getSourceStyle(booking.source)}`}>
                                        {booking.source.replace('_', '.')}
                                    </span>
                                </td>

                                <td className="px-8 py-5 text-gray-600">
                                    <p className="font-medium text-[#2E2620]">
                                        {new Date(booking.bookingDate.checkInDate).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {booking.bookingDate.nights} Nights
                                    </p>
                                </td>

                                <td className="px-8 py-5 text-right font-bold text-[#1E1E1E]">
                                    {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        maximumFractionDigits: 0
                                    }).format(booking.price.total)}
                                </td>

                                <td className="px-8 py-5 text-center">
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(booking.status)}`}>
                                        {booking.status.replace('_', ' ')}
                                    </span>
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
        </section>
    );
}
