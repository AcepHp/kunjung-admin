'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import ClosingEdit from '@/components/BrandEthos/Edit/ClosingEdit';
import { brandEthosResponse } from '@/data/BrandEthos';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Page() {
    const router = useRouter();
    const data = brandEthosResponse.data;

    const [label, setLabel] = useState(data.closingStatement.label);
    const [text, setText] = useState(data.closingStatement.text);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Closing', disabled: true },
    ];

    const handleSave = () => {
        console.log('SAVING CLOSING:', { label, text });
        router.push('/beranda/brand-ethos');
    };

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
            />
        </div>
    );
}
