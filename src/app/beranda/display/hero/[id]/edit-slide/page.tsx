import BreadCrumbs, {
    BreadCrumbItem,
} from "@/components/Common/Breadcrumbs";
import { getHeroSlideById } from "@/services/HeroSectionService";
import EditHeroSlideForm from "@/components/DisplayManage/HeroSection/EditHeroSlideForm";
import { notFound } from "next/navigation";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditHeroSlidePage({ params }: PageProps) {
    const { id } = await params;

    let slide;
    try {
        slide = await getHeroSlideById(id);
    } catch (error) {
        console.error("Error fetching slide for edit:", error);
        return notFound();
    }

    if (!slide) {
        return notFound();
    }

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: "Home", href: "/beranda" },
        { name: "Hero Section", href: "/beranda/display/hero" },
        { name: "Edit Hero Slide", disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Hero Slide"
                description={`Update hero slide for "${slide.title}".`}
            />

            <EditHeroSlideForm slide={slide} />
        </div>
    );
}
