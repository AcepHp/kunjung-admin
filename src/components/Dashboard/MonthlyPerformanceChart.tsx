'use client';

import React from 'react';
import { dashboardKunjungData } from '@/data/dashboardKunjungData';
import { CustomDateRange } from './DateRangeFilter';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

interface MonthlyPerformanceChartProps {
    customDateRange?: CustomDateRange;
}

export default function MonthlyPerformanceChart({ customDateRange }: MonthlyPerformanceChartProps) {
    const [isLoading, setIsLoading] = React.useState(false);

    const getSeed = () => {
        if (!customDateRange?.startDate || !customDateRange?.endDate) return 0;
        return (customDateRange.startDate.getTime() + customDateRange.endDate.getTime()) % 1000;
    };

    const seed = getSeed();

    // Simulate loading
    React.useEffect(() => {
        if (customDateRange?.startDate && customDateRange?.endDate) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 700);
            return () => clearTimeout(timer);
        }
    }, [seed]);

    // Use monthly data by default
    const financialData = dashboardKunjungData.monthlyFinancials;

    const chartData = financialData.labels.map((label, index) => {
        // Unique trend for each day/range
        const var1 = 1 + (seed / 1000) * Math.sin(index + seed);
        const var2 = 1 + (seed / 1500) * Math.cos(index - seed);

        return {
            name: label,
            income: Math.round(financialData.income[index] * var1),
            outcome: Math.round(financialData.outcome[index] * var2),
        };
    });

    const title = 'Financial Performance';

    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-[#F3C7A4]/30 h-full flex flex-col transition-all duration-700 ${isLoading ? 'opacity-30 blur-md pointer-events-none scale-[0.99]' : 'opacity-100'}`}>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xl font-bold text-stone-800">{title}</h3>
                    <p className="text-sm text-stone-500 mt-1">Income vs Outcome comparison</p>
                </div>
                <button className="p-2 hover:bg-[#faf8f3] rounded-lg transition-colors text-stone-400">
                    <EllipsisHorizontalIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 w-full min-h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorOutcome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#78716C', fontSize: 12, fontWeight: 500 }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#78716C', fontSize: 12, fontWeight: 500 }}
                            tickFormatter={(value) => `${value / 1000000}M`}
                        />
                        <Tooltip
                            cursor={{ stroke: '#A8A29E', strokeDasharray: '4 4' }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white p-4 rounded-xl shadow-xl border border-[#F3C7A4]/30 ring-1 ring-black/5">
                                            <p className="text-sm font-medium text-stone-500 mb-2">{label}</p>
                                            {payload.map((entry: any, index: number) => (
                                                <div key={index} className="flex items-center gap-3 mb-1 last:mb-0">
                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                                    <span className="text-sm font-semibold text-stone-700 capitalize w-16">{entry.name}</span>
                                                    <span className="text-sm font-bold text-stone-900">
                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(entry.value)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend
                            verticalAlign="top"
                            align="right"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{ top: -20, right: 0, color: '#57534E' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#10B981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                            name="Income"
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="outcome"
                            stroke="#F43F5E"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorOutcome)"
                            name="Outcome"
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
