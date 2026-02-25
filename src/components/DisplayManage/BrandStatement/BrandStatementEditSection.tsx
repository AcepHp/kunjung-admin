'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { BrandStatementApiResponse, UpdateBrandStatementPayload } from '@/services/BrandStatementService';

type Props = {
    initialData: BrandStatementApiResponse;
    onCancel: () => void;
    onSave: (data: UpdateBrandStatementPayload) => void;
};

export default function BrandStatementEditSection({
    initialData,
    onCancel,
    onSave,
}: Props) {
    const [form, setForm] = useState<UpdateBrandStatementPayload>({
        titleStatement: initialData.titleStatement || "",
        subTitleStatement: initialData.subTitleStatement || "",
        locationStatementLeft: initialData.locationStatementLeft || "",
        locationStatementRight: initialData.locationStatementRight || "",
    });

    useEffect(() => {
        setForm({
            titleStatement: initialData.titleStatement || "",
            subTitleStatement: initialData.subTitleStatement || "",
            locationStatementLeft: initialData.locationStatementLeft || "",
            locationStatementRight: initialData.locationStatementRight || "",
        });
    }, [initialData]);

    const handleChange = (
        field: keyof UpdateBrandStatementPayload,
        value: string
    ) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white p-5 sm:p-6 shadow-sm">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-semibold text-[#2E2620]">
                        Edit Brand Statement
                    </h2>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Update the statement title, subtitle, and location details
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
                {/* TITLE */}
                <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-500">
                        Title
                    </label>
                    <input
                        type="text"
                        value={form.titleStatement}
                        onChange={(e) =>
                            handleChange('titleStatement', e.target.value)
                        }
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#2E2620] focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                        placeholder="e.g. A Sanctuary for The Soul"
                    />
                </div>

                {/* SUBTITLE */}
                <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-500">
                        Subtitle
                    </label>
                    <textarea
                        rows={2}
                        value={form.subTitleStatement}
                        onChange={(e) =>
                            handleChange('subTitleStatement', e.target.value)
                        }
                        className="mt-1 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                        placeholder="Short description or tagline"
                    />
                </div>

                {/* LOCATION */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-500">
                            Location (Left)
                        </label>
                        <input
                            type="text"
                            value={form.locationStatementLeft}
                            onChange={(e) =>
                                handleChange(
                                    'locationStatementLeft',
                                    e.target.value
                                )
                            }
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#2E2620] focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                            placeholder="e.g. Bali"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-500">
                            Location (Right)
                        </label>
                        <input
                            type="text"
                            value={form.locationStatementRight}
                            onChange={(e) =>
                                handleChange(
                                    'locationStatementRight',
                                    e.target.value
                                )
                            }
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#2E2620] focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                            placeholder="e.g. Indonesia"
                        />
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-6 flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border border-gray-300 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={() => onSave(form)}
                    className="rounded-md bg-[#7A3E2C] px-4 py-2 text-xs font-medium text-white hover:bg-[#5C2D20] transition"
                >
                    Save Changes
                </button>
            </div>
        </section>
    );
}
