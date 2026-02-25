'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

type TableSearchProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

export default function TableSearch({
    value,
    onChange,
    placeholder,
    className,
}: TableSearchProps) {
    return (
        <div className={['relative', className].filter(Boolean).join(' ')}>
            <MagnifyingGlassIcon
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder ?? 'Search...'}
                className="w-full rounded-full border border-[#E2C9B4] bg-white px-3 py-1.5 pl-9 text-xs sm:text-sm text-[#2E2620] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
            />
        </div>
    );
}
