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
    const [isDataEmpty, setIsDataEmpty] = useState(false);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: "Home", href: "/beranda" },
        { name: "Hero Section", disabled: true },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const fallbackData: HeroSectionApiResponse = {
                id: 'fallback-id',
                headline: heroSectionDummy.data.heroSection.copywriting.headline,
                description: heroSectionDummy.data.heroSection.copywriting.description,
                signature: heroSectionDummy.data.heroSection.copywriting.signature,
            };

            try {
                const data = await getHeroSection();
                if (!data) {
                    setHeroData(fallbackData);
                    setIsDataEmpty(true);
                } else {
                    setHeroData(data);
                    setIsDataEmpty(false);
                }
            } catch (error) {
                console.warn("Failed to fetch hero section from API, using fallback data:", error);
                setHeroData(fallbackData);
                setIsDataEmpty(true);
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
            ) : heroData && (
                <HeroCopywriting data={heroData} isEmpty={isDataEmpty} />
            )}

            <HeroTable slides={heroSectionDummy.data.heroSection.slides} />
        </div>
    );
}
