import axios from "@/libs/axios";

export interface HeroSectionApiResponse {
    id: string;
    headline: string;
    description: string;
    signature: string;
}

export interface HeroSectionResponse {
    message: string;
    data: HeroSectionApiResponse;
}

export interface UpdateHeroSectionPayload {
    headline: string;
    description: string;
    signature: string;
}

export const getHeroSection = async (): Promise<HeroSectionApiResponse> => {
    try {
        const response = await axios.get<HeroSectionResponse>('/dashboard/hero-section');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching hero section data:", error);
        throw error;
    }
};

export const updateHeroSection = async (id: string, payload: UpdateHeroSectionPayload): Promise<void> => {
    try {
        console.log(`Updating hero section: /dashboard/hero-section/${id}`, payload);
        await axios.patch(`/dashboard/hero-section/${id}`, payload);
    } catch (error) {
        console.error("Error updating hero section:", error);
        throw error;
    }
};
