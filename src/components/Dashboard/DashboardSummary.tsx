import React from 'react';
import { dashboardKunjungData } from '@/data/dashboardKunjungData';
import {
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    BanknotesIcon,
    CreditCardIcon,
    ChartBarIcon,
    BuildingOffice2Icon
} from '@heroicons/react/24/solid';

const SummaryCard = ({
    title,
    value,
    growth,
    change,
    isCurrency = false,
    isPercent = false,
    icon: Icon,
    colorClass
}: {
    title: string;
    value: number;
    growth?: number;
    change?: number;
    isCurrency?: boolean;
    isPercent?: boolean;
    icon: React.ElementType;
    colorClass: string;
}) => {
    const isPositive = (growth && growth > 0) || (change && change > 0);
    const percentage = growth || change;
    const isNeutral = percentage === 0 || percentage === undefined;

    const formatValue = (val: number) => {
        if (isCurrency) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
        }
        return val.toLocaleString('en-US');
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F3C7A4]/30 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            {/* Decorative background element */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${colorClass}`}></div>

            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${colorClass} shadow-md`}>
                    <Icon className="w-6 h-6 text-[#fcfbf7]" />
                </div>
                {!isNeutral && percentage !== undefined && (
                    <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${percentage > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {percentage > 0 ? <ArrowTrendingUpIcon className="w-3 h-3 mr-1" /> : <ArrowTrendingDownIcon className="w-3 h-3 mr-1" />}
                        {Math.abs(percentage)}%
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-stone-500 text-sm font-medium mb-1">{title}</h3>
                <div className="text-2xl font-bold text-stone-800 tracking-tight">
                    {formatValue(value)}{isPercent ? '%' : ''}
                </div>
            </div>
        </div>
    );
};

export default function DashboardSummary() {
    const { summary } = dashboardKunjungData;
    const { totalIncome, totalOutcome, netProfit, occupancyRate } = summary as any;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SummaryCard
                title="Total Income"
                value={totalIncome.value}
                growth={totalIncome.growth}
                isCurrency
                icon={BanknotesIcon}
                colorClass="bg-emerald-600"
            />
            <SummaryCard
                title="Total Outcome"
                value={totalOutcome.value}
                change={totalOutcome.change}
                isCurrency
                icon={CreditCardIcon}
                colorClass="bg-rose-500"
            />
            <SummaryCard
                title="Net Profit"
                value={netProfit.value}
                growth={netProfit.growth}
                isCurrency
                icon={ChartBarIcon}
                colorClass="bg-[#7A3E2C]"
            />
            <SummaryCard
                title="Occupancy Rate"
                value={occupancyRate.value}
                growth={occupancyRate.growth}
                isPercent
                icon={BuildingOffice2Icon}
                colorClass="bg-amber-500"
            />
        </div>
    );
}
