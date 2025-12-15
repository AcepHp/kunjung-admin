'use client';

import { useParams, useRouter } from 'next/navigation';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { brandStoryData } from '@/data/BrandStoryData';
import BrandStoryImageEditSection from '@/components/DisplayManage/BrandStory/BrandStoryImageEditSection';

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const image = brandStoryData.images.find(
        (img) => img.id === id
    );

    if (!image) {
        return (
            <div className="text-sm text-gray-500">
                Image not found.
            </div>
        );
    }

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        {
            name: 'Brand Story',
            href: '/beranda/display/brand-story',
        },
        { name: 'Edit Image', disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Brand Story Image"
                description="Update image and visibility for the brand story section."
            />

            <BrandStoryImageEditSection
                image={image}
                onCancel={() =>
                    router.push('/beranda/display/brand-story')
                }
                onSave={(updated) => {
                    console.log('UPDATED IMAGE:', updated);

                    // 🔜 NANTI:
                    // PUT /brand-story/image/:id
                    router.push('/beranda/display/brand-story');
                }}
            />
        </div>
    );
}
