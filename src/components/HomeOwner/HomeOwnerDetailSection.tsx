'use client';

import { useParams, useRouter } from 'next/navigation';
import { homeowners } from '@/data/HomeOwners';
import {
    ArrowLeftIcon,
    UserCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    CalendarIcon,
    ShieldCheckIcon,
    HomeModernIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';

export default function HomeOwnerDetailSection() {
    const params = useParams();
    const router = useRouter();
    const ownerId = params.id as string;

    const owner = homeowners.find((o) => o.id === ownerId);

    if (!owner) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-[#2E2620] mb-2">
                        Home Owner Not Found
                    </h2>
                    <p className="text-gray-500 mb-6">
                        The home owner you're looking for doesn't exist.
                    </p>
                    <button
                        onClick={() => router.push('/beranda/manage-user/home-owner')}
                        className="inline-flex items-center gap-2 rounded-full border border-[#E0D4C6] bg-white px-5 py-2.5 text-sm font-medium text-[#7A3E2C] hover:bg-[#FAF4EC] transition"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Home Owner List
                    </button>
                </div>
            </div>
        );
    }

    const fullName = `${owner.personalInfo.firstName} ${owner.personalInfo.lastName}`;
    const joinDate = new Date(owner.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Manage User', disabled: true },
        { name: 'Home Owner Data', href: '/beranda/manage-user/home-owner' },
        { name: fullName, disabled: true },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Home Owner Details"
                description="Complete information about this property owner"
            />

            {/* Main Content Card */}
            <div className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-[#FAF4EC] to-[#F7EBE1] px-8 py-10 border-b border-[#E9D6C6]">
                    <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-[#7A3E2C] to-[#5C2D20] flex items-center justify-center shadow-lg">
                                <UserCircleIcon className="h-14 w-14 text-white" />
                            </div>
                        </div>

                        {/* Name and Status */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-serif font-bold text-[#1E1E1E] mb-2">
                                {fullName}
                            </h2>
                            <div className="flex items-center gap-3 mb-4">
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest border ${owner.status.isActive
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                            : 'bg-gray-50 text-gray-500 border-gray-200'
                                        }`}
                                >
                                    <span
                                        className={`mr-2 h-2 w-2 rounded-full ${owner.status.isActive
                                                ? 'bg-emerald-500'
                                                : 'bg-gray-400'
                                            }`}
                                    />
                                    {owner.status.isActive ? 'Active' : 'Inactive'}
                                </span>
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 border border-blue-200">
                                    {owner.role.charAt(0).toUpperCase() + owner.role.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property Stats */}
                <div className="bg-gradient-to-r from-[#7A3E2C]/5 to-[#5C2D20]/5 px-8 py-6 border-b border-[#E9D6C6]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#7A3E2C] shadow-lg">
                                <HomeModernIcon className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                                    Total Properties
                                </p>
                                <p className="text-3xl font-bold text-[#7A3E2C]">
                                    {owner.propertyInfo.totalProperties}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600 shadow-lg">
                                <CheckCircleIcon className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                                    Active Listings
                                </p>
                                <p className="text-3xl font-bold text-emerald-600">
                                    {owner.propertyInfo.activeListings}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information Grid */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF4EC] border border-[#E9D6C6] group-hover:bg-[#F7EBE1] transition">
                                    <EnvelopeIcon className="h-5 w-5 text-[#7A3E2C]" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8B6F56]">
                                        Email Address
                                    </label>
                                </div>
                            </div>
                            <p className="text-base text-[#1E1E1E] font-medium pl-13 break-all">
                                {owner.personalInfo.email}
                            </p>
                        </div>

                        {/* Phone */}
                        <div className="group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF4EC] border border-[#E9D6C6] group-hover:bg-[#F7EBE1] transition">
                                    <PhoneIcon className="h-5 w-5 text-[#7A3E2C]" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8B6F56]">
                                        Phone Number
                                    </label>
                                </div>
                            </div>
                            <p className="text-base text-[#1E1E1E] font-medium pl-13">
                                {owner.personalInfo.phoneNumber || (
                                    <span className="text-gray-400 italic text-sm">
                                        No phone number provided
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Join Date */}
                        <div className="group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF4EC] border border-[#E9D6C6] group-hover:bg-[#F7EBE1] transition">
                                    <CalendarIcon className="h-5 w-5 text-[#7A3E2C]" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8B6F56]">
                                        Join Date
                                    </label>
                                </div>
                            </div>
                            <p className="text-base text-[#1E1E1E] font-medium pl-13">
                                {joinDate}
                            </p>
                        </div>

                        {/* Role */}
                        <div className="group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF4EC] border border-[#E9D6C6] group-hover:bg-[#F7EBE1] transition">
                                    <ShieldCheckIcon className="h-5 w-5 text-[#7A3E2C]" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8B6F56]">
                                        User Role
                                    </label>
                                </div>
                            </div>
                            <p className="text-base text-[#1E1E1E] font-medium pl-13 capitalize">
                                {owner.role}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-[#EFE3D7] bg-[#FAF4EC]/30 px-8 py-5">
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                            Last updated: {new Date().toLocaleDateString('en-GB')}
                        </p>
                        <button
                            onClick={() => router.push('/beranda/manage-user/home-owner')}
                            className="rounded-full border border-[#E0D4C6] bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
