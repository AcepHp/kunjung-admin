import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { BrandStatementApiResponse } from '@/services/BrandStatementService';

type Props = {
    data: BrandStatementApiResponse;
};

export default function BrandStatementSection({ data }: Props) {
    return (
        <section className="relative w-full min-h-[400px] rounded-2xl bg-[#7A3E2B] p-10 text-white overflow-hidden">
            {/* 🔧 Edit Button */}
            <div className="absolute top-4 right-4">
                <Link
                    href="/beranda/display/brand-statement/edit"
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition"
                >
                    <PencilSquareIcon className="h-4 w-4" />
                    Edit
                </Link>
            </div>

            {/* Content */}
            <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
                    {data.titleStatement}
                </h1>

                <p className="text-sm md:text-base text-white/90 max-w-md">
                    {data.subTitleStatement}
                </p>
            </div>

            {/* Footer Location */}
            <div className="absolute bottom-6 left-6 text-white/30 text-xl font-semibold">
                {data.locationStatementLeft}
            </div>

            <div className="absolute bottom-6 right-6 text-white/30 text-xl font-semibold">
                {data.locationStatementRight}
            </div>
        </section>
    );
}