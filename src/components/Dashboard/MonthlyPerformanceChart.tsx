'use client';

import React from 'react';
import { dashboardKunjungData } from '@/data/dashboardKunjungData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

export default function MonthlyPerformanceChart() {
    const { monthlyFinancials } = dashboardKunjungData;

    const chartData = monthlyFinancials.labels.map((label, index) => ({
        name: label,
        income: monthlyFinancials.income[index],
        outcome: monthlyFinancials.outcome[index],
    }));

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F3C7A4]/30 h-full flex flex-col">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xl font-bold text-stone-800">Financial Performance</h3>
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
