'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import IntroductionEdit from '@/components/BrandEthos/Edit/IntroductionEdit';
import { brandEthosResponse } from '@/data/BrandEthos';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Page() {
    const router = useRouter();
    const data = brandEthosResponse.data;

    const [label, setLabel] = useState(data.introduction.label);
    const [title, setTitle] = useState(data.introduction.title);
    const [subtitle, setSubtitle] = useState(data.introduction.subtitle);
    const [description, setDescription] = useState(data.introduction.description);
    const [corePrinciples, setCorePrinciples] = useState(data.introduction.corePrinciples);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Introduction', disabled: true },
    ];

    const handleSave = () => {
        console.log('SAVING INTRODUCTION:', { label, title, subtitle, description, corePrinciples });
        router.push('/beranda/brand-ethos');
    };

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
            />
        </div>
    );
}
