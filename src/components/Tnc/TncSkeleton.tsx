import React from 'react';

export default function TncSkeleton() {
    return (
        <section className="overflow-hidden rounded-xl border border-[#E0D4C6] bg-white animate-pulse">
            {/* HEADER */}
            <div className="flex items-center justify-between bg-[#FBF6F0] px-6 py-4">
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-3 w-64 bg-gray-200 rounded"></div>
                </div>

                <div className="h-8 w-20 bg-gray-200 rounded border border-gray-300"></div>
            </div>

            {/* CONTENT */}
            <div className="space-y-6 px-6 py-6">

                {/* TRANSACTION TERMS */}
                <div className="rounded-lg border border-[#EFE3D7] bg-[#FAF4EC]/40 p-4 space-y-3">
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-3 w-full bg-gray-200 rounded"></div>
                        <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                        <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* REFUND POLICY */}
                <div className="rounded-lg border border-[#EFE3D7] bg-[#FAF4EC]/40 p-4 space-y-3">
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-3 w-full bg-gray-200 rounded"></div>
                        <div className="h-3 w-full bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* AGREEMENT */}
                <div className="rounded-lg border border-[#EFE3D7] bg-[#FAF4EC]/40 p-4 space-y-3">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                </div>
            </div>
            {/* ACTION (Only for Edit page really, but good to have footer placeholder if needed, though view doesn't have footer) */}
            <div className="h-2 bg-[#FBF6F0]"></div>
        </section>
    );
}
