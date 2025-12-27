import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import BrandStatementSection from '@/components/DisplayManage/BrandStatement/BrandStatementSection';
import { brandStatementData } from '@/data/BrandStatementData';

export default function Page() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Statement', disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Brand Statement"
                description="Preview brand identity and storytelling section."
            />

            <BrandStatementSection data={brandStatementData} />
        </div>
    );
}
