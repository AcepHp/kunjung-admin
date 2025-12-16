import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import ServiceRecommendation from '@/components/DisplayManage/ServiceRecommendation/ServiceRecommendation';
import { ServiceSectionData } from '@/data/ServiceSectionData';

export default function Page() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Service Recommendation', disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Service Recommendation"
                description="Manage recommended services displayed on the homepage."
            />

            <ServiceRecommendation data={ServiceSectionData} />
        </div>
    );
}
