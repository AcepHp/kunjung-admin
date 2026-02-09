'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { villas } from '@/data/villas';
import { userGuests } from '@/data/UserGuest';
import { BookingSource } from '@/data/bookings.data';
import {
    CalendarDaysIcon,
    HomeIcon,
    ChevronLeftIcon
} from '@heroicons/react/24/outline';

export default function AddReservationForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        villaId: '',
        guestId: '',
        guests: 1,
        source: BookingSource.DIRECT,
        checkInDate: '',
        checkOutDate: '',
        accommodationFare: 0,
        taxPercentage: 10,
    });

    const parsePrice = (priceStr: string) => {
        return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
    };

    const calculatePricing = () => {
        if (!formData.villaId || !formData.checkInDate || !formData.checkOutDate) return;

        const villa = villas.find(v => v.id === Number(formData.villaId));
        if (!villa) return;

        const start = new Date(formData.checkInDate);
        const end = new Date(formData.checkOutDate);

        if (end <= start) return;

        let totalFare = 0;
        const current = new Date(start);

        while (current < end) {
            const day = current.getDay();
            // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
            // In many Indonesian villas, Friday and Saturday nights are usually weekend rates
            const isWeekend = day === 5 || day === 6;

            const rate = isWeekend
                ? parsePrice(villa.weekendPrice)
                : parsePrice(villa.weekdayPrice);

            totalFare += rate;
            current.setDate(current.getDate() + 1);
        }

        setFormData(prev => ({ ...prev, accommodationFare: totalFare }));
    };

    // Auto-calculate when villa or dates change
    useEffect(() => {
        calculatePricing();
    }, [formData.villaId, formData.checkInDate, formData.checkOutDate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'villaId' || name === 'guests' || name === 'accommodationFare' || name === 'taxPercentage'
                ? Number(value)
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('New Manual Booking:', formData);
        setLoading(false);
        router.push('/beranda/reservations');
    };

    const total = formData.accommodationFare + (formData.accommodationFare * formData.taxPercentage / 100);

    return (
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E9D6C6]/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Villa & Guest Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-[#7A3E2C] rounded-full" />
                            <h3 className="font-bold text-[#1E1E1E]">Property & Guest</h3>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-[#1E1E1E]">Select Villa <span className="text-[#7A3E2C]">*</span></label>
                                <select
                                    name="villaId"
                                    required
                                    value={formData.villaId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200"
                                >
                                    <option value="">Choose a villa</option>
                                    {villas.map(villa => (
                                        <option key={villa.id} value={villa.id}>{villa.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-[#1E1E1E]">Select Guest <span className="text-[#7A3E2C]">*</span></label>
                                <select
                                    name="guestId"
                                    required
                                    value={formData.guestId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200"
                                >
                                    <option value="">Choose a registered guest</option>
                                    {userGuests.map(guest => (
                                        <option key={guest.id} value={guest.id}>
                                            {guest.personalInfo.firstName} {guest.personalInfo.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-[#1E1E1E]">Num of Guests</label>
                                    <input
                                        type="number"
                                        name="guests"
                                        min="1"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-[#1E1E1E]">Source</label>
                                    <select
                                        name="source"
                                        value={formData.source}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200"
                                    >
                                        {Object.values(BookingSource).map(source => (
                                            <option key={source} value={source}>{source.replace('_', '.')}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dates & Pricing */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-[#7A3E2C] rounded-full" />
                            <h3 className="font-bold text-[#1E1E1E]">Dates & Pricing</h3>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-[#1E1E1E]">Check-in Date <span className="text-[#7A3E2C]">*</span></label>
                                    <input
                                        type="date"
                                        name="checkInDate"
                                        required
                                        value={formData.checkInDate}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-[#1E1E1E]">Check-out Date <span className="text-[#7A3E2C]">*</span></label>
                                    <input
                                        type="date"
                                        name="checkOutDate"
                                        required
                                        value={formData.checkOutDate}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-[#1E1E1E]">Accommodation Fare (IDR) <span className="text-[#7A3E2C]">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
                                    <input
                                        type="number"
                                        name="accommodationFare"
                                        required
                                        value={formData.accommodationFare}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] pl-12 pr-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-[#FAF4EC]/50 border border-[#E9D6C6]/40 space-y-3">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Fare</span>
                                    <span className="font-semibold">Rp {formData.accommodationFare.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tax ({formData.taxPercentage}%)</span>
                                    <span className="font-semibold">Rp {(formData.accommodationFare * formData.taxPercentage / 100).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-[#1E1E1E] border-t border-[#EFE3D7] pt-4 mt-2">
                                    <span className="text-base">Total Payment</span>
                                    <span className="text-lg text-[#7A3E2C]">Rp {total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-between border-t border-[#EFE3D7]/60 pt-8">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-all active:scale-95"
                    >
                        <ChevronLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to List
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-full bg-[#7A3E2C] px-10 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all disabled:opacity-70 active:scale-95"
                    >
                        {loading ? 'Creating Booking...' : 'Finish & Create Booking'}
                    </button>
                </div>
            </form>
        </div>
    );
}
