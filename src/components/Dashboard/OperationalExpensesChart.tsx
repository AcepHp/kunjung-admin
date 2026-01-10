'use client';

import React from 'react';
import { dashboardKunjungData } from '@/data/dashboardKunjungData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function OperationalExpensesChart() {
    const { operationalExpenses } = dashboardKunjungData;
    const { data: chartData } = operationalExpenses;

    const formatYAxis = (tickItem: number) => {
        return (tickItem / 1000000).toString();
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F3C7A4]/30 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-stone-800">{operationalExpenses.title}</h3>
                    <p className="text-sm text-stone-500 mt-1">{operationalExpenses.subtitle}</p>
                </div>
            </div>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
                        barSize={48}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                        <XAxis
                            dataKey="week"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#78716C', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#78716C', fontSize: 12, fontWeight: 500 }}
                            tickFormatter={formatYAxis}
                            label={{ value: 'Millions (Rp)', angle: -90, position: 'insideLeft', style: { fill: '#A8A29E', fontSize: 10 } }}
                        />
                        <Tooltip
                            cursor={{ fill: '#faf8f3', opacity: 0.8 }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white p-4 rounded-xl shadow-xl border border-[#F3C7A4]/30 ring-1 ring-black/5">
                                            <p className="font-bold text-stone-800 mb-2">{label}</p>
                                            {payload.map((entry: any, index: number) => (
                                                <div key={index} className="flex justify-between items-center gap-4 mb-1 last:mb-0 text-sm">
                                                    <span className="text-stone-600 flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                                        {entry.name}
                                                    </span>
                                                    <span className="font-semibold text-stone-900">
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
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{ paddingTop: '24px', fontSize: '13px', fontWeight: 500, color: '#57534E' }}
                        />
                        {/* Earthy Stacked Palette */}
                        <Bar dataKey="operations" stackId="a" fill="#78716C" name="Operations" />
                        <Bar dataKey="maintenance" stackId="a" fill="#D97706" name="Maintenance" />
                        <Bar dataKey="laundry" stackId="a" fill="#14B8A6" name="Laundry" />
                        <Bar dataKey="staff" stackId="a" fill="#7A3E2C" name="Staff" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
