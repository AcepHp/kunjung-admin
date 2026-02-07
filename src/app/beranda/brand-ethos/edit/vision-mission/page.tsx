'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import VisionMissionEdit from '@/components/BrandEthos/Edit/VisionMissionEdit';
import { getBrandEthos, updateVisionMission } from '@/services/BrandEthosService';
import BrandEthosFormSkeleton from '@/components/BrandEthos/BrandEthosFormSkeleton';

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [vision, setVision] = useState('');
    const [mission, setMission] = useState('');
    const [visionImage, setVisionImage] = useState<{ url: string; alt: string; file?: File }>({ url: '', alt: 'Vision' });
    const [missionImage, setMissionImage] = useState<{ url: string; alt: string; file?: File }>({ url: '', alt: 'Mission' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBrandEthos();
                if (data) {
                    setVision(data.visionStatement || '');
                    setMission(data.missionStatement || '');
                    setVisionImage({ url: data.visionImageUrl || '', alt: 'Vision' });
                    setMissionImage({ url: data.missionImageUrl || '', alt: 'Mission' });
                }
            } catch (error) {
                console.error('Failed to fetch vision/mission:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Vision & Mission', disabled: true },
    ];

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateVisionMission({
                visionStatement: vision,
                visionImageUrl: visionImage.url,
                visionFile: visionImage.file,
                missionStatement: mission,
                missionImageUrl: missionImage.url,
                missionFile: missionImage.file
            });
            router.push('/beranda/brand-ethos');
        } catch (error) {
            console.error('Failed to update vision/mission:', error);
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
                title="Edit Vision & Mission"
                description="Refine the core vision and mission statements."
            />

            <VisionMissionEdit
                vision={vision} setVision={setVision}
                visionImage={visionImage} setVisionImage={setVisionImage}
                mission={mission} setMission={setMission}
                missionImage={missionImage} setMissionImage={setMissionImage}
                onSave={handleSave}
                onCancel={() => router.push('/beranda/brand-ethos')}
                isSubmitting={saving}
            />
        </div>
    );
}
