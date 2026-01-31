'use client';

import React, { useEffect, useState } from "react";
import HeroCopywriting from "@/components/DisplayManage/HeroSection/HeroCopyWriting";
import HeroCopywritingSkeleton from "@/components/DisplayManage/HeroSection/HeroCopywritingSkeleton";
import HeroTable from "@/components/DisplayManage/HeroSection/HeroTable";
import { heroSectionDummy } from "@/data/HeroSectionData";
import BreadCrumbs, {
    BreadCrumbItem,
} from "@/components/Common/Breadcrumbs";
import { getHeroSection, HeroSectionApiResponse, getHeroSlides, HeroSlideApiResponse } from "@/services/HeroSectionService";

export default function Page() {
    const [heroData, setHeroData] = useState<HeroSectionApiResponse | null>(null);
    const [slides, setSlides] = useState<HeroSlideApiResponse[]>([]);
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
                const [heroDetail, slidesData] = await Promise.all([
                    getHeroSection(),
                    getHeroSlides()
                ]);

                if (!heroDetail) {
                    setHeroData(fallbackData);
                    setIsDataEmpty(true);
                } else {
                    setHeroData(heroDetail);
                    setIsDataEmpty(false);
                }

                setSlides(slidesData || []);
            } catch (error) {
                console.warn("Failed to fetch data from API, using fallback for hero detail:", error);
                setHeroData(fallbackData);
                setIsDataEmpty(true);

                // For slides, we don't really have a fallback other than empty array or dummy
                // Let's keep dummy if needed, but user wants API integration.
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

            <HeroTable slides={slides} isLoading={isLoading} />
        </div>
    );
}
