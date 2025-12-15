import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { brandStoryData } from '@/data/BrandStoryData';
import BrandStorySection from '@/components/DisplayManage/BrandStory/BrandStorySection';

export default function Page() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Story', disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Brand Story"
                description="Preview and manage the brand story section displayed on the homepage."
            />

            <BrandStorySection data={brandStoryData} />
        </div>
    );
}
