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
        // Note: Some APIs require POST with _method=PATCH for multipart updates
        await axios.post(`/dashboard-images/hero-recomendation/${id}`, formData);
    } catch (error) {
        console.error("Error updating service recommendation:", error);
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

