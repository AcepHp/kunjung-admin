'use client';

import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type Props = {
    initialData: {
        brandName: string;
        headline: string;
        subHeadline: string;
        description: string[];
    };
    onCancel?: () => void;
    onSave?: (data: {
        brandName: string;
        headline: string;
        subHeadline: string;
        description: string[];
    }) => void;
};

export default function BrandStoryEditSection({
    initialData,
    onCancel,
    onSave,
}: Props) {
    const [brandName, setBrandName] = useState(initialData.brandName);
    const [headline, setHeadline] = useState(initialData.headline);
    const [subHeadline, setSubHeadline] = useState(initialData.subHeadline);
    const [description, setDescription] = useState(
        initialData.description.join('<p></p>')
    );

    const handleSave = () => {
        const parsedDescription = description
            .split('</p>')
            .map((d) => d.replace('<p>', '').trim())
            .filter(Boolean);

        onSave?.({
            brandName,
            headline,
            subHeadline,
            description: parsedDescription,
        });
    };

    return (
        <section className="rounded-xl border border-[#E0D4C6] bg-white p-6 space-y-6">

            {/* Brand Name */}
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                    Brand Name
                </label>
                <input
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm"
                />
            </div>

            {/* Headline */}
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                    Headline
                </label>
                <input
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm"
                />
            </div>

            {/* Sub Headline */}
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                    Sub Headline
                </label>
                <input
                    value={subHeadline}
                    onChange={(e) => setSubHeadline(e.target.value)}
                    className="w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm italic"
                />
            </div>

            {/* Description (TinyMCE) */}
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                    Description
                </label>
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    value={description}
                    init={{
                        height: 260,
                        menubar: false,
                        plugins: [
                            'lists',
                            'link',
                            'autolink',
                            'preview',
                        ],
                        toolbar:
                            'undo redo | bold italic | bullist numlist | link | preview',
                        content_style:
                            'body { font-family: Inter, sans-serif; font-size:14px }',
                    }}
                    onEditorChange={(content) => setDescription(content)}
                />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border border-[#E0D4C6] px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-md bg-[#7A3E2C] px-4 py-2 text-sm font-medium text-white hover:bg-[#5C2D20]"
                >
                    Save Changes
                </button>
            </div>
        </section>
    );
}
