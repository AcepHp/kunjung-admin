'use client';

import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default function TncEmptyState() {
    return (
        <section className="overflow-hidden rounded-xl border border-[#E0D4C6] bg-white">
            

            {/* EMPTY STATE CONTENT */}
            <div className="flex flex-col items-center justify-center px-6 py-16">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FBF6F0]">
                    <PlusCircleIcon className="h-8 w-8 text-[#7A3E2C]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    No Terms & Conditions Yet
                </h3>
                <p className="mb-6 max-w-md text-center text-sm text-gray-500">
                    You haven&apos;t added any Terms & Conditions policy data yet.
                    Click the button below to create your first policy.
                </p>
                <Link href="/beranda/terms-refund/add">
                    <button className="inline-flex items-center gap-2 rounded-md bg-[#7A3E2C] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5C2D20] transition">
                        <PlusCircleIcon className="h-5 w-5" />
                        Add Terms & Conditions
                    </button>
                </Link>
            </div>
        </section>
    );
}
