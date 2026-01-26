'use client';

import React from 'react';

interface Step4PricingProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleDiscountChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function Step4Pricing({
    formData,
    handleChange,
    handleDiscountChange
}: Step4PricingProps) {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-6 text-center mb-8">
                <h2 className="text-2xl font-serif font-bold text-[#1E1E1E]">Pricing & Availability</h2>
                <p className="text-gray-500">Define the financial details for this property listing.</p>
            </div>

            <div className="space-y-8">
                {/* Main Pricing Row - Wrapped in Card */}
                <div className="bg-[#FAF4EC]/20 p-8 rounded-3xl border border-[#E9D6C6]/40 space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#E9D6C6]/40 pb-4">
                        <h3 className="text-lg font-serif font-bold text-[#1E1E1E]">Base Pricing</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        {[
                            { label: 'Weekday Price', name: 'weekdayPrice', placeholder: 'e.g. IDR 3.500.000' },
                            { label: 'Weekend Price', name: 'weekendPrice', placeholder: 'e.g. IDR 4.500.000' },
                        ].map((field) => (
                            <div key={field.name} className="space-y-2">
                                <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">{field.label}</label>
                                <input
                                    type="text"
                                    name={field.name}
                                    // @ts-ignore
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="mt-1 block w-full rounded-xl border border-[#E9D6C6] bg-white px-4 py-3 text-[#1E1E1E] sm:text-sm shadow-sm focus:ring-1 focus:ring-[#7A3E2C] outline-none transition-all"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Discount Section */}
                <div className="bg-[#FAF4EC]/30 p-8 rounded-3xl border border-[#E9D6C6]/40 space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#E9D6C6]/40 pb-4">
                        <h3 className="text-lg font-serif font-bold text-[#1E1E1E]">Discount Settings (Optional)</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">Discount Label</label>
                            <input
                                type="text"
                                name="label"
                                value={formData.discount.label}
                                onChange={handleDiscountChange}
                                placeholder="e.g. Holiday Sale"
                                className="mt-1 block w-full rounded-xl border border-[#E9D6C6] bg-white px-4 py-3 text-[#1E1E1E] sm:text-sm shadow-sm focus:ring-1 focus:ring-[#7A3E2C] outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">Percentage (%)</label>
                            <input
                                type="number"
                                name="percentage"
                                min="0"
                                max="100"
                                value={formData.discount.percentage}
                                onChange={handleDiscountChange}
                                placeholder="10"
                                className="mt-1 block w-full rounded-xl border border-[#E9D6C6] bg-white px-4 py-3 text-[#1E1E1E] sm:text-sm shadow-sm focus:ring-1 focus:ring-[#7A3E2C] outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">Applies To</label>
                            <select
                                name="appliesTo"
                                value={formData.discount.appliesTo}
                                onChange={handleDiscountChange}
                                className="mt-1 block w-full rounded-xl border border-[#E9D6C6] bg-white px-4 py-3 text-[#1E1E1E] sm:text-sm shadow-sm focus:ring-1 focus:ring-[#7A3E2C] outline-none transition-all"
                            >
                                <option value="both">Both (Weekday & Weekend)</option>
                                <option value="weekday">Weekday Only</option>
                                <option value="weekend">Weekend Only</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
