'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRangePicker.css';
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface CustomDateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface DateRangeFilterProps {
    customDateRange?: CustomDateRange;
    onCustomDateRangeChange?: (range: CustomDateRange) => void;
}

export default function DateRangeFilter({
    customDateRange,
    onCustomDateRangeChange
}: DateRangeFilterProps) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tempStartDate, setTempStartDate] = useState<Date | null>(customDateRange?.startDate || null);
    const [tempEndDate, setTempEndDate] = useState<Date | null>(customDateRange?.endDate || null);

    // Sync temp state with prop when modal opens
    useEffect(() => {
        if (showDatePicker) {
            setTempStartDate(customDateRange?.startDate || null);
            setTempEndDate(customDateRange?.endDate || null);
        }
    }, [showDatePicker, customDateRange]);

    const handleApplyDateRange = () => {
        if (tempStartDate && tempEndDate && onCustomDateRangeChange) {
            onCustomDateRangeChange({
                startDate: tempStartDate,
                endDate: tempEndDate,
            });
            setShowDatePicker(false);
        }
    };

    const formatCustomDateRange = () => {
        if (customDateRange?.startDate && customDateRange?.endDate) {
            const start = customDateRange.startDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short'
            });
            const end = customDateRange.endDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
            return `${start} - ${end}`;
        }
        return 'Select Date Range';
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-sm border border-[#F3C7A4]/30 hover:shadow-md hover:border-[#7A3E2C]/30 transition-all duration-300 text-stone-700 font-semibold group"
            >
                <div className="bg-[#7A3E2C]/5 p-1.5 rounded-lg group-hover:bg-[#7A3E2C]/10 transition-colors">
                    <CalendarIcon className="w-5 h-5 text-[#7A3E2C]" />
                </div>
                <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Time Range</span>
                    <span className="text-sm">{formatCustomDateRange()}</span>
                </div>
            </button>

            {/* Date Range Picker Popup */}
            {showDatePicker && (
                <div className="absolute top-full mt-3 right-0 z-50 bg-white rounded-3xl shadow-2xl border border-[#F3C7A4]/20 p-0 overflow-hidden min-w-[420px] animate-in fade-in zoom-in duration-200">
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-stone-800">Custom Date</h3>
                                <p className="text-xs text-stone-500 mt-1">Select your reporting period</p>
                            </div>
                            <button
                                onClick={() => setShowDatePicker(false)}
                                className="p-2 hover:bg-stone-100 rounded-full text-stone-400 transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex justify-center mb-8">
                            <div className="custom-datepicker-container w-full scale-110 origin-top">
                                <DatePicker
                                    selected={tempStartDate}
                                    onChange={(dates: [Date | null, Date | null]) => {
                                        const [start, end] = dates;
                                        setTempStartDate(start);
                                        setTempEndDate(end);
                                    }}
                                    startDate={tempStartDate}
                                    endDate={tempEndDate}
                                    selectsRange
                                    maxDate={new Date()}
                                    inline
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">Period Selection</span>
                                <div className="text-sm font-bold text-stone-800">
                                    {tempStartDate ? tempStartDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : '---'}
                                    <span className="mx-2 text-stone-300">→</span>
                                    {tempEndDate ? tempEndDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '---'}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDatePicker(false)}
                                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-stone-500 hover:bg-stone-50 hover:text-stone-700 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApplyDateRange}
                                    disabled={!tempStartDate || !tempEndDate}
                                    className="px-8 py-2.5 rounded-xl text-sm font-bold bg-[#7A3E2C] text-white hover:bg-[#8B4A36] disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#7A3E2C]/20 hover:shadow-[#7A3E2C]/30 active:scale-95"
                                >
                                    Apply Filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {showDatePicker && (
                <div
                    className="fixed inset-0 bg-stone-900/10 backdrop-blur-[2px] z-40"
                    onClick={() => setShowDatePicker(false)}
                />
            )}
        </div>
    );
}
