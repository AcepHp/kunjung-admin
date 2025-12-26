export type HeroSlide = {
    id: string;
    villaName: string;
    villaSubtitle: string;
    image: {
        url: string;
        alt: string;
    };
    order: number;
    isActive: boolean;
};

export type HeroSectionData = {
    statusCode: number;
    status: "success" | "error";
    data: {
        heroSection: {
            layout: "image-left-text-right";
            copywriting: {
                headline: string;
                description: string;
                signature: string;
            };
            slides: HeroSlide[];
        };
    };
};

export const heroSectionDummy: HeroSectionData = {
    statusCode: 200,
    status: "success",
    data: {
        heroSection: {
            layout: "image-left-text-right",
            copywriting: {
                headline: "Curated Villas That Feel Like Home",
                description:
                    "Your insider guides to curated boutique villas in Bandung, Indonesia.",
                signature: "KUNJUNG Family",
            },
            slides: [
                {
                    id: "slide_1",
                    villaName: "Silas House",
                    villaSubtitle: "A Tranquil Stay In The Heart of Bandung",
                    image: { url: "/stays.png", alt: "Silas House" },
                    order: 1,
                    isActive: true,
                },
                {
                    id: "slide_2",
                    villaName: "Nara Villa",
                    villaSubtitle: "Minimalist Escape With Mountain Air",
                    image: { url: "/stays.png", alt: "Nara Villa" },
                    order: 2,
                    isActive: true,
                },
                {
                    id: "slide_3",
                    villaName: "Darma House",
                    villaSubtitle: "Warm Living In A Quiet Neighborhood",
                    image: { url: "/stays.png", alt: "Darma House" },
                    order: 3,
                    isActive: true,
                },
                {
                    id: "slide_4",
                    villaName: "Svara Villa",
                    villaSubtitle: "Contemporary Design With City View",
                    image: { url: "/stays.png", alt: "Svara Villa" },
                    order: 4,
                    isActive: true,
                },
            ],
        },
    },
};
