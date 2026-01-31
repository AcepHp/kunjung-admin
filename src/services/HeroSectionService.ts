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

export interface HeroSlideApiResponse {
    id: string;
    imageUrl: string;
    title: string;
    subtitle: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface HeroSlidesResponse {
    message: string;
    data: HeroSlideApiResponse[];
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

export const createHeroSection = async (payload: UpdateHeroSectionPayload): Promise<void> => {
    try {
        console.log(`Creating hero section: /dashboard/hero-section`, payload);
        await axios.post(`/dashboard/hero-section`, payload);
    } catch (error) {
        console.error("Error creating hero section:", error);
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

export const getHeroSlides = async (): Promise<HeroSlideApiResponse[]> => {
    try {
        const response = await axios.get<HeroSlidesResponse>('/dashboard-images/hero-section');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching hero slides data:", error);
        throw error;
    }
};

export const getHeroSlideById = async (id: string): Promise<HeroSlideApiResponse> => {
    try {
        const response = await axios.get<{ message: string, data: HeroSlideApiResponse }>(`/dashboard-images/hero-section/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching hero slide by id:", error);
        throw error;
    }
};

export const createHeroSlide = async (formData: FormData): Promise<void> => {
    try {
        await axios.post('/dashboard-images/hero-section', formData);
    } catch (error: any) {
        console.error("Error creating hero slide:", error.response?.data || error.message);
        throw error;
    }
};

export const updateHeroSlide = async (id: string, formData: FormData): Promise<void> => {
    try {
        // Always use FormData (matching Postman success)
        console.log(`Updating hero slide: /dashboard-images/hero-section/${id}`);
        await axios.patch(`/dashboard-images/hero-section/${id}`, formData);
    } catch (error: any) {
        console.error("Error updating hero slide:", error.response?.data || error.message || error);
        // Explicitly log the response details for debugging 400 errors
        if (error.response) {
            console.error("Response Details (Status):", error.response.status);
            console.error("Response Details (Data):", JSON.stringify(error.response.data, null, 2));
        }
        throw error;
    }
};
