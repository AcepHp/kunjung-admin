'use client';

import { useEffect, useState } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import TncSection from '@/components/Tnc/TncSection';
import TncEmptyState from '@/components/Tnc/TncEmptyState';
import { getTnc, TncPayload } from '@/services/TncService';

import TncSkeleton from '@/components/Tnc/TncSkeleton';

// Helper to check if data is empty or has no meaningful content
const isDataEmpty = (data: TncPayload | null): boolean => {
    if (!data) return true;
    // Check if all fields are empty or only contain whitespace/empty HTML
    const isEmpty = (str: string | undefined) => !str || str.trim() === '' || str.trim() === '<p></p>';
    return isEmpty(data.transactionTerms) &&
        isEmpty(data.refundCancellationPolicy) &&
        isEmpty(data.agreementText);
};

export default function TermsRefundPage() {
    const [data, setData] = useState<TncPayload | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await getTnc();
                setData(apiData);
                setIsEmpty(isDataEmpty(apiData));
            } catch (error) {
                console.warn('Failed to fetch T&C:', error);
                // API returns 404 or error = no data exists
                setData(null);
                setIsEmpty(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Terms & Refund', disabled: true },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <BreadCrumbs
                    items={breadcrumbItems}
                    title="Terms & Conditions + Refund Policy"
                    description="Manage the terms and conditions displayed to users."
                    isLoading={true}
                />
                <TncSkeleton />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Terms & Conditions + Refund Policy"
                description="Manage the terms and conditions displayed to users."
            />
            {isEmpty || !data ? (
                <TncEmptyState />
            ) : (
                <TncSection data={data} />
            )}
        </div>
    );
}

