'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import IntroductionEdit from '@/components/BrandEthos/Edit/IntroductionEdit';
import { getBrandEthos, updateBrandIntroduction } from '@/services/BrandEthosService';
import BrandEthosFormSkeleton from '@/components/BrandEthos/BrandEthosFormSkeleton';

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [label, setLabel] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [corePrinciples, setCorePrinciples] = useState<string[]>(['', '', '']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBrandEthos();
                if (data) {
                    setLabel(data.introLabel || '');
                    setTitle(data.introMainTitle || '');
                    setSubtitle(data.introSubtitle || '');
                    setDescription(data.introDescription || '');
                    setCorePrinciples([
                        data.introPrincipleOne || '',
                        data.introPrincipleTwo || '',
                        data.introPrincipleThree || ''
                    ]);
                }
            } catch (error) {
                console.error('Failed to fetch brand ethos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Introduction', disabled: true },
    ];

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateBrandIntroduction({
                introLabel: label,
                introMainTitle: title,
                introSubtitle: subtitle,
                introDescription: description,
                introPrincipleOne: corePrinciples[0] || '',
                introPrincipleTwo: corePrinciples[1] || '',
                introPrincipleThree: corePrinciples[2] || ''
            });
            router.push('/beranda/brand-ethos');
        } catch (error) {
            console.error('Failed to update brand introduction:', error);
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
                title="Edit Brand Introduction"
                description="Update the introduction label for the Brand Ethos."
            />

            <IntroductionEdit
                label={label} setLabel={setLabel}
                title={title} setTitle={setTitle}
                subtitle={subtitle} setSubtitle={setSubtitle}
                description={description} setDescription={setDescription}
                corePrinciples={corePrinciples} setCorePrinciples={setCorePrinciples}
                onSave={handleSave}
                onCancel={() => router.push('/beranda/brand-ethos')}
                isSubmitting={saving}
            />
        </div>
    );
}
