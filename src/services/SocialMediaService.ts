import axios from "@/libs/axios";

export interface SocialMediaApiResponse {
    id: string;
    title: string;
    url: string;
    createdAt: string;
}

export interface SocialMediaResponse {
    message: string;
    data: SocialMediaApiResponse[];
}

export const getSocialMediaList = async (): Promise<SocialMediaApiResponse[]> => {
    try {
        const response = await axios.get<SocialMediaResponse>('/dashboard/social-media');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching social media data:", error);
        throw error;
    }
};

export interface UpdateSocialMediaPayload {
    title: string;
    url: string;
}

export const updateSocialMedia = async (id: string, payload: UpdateSocialMediaPayload): Promise<void> => {
    try {
        console.log(`Updating social media: /dashboard/social-media/${id}`, payload);
        await axios.patch(`/dashboard/social-media/${id}`, payload);
    } catch (error) {
        console.error("Error updating social media:", error);
        throw error;
    }
};
