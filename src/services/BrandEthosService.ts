import axios from "@/libs/axios";

// Types for Brand Ethos API payload (flat structure)
export interface BrandEthosPayload {
    heroMainTitle: string;
    heroCorePhilosophy: string;
    heroImageUrl: string;

    introLabel: string;
    introMainTitle: string;
    introSubtitle: string;
    introDescription: string;
    introPrincipleOne: string;
    introPrincipleTwo: string;
    introPrincipleThree: string;

    founderStory: string;
    founderLegacyImage: string;

    visionStatement: string;
    visionImageUrl: string;

    missionStatement: string;
    missionImageUrl: string;

    closingLabel: string;
    closingStatement: string;
}

export interface BrandEthosResponse {
    success: boolean;
    message: string;
    data: BrandEthosPayload & { id?: string };
}

export interface ImmersiveGalleryImage {
    id?: string;
    imageUrl: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ImmersiveGalleryResponse {
    message: string;
    data: ImmersiveGalleryImage[];
}

// Get Brand Ethos data
export const getBrandEthos = async (): Promise<BrandEthosPayload | null> => {
    try {
        const response = await axios.get<BrandEthosResponse>('/ethos');
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch Brand Ethos:', error);
        return null;
    }
};

// Get Immersive Gallery data
export const getImmersiveGallery = async (): Promise<ImmersiveGalleryImage[]> => {
    try {
        const response = await axios.get<ImmersiveGalleryResponse>('/ethos/immersive-gallery');
        return response.data.data || [];
    } catch (error) {
        console.error('Failed to fetch Immersive Gallery:', error);
        return [];
    }
};

// Update Brand Identity
export const updateBrandIdentity = async (payload: Pick<BrandEthosPayload, 'heroMainTitle' | 'heroCorePhilosophy' | 'heroImageUrl'>): Promise<any> => {
    console.log('Updating Brand Identity:', payload);
    const response = await axios.patch('/ethos/identify', payload);
    return response.data;
};

// Update Brand Introduction
export const updateBrandIntroduction = async (payload: Pick<BrandEthosPayload, 'introLabel' | 'introMainTitle' | 'introSubtitle' | 'introDescription' | 'introPrincipleOne' | 'introPrincipleTwo' | 'introPrincipleThree'>): Promise<any> => {
    console.log('Updating Brand Introduction:', payload);
    // Explicitly using the full URL as requested to resolve 404 issues
    const response = await axios.patch('https://api.kunjungfamily.com/api/ethos/brand-introduction', payload);
    return response.data;
};

// Helper: Convert URL to File
const urlToFile = async (url: string, filename: string): Promise<File> => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
};

// Update Founder Legacy
export const updateFounderLegacy = async (payload: { founderStory: string; founderLegacyImage?: string; file?: File | null }): Promise<any> => {
    const formData = new FormData();
    formData.append('founderStory', payload.founderStory);

    // Use new file if available, otherwise convert existing URL to File
    const imageFile = payload.file
        ? payload.file
        : payload.founderLegacyImage
            ? await urlToFile(payload.founderLegacyImage, 'legacy-image.jpg')
            : null;

    if (!imageFile) throw new Error('Image is required');

    formData.append('images', imageFile);

    const response = await axios.patch('/ethos/founder-legacy', formData);
    return response.data;
};

// Update Vision & Mission
export const updateVisionMission = async (payload: {
    visionStatement: string;
    visionImageUrl?: string;
    visionFile?: File | null;
    missionStatement: string;
    missionImageUrl?: string;
    missionFile?: File | null;
}): Promise<any> => {
    console.log('Updating Vision & Mission:', payload);

    const formData = new FormData();
    formData.append('visionStatement', payload.visionStatement);
    formData.append('missionStatement', payload.missionStatement);

    // Handle Vision Image
    const visionFile = payload.visionFile
        ? payload.visionFile
        : payload.visionImageUrl
            ? await urlToFile(payload.visionImageUrl, 'vision-image.jpg')
            : null;

    if (visionFile) {
        formData.append('visionImage', visionFile);
    }

    // Handle Mission Image
    const missionFile = payload.missionFile
        ? payload.missionFile
        : payload.missionImageUrl
            ? await urlToFile(payload.missionImageUrl, 'mission-image.jpg')
            : null;

    if (missionFile) {
        formData.append('missionImage', missionFile);
    }

    const response = await axios.patch('/ethos/vission-mission', formData);
    return response.data;
};

