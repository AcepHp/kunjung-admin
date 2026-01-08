'use client';

import React from 'react';

type Props = {
    label: string;
    setLabel: (val: string) => void;
    text: string;
    setText: (val: string) => void;
    onSave: () => void;
    onCancel: () => void;
};

export default function ClosingEdit({ label, setLabel, text, setText, onSave, onCancel }: Props) {
    return (
        <div id="closing" className="mx-auto max-w-9xl space-y-8">
            <div className="bg-white rounded-3xl border border-[#E9D6C6] overflow-hidden shadow-sm">
                <div className="px-8 py-5 bg-[#FAF4EC] border-b border-[#E9D6C6] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#7A3E2C] flex items-center justify-center text-white font-bold text-xs">07</div>
                        <h3 className="font-serif font-bold text-[#1E1E1E]">Closing Statement</h3>
                    </div>
                </div>
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Label</label>
                            <input
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] outline-none"
                                placeholder="e.g. Attentive Services"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Statement Text</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm h-24 resize-none focus:ring-2 focus:ring-[#7A3E2C] outline-none"
                                placeholder="The final message..."
                            />
                        </div>
                    </div>
                </div>
                <div className="p-8 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full border border-[#E0D4C6] px-6 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onSave}
                        className="rounded-full bg-[#7A3E2C] px-8 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all uppercase tracking-widest"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

        </div>
    );
}
