'use client';

import React, { useState } from 'react';
import DashboardSummary from './DashboardSummary';
import MonthlyPerformanceChart from './MonthlyPerformanceChart';
import IncomeSourceChart from './IncomeSourceChart';
import ChannelPerformanceBarChart from './ChannelPerformanceBarChart';
import OperationalExpensesChart from './OperationalExpensesChart';
import RecentTransactions from './RecentTransactions';
import DateRangeFilter, { CustomDateRange } from './DateRangeFilter';

export default function DashboardLayout() {
    const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({
        startDate: null,
        endDate: null,
    });

    const handleCustomDateRangeChange = (range: CustomDateRange) => {
        setCustomDateRange(range);
    };

    return (
        <div className="min-h-screen bg-[#faf8f3] font-sans text-stone-800">
            {/* Header Section */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#7A3E2C]">
                        Dashboard
                    </h1>
                    <p className="text-stone-500 mt-1 font-medium">
                        Financial Overview & Performance Metrics
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <DateRangeFilter
                        customDateRange={customDateRange}
                        onCustomDateRangeChange={handleCustomDateRangeChange}
                    />
                    <button className="bg-[#7A3E2C] hover:bg-[#8B4A36] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-[#7A3E2C]/20">
                        Download Report
                    </button>
                </div>
            </div>

            {/* Summary Cards Section */}
            <DashboardSummary customDateRange={customDateRange} />

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Monthly Financials - 2 Columns */}
                <div className="lg:col-span-2 transform transition-all hover:scale-[1.005] duration-300">
                    <MonthlyPerformanceChart customDateRange={customDateRange} />
                </div>
                {/* Income Source - 1 Column */}
                <div className="lg:col-span-1 transform transition-all hover:scale-[1.005] duration-300">
                    <IncomeSourceChart customDateRange={customDateRange} />
                </div>
            </div>

            {/* Secondary Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Channel Performance */}
                <div className="transform transition-all hover:scale-[1.005] duration-300">
                    <ChannelPerformanceBarChart customDateRange={customDateRange} />
                </div>
                {/* Operational Expenses */}
                <div className="transform transition-all hover:scale-[1.005] duration-300">
                    <OperationalExpensesChart customDateRange={customDateRange} />
                </div>
            </div>

            {/* Recent Transactions Section */}
            <RecentTransactions customDateRange={customDateRange} />
        </div>
    );
}