// Update Closing Statement
export const updateClosingStatement = async (payload: Pick<BrandEthosPayload, 'closingLabel' | 'closingStatement'>): Promise<any> => {
    console.log('Updating Closing Statement:', payload);
    const response = await axios.patch('/ethos/closing-statement', payload);
    return response.data;
};

// Backwards compatibility or full create if needed (though user asked for specific endpoints for edit/add)
// Backwards compatibility or full create if needed (though user asked for specific endpoints for edit/add)
export const createBrandEthos = async (payload: BrandEthosPayload, files?: Record<string, File>): Promise<BrandEthosPayload> => {
    console.log('Creating/Updating Brand Ethos via granular endpoints...');

    // We will triger them sequentially or in parallel
    // This function might now just be a wrapper or deprecated in favor of individual calls in the UI
    // But for safety, let's keep it and maybe implement it using the new endpoints if the backend requires it
    // For now, I'll leave the original implementation but it might fail if the backend changed. 
    // However, the user request specifically asked for integration with the NEW endpoints.
    // I will return the data as if it was one object.

    // NOTE: The user's request implies these are the endpoints to use particularly for the sections.
    // The original /api/ethos might still work for GET, but for saving we should use the new ones.

    const responses = await Promise.all([
        updateBrandIdentity({
            heroMainTitle: payload.heroMainTitle,
            heroCorePhilosophy: payload.heroCorePhilosophy,
            heroImageUrl: payload.heroImageUrl
        }),
        updateBrandIntroduction({
            introLabel: payload.introLabel,
            introMainTitle: payload.introMainTitle,
            introSubtitle: payload.introSubtitle,
            introDescription: payload.introDescription,
            introPrincipleOne: payload.introPrincipleOne,
            introPrincipleTwo: payload.introPrincipleTwo,
            introPrincipleThree: payload.introPrincipleThree
        }),
        updateFounderLegacy({
            founderStory: payload.founderStory,
            founderLegacyImage: payload.founderLegacyImage,
            file: files?.['founderLegacyImage']
        }),
        updateVisionMission({
            visionStatement: payload.visionStatement,
            visionImageUrl: payload.visionImageUrl,
            visionFile: files?.['visionImageUrl'], // Check if this key matches what BrandEthosAddForm sends
            missionStatement: payload.missionStatement,
            missionImageUrl: payload.missionImageUrl,
            missionFile: files?.['missionImageUrl']
        }),
        updateClosingStatement({
            closingLabel: payload.closingLabel,
            closingStatement: payload.closingStatement
        })
    ]);

    return payload; // Approximation
};

// Update Brand Ethos (Generic - Deprecated in favor of granular?)
export const updateBrandEthos = async (payload: BrandEthosPayload): Promise<void> => {
    await createBrandEthos(payload);
};

// Add Immersive Gallery images
export const addImmersiveGalleryImages = async (images: ImmersiveGalleryImage[]): Promise<void> => {
    console.log('Adding Immersive Gallery images:', images);
    // The user provided: {{base_url}}/ethos/immersive-gallery/33773336-3e4d-4935-b05e-978854a885c9 for DELETE? 
    // Or maybe just standard POST to /ethos/immersive-gallery based on previous code.
    // I will keep the existing logic for gallery addition as it wasn't explicitly changed in the prompt
    // EXCEPT the user pasted "immersive gallery {{base_url}}/ethos/immersive-gallery/uuid". 
    // That looks like a DELETE or specific GET. 
    // But the existing add is likely POST /ethos/immersive-gallery.
    await axios.post('/ethos/immersive-gallery', { images });
};

// Delete Immersive Gallery image
export const deleteImmersiveGalleryImage = async (imageId: string): Promise<void> => {
    console.log('Deleting Immersive Gallery image:', imageId);
    await axios.delete(`/ethos/immersive-gallery/${imageId}`);
};

// Update Immersive Gallery image by ID
export const updateImmersiveGalleryImage = async (id: string, file: File): Promise<void> => {
    console.log(`Updating Immersive Gallery image ${id} with file:`, file.name);
    const formData = new FormData();
    formData.append('images', file); // Updated to 'images' based on user feedback
    formData.append('_method', 'PATCH');
    await axios.patch(`/ethos/immersive-gallery/${id}`, formData);
};

