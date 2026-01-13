'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { CheckIcon } from '@heroicons/react/24/outline';

const MapPicker = dynamic(() => import('./MapPicker'), {
    ssr: false,
    loading: () => (
        <div className="h-full flex flex-col items-center justify-center text-[#7A3E2C]/20 space-y-4 bg-[#FAF8F6]">
            <div className="animate-pulse">Loading Map...</div>
        </div>
    )
});

const amenitiesList = [
    "Hot tub",
    "TV",
    "Exterior security cameras on property",
    "Kitchen",
    "Free parking on premises",
    "Wifi",
    "Dedicated workspace",
    "Air conditioning",
    "Smoke alarm",
    "Pool",
    "Washer",
    "Dryer",
    "Heating",
    "First aid kit",
    "Fire extinguisher"
];

interface Step3PhysicalDetailsProps {
    formData: any;
    selectedAmenities: string[];
    handleAddressChange: (newAddress: string) => void;
    handleMapUrlChange: (newUrl: string) => void;
    handleAmenityToggle: (amenity: string) => void;
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
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-[#1E1E1E]">Physical Property Details</h2>
                <p className="text-gray-500 mt-2">Specify the location, capacity, and available amenities.</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Location Section - Full Width with Preview */}
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
                                <p className="text-[10px] text-gray-400 mt-1 italic">The map will auto-update or you can type/paste a custom embed link.</p>
                            </div>
                        </div>

                        {/* Maps Preview - Interactive Leaflet Map */}
                        <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-[#7A3E2C] bg-white shadow-xl group">
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
                <div className="bg-[#FAF4EC]/20 p-8 rounded-3xl border border-[#E9D6C6]/40 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#EFE3D7] pb-6 gap-6">
                        <div className="space-y-1">
                            <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">Amenities & Facilities</h3>
                            <p className="text-sm text-gray-500">Select standard amenities or add your own.</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative group flex-1 md:w-64">
                                <input
                                    type="text"
                                    id="custom-amenity-input"
                                    placeholder="Add custom amenity..."
                                    className="w-full rounded-xl border border-[#E9D6C6] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#7A3E2C] transition-all"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const input = e.currentTarget;
                                            const val = input.value.trim();
                                            if (val) {
                                                handleAmenityToggle(val);
                                                input.value = '';
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    const input = document.getElementById('custom-amenity-input') as HTMLInputElement;
                                    const val = input?.value.trim();
                                    if (val) {
                                        handleAmenityToggle(val);
                                        input.value = '';
                                    }
                                }}
                                className="bg-[#7A3E2C] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#5C2D20] transition-colors shadow-sm active:scale-95"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {/* Combine predefined list with any custom ones in selectedAmenities not in the list */}
                        {Array.from(new Set([...amenitiesList, ...selectedAmenities])).map((a) => (
                            <div
                                key={a}
                                onClick={() => handleAmenityToggle(a)}
                                className={`group relative p-4 rounded-2xl border cursor-pointer text-xs transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 min-h-[80px] ${selectedAmenities.includes(a)
                                    ? 'border-[#7A3E2C] bg-white shadow-md'
                                    : 'border-[#E9D6C6]/60 bg-white/40 hover:border-[#7A3E2C]/50 hover:bg-white'
                                    }`}
                            >
                                {selectedAmenities.includes(a) && (
                                    <div className="absolute top-2 right-2">
                                        <CheckIcon className="h-4 w-4 text-[#7A3E2C]" />
                                    </div>
                                )}
                                <span className={`font-semibold ${selectedAmenities.includes(a) ? 'text-[#7A3E2C]' : 'text-gray-600 group-hover:text-[#1E1E1E]'}`}>
                                    {a}
                                </span>
                            </div>
                        ))}
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
                {/* Neighborhood / Things To Do Section */}
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
        </div>
    );
}
