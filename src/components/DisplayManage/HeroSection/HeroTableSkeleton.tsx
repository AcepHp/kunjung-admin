import React from 'react';

export default function HeroTableSkeleton() {
    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm animate-pulse">
            {/* Header + Search Skeleton */}
            <div className="flex flex-col gap-3 border-b border-[#EFE3D7] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="h-5 w-24 bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded-full"></div>
                </div>

                <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
                    <div className="h-10 w-44 bg-gray-200 rounded-lg"></div>
                    <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-[#FAF4EC]">
                        <tr>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <th key={i} className="px-6 py-3">
                                    <div className="h-4 w-12 bg-gray-300 rounded mx-auto sm:mx-0"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#EFE3D7]">
                        {[1, 2, 3, 4].map((row) => (
                            <tr key={row}>
                                <td className="px-6 py-4">
                                    <div className="h-4 w-4 bg-gray-200 rounded mx-auto sm:mx-0"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="mx-auto h-12 w-20 bg-gray-200 rounded-lg"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="mx-auto sm:mx-0 h-5 w-16 bg-gray-200 rounded-full"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <div className="h-8 w-16 bg-gray-200 rounded-md"></div>
                                        <div className="h-8 w-16 bg-gray-200 rounded-md"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Skeleton */}
            <div className="border-t border-[#EFE3D7] px-6 py-4 flex items-center justify-between">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="flex gap-1">
                    <div className="h-8 w-10 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-10 bg-gray-200 rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
