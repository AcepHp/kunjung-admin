'use client';

import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Link from 'next/link';
import type { TncData } from '@/data/TncData';

type Props = {
    initialData: TncData;
    onSave: (data: TncData) => void;
};

const editorInit = {
    height: 280,
    menubar: false,
    plugins: ['lists', 'link', 'autolink'],
    toolbar: 'undo redo | bold italic underline | bullist numlist | link',
};

export default function TncSectionEdit({ initialData, onSave }: Props) {
    const [form, setForm] = useState<TncData>(initialData);

    const handleEditorChange = (field: keyof TncData, content: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: content,
        }));
    };

    return (
        <section className="rounded-xl border border-[#E0D4C6] bg-white overflow-hidden">
            {/* HEADER */}
            <div className="flex items-center justify-between bg-[#FBF6F0] px-6 py-4">
                <div>
                    <h2 className="text-sm font-semibold text-gray-800">
                        Edit Terms & Conditions
                    </h2>
                    <p className="text-xs text-gray-500">
                        Manage all legal content using rich text editor
                    </p>
                </div>
            </div>

            {/* CONTENT */}
            <div className="space-y-8 px-6 py-6">

                {/* TRANSACTION TERMS */}
                <div className="rounded-lg border border-[#EFE3D7] bg-[#FAF4EC]/40 p-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-800">
                        Transaction Terms
                    </h3>
                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                        value={form.transactionTerms}
                        init={editorInit}
                        onEditorChange={(content) => handleEditorChange('transactionTerms', content)}
                    />
                </div>

                {/* REFUND POLICY */}
                <div className="rounded-lg border border-[#EFE3D7] bg-[#FAF4EC]/40 p-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-800">
                        Refund & Cancellation Policy
                    </h3>
                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                        value={form.refundCancellationPolicy}
                        init={editorInit}
                        onEditorChange={(content) => handleEditorChange('refundCancellationPolicy', content)}
                    />
                </div>

                {/* AGREEMENT */}
                <div className="rounded-lg border border-[#EFE3D7] bg-[#FAF4EC]/40 p-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-800">
                        Agreement Text
                    </h3>
                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                        value={form.agreementText}
                        init={{
                            ...editorInit,
                            height: 200,
                        }}
                        onEditorChange={(content) => handleEditorChange('agreementText', content)}
                    />
                </div>
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-3 border-t bg-[#FBF6F0] px-6 py-4">
                <Link
                    href="/beranda/terms-refund"
                    className="rounded-md border px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                    Cancel
                </Link>

                <button
                    onClick={() => onSave(form)}
                    className="rounded-md bg-[#7A3E2C] px-4 py-2 text-sm font-medium text-white hover:bg-[#5C2D20]"
                >
                    Save Changes
                </button>
            </div>
        </section>
    );
}
