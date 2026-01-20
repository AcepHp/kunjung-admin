import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { HeroSectionApiResponse } from '@/services/HeroSectionService';

type Props = {
    data: HeroSectionApiResponse;
};

export default function HeroCopywriting({ data }: Props) {
    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white p-5 sm:p-6 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <span className="inline-flex items-center rounded-full bg-[#F5E4D6] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#7A3E2C]">
                        Homepage Hero
                    </span>
                </div>

                <Link href="/beranda/display/hero/edit-hero">
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#E2C9B4] bg-white px-3 py-1.5 text-xs font-medium text-[#7A3E2C] hover:bg-[#F7EBE1] hover:border-[#D3B69B] transition-colors"
                    >
                        <PencilSquareIcon className="h-4 w-4" />
                        <span>Edit</span>
                    </button>
                </Link>

            </div>

            {/* Content */}
            <div className="space-y-4">
                {/* Headline */}
                <div>
                    <label className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                        Headline
                    </label>
                    <p className="mt-1 text-sm sm:text-base font-semibold text-[#2E2620]">
                        {data.headline}
                    </p>
                </div>

                {/* Description */}
                <div>
                    <label className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                        Description
                    </label>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-gray-700">
                        {data.description}
                    </p>
                </div>

                {/* Signature */}
                <div className="pt-2 border-t border-[#F0E0D1]">
                    <label className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                        Signature
                    </label>
                    <p className="mt-1 text-sm text-[#7A3E2C] italic">
                        {data.signature}
                    </p>
                </div>
            </div>
        </section>
    );
}
