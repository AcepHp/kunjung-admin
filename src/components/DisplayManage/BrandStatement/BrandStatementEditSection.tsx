'use client';

import { useState, useEffect } from 'react';
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
        titleStatement: initialData.titleStatement,
        subTitleStatement: initialData.subTitleStatement,
        locationStatementLeft: initialData.locationStatementLeft,
        locationStatementRight: initialData.locationStatementRight,
    });

    useEffect(() => {
        setForm({
            titleStatement: initialData.titleStatement,
            subTitleStatement: initialData.subTitleStatement,
            locationStatementLeft: initialData.locationStatementLeft,
            locationStatementRight: initialData.locationStatementRight,
        });
    }, [initialData]);

    const handleChange = (
        field: keyof UpdateBrandStatementPayload,
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
                    value={form.titleStatement}
                    onChange={(e) =>
                        handleChange('titleStatement', e.target.value)
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
                    value={form.subTitleStatement}
                    onChange={(e) =>
                        handleChange('subTitleStatement', e.target.value)
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
                        value={form.locationStatementLeft}
                        onChange={(e) =>
                            handleChange(
                                'locationStatementLeft',
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
                        value={form.locationStatementRight}
                        onChange={(e) =>
                            handleChange(
                                'locationStatementRight',
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
