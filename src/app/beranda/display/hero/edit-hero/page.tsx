// app/beranda/display/hero/edit-hero/page.tsx

'use client';

import React from 'react';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { heroSectionDummy } from '@/data/HeroSectionData';
import HeroCopywritingEdit from '@/components/DisplayManage/HeroSection/HeroCopyWritingEdit';

export default function EditHeroPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Hero Section', href: '/beranda/display/hero' },
        { name: 'Edit Hero-Section', disabled: true },
    ];

    return (
        <div className="space-y-8">
            {/* Breadcrumb + Title */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Hero Copywriting"
                description="Update the headline, description, and signature of your hero section."
            />

            {/* Edit Form Component (UI Only) */}
            <HeroCopywritingEdit
                data={heroSectionDummy}
                onCancel={() => {}}
                onSave={() => {}}
            />
        </div>
    );
}
