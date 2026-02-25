import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import EditTestimonialForm from '@/components/Testimonial/EditTestimonialForm';

export default function EditTestimonialPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Testimonial', href: '/beranda/testimonial' },
        { name: 'Edit', disabled: true },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Testimonial"
                description="Modify testimonial content and rating."
            />

            {/* Content */}
            <EditTestimonialForm />
        </div>
    );
}
