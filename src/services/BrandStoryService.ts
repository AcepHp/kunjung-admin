import axios from "@/libs/axios";

export interface BrandStoryApiResponse {
    id: string;
    brandName: string;
    headlineStory: string;
    subHeadlineStory: string;
    descriptionStory: string;
}

export interface BrandStoryResponse {
    message: string;
    data: BrandStoryApiResponse;
}

export interface UpdateBrandStoryPayload {
    brandName: string;
    headlineStory: string;
    subHeadlineStory: string;
    descriptionStory: string;
}

export const getBrandStory = async (): Promise<BrandStoryApiResponse> => {
    try {
        const response = await axios.get<BrandStoryResponse>('/dashboard/brand-story');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching brand story data:", error);
        throw error;
    }
};

export const updateBrandStory = async (id: string, payload: UpdateBrandStoryPayload): Promise<void> => {
    try {
        console.log(`Updating brand story: /dashboard/brand-story/${id}`, payload);
        await axios.patch(`/dashboard/brand-story/${id}`, payload);
    } catch (error) {
        console.error("Error updating brand story:", error);
        throw error;
    }
};

export const createBrandStory = async (payload: UpdateBrandStoryPayload): Promise<void> => {
    try {
        console.log(`Creating brand story: /dashboard/brand-story`, payload);
        await axios.post(`/dashboard/brand-story`, payload);
    } catch (error) {
        console.error("Error creating brand story:", error);
        throw error;
    }
};

