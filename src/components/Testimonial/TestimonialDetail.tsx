'use client';

import Link from 'next/link';

export default function TestimonialDetail() {
    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm">
            {/* HEADER */}
            <div className="border-b border-[#EFE3D7] px-6 py-4">
                <h2 className="text-base sm:text-lg font-semibold text-[#2E2620]">
                    Testimonial Detail
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    View customer testimonial information.
                </p>
            </div>

            {/* CONTENT */}
            <div className="space-y-5 px-6 py-6">
                {/* Name */}
                <div>
                    <p className="text-xs font-medium text-gray-500">Guest Name</p>
                    <p className="mt-1 text-sm font-semibold text-[#2E2620]">
                        Olivia Rodrigo
                    </p>
                </div>

                {/* Date */}
                <div>
                    <p className="text-xs font-medium text-gray-500">Date</p>
                    <p className="mt-1 text-sm text-[#2E2620]">
                        16 Jul 2025
                    </p>
                </div>

                {/* Rating */}
                <div>
                    <p className="text-xs font-medium text-gray-500">Rating</p>
                    <p className="mt-1 text-sm text-[#2E2620]">
                        ★★★★★ <span className="ml-1 text-gray-500">(5.0)</span>
                    </p>
                </div>

                {/* Review */}
                <div>
                    <p className="text-xs font-medium text-gray-500">Review</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed tristique, nulla vitae posuere viverra, sapien justo
                        cursus arcu, at porta elit nisi eget orci.
                    </p>
                </div>
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-2 border-t border-[#EFE3D7] bg-[#FBF6F0] px-6 py-4">
                <Link href="/beranda/testimonial">
                    <button
                        type="button"
                        className="rounded-full border border-[#E0D4C6] px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                        Back
                    </button>
                </Link>

                <Link href="/beranda/testimonial/edit">
                    <button
                        type="button"
                        className="rounded-full bg-[#7A3E2C] px-5 py-1.5 text-xs font-medium text-white hover:bg-[#5C2D20] transition"
                    >
                        Edit Testimonial
                    </button>
                </Link>
            </div>
        </section>
    );
}
