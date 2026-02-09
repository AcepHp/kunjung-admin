import BreadCrumbs, {
    BreadCrumbItem,
} from "@/components/Common/Breadcrumbs";
import { getHeroSlideById } from "@/services/HeroSectionService";
import HeroSlideDetail from "@/components/DisplayManage/HeroSection/HeroSlideDetail";
import { notFound } from "next/navigation";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function HeroSlideDetailPage({ params }: PageProps) {
    const { id } = await params;

    let slide;
    try {
        slide = await getHeroSlideById(id);
    } catch (error) {
        console.error("Error fetching slide detail:", error);
        return notFound();
    }

    if (!slide) {
        return notFound();
    }

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: "Home", href: "/beranda" },
        { name: "Hero Section", href: "/beranda/display/hero" },
        { name: "Detail Hero Slide", disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title={slide.title}
                description={`Detail hero slide for "${slide.title}".`}
            />

            <section className="rounded-2xl border border-[#E9D6C6] bg-white shadow-sm px-4 py-5 sm:px-6 sm:py-6">
                <HeroSlideDetail slide={slide} />
            </section>
        </div>
    );
}
