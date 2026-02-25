'use client';

import { useState } from 'react';
import ServiceRecommendationFormItem from './ServiceRecommendationFormItem';

type Props = {
    initialData?: {
        title: string;
        subtitle: string;
        imageUrl: string;
    };
    onSave: (formData: FormData) => void;
    onCancel: () => void;
    isSaving?: boolean;
};

export default function ServiceRecommendationEdit({
    initialData,
    onSave,
    onCancel,
    isSaving,
}: Props) {
    const [itemData, setItemData] = useState({
        title: initialData?.title || '',
        subtitle: initialData?.subtitle || '',
        imageFile: null as File | null
    });

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('title', itemData.title);
        formData.append('subtitle', itemData.subtitle);
        if (itemData.imageFile) {
            formData.append('image', itemData.imageFile);
        }
        onSave(formData);
    };

    const isValid = itemData.title.trim() !== '' && itemData.subtitle.trim() !== '' && (itemData.imageFile !== null || initialData?.imageUrl);

    return (
        <div className="space-y-6">
            <ServiceRecommendationFormItem
                index={1}
                initialTitle={initialData?.title}
                initialSubtitle={initialData?.subtitle}
                initialImageUrl={initialData?.imageUrl}
                onChange={(data) => setItemData(data)}
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSaving}
                    className="rounded-full border border-[#E0D4C6] px-6 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSaving || !isValid}
                    className="rounded-full bg-[#7A3E2C] px-8 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all uppercase tracking-widest disabled:opacity-50 disabled:bg-gray-400"
                >
                    {isSaving ? 'Saving...' : (initialData ? 'Save Changes' : 'Add Recommendation')}
                </button>
            </div>
        </div>
    );
}


