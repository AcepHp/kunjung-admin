import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { brandEthosResponse } from '@/data/BrandEthos';
import { PencilSquareIcon, Squares2X2Icon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function BrandEthosSection() {
    const data = brandEthosResponse.data;
    const galleryRef = useRef<HTMLDivElement>(null);

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

    const SectionCard = ({ title, editHref, children, icon: Icon }: { title: string; editHref: string; children: React.ReactNode; icon?: any }) => (
        <div className="group overflow-hidden rounded-3xl border border-[#E9D6C6] bg-white shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between border-b border-[#FAF4EC] bg-[#FAF4EC]/50 px-8 py-4">
                <div className="flex items-center gap-3">
                    <h3 className="font-serif text-lg font-bold text-[#1E1E1E]">{title}</h3>
                </div>
                <Link
                    href={editHref}
                    className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#7A3E2C] border border-[#E9D6C6] shadow-sm transition-all hover:bg-[#7A3E2C] hover:text-white hover:border-[#7A3E2C] active:scale-95"
                >
                    <PencilSquareIcon className="h-4 w-4" />
                    Edit Section
                </Link>
            </div>
            <div className="p-0">
                {children}
            </div>
        </div>
    );

    return (
        <div className="mx-auto max-w-9xl space-y-12 pb-20">

            {/* HERO SECTION */}
            <SectionCard title="Hero Identity" editHref="/beranda/brand-ethos/edit/hero">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col justify-center p-16">
                        <span className="mb-4 text-xs font-bold tracking-[0.2em] text-[#7A3E2C] uppercase">Visual Preview</span>
                        <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-[#1E1E1E]">
                            {data.hero.title}
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {data.hero.subtitle}
                        </p>
                    </div>
                    <div className="relative min-h-[450px] bg-[#FAF4EC]">
                        <Image
                            src={data.hero.image.url}
                            alt={data.hero.image.alt}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </SectionCard>

            {/* INTRODUCTION */}
            <SectionCard title="Brand Introduction" editHref="/beranda/brand-ethos/edit/introduction">
                <div className="px-16 py-10 space-y-16">
                    <div className="text-center">
                        <span className="inline-block px-4 py-1 rounded-full bg-[#FAF4EC] text-xs font-bold tracking-[0.2em] text-[#7A3E2C] uppercase border border-[#E9D6C6]">
                            {data.introduction.label}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        <div className="space-y-6">
                            <h4 className="font-serif text-3xl font-bold leading-tight text-[#1E1E1E]">
                                {data.introduction.title}
                            </h4>
                            <p className="text-gray-500 font-medium italic text-lg leading-relaxed">
                                {data.introduction.subtitle}
                            </p>
                        </div>
                        <div className="space-y-8">
                            <p className="whitespace-pre-line text-gray-600 leading-relaxed text-lg">
                                {data.introduction.description}
                            </p>
                            <div className="pt-8 border-t border-[#FAF4EC]">
                                <span className="block text-[10px] font-bold tracking-[0.3em] text-[#7A3E2C] uppercase mb-4">Our Core Principles</span>
                                <div className="flex flex-wrap gap-3">
                                    {data.introduction.corePrinciples.map((principle, idx) => (
                                        <span key={idx} className="px-4 py-2 rounded-xl bg-[#FAF4EC] text-[#7A3E2C] text-xs font-bold border border-[#E9D6C6] shadow-sm italic font-serif">
                                            "{principle}"
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
                        <Image
                            src={data.foundersStory.content.image.url}
                            alt={data.foundersStory.content.image.alt}
                            fill
                            className="object-cover opacity-90"
                        />
                    </div>
                    <div className="flex flex-col justify-center p-12 lg:p-16 text-white">
                        <span className="mb-6 text-xs font-bold tracking-[0.3em] text-[#E9D6C6] uppercase">{data.foundersStory.title}</span>
                        <div
                            className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: data.foundersStory.content.description
                                    .split('\n\n')
                                    .map(p => `<p class="mb-4">${p}</p>`)
                                    .join('')
                            }}
                        />
                    </div>
                </div>
            </SectionCard>

            {/* VISION & MISSION */}
            <SectionCard title="Vision & Mission" editHref="/beranda/brand-ethos/edit/vision-mission">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#FAF4EC]">
                    {/* Vision */}
                    <div className="p-16 lg:p-20 text-center">
                        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF4EC] text-[#7A3E2C]">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h4 className="mb-6 font-serif text-3xl font-bold text-[#1E1E1E]">{data.vision.title}</h4>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {data.vision.description}
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="p-16 lg:p-20 text-center">
                        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF4EC] text-[#7A3E2C]">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h4 className="mb-6 font-serif text-3xl font-bold text-[#1E1E1E]">{data.mission.title}</h4>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {data.mission.description}
                        </p>
                    </div>
                </div>
            </SectionCard>

            {/* GALLERY */}
            <SectionCard title="Immersive Gallery" editHref="/beranda/brand-ethos/edit/gallery" icon={Squares2X2Icon}>
                <div className="relative p-10 lg:p-12">
                    {/* Navigation Buttons - Conditional */}
                    {data.gallery.images.length > 3 && (
                        <>
                            <button
                                onClick={() => scrollGallery('left')}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 border border-[#E9D6C6] text-[#7A3E2C] shadow-lg hover:bg-[#7A3E2C] hover:text-white transition-all active:scale-95"
                            >
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollGallery('right')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 border border-[#E9D6C6] text-[#7A3E2C] shadow-lg hover:bg-[#7A3E2C] hover:text-white transition-all active:scale-95"
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    <div
                        ref={galleryRef}
                        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {data.gallery.images.map((img, idx) => (
                            <div
                                key={idx}
                                className="group/item relative flex-none w-[calc(100%/1-24px)] sm:w-[calc(100%/3-16px)] h-[300px] overflow-hidden rounded-2xl border border-[#E9D6C6]"
                            >
                                <Image
                                    src={img.url}
                                    alt="Gallery image"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/item:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">View Moment</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Indicator for scrolling */}
                    {data.gallery.images.length > 3 && (
                        <p className="mt-4 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Scroll to explore more moments
                        </p>
                    )}
                </div>
            </SectionCard>

            {/* CLOSING */}
            <SectionCard title="Closing Statement" editHref="/beranda/brand-ethos/edit/closing">
                <div className="bg-[#7A3E2C] p-24 lg:p-32 text-center text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-6">
                        <span className="text-xs font-bold tracking-[0.3em] text-[#E9D6C6] uppercase border-b border-[#E9D6C6]/30 pb-2">{data.closingStatement.label}</span>
                        <h2 className="font-serif text-3xl font-bold leading-tight">
                            {data.closingStatement.text}
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
