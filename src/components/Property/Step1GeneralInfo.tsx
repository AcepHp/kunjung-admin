import React from 'react';
import { categoryData } from '@/data/categories';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface Step1GeneralInfoProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Step1GeneralInfo({ formData, handleChange, setFormData }: Step1GeneralInfoProps) {
    const handleCategoryChange = (catId: string) => {
        const cat = categoryData.categories.find(c => c.id === catId);
        if (!cat) return;

        setFormData((prev: any) => ({
            ...prev,
            category: {
                id: cat.id,
                name: cat.name,
                subCategory: '',
                item: null
            }
        }));
    };

    const handleSubCategoryChange = (subName: string) => {
        setFormData((prev: any) => ({
            ...prev,
            category: {
                ...prev.category,
                subCategory: subName,
                item: null
            }
        }));
    };

    const handleItemChange = (item: any) => {
        setFormData((prev: any) => ({
            ...prev,
            category: {
                ...prev.category,
                item: item
            }
        }));
    };

    const currentCat = categoryData.categories.find(c => c.id === formData.category.id);
    const currentSub = currentCat?.subCategories.find(s => s.name === formData.category.subCategory);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-[#1E1E1E]">General Information</h2>
                <p className="text-gray-500 mt-2">Start with the basic identity and description of your property.</p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                {/* Category Selection Section */}
                <div className="sm:col-span-2 rounded-2xl space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-[#1E1E1E]">Property Category</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Main Category */}
                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Main Category</label>
                            <div className="relative">
                                <select
                                    value={formData.category.id}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="w-full appearance-none rounded-xl border border-[#7A3E2C] bg-white px-4 py-3.5 text-sm font-medium text-[#1E1E1E] shadow-sm outline-none transition-all focus:ring-1 focus:ring-[#7A3E2C]"
                                >
                                    {categoryData.categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                                    <ChevronRightIcon className="h-4 w-4 rotate-90 text-[#7A3E2C]" />
                                </div>
                            </div>
                        </div>

                        {/* Sub Category (Conditional) */}
                        {currentCat && currentCat.subCategories.length > 0 && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-left-2 transition-all">
                                <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Sub-Category</label>
                                <div className="relative">
                                    <select
                                        value={formData.category.subCategory}
                                        onChange={(e) => handleSubCategoryChange(e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-[#7A3E2C] bg-white px-4 py-3.5 text-sm font-medium text-[#1E1E1E] shadow-sm outline-none transition-all focus:ring-1 focus:ring-[#7A3E2C]"
                                    >
                                        <option value="" disabled>Select Sub-Category</option>
                                        {currentCat.subCategories.map(sub => (
                                            <option key={sub.id} value={sub.name}>{sub.name}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                                        <ChevronRightIcon className="h-4 w-4 rotate-90 text-[#7A3E2C]" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Item / Session (Conditional) */}
                        {currentSub && currentSub.items && currentSub.items.length > 0 && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-left-2 transition-all">
                                <label className="block text-[10px] font-bold text-[#8B6F56] uppercase tracking-widest">Specific Item / Session</label>
                                <div className="relative">
                                    <select
                                        value={typeof formData.category.item === 'string' ? formData.category.item : formData.category.item?.name || ''}
                                        onChange={(e) => {
                                            const selectedItem = currentSub.items.find(i =>
                                                (typeof i === 'string' ? i : i.name) === e.target.value
                                            );
                                            handleItemChange(selectedItem);
                                        }}
                                        className="w-full appearance-none rounded-xl border border-[#7A3E2C] bg-white px-4 py-3.5 text-sm font-medium text-[#1E1E1E] shadow-sm outline-none transition-all focus:ring-1 focus:ring-[#7A3E2C]"
                                    >
                                        <option value="" disabled>Select Item</option>
                                        {currentSub.items.map((item, idx) => {
                                            const itemName = typeof item === 'string' ? item : item.name;
                                            return <option key={idx} value={itemName}>{itemName}</option>;
                                        })}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                                        <ChevronRightIcon className="h-4 w-4 rotate-90 text-[#7A3E2C]" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#1E1E1E]">Villa Name <span className="text-[#7A3E2C]">*</span></label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter villa name"
                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200 placeholder:text-gray-400"
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
                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                </div>
                <div className="sm:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-[#1E1E1E]">Simple Description <span className="text-[#7A3E2C]">*</span></label>
                    <div className="relative">
                        <textarea
                            name="simpleDesc"
                            required
                            rows={2}
                            value={formData.simpleDesc}
                            onChange={handleChange}
                            placeholder="Example: A tranquil stay in the city"
                            className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200 placeholder:text-gray-400"
                        />
                    </div>
                </div>
                <div className="sm:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-[#1E1E1E]">Full Description <span className="text-[#7A3E2C]">*</span></label>
                    <textarea
                        name="description"
                        required
                        rows={6}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Detailed description of the property, features, and experience..."
                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3.5 text-[#1E1E1E] shadow-sm focus:border-[#7A3E2C] focus:bg-white focus:ring-1 focus:ring-[#7A3E2C] sm:text-sm outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                </div>
            </div>
        </div>
    );
}
