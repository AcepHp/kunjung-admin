'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import VisionMissionEdit from '@/components/BrandEthos/Edit/VisionMissionEdit';
import { brandEthosResponse } from '@/data/BrandEthos';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Page() {
    const router = useRouter();
    const data = brandEthosResponse.data;

    const [vision, setVision] = useState(data.vision.description);
    const [mission, setMission] = useState(data.mission.description);
    const [visionImage, setVisionImage] = useState(data.vision.image);
    const [missionImage, setMissionImage] = useState(data.mission.image);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Vision & Mission', disabled: true },
    ];

    const handleSave = () => {
        console.log('SAVING VISION & MISSION:', { vision, visionImage, mission, missionImage });
        router.push('/beranda/brand-ethos');
    };

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
            />
        </div>
    );
}
