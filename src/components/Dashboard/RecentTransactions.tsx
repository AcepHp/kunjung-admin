'use client';

import React from 'react';
import { CustomDateRange } from './DateRangeFilter';

interface Transaction {
    id: string;
    customer: string;
    type: 'Stay' | 'Event' | 'Shoot';
    amount: number;
    status: 'Completed' | 'Pending' | 'Cancelled';
    date: string;
}

interface RecentTransactionsProps {
    customDateRange?: CustomDateRange;
}

export default function RecentTransactions({ customDateRange }: RecentTransactionsProps) {
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
            const timer = setTimeout(() => setIsLoading(false), 400);
            return () => clearTimeout(timer);
        }
    }, [seed]);

    // Mock transactions that change slightly based on seed
    const transactions: Transaction[] = [
        { id: 'TX-1001', customer: 'Budi Santoso', type: 'Stay', amount: 3500000 + (seed * 1000), status: 'Completed', date: '2024-01-28' },
        { id: 'TX-1002', customer: 'Siti Aminah', type: 'Event', amount: 12000000 - (seed * 500), status: 'Completed', date: '2024-01-27' },
        { id: 'TX-1003', customer: 'John Doe', type: 'Shoot', amount: 5000000 + (seed * 2000), status: 'Pending', date: '2024-01-26' },
        { id: 'TX-1004', customer: 'Linda Wijaya', type: 'Stay', amount: 4200000 + (seed * 1500), status: 'Completed', date: '2024-01-25' },
        { id: 'TX-1005', customer: 'Robert Fox', type: 'Shoot', amount: 2800000 - (seed * 300), status: 'Cancelled', date: '2024-01-24' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-100 text-emerald-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            case 'Cancelled': return 'bg-rose-100 text-rose-700';
            default: return 'bg-stone-100 text-stone-700';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Stay': return 'text-blue-600';
            case 'Event': return 'text-purple-600';
            case 'Shoot': return 'text-orange-600';
            default: return 'text-stone-600';
        }
    };

    return (
        <div className={`mt-8 bg-white rounded-3xl shadow-sm border border-[#F3C7A4]/30 overflow-hidden transition-all duration-500 ${isLoading ? 'opacity-30 blur-sm scale-[0.995]' : 'opacity-100'}`}>
            <div className="p-8 border-b border-[#F3C7A4]/20 flex justify-between items-center bg-[#faf8f3]/30">
                <div>
                    <h3 className="text-xl font-bold text-stone-800">Recent Transactions</h3>
                    <p className="text-sm text-stone-500 mt-1">Latest financial activities from all channels</p>
                </div>
                <button className="text-sm font-bold text-[#7A3E2C] hover:text-[#8B4A36] transition-colors bg-white px-4 py-2 rounded-xl border border-[#F3C7A4]/30 shadow-sm">
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#faf8f3]/50 text-stone-400 text-[10px] uppercase tracking-widest font-bold">
                            <th className="px-8 py-4">Transaction ID</th>
                            <th className="px-8 py-4">Customer</th>
                            <th className="px-8 py-4">Category</th>
                            <th className="px-8 py-4">Date</th>
                            <th className="px-8 py-4">Amount</th>
                            <th className="px-8 py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-[#faf8f3]/40 transition-colors group">
                                <td className="px-8 py-5 text-sm font-mono font-medium text-stone-500">{tx.id}</td>
                                <td className="px-8 py-5 text-sm font-bold text-stone-800">{tx.customer}</td>
                                <td className={`px-8 py-5 text-sm font-semibold ${getTypeColor(tx.type)}`}>
                                    {tx.type}
                                </td>
                                <td className="px-8 py-5 text-sm text-stone-500 font-medium">{tx.date}</td>
                                <td className="px-8 py-5 text-sm font-extrabold text-[#7A3E2C]">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(tx.amount)}
                                </td>
                                <td className="px-8 py-5 text-center">
                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(tx.status)} shadow-sm`}>
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
