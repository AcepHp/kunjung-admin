export type SocialMediaData = {
    id: number;
    name: string;
    label: string;
    url: string;
};

export const SocialMediaData: SocialMediaData[] = [
    {
        id: 1,
        name: 'email',
        label: 'info@kunjungfamily.com',
        url: 'mailto:info@kunjungfamily.com',
    },
    {
        id: 2,
        name: 'instagram',
        label: 'Instagram',
        url: 'https://instagram.com/kunjungfamily',
    },
    {
        id: 3,
        name: 'tiktok',
        label: 'TikTok',
        url: 'https://tiktok.com/@kunjungfamily',
    },
    {
        id: 4,
        name: 'youtube',
        label: 'YouTube',
        url: 'https://youtube.com/@kunjungfamily',
    },
];
