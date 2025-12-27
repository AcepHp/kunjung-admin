'use client';

import { useRouter, useParams } from 'next/navigation';
import ServiceRecommendationEdit, {
    ServiceRecommendationForm,
} from '@/components/DisplayManage/ServiceRecommendation/ServiceRecommendationEdit';
import { ServiceSectionData } from '@/data/ServiceSectionData';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';

export default function ServiceRecommendationEditPage() {
    const router = useRouter();
    const params = useParams();

    const id = Number(params.id);

    const service = ServiceSectionData.find(
        (item) => item.id === id
    );

    if (!service) {
        return (
            <div className="p-6 text-sm text-gray-500">
                Data service tidak ditemukan
            </div>
        );
    }

    const initialData: ServiceRecommendationForm = {
        title: service.title,
        imageUrl: service.imageUrl,
    };

    const breadcrumbItems: BreadCrumbItem[] = [
        {
            name: 'Home',
            href: '/beranda',
        },
        {
            name: 'Service Recommendation',
            href: '/beranda/display/service-section',
        },
        {
            name: 'Edit Service',
            disabled: true,
        },
    ];


    const handleSave = (data: ServiceRecommendationForm) => {
        console.log('SAVE DATA:', data);

        // 🔹 nanti ganti API PUT / PATCH
        router.push('/beranda/display/service-section');
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="space-y-6">
            {/* ===== BREADCRUMBS ===== */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Service Recommendation"
                description="Manage recommended services displayed on the homepage."
            />

            {/* ===== FORM ===== */}
            <ServiceRecommendationEdit
                initialData={initialData}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </div>
    );
}
