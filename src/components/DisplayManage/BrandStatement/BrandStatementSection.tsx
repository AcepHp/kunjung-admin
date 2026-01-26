import Link from 'next/link';
import { PencilSquareIcon, PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { BrandStatementApiResponse } from '@/services/BrandStatementService';

type Props = {
    data: BrandStatementApiResponse | null;
};

export default function BrandStatementSection({ data }: Props) {
    if (!data || !data.titleStatement) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E0D4C6] bg-white py-16 text-center shadow-sm">
                <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-lg font-semibold text-[#2E2620]">No Brand Statement Found</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-sm px-6">
                    Start by defining your brand statement to tell visitors what you're all about.
                </p>
                <Link href="/beranda/display/brand-statement/add" className="mt-8">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#7A3E2C] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all uppercase tracking-widest"
                    >
                        <PlusIcon className="h-5 w-5" />
                        <span>Add Brand Statement</span>
                    </button>
                </Link>
            </div>
        );
    }

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