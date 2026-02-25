'use client';

import React from 'react';
import { dashboardKunjungData } from '@/data/dashboardKunjungData';
import { CustomDateRange } from './DateRangeFilter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface OperationalExpensesChartProps {
    customDateRange?: CustomDateRange;
}

export default function OperationalExpensesChart({ customDateRange }: OperationalExpensesChartProps) {
    const { operationalExpenses } = dashboardKunjungData;
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
            const timer = setTimeout(() => setIsLoading(false), 800);
            return () => clearTimeout(timer);
        }
    }, [seed]);

    // Use monthly data by default
    const chartData = operationalExpenses.data.map((item, index) => {
        const v = 1 + (seed / 2000) * Math.sin(index + seed);
        return {
            name: `M${index + 1}`,
            maintenance: Math.round(item.maintenance * 4.33 * v),
            operations: Math.round(item.operations * 4.33 * (1 + (seed / 3000))),
            laundry: Math.round(item.laundry * 4.33 * (1 - (seed / 5000))),
            staff: Math.round(item.staff * 4.33 * (1 + (seed / 8000))),
        };
    });

    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-[#F3C7A4]/30 h-full flex flex-col transition-all duration-700 ${isLoading ? 'opacity-30 blur-md scale-[0.98]' : 'opacity-100'}`}>
            <div className="mb-6">
                <h3 className="text-xl font-bold text-stone-800">Operational Expenses</h3>
                <p className="text-sm text-stone-500 mt-1">Monthly breakdown by category</p>
            </div>

            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F3C7A4" opacity={0.3} vertical={false} />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#78716C', fontSize: 12 }}
                            stroke="#E7E5E4"
                        />
                        <YAxis
                            tick={{ fill: '#78716C', fontSize: 12 }}
                            tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
                            stroke="#E7E5E4"
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white p-4 rounded-lg shadow-xl border border-[#F3C7A4]/30 ring-1 ring-black/5">
                                            <p className="font-semibold text-stone-800 mb-2">{label}</p>
                                            {payload.map((entry, index) => (
                                                <div key={index} className="flex items-center justify-between gap-4 mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                                        <span className="text-sm text-stone-600 capitalize">{entry.name}</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-[#7A3E2C]">
                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(entry.value as number)}
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
                            wrapperStyle={{ paddingTop: "20px", fontSize: "12px", fontWeight: 500 }}
                            iconType="circle"
                            formatter={(value) => <span className="text-stone-600 capitalize">{value}</span>}
                        />
                        <Bar dataKey="maintenance" stackId="a" fill="#7A3E2C" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="operations" stackId="a" fill="#D97706" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="laundry" stackId="a" fill="#059669" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="staff" stackId="a" fill="#0891B2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
