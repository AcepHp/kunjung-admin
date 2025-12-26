'use client';

import { ReactNode } from 'react';
import {
    ExclamationTriangleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

type Props = {
    open: boolean;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function DeleteConfirmModal({
    open,
    title = 'Delete Item',
    description = 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText = 'Delete',
    cancelText = 'Cancel',
    loading = false,
    onClose,
    onConfirm,
}: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl border border-[#E9D6C6]">
                {/* Header */}
                <div className="flex items-start justify-between p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
                            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-[#2E2620]">
                                {title}
                            </h3>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-5 pb-6">
                    <p className="text-sm text-gray-600">
                        {description}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 border-t border-[#EFE3D7] px-5 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-full border border-[#E0D4C6] px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-red-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Deleting...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
