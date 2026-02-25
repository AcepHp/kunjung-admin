'use client';

import { useState } from 'react';
import {
    EnvelopeIcon,
    LinkIcon,
} from '@heroicons/react/24/outline';
import { Instagram, Youtube } from 'lucide-react';
import type { SocialMediaData } from '@/data/SocialMediaData';
import type { ReactNode } from 'react';

type Props = {
    initialData: SocialMediaData;
    onSave: (data: SocialMediaData) => void;
    onCancel: () => void;
};

const iconMap: Record<string, ReactNode> = {
    email: <EnvelopeIcon className="h-4 w-4" />,
    instagram: <Instagram className="h-4 w-4" />,
    youtube: <Youtube className="h-4 w-4" />,
    tiktok: <LinkIcon className="h-4 w-4" />,
};
export default function SocialMediaSectionEdit({
    initialData,
    onSave,
    onCancel,
}: Props) {
    const [form, setForm] = useState<SocialMediaData>(initialData);

    return (
        <div className="rounded-xl border border-[#E0D4C6] bg-white p-6 space-y-6">

            {/* ===== FORM ===== */}
            <div className="grid grid-cols-1 gap-5">
                {/* PLATFORM NAME (READ ONLY) */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                        Platform
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        disabled
                        className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600 focus:outline-none"
                    />
                </div>

                {/* URL */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                        URL
                    </label>
                    <input
                        type="url"
                        value={form.url}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                url: e.target.value,
                            })
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#7A3E2C] focus:outline-none"
                        placeholder="https://"
                    />
                    <p className="text-xs text-gray-500">
                        Make sure the URL is valid
                    </p>
                </div>
            </div>

            {/* ===== ACTION ===== */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={() => onSave(form)}
                    className="rounded-md bg-[#7A3E2C] px-4 py-2 text-sm font-medium text-white hover:bg-[#5C2D20] transition"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
