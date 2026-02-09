import React from 'react';
import { categoryData } from '@/data/categories';
import {
    CheckIcon,
    HomeIcon,
    CalendarDaysIcon,
    CameraIcon,
} from '@heroicons/react/24/outline';

interface Step1GeneralInfoProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const iconMap: any = {
    stay: <HomeIcon className="h-4 w-4" />,
    event: <CalendarDaysIcon className="h-4 w-4" />,
    shoot: <CameraIcon className="h-4 w-4" />,
};

export default function Step1GeneralInfo({ formData, handleChange, setFormData }: Step1GeneralInfoProps) {

    const toggleSelection = (catId: string, subCategoryName: string = '', itemName: any = null) => {
        const cat = categoryData.categories.find(c => c.id === catId);
        if (!cat) return;

        const selection = {
            id: cat.id,
            name: cat.name,
            subCategory: subCategoryName,
            item: itemName
        };

        const isSelected = formData.categories.some((item: any) =>
            item.id === selection.id &&
            item.subCategory === selection.subCategory &&
            (typeof selection.item === 'string'
                ? item.item === selection.item
                : item.item?.name === selection.item?.name)
        );

        if (isSelected) {
            setFormData((prev: any) => ({
                ...prev,
                categories: prev.categories.filter((item: any) =>
                    !(item.id === selection.id &&
                        item.subCategory === selection.subCategory &&
                        (typeof selection.item === 'string'
                            ? item.item === selection.item
                            : item.item?.name === selection.item?.name))
                )
            }));
        } else {
            setFormData((prev: any) => ({
                ...prev,
                categories: [...prev.categories, selection]
            }));
        }
    };

    const checkIfSelected = (catId: string, subCategoryName: string = '', itemName: any = null) => {
        return formData.categories.some((item: any) =>
            item.id === catId &&
            item.subCategory === subCategoryName &&
            (itemName === null ? item.item === null :
                (typeof itemName === 'string'
                    ? item.item === itemName
                    : item.item?.name === itemName?.name))
        );
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-2">
                <h2 className="text-2xl font-serif font-bold text-[#1E1E1E]">Property Categories</h2>
                <p className="text-gray-500 mt-2 text-sm">Select one or more categories that describe your villa.</p>
            </div>

            <div className="space-y-8">
                {/* Simplified Category Groups */}
                {categoryData.categories.map((cat) => (
                    <div key={cat.id} className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                            <span className="text-[#7A3E2C]">{iconMap[cat.id]}</span>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">{cat.name}</h3>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {cat.subCategories.length === 0 ? (
                                // Flat Category (e.g. Stay)
                                <button
                                    type="button"
                                    onClick={() => toggleSelection(cat.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${checkIfSelected(cat.id)
                                            ? 'bg-[#7A3E2C] text-white shadow-md shadow-[#7A3E2C]/20 scale-[1.02]'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:border-[#7A3E2C] hover:text-[#7A3E2C]'
                                        }`}
                                >
                                    {checkIfSelected(cat.id) && <CheckIcon className="h-4 w-4" />}
                                    {cat.name}
                                </button>
                            ) : (
                                // Grouped Sub-categories and Items as Pills
                                cat.subCategories.flatMap(sub =>
                                    sub.items.map((item, idx) => {
                                        const itemName = typeof item === 'string' ? item : item.name;
                                        const isSelected = checkIfSelected(cat.id, sub.name, item);
                                        return (
                                            <button
                                                key={`${sub.id}-${idx}`}
                                                type="button"
                                                onClick={() => toggleSelection(cat.id, sub.name, item)}
                                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${isSelected
                                                        ? 'bg-[#7A3E2C] text-white shadow-md shadow-[#7A3E2C]/20 scale-[1.02]'
                                                        : 'bg-white border border-gray-200 text-gray-600 hover:border-[#7A3E2C] hover:text-[#7A3E2C]'
                                                    }`}
                                            >
                                                {isSelected && <CheckIcon className="h-4 w-4" />}
                                                {itemName}
                                                <span className="opacity-40 text-[10px] ml-1">{cat.name.charAt(0)}</span>
                                            </button>
                                        );
                                    })
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Basic Info Inputs */}
            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#1E1E1E]">Villa Name <span className="text-[#7A3E2C]">*</span></label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter villa name"
                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#1E1E1E]">Location Area <span className="text-[#7A3E2C]">*</span></label>
                    <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Dago, Bandung"
                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200"
                    />
                </div>
                <div className="sm:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-[#1E1E1E]">Simple Description <span className="text-[#7A3E2C]">*</span></label>
                    <textarea
                        name="simpleDesc"
                        required
                        rows={2}
                        value={formData.simpleDesc}
                        onChange={handleChange}
                        placeholder="A tranquil stay in the city"
                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200"
                    />
                </div>
                <div className="sm:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-[#1E1E1E]">Full Description <span className="text-[#7A3E2C]">*</span></label>
                    <textarea
                        name="description"
                        required
                        rows={6}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Detailed description..."
                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200"
                    />
                </div>
            </div>
        </div>
    );
}
