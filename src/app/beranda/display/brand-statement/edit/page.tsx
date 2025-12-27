'use client';

import { useRouter } from 'next/navigation';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import BrandStatementEditSection from '@/components/DisplayManage/BrandStatement/BrandStatementEditSection';
import { brandStatementData } from '@/data/BrandStatementData';

export default function Page() {
    const router = useRouter();

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Statement', href: '/beranda/display/brand-statement' },
        { name: 'Edit', disabled: true },
    ];

    return (
        <div className="space-y-6">
            {/* ===== HEADER ===== */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Brand Statement"
                description="Update brand headline, subtitle, and location text."
            />

            {/* ===== EDIT FORM ===== */}
            <BrandStatementEditSection
                initialData={{
                    title: brandStatementData.title,
                    subtitle: brandStatementData.subtitle,
                    locationLeft: brandStatementData.locationLeft,
                    locationRight: brandStatementData.locationRight,
                }}
                onCancel={() =>
                    router.push('/beranda/display/brand-statement')
                }
                onSave={(data) => {
                    console.log('UPDATED BRAND STATEMENT:', data);

                    // 🔜 NANTI
                    // await fetch('/api/brand-statement', {
                    //   method: 'PUT',
                    //   body: JSON.stringify(data)
                    // })

                    router.push('/beranda/display/brand-statement');
                }}
            />
        </div>
    );
}
