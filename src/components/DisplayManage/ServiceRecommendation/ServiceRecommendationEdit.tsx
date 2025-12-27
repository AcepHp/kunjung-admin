'use client';

import { useState } from 'react';
import Image from 'next/image';

export type ServiceRecommendationForm = {
    title: string;
    imageUrl: string;
};

type Props = {
    initialData: ServiceRecommendationForm;
    onSave: (data: ServiceRecommendationForm) => void;
    onCancel: () => void;
};

export default function ServiceRecommendationEdit({
    initialData,
    onSave,
    onCancel,
}: Props) {
    const [form, setForm] = useState<ServiceRecommendationForm>(initialData);
    const [preview, setPreview] = useState<string>(
        initialData.imageUrl ? `/${initialData.imageUrl}` : ''
    );

    const handleFileChange = (file?: File) => {
        if (!file) return;

        // 🔹 preview image
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // 🔹 simpan nama file (untuk backend nanti)
        setForm({
            ...form,
            imageUrl: file.name,
        });
    };

    return (
        <div className="rounded-xl border border-[#E0D4C6] bg-white p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* ===== LEFT : FORM ===== */}
                <div className="space-y-5">
                    {/* TITLE */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Service Title
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    title: e.target.value,
                                })
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#7A3E2C] focus:outline-none"
                            placeholder="Service title"
                        />
                    </div>

                    {/* IMAGE UPLOAD */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                handleFileChange(e.target.files?.[0])
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#F7EBE1] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[#7A3E2C] hover:file:bg-[#EBD9CA]"
                        />
                        <p className="text-xs text-gray-500">
                            Image will be stored in public directory (backend required)
                        </p>
                    </div>
                </div>

                {/* ===== RIGHT : PREVIEW ===== */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                        Image Preview
                    </p>

                    <div className="relative h-48 w-full overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50">
                        {preview ? (
                            <Image
                                src={preview}
                                alt={form.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                No image selected
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={() => onSave(form)}
                    className="rounded-md bg-[#7A3E2C] px-4 py-2 text-sm font-medium text-white hover:bg-[#693526] transition"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
