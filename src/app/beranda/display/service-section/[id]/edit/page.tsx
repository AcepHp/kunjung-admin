'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ServiceRecommendationEdit from '@/components/DisplayManage/ServiceRecommendation/ServiceRecommendationEdit';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { getServiceRecommendationById, updateServiceRecommendation, ServiceRecommendationApiResponse } from '@/services/ServiceRecommendationService';

export default function ServiceRecommendationEditPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [service, setService] = useState<ServiceRecommendationApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getServiceRecommendationById(id);
                setService(data);
            } catch (error) {
                console.error("Failed to fetch service data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Service Recommendation', href: '/beranda/display/service-section' },
        { name: 'Edit Service', disabled: true },
    ];

    const handleSave = async (formData: FormData) => {
        setIsSaving(true);
        try {
            await updateServiceRecommendation(id, formData);
            router.push('/beranda/display/service-section');
            router.refresh();
        } catch (error) {
            console.error('Failed to update service recommendation:', error);
            alert("Failed to update service recommendation. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-gray-500 animate-pulse font-medium uppercase tracking-[0.2em] text-xs">Loading Data...</p>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="p-6 text-sm text-red-500 font-medium">
                Data service tidak ditemukan. Sila periksa koneksi atau URL anda.
            </div>
        );
    }

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
                initialData={{
                    title: service.title,
                    subtitle: service.subtitle,
                    imageUrl: service.imageUrl
                }}
                onSave={handleSave}
                onCancel={handleCancel}
                isSaving={isSaving}
            />
        </div>
    );
}

