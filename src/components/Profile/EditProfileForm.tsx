"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserCircleIcon, EnvelopeIcon, PhoneIcon, KeyIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function EditProfileForm() {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // ... (state definitions remain same)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        avatar: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (session?.user) {
            setFormData({
                firstName: session.user.firstName || "",
                lastName: session.user.lastName || "",
                email: session.user.email || "",
                phoneNumber: "",
                avatar: session.user.avatar || "",
            });
        }
    }, [session]);

    // ... (handler methods remain same)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            // Simulate API call - replace with actual API endpoint
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setMessage({
                type: "success",
                text: "Profile updated successfully!",
            });

            // Update session if needed
            // await update({ ...session, user: { ...session.user, ...formData } });
        } catch (error) {
            setMessage({
                type: "error",
                text: "Failed to update profile. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({
                type: "error",
                text: "New passwords do not match!",
            });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setMessage({
                type: "error",
                text: "Password must be at least 6 characters long!",
            });
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            // Simulate API call - replace with actual API endpoint
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setMessage({
                type: "success",
                text: "Password changed successfully!",
            });

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            setMessage({
                type: "error",
                text: "Failed to change password. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="space-y-8 animate-pulse">
                {/* Profile Information Skeleton */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-100">
                    <div className="px-4 py-5 sm:p-6">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                            <div className="h-6 w-48 bg-gray-200 rounded"></div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Avatar Skeleton */}
                            <div className="sm:col-span-2">
                                <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                                    <div className="h-9 w-32 bg-gray-200 rounded border border-gray-200"></div>
                                </div>
                            </div>

                            {/* Inputs: First Name, Last Name */}
                            <div>
                                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                                <div className="h-10 w-full bg-gray-200 rounded border border-gray-200"></div>
                            </div>
                            <div>
                                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                                <div className="h-10 w-full bg-gray-200 rounded border border-gray-200"></div>
                            </div>

                            {/* Email */}
                            <div className="sm:col-span-2">
                                <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                                <div className="h-10 w-full bg-gray-200 rounded border border-gray-200"></div>
                            </div>

                            {/* Phone */}
                            <div className="sm:col-span-2">
                                <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                                <div className="h-10 w-full bg-gray-200 rounded border border-gray-200"></div>
                            </div>
                        </div>
                    </div>
                    {/* Buttons Footer */}
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3 border-t border-gray-100">
                        <div className="h-9 w-full sm:w-32 bg-gray-200 rounded"></div>
                        <div className="h-9 w-full sm:w-20 bg-gray-200 rounded mt-3 sm:mt-0"></div>
                    </div>
                </div>

                {/* Change Password Skeleton */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-100">
                    <div className="px-4 py-5 sm:p-6">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                            <div className="h-6 w-48 bg-gray-200 rounded"></div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {/* Password Inputs */}
                            {[1, 2, 3].map((i) => (
                                <div key={i}>
                                    <div className="h-4 w-36 bg-gray-200 rounded mb-1"></div>
                                    <div className="h-10 w-full bg-gray-200 rounded border border-gray-200"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Button Footer */}
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3 border-t border-gray-100">
                        <div className="h-9 w-full sm:w-40 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {message && (
                <div
                    className={`rounded-md p-4 ${message.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                >
                    <p className="text-sm font-medium">{message.text}</p>
                </div>
            )}

            {/* Profile Information */}
            <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4 flex items-center gap-2">
                        <UserCircleIcon className="h-6 w-6 text-[#7A3E2C]" />
                        Profile Information
                    </h3>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Avatar Display */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                            <div className="flex items-center gap-4">
                                {formData.avatar ? (
                                    <Image
                                        src={formData.avatar}
                                        alt="Profile"
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#7A3E2C] text-xl font-semibold text-white">
                                        {formData.firstName?.charAt(0) || "A"}
                                        {formData.lastName?.charAt(0) || "K"}
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Change Photo
                                </button>
                            </div>
                        </div>

                        {/* First Name */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7A3E2C] focus:ring-[#7A3E2C] sm:text-sm px-3 py-2 border"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7A3E2C] focus:ring-[#7A3E2C] sm:text-sm px-3 py-2 border"
                            />
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <EnvelopeIcon className="h-4 w-4" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7A3E2C] focus:ring-[#7A3E2C] sm:text-sm px-3 py-2 border"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="sm:col-span-2">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <PhoneIcon className="h-4 w-4" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="+62 812-3456-7890"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7A3E2C] focus:ring-[#7A3E2C] sm:text-sm px-3 py-2 border"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex w-full justify-center rounded-md bg-[#7A3E2C] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5F3022] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A3E2C] sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {/* Change Password */}
            <form onSubmit={handlePasswordSubmit} className="bg-white shadow-sm rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4 flex items-center gap-2">
                        <KeyIcon className="h-6 w-6 text-[#7A3E2C]" />
                        Change Password
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Current Password */}
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7A3E2C] focus:ring-[#7A3E2C] sm:text-sm px-3 py-2 border"
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7A3E2C] focus:ring-[#7A3E2C] sm:text-sm px-3 py-2 border"
                            />
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7A3E2C] focus:ring-[#7A3E2C] sm:text-sm px-3 py-2 border"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex w-full justify-center rounded-md bg-[#7A3E2C] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5F3022] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A3E2C] sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>
                </div>
            </form>
        </div>
    );
}
