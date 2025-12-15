'use client';

import { useRouter } from 'next/navigation';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { brandStoryData } from '@/data/BrandStoryData';
import BrandStoryEditSection from '@/components/DisplayManage/BrandStory/BrandStoryEditSection';

export default function Page() {
    const router = useRouter();

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        {
            name: 'Brand Story',
            href: '/beranda/display/brand-story',
        },
        { name: 'Edit', disabled: true },
    ];

    return (
        <div className="space-y-6">
            {/* ===== HEADER ===== */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Brand Story"
                description="Update brand story content displayed on the homepage."
            />

            {/* ===== EDIT FORM ===== */}
            <BrandStoryEditSection
                initialData={{
                    brandName: brandStoryData.brandName,
                    headline: brandStoryData.headline,
                    subHeadline: brandStoryData.subHeadline,
                    description: brandStoryData.description,
                }}
                onCancel={() => router.push('/beranda/display/brand-story')}
                onSave={(data) => {
                    console.log('UPDATED BRAND STORY:', data);

                    // 🔜 NANTI: panggil API PUT /brand-story
                    // fetch('/api/brand-story', {
                    //   method: 'PUT',
                    //   body: JSON.stringify(data),
                    // })

                    router.push('/beranda/display/brand-story');
                }}
            />
        </div>
    );
}
