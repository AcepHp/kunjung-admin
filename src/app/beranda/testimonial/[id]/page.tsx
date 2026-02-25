import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import TestimonialDetail from '@/components/Testimonial/TestimonialDetail';

export default function TestimonialDetailPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Testimonial', href: '/beranda/testimonial' },
        { name: 'Detail', disabled: true },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Testimonial Detail"
                description="View detailed customer testimonial."
            />

            {/* Content */}
            <TestimonialDetail />
        </div>
    );
}
