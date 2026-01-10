'use client';

import React from 'react';
import { dashboardKunjungData } from '@/data/dashboardKunjungData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

// Earthy Palette
const COLORS = ['#7A3E2C', '#F59E0B', '#14B8A6', '#8B4A36', '#4B5563'];

export default function ChannelPerformanceBarChart() {
    const { channelPerformance } = dashboardKunjungData;

    const chartData = channelPerformance.data.map(item => ({
        name: item.channel,
        revenue: item.revenue,
    }));

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F3C7A4]/30 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-stone-800">{channelPerformance.title}</h3>
                    <p className="text-sm text-stone-500 mt-1">{channelPerformance.subtitle}</p>
                </div>
                
            </div>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={chartData}
                        margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                        barCategoryGap={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E7E5E4" opacity={0.5} />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={100}
                            tick={{ fill: '#57534E', fontSize: 13, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: '#faf8f3', opacity: 0.8 }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white px-4 py-3 shadow-xl rounded-xl border border-[#F3C7A4]/30 ring-1 ring-black/5">
                                            <p className="font-bold text-stone-800 mb-1">{payload[0].payload.name}</p>
                                            <p className="text-sm font-semibold text-[#7A3E2C]">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(payload[0].value as number)}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="revenue" radius={[0, 6, 6, 0]} barSize={24}>
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
