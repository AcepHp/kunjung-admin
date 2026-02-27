'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    PencilSquareIcon,
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import SmartPopup from './SmartPopup';

interface PopupData {
    id: string;
    title: string;
    label: string;
    subtitle: string;
    isActive: boolean;
    imageSrc: string;
    description: string;
    buttonText: string;
}

const SINGLE_POPUP: PopupData = {
    id: '1',
    title: 'Special Stay Offer',
    label: 'PROMO',
    subtitle: 'LIMITED TIME ONLY',
    isActive: true,
    imageSrc: '/images/villa-1.jpg',
    description: 'Nikmati pengalaman menginap premium dengan harga spesial. Berlaku untuk pemesanan hari ini.',
    buttonText: 'View Offer'
};

export default function SmartPopupSection() {
    const [popup, setPopup] = useState<PopupData>(SINGLE_POPUP);
    const [showPreview, setShowPreview] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingStatus, setPendingStatus] = useState<boolean | null>(null);

    const handleToggleClick = () => {
        setPendingStatus(!popup.isActive);
        setShowConfirmModal(true);
    };

    const confirmToggle = () => {
        if (pendingStatus !== null) {
            setPopup(prev => ({ ...prev, isActive: pendingStatus }));
        }
        setShowConfirmModal(false);
        setPendingStatus(null);
    };

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-[#E9D6C6] bg-white p-5 sm:p-6 shadow-sm">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between gap-3 border-b border-[#FAF4EC] pb-4">
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold text-[#2E2620]">
                            Global Smart Pop Up
                        </h2>
                        <p className="mt-1 text-xs sm:text-sm text-gray-500">
                            Manage the main promotional popup for your platform.
                        </p>
                    </div>
                </div>

                {/* Content Row */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-[#E0D4C6] bg-gray-50">
                            <img src={popup.imageSrc} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-gray-900">{popup.title}</h3>
                            <div className="mt-1 flex items-center gap-2">
                                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{popup.subtitle}</span>
                                <span className="h-1 w-1 rounded-full bg-gray-300" />
                                <span className="text-[10px] font-bold text-[#7A3E2C] uppercase tracking-wider">{popup.label}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleToggleClick}
                            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-bold transition-all border ${popup.isActive
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : 'bg-gray-50 text-gray-400 border-gray-200'
                                }`}
                        >
                            {popup.isActive ? (
                                <>
                                    <CheckCircleIcon className="h-4 w-4" />
                                    ACTIVE
                                </>
                            ) : (
                                <>
                                    <XCircleIcon className="h-4 w-4" />
                                    INACTIVE
                                </>
                            )}
                        </button>

                        <div className="h-6 w-px bg-gray-100 mx-1 hidden sm:block" />

                        <button
                            onClick={() => setShowPreview(true)}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E9D6C6] bg-white text-[#7A3E2C] transition-all hover:bg-[#FAF4EC]"
                            title="Preview Popup"
                        >
                            <EyeIcon className="h-4.5 w-4.5" />
                        </button>

                        <Link
                            href={`/beranda/smart-popup/edit/${popup.id}`}
                            className="flex items-center gap-2 rounded-full bg-[#7A3E2C] px-5 py-2 text-xs font-bold text-white transition-all hover:bg-[#5C2D20]"
                        >
                            <PencilSquareIcon className="h-4 w-4" />
                            Manage
                        </Link>
                    </div>
                </div>
            </section>

            {/* PREVIEW MODAL */}
            {showPreview && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setShowPreview(false)}
                >
                    <div
                        className="relative w-full max-w-4xl transform animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SmartPopup
                            onClose={() => setShowPreview(false)}
                            title={popup.title}
                            label={popup.label}
                            subtitle={popup.subtitle}
                            imageSrc={popup.imageSrc}
                            description={popup.description}
                            buttonText={popup.buttonText}
                        />
                    </div>
                </div>
            )}

            {/* CONFIRMATION MODAL */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-in zoom-in-95 duration-300">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                                <ExclamationTriangleIcon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Confirm Status Change</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Are you sure you want to {pendingStatus ? 'activate' : 'deactivate'} this popup? This will affect what visitors see on the storefront.
                            </p>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="flex-1 rounded-full border border-gray-200 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmToggle}
                                className={`flex-1 rounded-full py-2 text-xs font-bold text-white transition ${pendingStatus ? 'bg-[#7A3E2C] hover:bg-[#5C2D20]' : 'bg-red-600 hover:bg-red-700'
                                    }`}
                            >
                                Yes, {pendingStatus ? 'Activate' : 'Deactivate'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
