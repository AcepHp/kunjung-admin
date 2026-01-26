'use client';

import React, { useEffect, useState } from "react";
import HeroCopywriting from "@/components/DisplayManage/HeroSection/HeroCopyWriting";
import HeroCopywritingSkeleton from "@/components/DisplayManage/HeroSection/HeroCopywritingSkeleton";
import HeroTable from "@/components/DisplayManage/HeroSection/HeroTable";
import { heroSectionDummy } from "@/data/HeroSectionData";
import BreadCrumbs, {
    BreadCrumbItem,
} from "@/components/Common/Breadcrumbs";
import { getHeroSection, HeroSectionApiResponse } from "@/services/HeroSectionService";

export default function Page() {
    const [heroData, setHeroData] = useState<HeroSectionApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: "Home", href: "/beranda" },
        { name: "Hero Section", disabled: true },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHeroSection();
                setHeroData(data);
            } catch (error) {
                console.error("Failed to fetch hero section:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-10">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Manage Hero Section"
                description="Control homepage hero copywriting and slides"
            />

            {isLoading ? (
                <HeroCopywritingSkeleton />
            ) : heroData ? (
                <HeroCopywriting data={heroData} />
            ) : (
                <div className="text-gray-500">Failed to load hero data.</div>
            )}

            <HeroTable slides={heroSectionDummy.data.heroSection.slides} />
        </div>
    );
}
