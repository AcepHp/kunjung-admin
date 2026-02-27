'use client';

import React from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SmartPopupProps {
    isOpen?: boolean;
    onClose?: () => void;
    imageSrc?: string;
    label?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
}

export default function SmartPopup({
    imageSrc = "/images/villa-1.jpg",
    label = "PROMO",
    subtitle = "LIMITED TIME ONLY",
    title = "Special Stay Offer",
    description = "Nikmati pengalaman menginap premium dengan harga spesial. Berlaku untuk pemesanan hari ini.",
    buttonText = "View Offer",
    buttonHref = "#",
    onClose
}: SmartPopupProps) {
    return (
        <div className="relative mx-auto flex max-w-4xl overflow-hidden rounded-[40px] bg-white shadow-2xl transition-all">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-400 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-gray-600 active:scale-95"
            >
                <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Left Column: Image Area */}
            <div className="relative hidden w-1/2 md:block">
                <div className="relative h-full w-full min-h-[500px]">
                    <Image
                        src={imageSrc}
                        alt="Promo Image"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Badge */}
                    <div className="absolute left-8 top-8 z-10">
                        <span className="rounded-full bg-white/90 px-6 py-2 text-[10px] font-bold tracking-[0.2em] text-[#7A3E2C] backdrop-blur-md">
                            {label}
                        </span>
                    </div>
                    {/* Gradient Overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent" />
                </div>
            </div>

            {/* Right Column: Content Area */}
            <div className="flex w-full flex-col justify-center px-12 py-16 md:w-1/2 lg:px-16">
                <div className="space-y-8">
                    <div>
                        <span className="mb-4 block text-[11px] font-bold tracking-[0.3em] text-[#7A3E2C]/60 uppercase">
                            {subtitle}
                        </span>
                        <h2 className="font-serif text-[44px] font-bold leading-[1.1] text-[#1E1E1E]">
                            {title}
                        </h2>
                    </div>

                    <p className="text-lg leading-relaxed text-gray-500 font-medium">
                        {description}
                    </p>

                    <div className="pt-4">
                        <a
                            href={buttonHref}
                            className="block w-full text-center rounded-full bg-[#7A3E2C] px-10 py-5 text-lg font-bold text-white transition-all hover:bg-[#5C2D20] hover:shadow-xl hover:shadow-[#7A3E2C]/20 active:scale-95"
                        >
                            {buttonText}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
