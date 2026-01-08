import React from 'react';
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/outline';

type Props = {
    vision: string;
    setVision: (val: string) => void;
    visionImage: { url: string; alt: string };
    setVisionImage: (val: { url: string; alt: string }) => void;
    mission: string;
    setMission: (val: string) => void;
    missionImage: { url: string; alt: string };
    setMissionImage: (val: { url: string; alt: string }) => void;
    onSave: () => void;
    onCancel: () => void;
};

export default function VisionMissionEdit({
    vision, setVision, visionImage, setVisionImage,
    mission, setMission, missionImage, setMissionImage,
    onSave, onCancel
}: Props) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: { url: string; alt: string }) => void, current: { url: string; alt: string }) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setter({ ...current, url: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const Section = ({
        index,
        title,
        value,
        setValue,
        image,
        onFileChange,
        placeholder
    }: {
        index: string,
        title: string,
        value: string,
        setValue: (v: string) => void,
        image: { url: string, alt: string },
        onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        placeholder: string
    }) => (
        <div className="bg-white rounded-3xl border border-[#E9D6C6] overflow-hidden shadow-sm">
            <div className="px-8 py-5 bg-[#FAF4EC] border-b border-[#E9D6C6]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#7A3E2C] flex items-center justify-center text-white font-bold text-xs">{index}</div>
                    <h3 className="font-serif font-bold text-[#1E1E1E]">{title}</h3>
                </div>
            </div>
            <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* LEFT: Forms */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Content Statement</label>
                            <textarea
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm h-48 resize-none focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none leading-relaxed"
                                placeholder={placeholder}
                            />
                        </div>

                        <div className="space-y-2 pt-2">
                            <label className="block text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                                Replace Section Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                                className="block w-full cursor-pointer rounded-xl border border-[#E0D4C6] bg-white px-3 py-2 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#7A3E2C] file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-widest file:text-white hover:file:bg-[#5C2D20] transition-all"
                            />
                        </div>
                    </div>

                    {/* RIGHT: Image Preview */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Visual Preview</label>
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#E9D6C6] bg-[#FAF4EC] shadow-inner group">
                            {image.url ? (
                                <>
                                    <Image
                                        src={image.url}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        unoptimized={image.url.startsWith('data:')}
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all" />
                                </>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#7A3E2C]/30 gap-3">
                                    <PhotoIcon className="h-16 w-16" />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">No Vision</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div id="vision-mission" className="mx-auto max-w-9xl space-y-8">
            <Section
                index="04"
                title="Our Vision"
                value={vision}
                setValue={setVision}
                image={visionImage}
                onFileChange={(e) => handleFileChange(e, setVisionImage, visionImage)}
                placeholder="State the future vision..."
            />

            <Section
                index="05"
                title="Our Mission"
                value={mission}
                setValue={setMission}
                image={missionImage}
                onFileChange={(e) => handleFileChange(e, setMissionImage, missionImage)}
                placeholder="State the company mission..."
            />

            {/* ACTION BUTTONS CARD */}
            <div className="bg-white rounded-3xl border border-[#E9D6C6] overflow-hidden shadow-sm">
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
