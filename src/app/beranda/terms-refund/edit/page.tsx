'use client';

import { useRouter } from 'next/navigation';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import TncSectionEdit from '@/components/Tnc/TncSectionEdit';
import { tncData, TncData } from '@/data/TncData';

export default function TncEditPage() {
    const router = useRouter();

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Terms & Conditions', href: '/beranda/terms-refund' },
        { name: 'Edit', disabled: true },
    ];

    const handleSave = (data: TncData) => {
        console.log('SAVE TNC DATA:', data);

        // 🔹 TODO:
        // panggil API PUT / PATCH untuk simpan T&C
        // await api.updateTnc(data)

        router.push('/beranda/display/terms-refund');
    };

    return (
        <div className="space-y-6">
            {/* ===== BREADCRUMBS ===== */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Terms & Conditions"
                description="Update Kunjung Terms & Conditions and Refund Policy content."
            />

            {/* ===== EDIT FORM ===== */}
            <TncSectionEdit
                initialData={tncData}
                onSave={handleSave}
            />
        </div>
    );
}
