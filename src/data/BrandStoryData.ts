export type BrandStoryData = {
    brandName: string;
    headline: string;
    subHeadline: string;
    description: string[];
    images: {
        id: string;
        url: string;
        isActive: boolean;
    }[];
};

export const brandStoryData: BrandStoryData = {
    brandName: "KUNJUNG Family",
    headline: "Your Comfort, Our Purpose",
    subHeadline: "Redefine Comfort, Discover One’s Self.",
    description: [
        "Kunjung offer more than a place to rest. Each villa is designed to make you feel at home, warm, and inspiring.",
        "Kunjung was created to be more than a place to stay; it’s a place to belong. Here, every visit is a chance to find warmth, inspiration, and comfort in a space that feels like home. Our team welcomes each guest as part of our story, crafting moments that stay with you long after you leave.",
    ],
    images: [
        {
            id: "brand_image_1",
            url: "/stays.png",
            isActive: true,
        },
        {
            id: "brand_image_2",
            url: "/stays.png",
            isActive: true,
        },
    ],
};
