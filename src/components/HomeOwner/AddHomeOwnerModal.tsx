'use client';

import { useState } from 'react';
import { XMarkIcon, UserPlusIcon } from '@heroicons/react/24/outline';

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
    open: boolean;
    onClose: () => void;
    onAdd: (owner: HomeOwner) => void;
};

export default function AddHomeOwnerModal({ open, onClose, onAdd }: Props) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        totalProperties: 0,
        activeListings: 0,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!open) return null;

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
        if (formData.totalProperties < 0) {
            newErrors.totalProperties = 'Cannot be negative';
        }
        if (formData.activeListings < 0) {
            newErrors.activeListings = 'Cannot be negative';
        }
        if (formData.activeListings > formData.totalProperties) {
            newErrors.activeListings = 'Cannot exceed total properties';
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
                totalProperties: formData.totalProperties,
                activeListings: formData.activeListings,
            },
            status: {
                isActive: true,
            },
            createdAt: new Date().toISOString(),
        };

        onAdd(newOwner);
        handleClose();
    };

    const handleClose = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            totalProperties: 0,
            activeListings: 0,
        });
        setErrors({});
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-[#E9D6C6] max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EFE3D7] bg-[#FAF4EC]/50 backdrop-blur-sm px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7A3E2C]/10">
                            <UserPlusIcon className="h-5 w-5 text-[#7A3E2C]" />
                        </div>
                        <div>
                            <h3 className="text-base font-serif font-bold text-[#2E2620]">
                                Add New Home Owner
                            </h3>
                            <p className="text-xs text-gray-500">
                                Register a new property owner
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleClose}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#8B6F56] mb-4">
                            Personal Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, firstName: e.target.value })
                                    }
                                    className={`w-full rounded-lg border ${errors.firstName ? 'border-red-300' : 'border-[#E9D6C6]'
                                        } px-4 py-2 text-sm focus:border-[#7A3E2C] focus:outline-none focus:ring-2 focus:ring-[#7A3E2C]/20`}
                                    placeholder="Enter first name"
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, lastName: e.target.value })
                                    }
                                    className={`w-full rounded-lg border ${errors.lastName ? 'border-red-300' : 'border-[#E9D6C6]'
                                        } px-4 py-2 text-sm focus:border-[#7A3E2C] focus:outline-none focus:ring-2 focus:ring-[#7A3E2C]/20`}
                                    placeholder="Enter last name"
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className={`w-full rounded-lg border ${errors.email ? 'border-red-300' : 'border-[#E9D6C6]'
                                        } px-4 py-2 text-sm focus:border-[#7A3E2C] focus:outline-none focus:ring-2 focus:ring-[#7A3E2C]/20`}
                                    placeholder="owner@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phoneNumber: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-[#E9D6C6] px-4 py-2 text-sm focus:border-[#7A3E2C] focus:outline-none focus:ring-2 focus:ring-[#7A3E2C]/20"
                                    placeholder="+628123456789"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Property Information */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#8B6F56] mb-4">
                            Property Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Total Properties */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Total Properties
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.totalProperties}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            totalProperties: parseInt(e.target.value) || 0,
                                        })
                                    }
                                    className={`w-full rounded-lg border ${errors.totalProperties ? 'border-red-300' : 'border-[#E9D6C6]'
                                        } px-4 py-2 text-sm focus:border-[#7A3E2C] focus:outline-none focus:ring-2 focus:ring-[#7A3E2C]/20`}
                                />
                                {errors.totalProperties && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.totalProperties}
                                    </p>
                                )}
                            </div>

                            {/* Active Listings */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Active Listings
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.activeListings}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            activeListings: parseInt(e.target.value) || 0,
                                        })
                                    }
                                    className={`w-full rounded-lg border ${errors.activeListings ? 'border-red-300' : 'border-[#E9D6C6]'
                                        } px-4 py-2 text-sm focus:border-[#7A3E2C] focus:outline-none focus:ring-2 focus:ring-[#7A3E2C]/20`}
                                />
                                {errors.activeListings && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.activeListings}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#EFE3D7]">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-full border border-[#E0D4C6] px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-full bg-[#7A3E2C] px-5 py-2 text-sm font-medium text-white hover:bg-[#5C2D20] transition active:scale-95 shadow-sm"
                        >
                            Add Home Owner
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
