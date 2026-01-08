'use client';

import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

type Props = {
    open: boolean;
    isActivating: boolean;
    guestName: string;
    loading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function StatusConfirmModal({
    open,
    isActivating,
    guestName,
    loading = false,
    onClose,
    onConfirm,
}: Props) {
    if (!open) return null;

    const title = isActivating ? 'Activate Guest' : 'Deactivate Guest';
    const description = isActivating
        ? `Are you sure you want to activate ${guestName}? This will allow them to access the system.`
        : `Are you sure you want to deactivate ${guestName}? They will no longer be able to access the system.`;
    const confirmText = isActivating ? 'Activate' : 'Deactivate';
    const iconBgColor = isActivating ? 'bg-green-50' : 'bg-red-50';
    const iconColor = isActivating ? 'text-green-600' : 'text-red-600';
    const buttonBgColor = isActivating
        ? 'bg-green-600 hover:bg-green-700'
        : 'bg-red-600 hover:bg-red-700';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl border border-[#E9D6C6] mx-4">
                {/* Header */}
                <div className="flex items-start justify-between p-5">
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-9 w-9 items-center justify-center rounded-full ${iconBgColor}`}
                        >
                            {isActivating ? (
                                <CheckCircleIcon className={`h-5 w-5 ${iconColor}`} />
                            ) : (
                                <ExclamationTriangleIcon className={`h-5 w-5 ${iconColor}`} />
                            )}
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
                    <p className="text-sm text-gray-600">{description}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 border-t border-[#EFE3D7] px-5 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-full border border-[#E0D4C6] px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium text-white transition disabled:opacity-50 ${buttonBgColor}`}
                    >
                        {loading ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
