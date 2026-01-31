import axios from "@/libs/axios";

export interface BrandImageApiResponse {
    id: string;
    brandImageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface BrandImageResponse {
    message: string;
    data: BrandImageApiResponse[];
}

export interface SingleBrandImageResponse {
    message: string;
    data: BrandImageApiResponse;
}

export const getBrandImages = async (): Promise<BrandImageApiResponse[]> => {
    try {
        const response = await axios.get<BrandImageResponse>('/dashboard-images/hero-brand');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching brand images:", error);
        throw error;
    }
};

export const getBrandImageById = async (id: string): Promise<BrandImageApiResponse> => {
    try {
        const response = await axios.get<SingleBrandImageResponse>(`/dashboard-images/hero-brand/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching brand image by id:", error);
        throw error;
    }
};

export const createBrandImage = async (formData: FormData): Promise<void> => {
    try {
        await axios.post('/dashboard-images/hero-brand', formData);
    } catch (error) {
        console.error("Error creating brand image:", error);
        throw error;
    }
};

export const updateBrandImage = async (id: string, formData: FormData): Promise<void> => {
    try {
        console.log(`Updating brand image: /dashboard-images/hero-brand/${id}`);
        // Using PATCH with FormData usually requires _method: PATCH for some backends (Laravel)
        // We will try standard PATCH first as per user recent success, or ensure FormData is correct.
        // Based on recent experience with HeroSectionService, we stick to PATCH with FormData
        await axios.patch(`/dashboard-images/hero-brand/${id}`, formData);
    } catch (error: any) {
        console.error("Error updating brand image:", error.response?.data || error.message || error);
        if (error.response) {
            console.error("Response Details (Status):", error.response.status);
            console.error("Response Details (Data):", JSON.stringify(error.response.data, null, 2));
        }
        throw error;
    }
};

export const deleteBrandImage = async (id: string): Promise<void> => {
    try {
        await axios.delete(`/dashboard-images/hero-brand/${id}`);
    } catch (error) {
        console.error("Error deleting brand image:", error);
        throw error;
    }
};
