'use client';

import React from 'react';
import { dashboardKunjungData } from '@/data/dashboardKunjungData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

// Earthy Kunjung Palette
const COLORS = ['#7A3E2C', '#D97706', '#059669', '#3B82F6', '#64748B'];

export default function IncomeSourceChart() {
    const { channelPerformance } = dashboardKunjungData;
    const chartData = channelPerformance.data.map(item => ({
        name: item.channel,
        value: item.revenue,
    }));

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F3C7A4]/30 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-stone-800">Income Source</h3>
                    <p className="text-sm text-stone-500 mt-1">{channelPerformance.subtitle}</p>
                </div>
                <button className="p-2 hover:bg-[#faf8f3] rounded-lg transition-colors text-stone-400">
                    <EllipsisHorizontalIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 min-h-[350px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                            cornerRadius={6}
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white p-3 rounded-lg shadow-xl border border-[#F3C7A4]/30 text-center ring-1 ring-black/5">
                                            <p className="font-semibold text-stone-800 mb-1">{payload[0].name}</p>
                                            <p className="text-sm font-bold text-[#7A3E2C]">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(payload[0].value as number)}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            wrapperStyle={{ paddingTop: "24px", fontSize: "12px", fontWeight: 500, color: "#57534E" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text Overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                    <p className="text-xs font-medium text-stone-400 uppercase tracking-widest">Total</p>
                    <p className="text-lg font-bold text-stone-800">5 Channels</p>
                </div>
            </div>
        </div>
    );
}
