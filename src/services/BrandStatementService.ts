import axios from "@/libs/axios";

export interface BrandStatementApiResponse {
    id: string;
    titleStatement: string;
    subTitleStatement: string;
    locationStatementLeft: string;
    locationStatementRight: string;
}

export interface BrandStatementResponse {
    message: string;
    data: BrandStatementApiResponse;
}

export interface UpdateBrandStatementPayload {
    titleStatement: string;
    subTitleStatement: string;
    locationStatementLeft: string;
    locationStatementRight: string;
}

export const getBrandStatement = async (): Promise<BrandStatementApiResponse> => {
    try {
        const response = await axios.get<BrandStatementResponse>('/dashboard/brand-statement');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching brand statement data:", error);
        throw error;
    }
};

export const updateBrandStatement = async (id: string, payload: UpdateBrandStatementPayload): Promise<void> => {
    try {
        console.log(`Updating brand statement: /dashboard/brand-statement/${id}`, payload);
        await axios.patch(`/dashboard/brand-statement/${id}`, payload);
    } catch (error) {
        console.error("Error updating brand statement:", error);
        throw error;
    }
};

export const createBrandStatement = async (payload: UpdateBrandStatementPayload): Promise<void> => {
    try {
        console.log(`Creating brand statement: /dashboard/brand-statement`, payload);
        await axios.post(`/dashboard/brand-statement`, payload);
    } catch (error) {
        console.error("Error creating brand statement:", error);
        throw error;
    }
};

