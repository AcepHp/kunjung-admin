'use client';

import { useState } from 'react';
import Image from 'next/image';

type ImageData = {
    id: string;
    url: string;
};

type Props = {
    image: ImageData;
    onCancel: () => void;
    onSave: (data: ImageData) => void;
};

export default function BrandStoryImageEditSection({
    image,
    onCancel,
    onSave,
}: Props) {
    const [preview, setPreview] = useState(image.url);
    const [file, setFile] = useState<File | null>(null);

    return (
        <section className="rounded-2xl border border-[#E0D4C6] bg-white shadow-sm">
            
            {/* ===== CONTENT ===== */}
            <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.2fr_1fr]">
                {/* ===== LEFT : UPLOAD ===== */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Replace Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const selected = e.target.files?.[0];
                                if (!selected) return;

                                setFile(selected);
                                setPreview(URL.createObjectURL(selected));
                            }}
                            className="block w-full cursor-pointer rounded-md border border-[#E0D4C6] bg-white px-3 py-2 text-xs sm:text-sm text-gray-700
                            file:mr-3 file:rounded-md file:border-0
                            file:bg-[#7A3E2C] file:px-3 file:py-1.5
                            file:text-xs file:font-medium file:text-white
                            hover:file:bg-[#5C2D20]"
                        />
                        <p className="mt-1 text-[11px] text-gray-400">
                            Recommended ratio 4:3. JPG or PNG.
                        </p>
                    </div>
                </div>

                {/* ===== RIGHT : PREVIEW ===== */}
                <div>
                    <p className="mb-2 text-xs font-medium text-gray-600">
                        Image Preview
                    </p>

                    <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-[#E0D4C6] bg-[#FAF4EC]">
                        <Image
                            src={preview}
                            alt="Brand image preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* ===== ACTION ===== */}
            <div className="flex justify-end gap-3 border-t border-[#EFE3D7] px-6 py-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border border-gray-300 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={() =>
                        onSave({
                            id: image.id,
                            url: file ? preview : image.url,
                        })
                    }
                    className="rounded-md bg-[#7A3E2C] px-4 py-2 text-xs font-medium text-white hover:bg-[#5C2D20]"
                >
                    Save Changes
                </button>
            </div>
        </section>
    );
}
