import VillaForm from '@/components/Property/VillaForm';
import BreadCrumbs from '@/components/Common/Breadcrumbs';

export default function AddVillaPage() {
    return (
        <div className="space-y-8 w-full max-w-[112rem] mx-auto px-4 sm:px-6 lg:px-8">
            <BreadCrumbs
                items={[
                    { name: 'Dashboard', href: '/beranda' },
                    { name: 'Manage Property', href: '/beranda/manage-property' },
                    { name: 'Add Property', disabled: true },
                ]}
                title="Add New Villa"
                description="Create a new listing for your property."
            />

            <VillaForm />
        </div>
    );
}
