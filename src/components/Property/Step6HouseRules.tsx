'use client';

import React from 'react';
import {
    ClockIcon,
    UserGroupIcon,
    NoSymbolIcon,
    InformationCircleIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

interface Step6HouseRulesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Step6HouseRules({
    formData,
    handleChange,
    setFormData
}: Step6HouseRulesProps) {
    const handleRulesChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            houseRules: {
                ...prev.houseRules,
                [field]: value
            }
        }));
    };

    const handleArrayRuleChange = (field: string, index: number, value: string) => {
        const newArray = [...(formData.houseRules?.[field] || [])];
        newArray[index] = value;
        setFormData((prev: any) => ({
            ...prev,
            houseRules: {
                ...prev.houseRules,
                [field]: newArray
            }
        }));
    };

    const addRulePoint = (field: string) => {
        setFormData((prev: any) => ({
            ...prev,
            houseRules: {
                ...prev.houseRules,
                [field]: [...(prev.houseRules?.[field] || []), '']
            }
        }));
    };

    const removeRulePoint = (field: string, index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            houseRules: {
                ...prev.houseRules,
                [field]: (prev.houseRules?.[field] || []).filter((_: any, i: number) => i !== index)
            }
        }));
    };

    const useCommonRules = () => {
        setFormData((prev: any) => ({
            ...prev,
            houseRules: {
                checkInTime: 'after 3:00 PM',
                checkOutTime: 'before 12:00 PM',
                selfCheckIn: 'Self check-in with building staff',
                maxGuests: '12 guests maximum',
                petsAllowed: 'No pets',
                quietHours: '10:00 PM – 6:00 AM',
                commercialPhotography: 'No commercial photography',
                smokingAllowed: 'Smoking is allowed',
                additionalRules: [
                    'Keeps all room safe and clean',
                    'We do not condone adultery and other disrespectful activities outside marriage.',
                    'Guests may not invite others to stay overnight outside the booking.',
                    'No party allowed without the house owner’s consent',
                    'Drugs and alcohol are strictly prohibited.',
                    'Professional photoshoot / videoshoot will be extra charged.',
                    'Smoking only in designated outdoor areas.'
                ],
                beforeLeave: [
                    'Turn things off',
                    'Return keys',
                    'Lock up'
                ],
                additionalRequests: [
                    'Check-out is at 12:00 PM.',
                    'Tidy rooms and dispose trash properly.',
                    'Clean used dishes and turn off appliances.',
                    'Double-check rooms for belongings.',
                    'Inform staff when ready to depart.'
                ]
            }
        }));
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-serif font-bold text-[#1E1E1E]">House Rules</h2>
                    <p className="text-gray-500 mt-2">Set expectations for your guests during their stay.</p>
                </div>
                <button
                    type="button"
                    onClick={useCommonRules}
                    className="inline-flex items-center gap-2 bg-white border border-[#7A3E2C] text-[#7A3E2C] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#FAF4EC] transition-all shadow-sm active:scale-95"
                >
                    <ArrowPathIcon className="h-4 w-4" />
                    Use Common Rules
                </button>
            </div>

            <div className="max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-[#E9D6C6]/60 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b border-[#FAF4EC] pb-4">
                            <ClockIcon className="h-5 w-5 text-[#7A3E2C]" />
                            <h4 className="text-lg font-bold text-[#1E1E1E]">Checking in and out</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Check-in after</label>
                                <input
                                    type="text"
                                    value={formData.houseRules?.checkInTime || ''}
                                    onChange={(e) => handleRulesChange('checkInTime', e.target.value)}
                                    placeholder="e.g. 3:00 PM"
                                    className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm focus:border-[#7A3E2C] outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Checkout before</label>
                                <input
                                    type="text"
                                    value={formData.houseRules?.checkOutTime || ''}
                                    onChange={(e) => handleRulesChange('checkOutTime', e.target.value)}
                                    placeholder="e.g. 12:00 PM"
                                    className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm focus:border-[#7A3E2C] outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Self Check-in Note</label>
                            <input
                                type="text"
                                value={formData.houseRules?.selfCheckIn || ''}
                                onChange={(e) => handleRulesChange('selfCheckIn', e.target.value)}
                                placeholder="e.g. Self check-in with building staff"
                                className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm focus:border-[#7A3E2C] outline-none"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-[#E9D6C6]/60 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b border-[#FAF4EC] pb-4">
                            <UserGroupIcon className="h-5 w-5 text-[#7A3E2C]" />
                            <h4 className="text-lg font-bold text-[#1E1E1E]">During your stay</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Max Guests Note</label>
                                <input
                                    type="text"
                                    value={formData.houseRules?.maxGuests || ''}
                                    onChange={(e) => handleRulesChange('maxGuests', e.target.value)}
                                    placeholder="e.g. 12 guests maximum"
                                    className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm focus:border-[#7A3E2C] outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Pets Allowed</label>
                                <input
                                    type="text"
                                    value={formData.houseRules?.petsAllowed || ''}
                                    onChange={(e) => handleRulesChange('petsAllowed', e.target.value)}
                                    placeholder="e.g. No pets"
                                    className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm focus:border-[#7A3E2C] outline-none"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Quiet Hours</label>
                                <input
                                    type="text"
                                    value={formData.houseRules?.quietHours || ''}
                                    onChange={(e) => handleRulesChange('quietHours', e.target.value)}
                                    placeholder="e.g. 10:00 PM – 6:00 AM"
                                    className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm focus:border-[#7A3E2C] outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Commercial Photography</label>
                                <input
                                    type="text"
                                    value={formData.houseRules?.commercialPhotography || ''}
                                    onChange={(e) => handleRulesChange('commercialPhotography', e.target.value)}
                                    placeholder="e.g. No commercial photography"
                                    className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm focus:border-[#7A3E2C] outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Smoking Allowed</label>
                            <input
                                type="text"
                                value={formData.houseRules?.smokingAllowed || ''}
                                onChange={(e) => handleRulesChange('smokingAllowed', e.target.value)}
                                placeholder="e.g. Smoking is allowed"
                                className="w-full px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm focus:border-[#7A3E2C] outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column (Point Based) */}
                <div className="space-y-6">
                    {/* Additional Rules */}
                    <div className="bg-white p-8 rounded-3xl border border-[#E9D6C6]/60 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-[#FAF4EC] pb-4">
                            <div className="flex items-center gap-3">
                                <NoSymbolIcon className="h-5 w-5 text-[#7A3E2C]" />
                                <h4 className="text-lg font-bold text-[#1E1E1E]">Additional rules</h4>
                            </div>
                            <button
                                type="button"
                                onClick={() => addRulePoint('additionalRules')}
                                className="text-xs font-bold text-[#7A3E2C] uppercase tracking-widest hover:underline"
                            >
                                + Add Rule
                            </button>
                        </div>
                        <div className="space-y-3">
                            {(formData.houseRules?.additionalRules || []).map((rule: string, index: number) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={rule}
                                        onChange={(e) => handleArrayRuleChange('additionalRules', index, e.target.value)}
                                        placeholder={`Rule ${index + 1}`}
                                        className="flex-1 px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm outline-none focus:border-[#7A3E2C]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeRulePoint('additionalRules', index)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <ArrowPathIcon className="h-4 w-4 rotate-45" />
                                    </button>
                                </div>
                            ))}
                            {(formData.houseRules?.additionalRules || []).length === 0 && (
                                <p className="text-center py-4 text-xs text-gray-400 italic">No additional rules added yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Before You Leave */}
                    <div className="bg-white p-8 rounded-3xl border border-[#E9D6C6]/60 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-[#FAF4EC] pb-4">
                            <div className="flex items-center gap-3">
                                <InformationCircleIcon className="h-5 w-5 text-[#7A3E2C]" />
                                <h4 className="text-lg font-bold text-[#1E1E1E]">Before you leave</h4>
                            </div>
                            <button
                                type="button"
                                onClick={() => addRulePoint('beforeLeave')}
                                className="text-xs font-bold text-[#7A3E2C] uppercase tracking-widest hover:underline"
                            >
                                + Add Step
                            </button>
                        </div>
                        <div className="space-y-3">
                            {(formData.houseRules?.beforeLeave || []).map((step: string, index: number) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={step}
                                        onChange={(e) => handleArrayRuleChange('beforeLeave', index, e.target.value)}
                                        placeholder={`Task ${index + 1}`}
                                        className="flex-1 px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm outline-none focus:border-[#7A3E2C]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeRulePoint('beforeLeave', index)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <ArrowPathIcon className="h-4 w-4 rotate-45" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Requests */}
                    <div className="bg-white p-8 rounded-3xl border border-[#E9D6C6]/60 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-[#FAF4EC] pb-4">
                            <div className="flex items-center gap-3">
                                <InformationCircleIcon className="h-5 w-5 text-[#7A3E2C]" />
                                <h4 className="text-lg font-bold text-[#1E1E1E]">Additional requests</h4>
                            </div>
                            <button
                                type="button"
                                onClick={() => addRulePoint('additionalRequests')}
                                className="text-xs font-bold text-[#7A3E2C] uppercase tracking-widest hover:underline"
                            >
                                + Add Request
                            </button>
                        </div>
                        <div className="space-y-3">
                            {(formData.houseRules?.additionalRequests || []).map((req: string, index: number) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={req}
                                        onChange={(e) => handleArrayRuleChange('additionalRequests', index, e.target.value)}
                                        placeholder={`Request ${index + 1}`}
                                        className="flex-1 px-4 py-3 rounded-xl border border-[#E9D6C6] bg-[#FAF8F6] text-sm outline-none focus:border-[#7A3E2C]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeRulePoint('additionalRequests', index)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <ArrowPathIcon className="h-4 w-4 rotate-45" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
