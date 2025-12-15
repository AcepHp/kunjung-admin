import React from "react";
import HeroCopywriting from "@/components/DisplayManage/HeroSection/HeroCopyWriting";
import HeroTable from "@/components/DisplayManage/HeroSection/HeroTable";
import { heroSectionDummy } from "@/data/HeroSectionData";
import BreadCrumbs, {
    BreadCrumbItem,
} from "@/components/Common/Breadcrumbs";

export default function Page() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: "Home", href: "/beranda" },
        { name: "Hero Section", disabled: true },
    ];

    return (
        <div className="space-y-10">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Manage Hero Section"
                description="Control homepage hero copywriting and slides"
            />

            <HeroCopywriting data={heroSectionDummy} />

            <HeroTable slides={heroSectionDummy.data.heroSection.slides} />
        </div>
    );
}
