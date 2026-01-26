import VillaForm from '@/components/Property/VillaForm';
import { villas } from '@/data/villas';
import BreadCrumbs from '@/components/Common/Breadcrumbs';

export async function generateStaticParams() {
    return villas.map((villa) => ({
        id: villa.id.toString(),
    }));
}

export default async function EditVillaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const villa = villas.find((v) => v.id.toString() === id);

    if (!villa) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-serif font-bold text-gray-800">Villa Not Found</h2>
                <p className="text-gray-500 mt-2">The property you are looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 w-full max-w-[112rem] mx-auto px-4 sm:px-6 lg:px-8">
            <BreadCrumbs
                items={[
                    { name: 'Dashboard', href: '/beranda' },
                    { name: 'Manage Property', href: '/beranda/manage-property' },
                    { name: 'Edit Property', disabled: true },
                ]}
                title={`Edit Villa: ${villa.name}`}
                description={`Update the information and details for ${villa.name}.`}
            />

            <VillaForm initialData={villa} />
        </div>
    );
}
