
export const getPlatformFromUrl = (url: string): string => {
    if (!url) return 'default';
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('instagram')) return 'instagram';
    if (lowerUrl.includes('tiktok')) return 'tiktok';
    if (lowerUrl.includes('youtube')) return 'youtube';
    if (lowerUrl.includes('mailto') || lowerUrl.includes('@')) return 'email';
    return 'default';
};
