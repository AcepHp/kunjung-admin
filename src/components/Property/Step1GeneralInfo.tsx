'use client';

import React from 'react';

interface Step1GeneralInfoProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function Step1GeneralInfo({ formData, handleChange }: Step1GeneralInfoProps) {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-[#1E1E1E]">General Information</h2>
                <p className="text-gray-500 mt-2">Start with the basic identity and description of your property.</p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#1E1E1E]">Villa Name <span className="text-[#7A3E2C]">*</span></label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter villa name"
                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#1E1E1E]">Location Area <span className="text-[#7A3E2C]">*</span></label>
                    <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Dago, Bandung"
                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                </div>
                <div className="sm:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-[#1E1E1E]">Simple Description <span className="text-[#7A3E2C]">*</span></label>
                    <div className="relative">
                        <textarea
                            name="simpleDesc"
                            required
                            rows={2}
                            value={formData.simpleDesc}
                            onChange={handleChange}
                            placeholder="Example: A tranquil stay in the city"
                            className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200 placeholder:text-gray-400"
                        />
                    </div>
                </div>
                <div className="sm:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-[#1E1E1E]">Full Description <span className="text-[#7A3E2C]">*</span></label>
                    <textarea
                        name="description"
                        required
                        rows={6}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Detailed description of the property, features, and experience..."
                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                </div>
            </div>
        </div>
    );
}
