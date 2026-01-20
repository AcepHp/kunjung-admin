import React from 'react';

export default function BrandStatementEditSkeleton() {
    return (
        <div className="w-full rounded-xl border border-[#E0D4C6] bg-white p-6 space-y-6 animate-pulse">
            {/* TITLE */}
            <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded border border-gray-300"></div>
            </div>

            {/* SUBTITLE */}
            <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-16 w-full bg-gray-200 rounded border border-gray-300"></div>
            </div>

            {/* LOCATION */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-20 w-full bg-gray-200 rounded border border-gray-300"></div>
                </div>

                <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-20 w-full bg-gray-200 rounded border border-gray-300"></div>
                </div>
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-3 pt-4">
                <div className="h-9 w-20 bg-gray-200 rounded"></div>
                <div className="h-9 w-24 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}
