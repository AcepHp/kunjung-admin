'use client';

import Link from 'next/link';

export default function EditTestimonialForm() {
    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm">
            {/* HEADER */}
            <div className="border-b border-[#EFE3D7] px-6 py-4">
                <h2 className="text-base sm:text-lg font-semibold text-[#2E2620]">
                    Edit Testimonial
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    Update customer testimonial information.
                </p>
            </div>

            {/* FORM */}
            <div className="space-y-5 px-6 py-6">
                {/* Guest Name */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">
                        Guest Name
                    </label>
                    <input
                        type="text"
                        defaultValue="Olivia Rodrigo"
                        className="mt-1 block w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm text-gray-900 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">
                        Date
                    </label>
                    <input
                        type="date"
                        defaultValue="2025-07-16"
                        className="mt-1 block w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm text-gray-900 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">
                        Rating
                    </label>
                    <select
                        defaultValue="5"
                        className="mt-1 block w-full rounded-md border border-[#E0D4C6] bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                    >
                        <option value="5">★★★★★ - Excellent</option>
                        <option value="4">★★★★☆ - Very Good</option>
                        <option value="3">★★★☆☆ - Good</option>
                        <option value="2">★★☆☆☆ - Fair</option>
                        <option value="1">★☆☆☆☆ - Poor</option>
                    </select>
                </div>

                {/* Review */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">
                        Review
                    </label>
                    <textarea
                        rows={5}
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                        className="mt-1 block w-full resize-none rounded-md border border-[#E0D4C6] px-3 py-2 text-sm text-gray-900 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                    />
                </div>
            </div>

            {/* ACTION */}
            <div className="flex items-center justify-end gap-2 border-t border-[#EFE3D7] bg-[#FBF6F0] px-6 py-4">
                <Link href="/beranda/testimonial">
                    <button
                        type="button"
                        className="rounded-full border border-[#E0D4C6] px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                </Link>

                <button
                    type="button"
                    className="rounded-full bg-[#7A3E2C] px-5 py-1.5 text-xs font-medium text-white hover:bg-[#5C2D20] transition"
                >
                    Save Changes
                </button>
            </div>
        </section>
    );
}
