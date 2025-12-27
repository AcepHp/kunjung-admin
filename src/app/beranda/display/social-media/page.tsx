'use client';

import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import SocialMediaSection from '@/components/DisplayManage/SocialMedia/SocialMediaSection';
import { SocialMediaData } from '@/data/SocialMediaData';

export default function SocialMediaPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Social Media', disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Social Media"
                description="Manage social media information for Kunjung website."
            />

            <SocialMediaSection data={SocialMediaData} />
        </div>
    );
}
