import React from "react";
import BreadCrumbs, {
    BreadCrumbItem,
} from "@/components/Common/Breadcrumbs";
import AddHeroSlideForm from "@/components/DisplayManage/HeroSection/AddHeroSlideForm";

export default function Page() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: "Home", href: "/beranda" },
        { name: "Hero Section", href: "/beranda/display/hero" },
        { name: "Add Hero Slide", disabled: true },
    ];

    return (
        <div className="space-y-6">
            {/* Header + Breadcrumb */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Add 4 Hero Slides"
                description="Configure all 4 hero slides at once for the homepage."
            />

            {/* Form Add Slide (pure UI, no logic) */}
            <AddHeroSlideForm />
        </div>
    );
}
