import React from 'react';

export default function BrandStorySkeleton() {
    return (
        <section className="space-y-8 animate-pulse">
            {/* ===== BRAND TEXT PREVIEW ===== */}
            <div className="relative rounded-xl border border-[#E0D4C6] bg-white p-6">
                <div className="absolute right-4 top-4 h-8 w-24 bg-gray-200 rounded"></div>

                <div className="space-y-5 max-w-3xl">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-6 w-1/2 bg-gray-200 rounded"></div>

                    <div className="space-y-3">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>

            {/* ===== IMAGE TABLE ===== */}
            <div className="rounded-xl border border-[#E0D4C6] bg-white">
                <div className="border-b border-[#EFE3D7] px-6 py-4">
                    <div className="h-5 w-40 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-56 bg-gray-200 rounded"></div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#FAF4EC]">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                </th>
                                <th className="px-6 py-3 text-center">
                                    <div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#EFE3D7]">
                            {[1, 2].map((i) => (
                                <tr key={i}>
                                    <td className="px-6 py-4">
                                        <div className="h-16 w-24 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="h-8 w-20 bg-gray-200 rounded mx-auto"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
