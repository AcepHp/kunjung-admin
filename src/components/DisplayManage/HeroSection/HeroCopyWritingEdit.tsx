'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { HeroSectionApiResponse } from '@/services/HeroSectionService';

type Props = {
    data: HeroSectionApiResponse;
    onCancel?: () => void;
    onSave?: (payload: {
        headline: string;
        description: string;
        signature: string;
    }) => void;
};

export default function HeroCopywritingEdit({
    data,
    onCancel,
    onSave,
}: Props) {
    const [headline, setHeadline] = useState(data.headline);
    const [description, setDescription] = useState(data.description);
    const [signature, setSignature] = useState(data.signature);

    useEffect(() => {
        setHeadline(data.headline);
        setDescription(data.description);
        setSignature(data.signature);
    }, [data]);

    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white p-5 sm:p-6 shadow-sm">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-semibold text-[#2E2620]">
                        Edit Hero Copywriting
                    </h2>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Update hero headline and description shown on homepage
                    </p>
                </div>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Form */}
            <div className="space-y-4">
                {/* Headline */}
                <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-500">
                        Headline
                    </label>
                    <input
                        type="text"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#2E2620] focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                        placeholder="Hero headline"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-500">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="mt-1 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                        placeholder="Hero description"
                    />
                </div>

                {/* Signature */}
                <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-500">
                        Signature
                    </label>
                    <input
                        type="text"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#7A3E2C] focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                        placeholder="Signature"
                    />
                </div>
            </div>

            {/* Footer actions */}
            <div className="mt-6 flex justify-end gap-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-md border border-gray-300 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="button"
                    onClick={() =>
                        onSave?.({
                            headline,
                            description,
                            signature,
                        })
                    }
                    className="rounded-md bg-[#7A3E2C] px-4 py-2 text-xs font-medium text-white hover:bg-[#5C2D20] transition"
                >
                    Save Changes
                </button>
            </div>
        </section>
    );
}
