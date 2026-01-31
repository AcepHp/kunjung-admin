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

import { brandStatementData } from "@/data/BrandStatementData";

// In-memory mock data state to simulate persistence when server is down
let currentMockData: BrandStatementApiResponse = {
    id: 'mock-brand-statement-id',
    titleStatement: brandStatementData.titleStatement,
    subTitleStatement: brandStatementData.subTitleStatement,
    locationStatementLeft: brandStatementData.locationStatementLeft,
    locationStatementRight: brandStatementData.locationStatementRight,
};

export const getBrandStatement = async (): Promise<BrandStatementApiResponse> => {
    try {
        const response = await axios.get<BrandStatementResponse>('/dashboard/brand-statement');
        return response.data.data;
    } catch (error) {
        console.warn("API Error (Backend 500) - Serving In-Memory Mock Data for Brand Statement");
        return currentMockData;
    }
};

export const updateBrandStatement = async (id: string, payload: UpdateBrandStatementPayload): Promise<void> => {
    try {
        console.log(`Updating brand statement: /dashboard/brand-statement/${id}`, payload);
        await axios.patch(`/dashboard/brand-statement/${id}`, payload);
    } catch (error) {
        console.warn("API Error during update (Backend 500) - Updating In-Memory Mock Data instead");

        // Simulating successful update locally
        currentMockData = {
            ...currentMockData,
            ...payload
        };

        // Return void (success) to the caller
        return Promise.resolve();
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

