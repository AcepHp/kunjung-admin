import React from 'react';

export default function SocialMediaSkeleton() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#E6D8C9] bg-white shadow-sm animate-pulse">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-[#FBF6F0]">
                        <tr>
                            <th className="px-6 py-4 text-left">
                                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                            </th>
                            <th className="px-6 py-4 text-left">
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            </th>
                            <th className="px-6 py-4 text-center">
                                <div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE3D7]">
                        {[1, 2, 3, 4].map((item) => (
                            <tr key={item} className="bg-white">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="inline-flex h-8 w-20 bg-gray-200 rounded-lg mx-auto"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
