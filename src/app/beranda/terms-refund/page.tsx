'use client';

import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import TncSection from '@/components/Tnc/TncSection';
import { tncData } from '@/data/TncData';

export default function page() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Terms & Conditions', disabled: true },
    ];

    return (
        <div className="space-y-6">
            {/* ===== BREADCRUMBS ===== */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Terms & Conditions"
                description="Manage terms, conditions, and refund policy displayed on Kunjung website."
            />

            {/* ===== CONTENT ===== */}
            <TncSection data={tncData} />
        </div>
    );
}
