'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PencilSquareIcon, Squares2X2Icon, ChevronLeftIcon, ChevronRightIcon, ExclamationTriangleIcon, PlusIcon } from '@heroicons/react/24/outline';
import BrandEthosSkeleton from './BrandEthosSkeleton';
import {
    getBrandEthos,
    getImmersiveGallery,
    BrandEthosPayload,
    ImmersiveGalleryImage
} from '@/services/BrandEthosService';

export default function BrandEthosSection() {
    const [data, setData] = useState<BrandEthosPayload | null>(null);
    const [galleryImages, setGalleryImages] = useState<ImmersiveGalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ethosData, gallery] = await Promise.all([
                    getBrandEthos(),
                    getImmersiveGallery()
                ]);

                if (ethosData) {
                    setData(ethosData);
                } else {
                    setError('No brand ethos data found.');
                }

                if (gallery && gallery.length > 0) {
                    setGalleryImages(gallery);
                }
            } catch (err) {
                console.error("Error fetching ethos data:", err);
                setError('Failed to load brand ethos data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const scrollGallery = (direction: 'left' | 'right') => {
        if (galleryRef.current) {
            const { scrollLeft, clientWidth } = galleryRef.current;
            const scrollAmount = clientWidth * 0.8;
            galleryRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const SectionCard = ({ title, editHref, children }: { title: string; editHref?: string; children: React.ReactNode }) => (
        <div className="group overflow-hidden rounded-3xl border border-[#E9D6C6] bg-white shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between border-b border-[#FAF4EC] bg-[#FAF4EC]/50 px-8 py-4">
                <div className="flex items-center gap-3">
                    <h3 className="font-serif text-lg font-bold text-[#1E1E1E]">{title}</h3>
                </div>
                {editHref && (
                    <Link
                        href={editHref}
                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#7A3E2C] border border-[#E9D6C6] shadow-sm transition-all hover:bg-[#7A3E2C] hover:text-white hover:border-[#7A3E2C] active:scale-95"
                    >
                        <PencilSquareIcon className="h-4 w-4" />
                        Edit Section
                    </Link>
                )}
            </div>
            <div className="p-0">
                {children}
            </div>
        </div>
    );

    if (loading) {
        return <BrandEthosSkeleton />;
    }

    if (error || !data) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#E9D6C6] bg-white py-24 text-center">
                <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">{error || 'Data Not Found'}</h3>
                <p className="mt-2 text-gray-500 max-w-md">
                    {error === 'No brand ethos data found.'
                        ? "It looks like you haven't added any brand ethos content yet. Start by defining your brand's identity."
                        : "Unable to load the Brand Ethos content at this time. Please try refreshing the page or check back later."
                    }
                </p>

                {error === 'No brand ethos data found.' ? (
                    <Link href="/beranda/brand-ethos/add" className="mt-6">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#7A3E2C] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all"
                        >
                            <PlusIcon className="h-5 w-5" />
                            <span>Add Brand Ethos</span>
                        </button>
                    </Link>
                ) : (
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-2 rounded-xl bg-[#7A3E2C] text-white font-bold text-sm hover:bg-[#5C2D20] transition-colors"
                    >
                        Retry
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-9xl space-y-12 pb-20">

            {/* HERO SECTION */}
            <SectionCard title="Hero Identity" editHref="/beranda/brand-ethos/edit/hero">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col justify-center p-16">
                        <span className="mb-4 text-xs font-bold tracking-[0.2em] text-[#7A3E2C] uppercase">Visual Preview</span>
                        <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-[#1E1E1E]">
                            {data.heroMainTitle}
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {data.heroCorePhilosophy}
                        </p>
                    </div>
                    <div className="relative min-h-[450px] bg-[#FAF4EC]">
                        {data.heroImageUrl && (
                            <Image
                                src={data.heroImageUrl}
                                alt={data.heroMainTitle || 'Hero Image'}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>
                </div>
            </SectionCard>

            {/* INTRODUCTION */}
            <SectionCard title="Brand Introduction" editHref="/beranda/brand-ethos/edit/introduction">
                <div className="px-16 py-10 space-y-16">
                    <div className="text-center">
                        <span className="inline-block px-4 py-1 rounded-full bg-[#FAF4EC] text-xs font-bold tracking-[0.2em] text-[#7A3E2C] uppercase border border-[#E9D6C6]">
                            {data.introLabel}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        <div className="space-y-6">
                            <h4 className="font-serif text-3xl font-bold leading-tight text-[#1E1E1E]">
                                {data.introMainTitle}
                            </h4>
                            <p className="text-gray-500 font-medium italic text-lg leading-relaxed">
                                {data.introSubtitle}
                            </p>
                        </div>
                        <div className="space-y-8">
                            <p className="whitespace-pre-line text-gray-600 leading-relaxed text-lg">
                                {data.introDescription}
                            </p>
                            <div className="pt-8 border-t border-[#FAF4EC]">
                                <span className="block text-[10px] font-bold tracking-[0.3em] text-[#7A3E2C] uppercase mb-4">Our Core Principles</span>
                                <div className="flex flex-wrap gap-3">
                                    {[data.introPrincipleOne, data.introPrincipleTwo, data.introPrincipleThree]
                                        .filter(Boolean)
                                        .map((principle, idx) => (
                                            <span key={idx} className="px-4 py-2 rounded-xl bg-[#FAF4EC] text-[#7A3E2C] text-xs font-bold border border-[#E9D6C6] shadow-sm italic font-serif">
                                                &quot;{principle}&quot;
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionCard>

            {/* FOUNDERS STORY */}
            <SectionCard title="Founders' Story" editHref="/beranda/brand-ethos/edit/founders">
                <div className="grid grid-cols-1 md:grid-cols-2 bg-[#1E1E1E]">
                    <div className="relative min-h-[400px]">
                        {data.founderLegacyImage && (
                            <Image
                                src={data.founderLegacyImage}
                                alt="Founder Legacy"
                                fill
                                className="object-cover opacity-90"
                            />
                        )}
                    </div>
                    <div className="flex flex-col justify-center p-12 lg:p-16 text-white">
                        <span className="mb-6 text-xs font-bold tracking-[0.3em] text-[#E9D6C6] uppercase">Founders&apos; Story</span>
                        <div
                            className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: data.founderStory
                                    ?.split('\n\n')
                                    .map(p => `<p class="mb-4">${p}</p>`)
                                    .join('') || ''
                            }}
                        />
                    </div>
                </div>
            </SectionCard>

            {/* VISION & MISSION */}
            <SectionCard title="Vision & Mission" editHref="/beranda/brand-ethos/edit/vision-mission">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#FAF4EC]">
                    {/* Vision */}
                    <div className="p-16 lg:p-20 text-center flex flex-col items-center h-full">
                        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF4EC] text-[#7A3E2C]">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h4 className="mb-6 font-serif text-3xl font-bold text-[#1E1E1E]">Our Vision</h4>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            {data.visionStatement}
                        </p>
                        {data.visionImageUrl && (
                            <div className="relative w-full h-64 rounded-2xl overflow-hidden mt-auto border border-[#E9D6C6]">
                                <Image
                                    src={data.visionImageUrl}
                                    alt="Vision"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Mission */}
                    <div className="p-16 lg:p-20 text-center flex flex-col items-center h-full">
                        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF4EC] text-[#7A3E2C]">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h4 className="mb-6 font-serif text-3xl font-bold text-[#1E1E1E]">Our Mission</h4>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            {data.missionStatement}
                        </p>
                        {data.missionImageUrl && (
                            <div className="relative w-full h-64 rounded-2xl overflow-hidden mt-auto border border-[#E9D6C6]">
                                <Image
                                    src={data.missionImageUrl}
                                    alt="Mission"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </SectionCard>

            {/* GALLERY */}
            <SectionCard title="Immersive Gallery">
                <div className="relative p-10 lg:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {galleryImages.slice(0, 3).map((img, idx) => (
                            <div
                                key={img.id || idx}
                                className="group/item relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#E9D6C6]"
                            >
                                <Image
                                    src={img.imageUrl}
                                    alt="Gallery image"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/item:scale-110"
                                />
                                {/* Overlay with Edit Button */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                                    <Link
                                        href={`/beranda/brand-ethos/edit/gallery/${img.id}`}
                                        className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#7A3E2C] shadow-lg hover:bg-[#7A3E2C] hover:text-white transition-all transform translate-y-2 group-hover/item:translate-y-0"
                                    >
                                        <PencilSquareIcon className="h-4 w-4" />
                                        EDIT MOMENT
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {/* Empty State / Placeholders if less than 3 */}
                        {galleryImages.length === 0 && (
                            <div className="col-span-3 text-center py-12 text-gray-400">
                                <Squares2X2Icon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p className="text-sm">No gallery images yet</p>
                            </div>
                        )}
                        {galleryImages.length > 0 && galleryImages.length < 3 && (
                            Array.from({ length: 3 - galleryImages.length }).map((_, idx) => (
                                <div key={`placeholder-${idx}`} className="relative aspect-[4/3] w-full rounded-2xl border-2 border-dashed border-[#E9D6C6] bg-[#FAF4EC]/30 flex items-center justify-center">
                                    <Link href="/beranda/brand-ethos/edit/gallery" className="text-center group">
                                        <div className="w-10 h-10 mx-auto rounded-full bg-[#7A3E2C]/10 flex items-center justify-center text-[#7A3E2C] group-hover:bg-[#7A3E2C] group-hover:text-white transition-colors mb-2">
                                            <PlusIcon className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-bold text-[#7A3E2C] uppercase tracking-wider">Add Image</span>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </SectionCard>

            {/* CLOSING */}
            <SectionCard title="Closing Statement" editHref="/beranda/brand-ethos/edit/closing">
                <div className="bg-[#7A3E2C] p-24 lg:p-32 text-center text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-6">
                        <span className="text-xs font-bold tracking-[0.3em] text-[#E9D6C6] uppercase border-b border-[#E9D6C6]/30 pb-2">{data.closingLabel}</span>
                        <h2 className="font-serif text-3xl font-bold leading-tight">
                            {data.closingStatement}
                        </h2>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
                    <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
                </div>
            </SectionCard>
        </div>
    );
}
