'use client';

import { useState } from 'react';

type BrandStatementForm = {
    title: string;
    subtitle: string;
    locationLeft: string;
    locationRight: string;
};

type Props = {
    initialData: BrandStatementForm;
    onCancel: () => void;
    onSave: (data: BrandStatementForm) => void;
};

export default function BrandStatementEditSection({
    initialData,
    onCancel,
    onSave,
}: Props) {
    const [form, setForm] = useState<BrandStatementForm>(initialData);

    const handleChange = (
        field: keyof BrandStatementForm,
        value: string
    ) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="w-full rounded-xl border border-[#E0D4C6] bg-white p-6 space-y-6">
            {/* TITLE */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                        handleChange('title', e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#7A3E2C] focus:ring-[#7A3E2C]"
                />
            </div>

            {/* SUBTITLE */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Subtitle
                </label>
                <textarea
                    rows={2}
                    value={form.subtitle}
                    onChange={(e) =>
                        handleChange('subtitle', e.target.value)
                    }
                    className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#7A3E2C] focus:ring-[#7A3E2C]"
                />
            </div>

            {/* LOCATION */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Location (Left)
                    </label>
                    <textarea
                        rows={3}
                        value={form.locationLeft}
                        onChange={(e) =>
                            handleChange(
                                'locationLeft',
                                e.target.value
                            )
                        }
                        className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#7A3E2C] focus:ring-[#7A3E2C]"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Location (Right)
                    </label>
                    <textarea
                        rows={3}
                        value={form.locationRight}
                        onChange={(e) =>
                            handleChange(
                                'locationRight',
                                e.target.value
                            )
                        }
                        className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#7A3E2C] focus:ring-[#7A3E2C]"
                    />
                </div>
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={() => onSave(form)}
                    className="rounded-md bg-[#7A3E2C] px-4 py-2 text-sm font-medium text-white hover:bg-[#5C2D20]"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
