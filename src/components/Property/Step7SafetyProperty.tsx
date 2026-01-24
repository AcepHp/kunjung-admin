'use client';

import React from 'react';
import {
    VideoCameraIcon,
    BellSlashIcon,
    ShieldCheckIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

interface Step7SafetyPropertyProps {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Step7SafetyProperty({
    formData,
    setFormData
}: Step7SafetyPropertyProps) {
    const handleSafetyChange = (index: number, field: string, value: string) => {
        const newDevices = [...(formData.safetyDevices || [])];
        newDevices[index] = { ...newDevices[index], [field]: value };
        setFormData((prev: any) => ({
            ...prev,
            safetyDevices: newDevices
        }));
    };

    const useCommonSafety = () => {
        setFormData((prev: any) => ({
            ...prev,
            safetyDevices: [
                {
                    type: 'Exterior security cameras on property',
                    status: 'present',
                    description: 'We have security cameras covering the front area of the house (carport, gate and front yard), the side of the house and the backyard area.'
                },
                {
                    type: 'Carbon monoxide alarm',
                    status: 'absent',
                    description: ''
                },
                {
                    type: 'Smoke alarm',
                    status: 'absent',
                    description: ''
                },
            ]
        }));
    };

    const devices = formData.safetyDevices || [];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-serif font-bold text-[#1E1E1E]">Safety & Property</h2>
                    <p className="text-gray-500 mt-2">Specify important safety details about your property.</p>
                </div>
                <button
                    type="button"
                    onClick={useCommonSafety}
                    className="inline-flex items-center gap-2 bg-white border border-[#7A3E2C] text-[#7A3E2C] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#FAF4EC] transition-all shadow-sm active:scale-95"
                >
                    <ArrowPathIcon className="h-4 w-4" />
                    Use Common Safety
                </button>
            </div>

            <div className="max-w-9xl mx-auto space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-[#E9D6C6]/60 shadow-sm space-y-8">
                    <h4 className="text-lg font-bold text-[#1E1E1E]">Safety devices</h4>

                    <div className="space-y-10">
                        {devices.map((device: any, index: number) => (
                            <div key={index} className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-xl bg-[#FAF4EC] text-[#7A3E2C]">
                                                {device.type.toLowerCase().includes('camera') ? (
                                                    <VideoCameraIcon className="h-6 w-6" />
                                                ) : (
                                                    <BellSlashIcon className="h-6 w-6" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="font-bold text-[#1E1E1E]">
                                                    {device.status === 'absent' ? `No ${device.type.toLowerCase()}` : device.type}
                                                </h5>
                                                {device.status === 'present' && (
                                                    <div className="mt-2 text-left">
                                                        <textarea
                                                            value={device.description || ''}
                                                            onChange={(e) => handleSafetyChange(index, 'description', e.target.value)}
                                                            placeholder="Add a brief description..."
                                                            className="w-full mt-1 p-3 text-sm italic text-gray-500 bg-[#FAF8F6] border border-[#E9D6C6] rounded-xl focus:border-[#7A3E2C] outline-none transition-all resize-none"
                                                            rows={3}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-64">
                                        <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest mb-2">Presence</label>
                                        <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAF8F6] rounded-xl border border-[#E9D6C6]">
                                            <button
                                                type="button"
                                                onClick={() => handleSafetyChange(index, 'status', 'present')}
                                                className={`py-2 text-xs font-bold rounded-lg transition-all ${device.status === 'present'
                                                    ? 'bg-white text-[#7A3E2C] shadow-sm'
                                                    : 'text-gray-400 hover:text-gray-600'
                                                    }`}
                                            >
                                                Present
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSafetyChange(index, 'status', 'absent')}
                                                className={`py-2 text-xs font-bold rounded-lg transition-all ${device.status === 'absent'
                                                    ? 'bg-white text-[#7A3E2C] shadow-sm'
                                                    : 'text-gray-400 hover:text-gray-600'
                                                    }`}
                                            >
                                                Absent
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {index < devices.length - 1 && <hr className="border-[#FAF4EC]" />}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
