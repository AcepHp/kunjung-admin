import React from 'react';

export default function BrandEthosFormSkeleton() {
    return (
        <div className="mx-auto max-w-9xl bg-white rounded-3xl border border-[#E9D6C6] overflow-hidden shadow-sm animate-pulse">
            <div className="px-8 py-5 bg-[#FAF4EC] border-b border-[#E9D6C6] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EFE3D7]" />
                    <div className="h-6 w-32 rounded bg-[#EFE3D7]" />
                </div>
            </div>
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* LEFT: Forms */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="h-4 w-24 rounded bg-[#EFE3D7]" />
                            <div className="w-full h-12 rounded-xl bg-[#FAF4EC]" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-32 rounded bg-[#EFE3D7]" />
                            <div className="w-full h-40 rounded-xl bg-[#FAF4EC]" />
                        </div>
                        <div className="space-y-2 pt-2">
                            <div className="h-4 w-40 rounded bg-[#EFE3D7]" />
                            <div className="w-full h-10 rounded-xl bg-[#FAF4EC]" />
                        </div>
                    </div>

                    {/* RIGHT: Preview */}
                    <div className="space-y-4">
                        <div className="h-4 w-24 rounded bg-[#EFE3D7]" />
                        <div className="aspect-video w-full rounded-2xl bg-[#FAF4EC]" />
                        <div className="h-3 w-48 mx-auto rounded bg-[#EFE3D7]" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 border-t border-[#FAF4EC] mt-10 pt-6">
                    <div className="h-10 w-24 rounded-full bg-[#EFE3D7]" />
                    <div className="h-10 w-32 rounded-full bg-[#EFE3D7]" />
                </div>
            </div>
        </div>
    );
}
