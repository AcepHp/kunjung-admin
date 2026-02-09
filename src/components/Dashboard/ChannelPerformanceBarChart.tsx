'use client';

import React from 'react';
import { dashboardKunjungData } from '@/data/dashboardKunjungData';
import { CustomDateRange } from './DateRangeFilter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const COLORS = ['#7A3E2C', '#D97706', '#059669', '#0891B2', '#7C3AED'];

interface ChannelPerformanceBarChartProps {
    customDateRange?: CustomDateRange;
}

export default function ChannelPerformanceBarChart({ customDateRange }: ChannelPerformanceBarChartProps) {
    const { channelPerformance } = dashboardKunjungData;
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
            const timer = setTimeout(() => setIsLoading(false), 500);
            return () => clearTimeout(timer);
        }
    }, [seed]);

    // Use monthly data by default
    const chartData = channelPerformance.data.map((item, idx) => ({
        name: item.channel,
        revenue: item.revenue * (1 + (seed / 4000) * (idx % 2 === 0 ? 1 : -1)),
    }));

    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-[#F3C7A4]/30 h-full flex flex-col transition-all duration-500 ${isLoading ? 'opacity-30 blur-md grayscale-[0.5] scale-[0.99]' : 'opacity-100'}`}>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xl font-bold text-stone-800">Channel Performance</h3>
                    <p className="text-sm text-stone-500 mt-1">Revenue by booking platform</p>
                </div>
                <button className="p-2 hover:bg-[#faf8f3] rounded-lg transition-colors text-stone-400">
                    <ArrowPathIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F3C7A4" opacity={0.3} horizontal={true} vertical={false} />
                        <XAxis
                            type="number"
                            tick={{ fill: '#78716C', fontSize: 12 }}
                            tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
                            stroke="#E7E5E4"
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fill: '#57534E', fontSize: 13, fontWeight: 500 }}
                            stroke="#E7E5E4"
                            width={90}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white p-3 rounded-lg shadow-xl border border-[#F3C7A4]/30 ring-1 ring-black/5">
                                            <p className="font-semibold text-stone-800 mb-1">{payload[0].payload.name}</p>
                                            <p className="text-sm font-bold text-[#7A3E2C]">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(payload[0].value as number)}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="revenue" radius={[0, 8, 8, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
