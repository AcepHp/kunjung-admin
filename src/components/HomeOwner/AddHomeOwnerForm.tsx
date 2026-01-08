'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlusIcon } from '@heroicons/react/24/outline';

type HomeOwner = {
    id: string;
    role: string;
    personalInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
    };
    propertyInfo: {
        totalProperties: number;
        activeListings: number;
    };
    status: {
        isActive: boolean;
    };
    createdAt: string;
};

type Props = {
    onAdd: (owner: HomeOwner) => void;
};

export default function AddHomeOwnerForm({ onAdd }: Props) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const newOwner: HomeOwner = {
            id: `homeowner-${Date.now()}`,
            role: 'homeowner',
            personalInfo: {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                phoneNumber: formData.phoneNumber.trim() || null,
            },
            propertyInfo: {
                totalProperties: 0,
                activeListings: 0,
            },
            status: {
                isActive: true,
            },
            createdAt: new Date().toISOString(),
        };

        onAdd(newOwner);
        router.push('/beranda/manage-user/home-owner');
    };

    const handleCancel = () => {
        router.push('/beranda/manage-user/home-owner');
    };

    return (
        <div className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <div className="border-b border-[#EFE3D7] bg-[#FAF4EC]/30 px-8 py-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7A3E2C]/10">
                        <UserPlusIcon className="h-6 w-6 text-[#7A3E2C]" />
                    </div>
                    <div>
                        <h2 className="text-xl font-serif font-bold text-[#2E2620]">
                            Add New Home Owner
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Register a new property owner in the system
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Personal Information */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#8B6F56] mb-4">
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                }
                                className={`w-full rounded-lg border ${errors.firstName ? 'border-red-300' : 'border-[#E9D6C6]'
                                    } px-4 py-2.5 text-sm focus:border-[#7A3E2C] focus:outline-none focus:ring-2 focus:ring-[#7A3E2C]/20`}
                                placeholder="Enter first name"
                            />
                            {errors.firstName && (
                                <p className="mt-1.5 text-xs text-red-500">{errors.firstName}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastName: e.target.value })
                                }
                                className={`w-full rounded-lg border ${errors.lastName ? 'border-red-300' : 'border-[#E9D6C6]'
                                    } px-4 py-2.5 text-sm focus:border-[#7A3E2C] focus:outline-none focus:ring-2 focus:ring-[#7A3E2C]/20`}
                                placeholder="Enter last name"
                            />
                            {errors.lastName && (
                                <p className="mt-1.5 text-xs text-red-500">{errors.lastName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className={`w-full rounded-lg border ${errors.email ? 'border-red-300' : 'border-[#E9D6C6]'
                                    } px-4 py-2.5 text-sm focus:border-[#7A3E2C] focus:outline-none focus:ring-2 focus:ring-[#7A3E2C]/20`}
                                placeholder="owner@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, phoneNumber: e.target.value })
                                }
                                className="w-full rounded-lg border border-[#E9D6C6] px-4 py-2.5 text-sm focus:border-[#7A3E2C] focus:outline-none focus:ring-2 focus:ring-[#7A3E2C]/20"
                                placeholder="+628123456789"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-[#EFE3D7]">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-full border border-[#E0D4C6] px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-full bg-[#7A3E2C] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#5C2D20] transition active:scale-95 shadow-sm"
                    >
                        Add Home Owner
                    </button>
                </div>
            </form>
        </div>
    );
}
