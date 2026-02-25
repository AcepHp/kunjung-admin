'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import TncSectionEdit from '@/components/Tnc/TncSectionEdit';
import { getTnc, updateTnc, TncPayload } from '@/services/TncService';
import { tncData } from '@/data/TncData';

import TncSkeleton from '@/components/Tnc/TncSkeleton';


export default function EditTermsRefundPage() {
    const router = useRouter();
    const [data, setData] = useState<TncPayload | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await getTnc();
                setData(apiData);
            } catch (error) {
                console.warn('Failed to fetch T&C, using fallback data:', error);
                setData(tncData);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSave = async (updatedData: TncPayload) => {
        try {
            await updateTnc(updatedData);
            router.push('/beranda/terms-refund');
            router.refresh();
        } catch (error) {
            console.error('Failed to save T&C:', error);
            alert('Failed to save changes. Please try again.');
        }
    };

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Terms & Refund', href: '/beranda/terms-refund' },
        { name: 'Edit', disabled: true },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <BreadCrumbs
                    items={breadcrumbItems}
                    title="Edit Terms & Conditions"
                    description="Update the terms, conditions, and policies."
                    isLoading={true}
                />
                <TncSkeleton />
            </div>
        );
    }

    if (!data) {
        return <div className="p-6 text-red-500">Failed to load data.</div>;
    }

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Terms & Conditions"
                description="Update the terms, conditions, and policies."
            />
            <TncSectionEdit initialData={data} onSave={handleSave} />
        </div>
    );
}
