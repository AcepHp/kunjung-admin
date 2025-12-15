import { notFound } from "next/navigation";
import BreadCrumbs, {
    BreadCrumbItem,
} from "@/components/Common/Breadcrumbs";
import {
    heroSectionDummy,
    type HeroSlide,
} from "@/data/HeroSectionData";
import EditHeroSlideForm from "@/components/DisplayManage/HeroSection/EditHeroSlideForm";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditHeroSlidePage({ params }: PageProps) {
    // Next 15: params is a Promise
    const { id } = await params;

    const slides: HeroSlide[] = heroSectionDummy.data.heroSection.slides;
    const slide = slides.find((s) => s.id === id);

    if (!slide) {
        notFound();
    }

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: "Home", href: "/beranda" },
        { name: "Hero Section", href: "/beranda/display/hero" },
        { name: "Edit Hero Slide", disabled: true },
    ];

    return (
        <div className="space-y-6">
            {/* Header + Breadcrumb */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Hero Slide"
                description={`Update hero slide for "${slide.villaName}".`}
            />

            {/* Edit Form */}
            <EditHeroSlideForm slide={slide} />
        </div>
    );
}
