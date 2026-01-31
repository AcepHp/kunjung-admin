import axios from "@/libs/axios";

export interface ServiceRecommendationApiResponse {
    id: string | number;
    title: string;
    subtitle: string;
    imageUrl: string;
}

export interface ServiceRecommendationResponse {
    message: string;
    data: ServiceRecommendationApiResponse[] | ServiceRecommendationApiResponse;
}

export const getServiceRecommendations = async (): Promise<ServiceRecommendationApiResponse[]> => {
    try {
        const response = await axios.get<ServiceRecommendationResponse>('/dashboard-images/hero-recomendation');
        return response.data.data as ServiceRecommendationApiResponse[];
    } catch (error) {
        console.error("Error fetching service recommendations:", error);
        throw error;
    }
};

export const getServiceRecommendationById = async (id: string | number): Promise<ServiceRecommendationApiResponse> => {
    try {
        const response = await axios.get<ServiceRecommendationResponse>(`/dashboard-images/hero-recomendation/${id}`);
        return response.data.data as ServiceRecommendationApiResponse;
    } catch (error) {
        console.error("Error fetching service recommendation by id:", error);
        throw error;
    }
};

export const createServiceRecommendation = async (formData: FormData): Promise<void> => {
    try {
        console.log("Creating service recommendation with fields:", Array.from(formData.keys()));
        await axios.post('/dashboard-images/hero-recomendation', formData);
    } catch (error) {
        console.error("Error creating service recommendation:", error);
        throw error;
    }
};

export const updateServiceRecommendation = async (id: string | number, formData: FormData): Promise<void> => {
    try {
        console.log(`Updating service recommendation ${id} with fields:`, Array.from(formData.keys()));
        // Note: Using PATCH to match other services (like BrandImageService) and standard REST patterns.
        await axios.patch(`/dashboard-images/hero-recomendation/${id}`, formData);
    } catch (error: any) {
        console.error("Error updating service recommendation:", error);
        if (error.response) {
            console.error("Response Details (Status):", error.response.status);
            console.error("Response Details (Data):", JSON.stringify(error.response.data, null, 2));
        }
        throw error;
    }
};

export const deleteServiceRecommendation = async (id: string | number): Promise<void> => {
    try {
        await axios.delete(`/dashboard-images/hero-recomendation/${id}`);
    } catch (error) {
        console.error("Error deleting service recommendation:", error);
        throw error;
    }
};

