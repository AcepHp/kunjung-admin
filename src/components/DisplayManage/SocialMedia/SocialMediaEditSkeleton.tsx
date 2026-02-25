import React from 'react';

export default function SocialMediaEditSkeleton() {
    return (
        <div className="rounded-xl border border-[#E0D4C6] bg-white p-6 space-y-6 animate-pulse">
            {/* ===== FORM ===== */}
            <div className="grid grid-cols-1 gap-5">
                {/* PLATFORM NAME */}
                <div className="space-y-1.5">
                    <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                    <div className="h-10 w-full bg-gray-200 rounded border border-gray-200"></div>
                </div>

                {/* URL */}
                <div className="space-y-1.5">
                    <div className="h-4 w-12 bg-gray-200 rounded mb-1"></div>
                    <div className="h-10 w-full bg-gray-200 rounded border border-gray-200"></div>
                    <div className="h-3 w-40 bg-gray-200 rounded mt-1"></div>
                </div>
            </div>

            {/* ===== ACTION ===== */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-50 mt-4">
                <div className="h-9 w-20 bg-gray-200 rounded"></div>
                <div className="h-9 w-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}
