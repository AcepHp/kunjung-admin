import { useRef, useState } from 'react';
import Image from 'next/image';
import { PhotoIcon, ArrowPathIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

type ImageItem = { url: string; alt?: string };

type Props = {
    images: ImageItem[];
    setImages: (val: ImageItem[]) => void;
    onSave: () => void;
    onCancel: () => void;
};

export default function GalleryEdit({ images, setImages, onSave, onCancel }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const addInputRef = useRef<HTMLInputElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleReplaceClick = (index: number) => {
        setActiveIndex(index);
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && activeIndex !== null) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...images];
                newImages[activeIndex] = { ...newImages[activeIndex], url: reader.result as string };
                setImages(newImages);
                setActiveIndex(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages([...images, { url: reader.result as string }]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleDeleteImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    return (
        <div id="gallery" className="mx-auto max-w-9xl space-y-8">
            <div className="bg-white rounded-3xl border border-[#E9D6C6] overflow-hidden shadow-sm">
                <div className="px-8 py-5 bg-[#FAF4EC] border-b border-[#E9D6C6] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#7A3E2C] flex items-center justify-center text-white font-bold text-xs">06</div>
                        <h3 className="font-serif font-bold text-[#1E1E1E]">Immersive Gallery</h3>
                    </div>
                    <span className="text-[10px] font-bold text-[#7A3E2C] uppercase tracking-[0.2em]">{images.length} Moments Captured</span>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((img, idx) => (
                            <div key={idx} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E9D6C6] bg-[#FAF4EC] shadow-sm">
                                <Image
                                    src={img.url}
                                    alt={img.alt || 'Gallery image'}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    unoptimized={img.url.startsWith('data:')}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                                    <button
                                        type="button"
                                        onClick={() => handleReplaceClick(idx)}
                                        className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#7A3E2C] shadow-lg hover:bg-[#7A3E2C] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
                                    >
                                        <ArrowPathIcon className="h-4 w-4" />
                                        REPLACE
                                    </button>
                                </div>

                                {/* Delete Button */}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteImage(idx)}
                                    className="absolute top-3 right-3 p-2 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-lg active:scale-95"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        {/* Add Image Card */}
                        <button
                            type="button"
                            onClick={() => addInputRef.current?.click()}
                            className="group relative aspect-[4/3] rounded-2xl border-2 border-dashed border-[#E9D6C6] bg-[#FAF4EC]/50 flex flex-col items-center justify-center gap-4 transition-all hover:bg-white hover:border-[#7A3E2C]/30"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#7A3E2C]/5 flex items-center justify-center text-[#7A3E2C] group-hover:bg-[#7A3E2C]/10 transition-colors">
                                <PlusIcon className="w-6 h-6" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-[#7A3E2C]">Add New Moments</p>
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">Upload Image</p>
                            </div>
                            <input
                                type="file"
                                ref={addInputRef}
                                onChange={handleAddImage}
                                accept="image/*"
                                multiple
                                className="hidden"
                            />
                        </button>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    
                </div>
                <div className="p-8 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full border border-[#E0D4C6] px-6 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onSave}
                        className="rounded-full bg-[#7A3E2C] px-8 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all uppercase tracking-widest"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
