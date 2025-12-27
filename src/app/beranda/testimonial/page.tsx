import React from 'react';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import TestimonialTable from '@/components/Testimonial/TestimonialTable';
import {
    testimonialData,
    testimonialSummary,
} from '@/data/TestimonialData';

export default function Page() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Testimonial', disabled: true },
    ];

    return (
        <div className="space-y-8">
            {/* Breadcrumb */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Manage Testimonials"
                description="Review and manage customer testimonials and ratings"
            />

            {/* Summary */}
            <section className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E9D6C6] bg-white p-5 shadow-sm">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Average Rating
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-[#2E2620]">
                        ⭐ {testimonialSummary.averageRating}
                    </p>
                </div>

                <div className="rounded-2xl border border-[#E9D6C6] bg-white p-5 shadow-sm">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Total Reviews
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-[#2E2620]">
                        {testimonialSummary.totalReviews}
                    </p>
                </div>
            </section>

            {/* Table */}
            <TestimonialTable testimonials={testimonialData} />
        </div>
    );
}
