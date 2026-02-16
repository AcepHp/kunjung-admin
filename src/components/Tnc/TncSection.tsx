'use client';

import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import type { TncData } from '@/data/TncData';

type Props = {
    data: TncData;
};

export default function TncSection({ data }: Props) {
    return (
        <section className="overflow-hidden rounded-xl border border-[#E0D4C6] bg-white">
            {/* HEADER */}
            <div className="flex items-center justify-between bg-[#FBF6F0] px-6 py-4">
                <div>
                    <h2 className="text-sm font-semibold text-gray-800">
                        Terms & Conditions content
                    </h2>
                    <p className="text-xs text-gray-500">
                        Manage your Terms & Conditions, Refund Policy, and Agreement Text.
                    </p>
                </div>

                <Link href="/beranda/terms-refund/edit">
                    <button className="inline-flex items-center gap-2 rounded-md border border-[#E2C9B4] px-3 py-1.5 text-xs font-medium text-[#7A3E2C] hover:bg-[#F7EBE1] transition">
                        <PencilSquareIcon className="h-4 w-4" />
                        Edit
                    </button>
                </Link>
            </div>

            {/* CONTENT */}
            <div className="space-y-6 px-6 py-6">
                {/* TRANSACTION TERMS */}
                <div className="rounded-lg border border-[#EFE3D7] bg-[#FAF4EC]/40 p-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-800">
                        Transaction Terms
                    </h3>
                    <div
                        className="prose prose-sm max-w-none text-gray-700 [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-5 [&_ul]:pl-5"
                        dangerouslySetInnerHTML={{
                            __html: data.transactionTerms,
                        }}
                    />
                </div>

                {/* REFUND POLICY */}
                <div className="rounded-lg border border-[#EFE3D7] bg-[#FAF4EC]/40 p-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-800">
                        Refund & Cancellation Policy
                    </h3>
                    <div
                        className="prose prose-sm max-w-none text-gray-700 [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-5 [&_ul]:pl-5"
                        dangerouslySetInnerHTML={{
                            __html: data.refundCancellationPolicy,
                        }}
                    />
                </div>

                {/* AGREEMENT */}
                <div className="rounded-lg border border-[#EFE3D7] bg-[#FAF4EC]/40 p-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-800">
                        Agreement Text
                    </h3>
                    <div
                        className="prose prose-xs max-w-none text-gray-700 [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-5 [&_ul]:pl-5"
                        dangerouslySetInnerHTML={{
                            __html: data.agreementText,
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
