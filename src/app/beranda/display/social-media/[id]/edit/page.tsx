'use client';

import { useRouter, useParams } from 'next/navigation';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { SocialMediaData } from '@/data/SocialMediaData';
import SocialMediaSectionEdit from '@/components/DisplayManage/SocialMedia/SocialMediaSectionEdit';

export default function SocialMediaEditPage() {
    const router = useRouter();
    const params = useParams();

    const id = Number(params.id);

    const socialMedia = SocialMediaData.find(
        (item) => item.id === id
    );

    if (!socialMedia) {
        return (
            <div className="p-6 text-sm text-gray-500">
                Data social media tidak ditemukan
            </div>
        );
    }

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Kunjung', href: '/beranda/kunjung' },
        {
            name: 'Social Media',
            href: '/beranda/display/social-media',
        },
        {
            name: `Edit ${socialMedia.name}`,
            disabled: true,
        },
    ];

    const handleSave = (data: typeof socialMedia) => {
        console.log('SAVE SOCIAL MEDIA:', data);

        // 🔹 nanti ganti API PUT / PATCH
        router.push('/beranda/display/social-media');
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
