'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroEdit from '@/components/BrandEthos/Edit/HeroEdit';
import { getBrandEthos, updateBrandIdentity } from '@/services/BrandEthosService';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import BrandEthosFormSkeleton from '@/components/BrandEthos/BrandEthosFormSkeleton';

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // State for Hero Identity
    const [heroMainTitle, setHeroMainTitle] = useState('');
    const [heroCorePhilosophy, setHeroCorePhilosophy] = useState('');
    const [heroImageUrl, setHeroImageUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBrandEthos();
                if (data) {
                    setHeroMainTitle(data.heroMainTitle || '');
                    setHeroCorePhilosophy(data.heroCorePhilosophy || '');
                    setHeroImageUrl(data.heroImageUrl || '');
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateBrandIdentity({
                heroMainTitle,
                heroCorePhilosophy,
                heroImageUrl
            });
            router.push('/beranda/brand-ethos');
        } catch (error) {
            console.error('Failed to save:', error);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Hero', disabled: true },
    ];

    if (loading) return <BrandEthosFormSkeleton />;

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Hero Identity"
                description="Update the main visual and core philosophy statement."
            />
            <HeroEdit
                title={heroMainTitle}
                setTitle={setHeroMainTitle}
                subtitle={heroCorePhilosophy}
                setSubtitle={setHeroCorePhilosophy}
                image={{ url: heroImageUrl, alt: 'Hero Image' }}
                setImage={(val) => setHeroImageUrl(val.url)}
                onSave={handleSave}
                onCancel={() => router.push('/beranda/brand-ethos')}
                isSubmitting={saving}
            />
        </div>
    );
}
