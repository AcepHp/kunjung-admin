import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import TestimonialForm from '@/components/Testimonial/TestimonialForm';

export default function Page() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Testimonials', href: '/beranda/testimonial' },
        { name: 'Add Testimonial', disabled: true },
    ];

    return (
        <div className="space-y-8">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Add Testimonial"
                description="Create a new guest testimonial"
            />

            <div>
                <TestimonialForm />
            </div>
        </div>
    );
}
