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
                {
                    id: "slide_5",
                    villaName: "Aru House",
                    villaSubtitle: "Simple Living Surrounded By Greenery",
                    image: { url: "/stays.png", alt: "Aru House" },
                    order: 5,
                    isActive: true,
                },
                {
                    id: "slide_6",
                    villaName: "Kala Retreat",
                    villaSubtitle: "Slow Living With Mountain Breeze",
                    image: { url: "/stays.png", alt: "Kala Retreat" },
                    order: 6,
                    isActive: true,
                },
                {
                    id: "slide_7",
                    villaName: "Ruma Pita",
                    villaSubtitle: "Intimate Stay With Local Touch",
                    image: { url: "/stays.png", alt: "Ruma Pita" },
                    order: 7,
                    isActive: true,
                },
                {
                    id: "slide_8",
                    villaName: "Langit House",
                    villaSubtitle: "Open Space Living With Sky Views",
                    image: { url: "/stays.png", alt: "Langit House" },
                    order: 8,
                    isActive: true,
                },
                {
                    id: "slide_9",
                    villaName: "Amerta Villa",
                    villaSubtitle: "Serene Space Designed For Rest",
                    image: { url: "/stays.png", alt: "Amerta Villa" },
                    order: 9,
                    isActive: true,
                },
                {
                    id: "slide_10",
                    villaName: "Banyu House",
                    villaSubtitle: "Refreshing Stay With Natural Light",
                    image: { url: "/stays.png", alt: "Banyu House" },
                    order: 10,
                    isActive: true,
                },
                {
                    id: "slide_11",
                    villaName: "Tara Residence",
                    villaSubtitle: "Modern Comfort With Timeless Style",
                    image: { url: "/stays.png", alt: "Tara Residence" },
                    order: 11,
                    isActive: true,
                },
                {
                    id: "slide_12",
                    villaName: "Niskala House",
                    villaSubtitle: "Private Living With Calm Atmosphere",
                    image: { url: "/stays.png", alt: "Niskala House" },
                    order: 12,
                    isActive: true,
                },
                {
                    id: "slide_13",
                    villaName: "Soma Villa",
                    villaSubtitle: "Balanced Living In A Cozy Space",
                    image: { url: "/stays.png", alt: "Soma Villa" },
                    order: 13,
                    isActive: true,
                },
            ],
        },
    },
};
