import Link from "next/link";
import { notFound } from "next/navigation";

import BreadCrumbs, {
    BreadCrumbItem,
} from "@/components/Common/Breadcrumbs";

import {
    heroSectionDummy,
    type HeroSlide,
} from "@/data/HeroSectionData";

import HeroSlideDetail from "@/components/DisplayManage/HeroSection/HeroSlideDetail";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function HeroSlideDetailPage({ params }: PageProps) {
    // ✅ Next 15: params adalah Promise
    const { id } = await params;

    const slides: HeroSlide[] = heroSectionDummy.data.heroSection.slides;
    const slide = slides.find((s) => s.id === id);

    if (!slide) {
        notFound();
    }

    // ✅ Breadcrumb items (konsisten dengan Add Hero)
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: "Home", href: "/beranda" },
        { name: "Hero Section", href: "/beranda/display/hero" },
        { name: "Detail Hero Slide", disabled: true },
    ];

    return (
        <div className="space-y-6">
            {/* Header + Breadcrumb */}
            <BreadCrumbs
                items={breadcrumbItems}
                title={slide.villaName}
                description={`Detail hero slide untuk villa "${slide.villaName}".`}
            />

            {/* Card utama detail */}
            <section className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm px-4 py-5 sm:px-6 sm:py-6">
                <HeroSlideDetail slide={slide} />
            </section>
        </div>
    );
}
