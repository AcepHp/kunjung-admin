'use client';

import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import type { TncData } from '@/data/TncData';

type Props = {
    initialData: TncData;
    onSave: (data: TncData) => void;
};

export default function TncSectionEdit({ initialData, onSave }: Props) {
    const [form, setForm] = useState<TncData>(initialData);

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
                {form.sections.map((section, index) => (
                    <div
                        key={section.id}
                        className="rounded-lg border border-[#EFE3D7] bg-[#FAF4EC]/40 p-4"
                    >
                        <h3 className="mb-3 text-sm font-semibold text-gray-800">
                            {section.title}
                        </h3>

                        <Editor
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            value={section.content}
                            init={{
                                height: 280,
                                menubar: false,
                                plugins: [
                                    'lists',
                                    'link',
                                    'autolink',
                                    'paste',
                                ],
                                toolbar:
                                    'undo redo | bold italic underline | bullist numlist | link',
                            }}
                            onEditorChange={(content) => {
                                const updated = [...form.sections];
                                updated[index].content = content;

                                setForm({
                                    ...form,
                                    sections: updated,
                                });
                            }}
                        />
                    </div>
                ))}

                {/* AGREEMENT */}
                <div className="rounded-lg border border-[#EFE3D7] bg-[#FAF4EC]/40 p-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-800">
                        Agreement Text
                    </h3>

                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                        value={form.agreementHtml}
                        init={{
                            height: 200,
                            menubar: false,
                            plugins: ['link', 'autolink'],
                            toolbar:
                                'undo redo | bold italic underline | link',
                        }}
                        onEditorChange={(content) =>
                            setForm({
                                ...form,
                                agreementHtml: content,
                            })
                        }
                    />
                </div>
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-3 border-t bg-[#FBF6F0] px-6 py-4">
                <Link
                    href="/beranda/display/terms-refund"
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
