'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import ClosingEdit from '@/components/BrandEthos/Edit/ClosingEdit';
import { getBrandEthos, updateClosingStatement } from '@/services/BrandEthosService';
import BrandEthosFormSkeleton from '@/components/BrandEthos/BrandEthosFormSkeleton';

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [label, setLabel] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBrandEthos();
                if (data) {
                    setLabel(data.closingLabel || '');
                    setText(data.closingStatement || '');
                }
            } catch (error) {
                console.error('Failed to fetch closing statement:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Closing', disabled: true },
    ];

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateClosingStatement({
                closingLabel: label,
                closingStatement: text
            });
            router.push('/beranda/brand-ethos');
        } catch (error) {
            console.error('Failed to update closing statement:', error);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <BrandEthosFormSkeleton />;

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Closing Statement"
                description="Update the final message and call to action."
            />

            <ClosingEdit
                label={label} setLabel={setLabel}
                text={text} setText={setText}
                onSave={handleSave}
                onCancel={() => router.push('/beranda/brand-ethos')}
                isSubmitting={saving}
            />
        </div>
    );
}
