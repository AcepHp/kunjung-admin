'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const MapPicker = dynamic(() => import('./MapPicker'), {
    ssr: false,
    loading: () => (
        <div className="h-full flex flex-col items-center justify-center text-[#7A3E2C]/20 space-y-4 bg-[#FAF8F6]">
            <div className="animate-pulse">Loading Map...</div>
        </div>
    )
});

import { categorizedAmenities } from '@/data/amenities';

interface Step3PhysicalDetailsProps {
    formData: any;
    selectedAmenities: { label: string, description?: string }[];
    handleAddressChange: (newAddress: string) => void;
    handleMapUrlChange: (newUrl: string) => void;
    handleAmenityToggle: (amenity: string | { label: string, description?: string }) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Step3PhysicalDetails({
    formData,
    selectedAmenities,
    handleAddressChange,
    handleMapUrlChange,
    handleAmenityToggle,
    handleChange,
    setFormData
}: Step3PhysicalDetailsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', category: categorizedAmenities[0].category, description: '' });

    // Track amenities added via the modal
    const [extraAmenities, setExtraAmenities] = useState<{ name: string, category: string, description?: string }[]>([]);

    const handleAddAmenity = () => {
        if (!newItem.name.trim()) return;

        // Add to our local list of extra amenities
        setExtraAmenities(prev => [...prev, { ...newItem }]);

        // Ensure it is toggled as selected
        const exists = selectedAmenities.some(a => a.label === newItem.name);
        if (!exists) {
            handleAmenityToggle({ label: newItem.name, description: newItem.description });
        }

        // Reset and close
        setNewItem({ name: '', category: categorizedAmenities[0].category, description: '' });
        setIsModalOpen(false);
    };

    // Helper to find which selected amenities are NOT in the master list AND NOT in our categorized extras
    const masterItems = new Set(categorizedAmenities.flatMap(c => c.items));
    const extraItems = new Set(extraAmenities.map(e => e.name));
    const trulyCustomAmenities = selectedAmenities.filter(a => !masterItems.has(a.label) && !extraItems.has(a.label));

    // Selection helper
    const isItemSelected = (label: string) => selectedAmenities.some(a => a.label === label);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-[#1E1E1E]">Physical Property Details</h2>
                <p className="text-gray-500 mt-2">Specify the location, capacity, and available amenities.</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Location Section */}
                <div className="bg-[#FAF4EC]/20 p-8 rounded-3xl border border-[#E9D6C6]/40 space-y-6">
                    <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">Location & Structure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">Full Address</label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (formData.address) {
                                                const query = encodeURIComponent(formData.address);
                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    mapUrl: `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=B&output=embed`
                                                }));
                                            } else {
                                                alert('Please enter an address first.');
                                            }
                                        }}
                                        className="text-[10px] font-bold text-[#7A3E2C] uppercase tracking-tighter hover:underline"
                                    >
                                        Set map from address ↑
                                    </button>
                                </div>
                                <textarea
                                    name="address"
                                    rows={5}
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter full address..."
                                    className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3 text-[#1E1E1E] sm:text-sm shadow-sm focus:ring-1 focus:ring-[#7A3E2C] outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">Google Maps Embed URL</label>
                                <input
                                    type="text"
                                    name="mapUrl"
                                    value={formData.mapUrl}
                                    onChange={handleChange}
                                    placeholder="https://www.google.com/maps/embed?..."
                                    className="mt-1 block w-full rounded-xl border border-[#7A3E2C] px-4 py-3 text-[#1E1E1E] sm:text-xs font-mono shadow-sm focus:ring-1 focus:ring-[#7A3E2C] outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Maps Preview */}
                        <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden border border-[#7A3E2C] bg-white shadow-xl group">
                            <MapPicker
                                address={formData.address}
                                onAddressChange={handleAddressChange}
                                onMapUrlChange={handleMapUrlChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Capacity Section */}
                <div className="bg-[#FAF4EC]/20 p-8 rounded-3xl border border-[#E9D6C6]/40 space-y-6">
                    <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">Property Capacity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Maximum Guests', name: 'guests' },
                            { label: 'Total Bedrooms', name: 'bedrooms' },
                            { label: 'Total Bathrooms', name: 'bathrooms' }
                        ].map((f) => (
                            <div key={f.name} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E9D6C6]/60 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-semibold text-[#1E1E1E]">{f.label}</label>
                                </div>
                                <div className="flex items-center gap-1 bg-[#FAF8F6] rounded-xl p-1 border border-[#E9D6C6]/40">
                                    <button
                                        type="button"
                                        onClick={() => setFormData((prev: any) => ({ ...prev, [f.name]: Math.max(1, prev[f.name] - 1) }))}
                                        className="h-8 w-8 flex items-center justify-center rounded-lg text-[#7A3E2C] hover:bg-[#7A3E2C] hover:text-white transition-all duration-200 font-bold active:scale-95"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        name={f.name}
                                        min={1}
                                        value={formData[f.name]}
                                        onChange={handleChange}
                                        className="w-10 text-center font-bold text-[#7A3E2C] bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData((prev: any) => ({ ...prev, [f.name]: prev[f.name] + 1 }))}
                                        className="h-8 w-8 flex items-center justify-center rounded-lg text-[#7A3E2C] hover:bg-[#7A3E2C] hover:text-white transition-all duration-200 font-bold active:scale-95"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Amenities Section */}
                <div className="bg-[#FAF4EC]/20 p-8 rounded-3xl border border-[#E9D6C6]/40 space-y-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#EFE3D7] pb-6 gap-6">
                        <div className="space-y-1">
                            <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">Amenities & Facilities</h3>
                            <p className="text-sm text-gray-500">Pick from our master list or add a custom facility.</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 bg-[#7A3E2C] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#5C2D20] transition-all shadow-md active:scale-95"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Add Amenity
                        </button>
                    </div>

                    <div className="space-y-12">
                        {categorizedAmenities.map((cat) => {
                            // Merge master items with custom ones added to this category
                            const currentCategoryExtras = extraAmenities.filter(e => e.category === cat.category);
                            const masterCategoryItems = cat.items;

                            return (
                                <div key={cat.category} className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#7A3E2C]">
                                        <h4 className="text-sm font-bold uppercase tracking-wider">{cat.category}</h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                        {/* Master items */}
                                        {masterCategoryItems.map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => handleAmenityToggle(item)}
                                                className={`p-3 text-left rounded-xl border transition-all duration-200 flex flex-col justify-center text-xs gap-1 min-h-[56px] ${isItemSelected(item)
                                                    ? 'border-[#7A3E2C] bg-[#FAF4EC] text-[#7A3E2C] font-bold shadow-sm'
                                                    : 'border-[#E9D6C6]/60 bg-white text-gray-600 hover:border-[#7A3E2C]/30 hover:bg-[#FAF8F6]'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between w-full gap-2">
                                                    <span className="flex-1 leading-tight">{item}</span>
                                                    {isItemSelected(item) && (
                                                        <CheckIcon className="h-4 w-4 shrink-0" />
                                                    )}
                                                </div>
                                                {isItemSelected(item) && selectedAmenities.find(a => a.label === item)?.description && (
                                                    <p className="text-[10px] font-normal opacity-70 line-clamp-1 italic">{selectedAmenities.find(a => a.label === item)?.description}</p>
                                                )}
                                            </button>
                                        ))}

                                        {/* Extra items for this category */}
                                        {currentCategoryExtras.map((extra) => (
                                            <button
                                                key={extra.name}
                                                type="button"
                                                onClick={() => handleAmenityToggle({ label: extra.name, description: extra.description })}
                                                className={`p-3 text-left rounded-xl border transition-all duration-200 flex flex-col justify-center text-xs gap-1 min-h-[56px] ${isItemSelected(extra.name)
                                                    ? 'border-[#7A3E2C] bg-[#FAF4EC] text-[#7A3E2C] font-bold shadow-sm'
                                                    : 'border-[#E9D6C6]/60 bg-white text-gray-600 hover:border-[#7A3E2C]/30 hover:bg-[#FAF8F6]'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between w-full gap-2">
                                                    <span className="flex-1 leading-tight">{extra.name}</span>
                                                    {isItemSelected(extra.name) && (
                                                        <CheckIcon className="h-4 w-4 shrink-0" />
                                                    )}
                                                </div>
                                                {extra.description && (
                                                    <p className="text-[10px] font-normal opacity-70 line-clamp-1 italic">{extra.description}</p>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Custom Amenities Section */}
                        {trulyCustomAmenities.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[#7A3E2C]">
                                    <h4 className="text-sm font-bold uppercase tracking-wider">Other Amenities</h4>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                    {trulyCustomAmenities.map((item) => (
                                        <button
                                            key={item.label}
                                            type="button"
                                            onClick={() => handleAmenityToggle(item)}
                                            className="p-3 text-left rounded-xl border border-[#7A3E2C] bg-[#FAF4EC] text-[#7A3E2C] font-bold shadow-sm flex flex-col justify-center text-xs gap-1 min-h-[56px]"
                                        >
                                            <div className="flex items-start justify-between w-full gap-2">
                                                <span className="flex-1 leading-tight">{item.label}</span>
                                                <CheckIcon className="h-4 w-4 shrink-0" />
                                            </div>
                                            {item.description && (
                                                <p className="text-[10px] font-normal opacity-70 line-clamp-1 italic">{item.description}</p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Virtual Tour Section */}
                <div className="bg-[#FAF4EC]/30 p-8 rounded-3xl border border-[#E9D6C6]/40 space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#E9D6C6]/40 pb-4">
                        <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">Virtual Tour</h3>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">360° / Matterport Link</label>
                        <input
                            type="text"
                            name="virtualLink"
                            value={formData.virtualLink}
                            onChange={handleChange}
                            placeholder="https://my.matterport.com/show/..."
                            className="mt-1 block w-full rounded-xl border border-[#7A3E2C] bg-white px-4 py-3 text-[#1E1E1E] sm:text-sm shadow-sm focus:ring-1 focus:ring-[#7A3E2C] outline-none transition-all placeholder:text-gray-400"
                        />
                        <p className="text-[10px] text-gray-400 mt-1 italic">Showcase your property with an interactive 360° virtual tour or Matterport link.</p>
                    </div>
                </div>

                {/* Neighborhood Section */}
                <div className="bg-[#FAF4EC]/30 p-8 rounded-3xl border border-[#E9D6C6]/40 space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#E9D6C6]/40 pb-4">
                        <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">Neighborhood & Activities</h3>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">Local Guide / Things to do</label>
                        <textarea
                            name="thingsToDo"
                            rows={5}
                            value={formData.thingsToDo}
                            onChange={handleChange}
                            placeholder="Describe local activities, neighborhood atmosphere, or things to do nearby..."
                            className="mt-1 block w-full rounded-xl border border-[#7A3E2C] bg-white px-4 py-3 text-[#1E1E1E] sm:text-sm shadow-sm focus:ring-1 focus:ring-[#7A3E2C] outline-none transition-all placeholder:text-gray-400"
                        />
                        <p className="text-[10px] text-gray-400 mt-1 italic">Provide guests with local insights, nearby landmarks, or recommended activities.</p>
                    </div>
                </div>
            </div>

            {/* Add Amenity Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">Add New Amenity</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <XMarkIcon className="h-6 w-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-4 text-left">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">Category</label>
                                    <select
                                        value={newItem.category}
                                        onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full rounded-xl border border-[#E9D6C6] bg-white px-4 py-3 text-sm focus:border-[#7A3E2C] outline-none transition-all"
                                    >
                                        {categorizedAmenities.map(c => (
                                            <option key={c.category} value={c.category}>{c.category}</option>
                                        ))}
                                        <option value="Custom">Custom / Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">Amenity Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 5G Satellite Internet"
                                        value={newItem.name}
                                        onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full rounded-xl border border-[#E9D6C6] bg-white px-4 py-3 text-sm focus:border-[#7A3E2C] outline-none transition-all"
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">Description (Optional)</label>
                                    <textarea
                                        placeholder="Provide more context or details about this facility..."
                                        rows={3}
                                        value={newItem.description}
                                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                                        className="w-full rounded-xl border border-[#E9D6C6] bg-white px-4 py-3 text-sm focus:border-[#7A3E2C] outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddAmenity}
                                    className="flex-1 px-6 py-3 rounded-xl bg-[#7A3E2C] text-white text-sm font-bold hover:bg-[#5C2D20] transition-all shadow-md active:scale-95"
                                >
                                    Add Amenity
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
