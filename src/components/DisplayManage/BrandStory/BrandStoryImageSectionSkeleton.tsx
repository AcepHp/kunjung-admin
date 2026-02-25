export default function BrandStoryImageSectionSkeleton() {
    return (
        <div className="rounded-xl border border-[#E0D4C6] bg-white animate-pulse">
            <div className="border-b border-[#EFE3D7] px-6 py-4">
                <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-48 bg-gray-200 rounded"></div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-[#FAF4EC]">
                        <tr>
                            <th className="px-6 py-3 text-left">
                                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                            </th>
                            <th className="px-6 py-3 text-center">
                                <div className="h-4 w-16 bg-gray-300 rounded mx-auto"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE3D7]">
                        {[1, 2, 3].map((item) => (
                            <tr key={item}>
                                <td className="px-6 py-4">
                                    <div className="h-16 w-24 bg-gray-200 rounded-lg"></div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="h-8 w-16 bg-gray-200 rounded mx-auto"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
