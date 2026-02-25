'use client';

import React from 'react';
import {
    ShieldCheckIcon,
    ArrowPathIcon,
    NoSymbolIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Step5PoliciesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Step5Policies({
    formData,
    handleChange,
    setFormData
}: Step5PoliciesProps) {
    const handlePolicyChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            policy: {
                ...prev.policy,
                [field]: value
            }
        }));
    };

    const useCommonPolicy = () => {
        setFormData((prev: any) => ({
            ...prev,
            policy: {
                refund100: 'available only if the cancellation is made no later than 7 days (H-7) before the check-in date.',
                refund50: 'applies if the cancellation is made 3 days (H-3) before check-in.',
                nonRefundable: 'Cancellations made less than 3 days (under H-3) before check-in are non-refundable (full forfeiture).',
                reschedule: 'Reservation date changes (reschedule) can only be made no later than H-7, subject to property availability.',
            }
        }));
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-serif font-bold text-[#1E1E1E]">Refund & Cancellation Policy</h2>
                    <p className="text-gray-500 mt-2">Define the rules for cancellations and rescheduling.</p>
                </div>
                <button
                    type="button"
                    onClick={useCommonPolicy}
                    className="inline-flex items-center gap-2 bg-white border border-[#7A3E2C] text-[#7A3E2C] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#FAF4EC] transition-all shadow-sm active:scale-95"
                >
                    <ArrowPathIcon className="h-4 w-4" />
                    Use Common Policy
                </button>
            </div>

            <div className="max-w-9xl mx-auto space-y-6">
                {/* 100% Refund Policy */}
                <div className="group bg-white p-8 rounded-3xl border border-[#E9D6C6]/60 shadow-sm hover:shadow-md transition-all">
                    <div className="space-y-4 text-left">
                        <div className="flex items-center gap-3">
                            <h4 className="text-lg font-bold text-[#1E1E1E]">100% Refund Policy Description</h4>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Description</label>
                            <textarea
                                rows={3}
                                value={formData.policy?.refund100 || ''}
                                onChange={(e) => handlePolicyChange('refund100', e.target.value)}
                                placeholder="e.g. available only if the cancellation is made no later than 7 days (H-7) before the check-in date."
                                className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm font-medium text-[#1E1E1E] outline-none focus:border-[#7A3E2C] transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* 50% Refund Policy */}
                <div className="group bg-white p-8 rounded-3xl border border-[#E9D6C6]/60 shadow-sm hover:shadow-md transition-all">
                    <div className="space-y-4 text-left">
                        <div className="flex items-center gap-3">
                            <h4 className="text-lg font-bold text-[#1E1E1E]">50% Refund Policy Description</h4>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Description</label>
                            <textarea
                                rows={3}
                                value={formData.policy?.refund50 || ''}
                                onChange={(e) => handlePolicyChange('refund50', e.target.value)}
                                placeholder="e.g. applies if the cancellation is made 3 days (H-3) before check-in."
                                className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm font-medium text-[#1E1E1E] outline-none focus:border-[#7A3E2C] transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Non-Refundable Info */}
                <div className="group bg-white p-8 rounded-3xl border border-[#E9D6C6]/60 shadow-sm hover:shadow-md transition-all">
                    <div className="space-y-4 text-left">
                        <div className="flex items-center gap-3">
                            <h4 className="text-lg font-bold text-[#1E1E1E]">Non-Refundable Condition</h4>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Description</label>
                            <textarea
                                rows={3}
                                value={formData.policy?.nonRefundable || ''}
                                onChange={(e) => handlePolicyChange('nonRefundable', e.target.value)}
                                placeholder="e.g. Cancellations made less than 3 days (under H-3) before check-in are non-refundable (full forfeiture)."
                                className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm font-medium text-[#1E1E1E] outline-none focus:border-[#7A3E2C] transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Reschedule Policy */}
                <div className="group bg-white p-8 rounded-3xl border border-[#E9D6C6]/60 shadow-sm hover:shadow-md transition-all">
                    <div className="space-y-4 text-left">
                        <div className="flex items-center gap-3">
                            <h4 className="text-lg font-bold text-[#1E1E1E]">Reschedule Policy Details</h4>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Description</label>
                            <textarea
                                rows={3}
                                value={formData.policy?.reschedule || ''}
                                onChange={(e) => handlePolicyChange('reschedule', e.target.value)}
                                placeholder="e.g. Reservation date changes (reschedule) can only be made no later than H-7, subject to property availability."
                                className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm font-medium text-[#1E1E1E] outline-none focus:border-[#7A3E2C] transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
