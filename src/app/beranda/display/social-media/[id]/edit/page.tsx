'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import SocialMediaSectionEdit from '@/components/DisplayManage/SocialMedia/SocialMediaSectionEdit';
import { getSocialMediaList, updateSocialMedia } from '@/services/SocialMediaService';
import { getPlatformFromUrl } from '@/data/utils';
import type { SocialMediaData } from '@/data/SocialMediaData';

import SocialMediaEditSkeleton from '@/components/DisplayManage/SocialMedia/SocialMediaEditSkeleton';

export default function SocialMediaEditPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string; // UUID string

    const [socialMedia, setSocialMedia] = useState<SocialMediaData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await getSocialMediaList();
                const foundItem = apiData.find((item) => item.id === id);

                if (foundItem) {
                    setSocialMedia({
                        id: foundItem.id,
                        name: foundItem.title,
                        url: foundItem.url,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch social media for edit:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <BreadCrumbs
                    items={[
                        { name: 'Home', href: '/beranda' },
                        { name: 'Social Media', href: '/beranda/display/social-media' },
                        { name: 'Edit', disabled: true },
                    ]}
                    title="Edit Social Media"
                    description="Update social media label and URL displayed on Kunjung website."
                />
                <SocialMediaEditSkeleton />
            </div>
        );
    }

    if (!socialMedia) {
        return (
            <div className="p-6 text-sm text-gray-500">
                Data social media tidak ditemukan
            </div>
        );
    }

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        {
            name: 'Social Media',
            href: '/beranda/display/social-media',
        },
        {
            name: `Edit ${socialMedia.name}`,
            disabled: true,
        },
    ];

    const handleSave = async (data: SocialMediaData) => {
        setIsSaving(true);
        try {
            // Note: The API expects 'title', which corresponds to 'name' in our internal model,
            // but the user only wants to editable URL. The label/title is usually fixed per platform in this UI context,
            // but we send it back as 'title' because the API expects it.
            // However, since 'name' (platform) is read-only in UI, we just send it back as is.
            await updateSocialMedia(data.id as string, {
                title: data.name,
                url: data.url,
            });
            router.push('/beranda/display/social-media');
            router.refresh();
        } catch (error) {
            console.error('Failed to update social media:', error);
            alert('Failed to update. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="space-y-6">
            {/* ===== BREADCRUMBS ===== */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Social Media"
                description="Update social media label and URL displayed on Kunjung website."
            />

            {/* ===== FORM ===== */}
            <SocialMediaSectionEdit
                initialData={socialMedia}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </div>
    );
}
