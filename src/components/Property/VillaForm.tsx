'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    HomeIcon,
    CalendarDaysIcon,
    CameraIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

// Import modular step components
import Step1GeneralInfo from './Step1GeneralInfo';
import Step2Gallery from './Step2Gallery';
import Step3PhysicalDetails from './Step3PhysicalDetails';
import Step4Pricing from './Step4Pricing';
import Step5Policies from './Step5Policies';
import Step6HouseRules from './Step6HouseRules';
import Step7SafetyProperty from './Step7SafetyProperty';

const steps = [
    { id: 1, name: 'General Info' },
    { id: 2, name: 'Gallery' },
    { id: 3, name: 'Details' },
    { id: 4, name: 'Pricing' },
    { id: 5, name: 'Policies' },
    { id: 6, name: 'House Rules' },
    { id: 7, name: 'Safety' },
];

export default function VillaForm({
    initialData = null,
    initialCategory = null,
    onBack
}: {
    initialData?: any;
    initialCategory?: any;
    onBack?: () => void;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Initialize currentStep from localStorage or default to 1
    const [currentStep, setCurrentStep] = useState(1);
    const [isInitialized, setIsInitialized] = useState(false);

    // Effect to load initial step
    useEffect(() => {
        const savedStep = localStorage.getItem('villa_form_step');
        if (savedStep) {
            setCurrentStep(parseInt(savedStep));
        }
        setIsInitialized(true);
    }, []);

    // Effect to save step on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('villa_form_step', currentStep.toString());
        }
    }, [currentStep, isInitialized]);

    // Updated state to include separate image fields
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        location: initialData?.location || '',
        guests: initialData?.guests || 1,
        bedrooms: initialData?.bedrooms || 1,
        bathrooms: initialData?.bathrooms || 1,
        simpleDesc: initialData?.simpleDesc || '',
        description: initialData?.description || '',
        weekdayPrice: initialData?.weekdayPrice || '',
        weekendPrice: initialData?.weekendPrice || '',
        discount: {
            percentage: initialData?.discount?.percentage || 0,
            label: initialData?.discount?.label || '',
            appliesTo: initialData?.discount?.appliesTo || 'both',
        },
        address: initialData?.address || '',
        mapUrl: initialData?.mapUrl || '',
        amenities: initialData?.amenities || [],
        image: initialData?.image || '', // Main image
        descImages: initialData?.descImages || ['', '', ''], // 3 Description images
        detailHeader: initialData?.detailHeader || '', // Detail Header intro
        virtualLink: initialData?.virtualLink || '', // Virtual Tour Link
        // Support multiple categories
        categories: initialData?.categories || (initialCategory ? [initialCategory] : []),
        details: initialData?.details || [{ title: '', description: '', images: [] }], // Dynamic details fallback
        policy: initialData?.policy || {
            refund100: '',
            refund50: '',
            nonRefundable: '',
            reschedule: '',
        },
        houseRules: initialData?.houseRules || {
            checkInTime: '',
            checkOutTime: '',
            selfCheckIn: '',
            maxGuests: '',
            petsAllowed: '',
            quietHours: '',
            commercialPhotography: '',
            smokingAllowed: '',
            additionalRules: [],
            beforeLeave: [],
            additionalRequests: [],
        },
        safetyDevices: initialData?.safetyDevices || [
            { type: 'Exterior security cameras on property', status: 'absent', description: '' },
            { type: 'No carbon monoxide alarm', status: 'absent', description: '' },
            { type: 'No smoke alarm', status: 'absent', description: '' },
        ],
    });

    // State for local image previews
    const [mainPreview, setMainPreview] = useState<string | null>(initialData?.image || null);
    const [descPreviews, setDescPreviews] = useState<(string | null)[]>(
        initialData?.descImages || [null, null, null]
    );

    const [selectedAmenities, setSelectedAmenities] = useState<{ label: string, description?: string }[]>(
        initialData?.amenities?.filter((a: any) => a.available).map((a: any) => ({
            label: a.label,
            description: a.description
        })) || []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            discount: {
                ...prev.discount,
                [name]: name === 'percentage' ? parseInt(value) || 0 : value
            }
        }));
    };

    const handleAddressChange = useCallback((newAddress: string) => {
        setFormData((prev: any) => ({ ...prev, address: newAddress }));
    }, []);

    const handleMapUrlChange = useCallback((newUrl: string) => {
        setFormData((prev: any) => ({ ...prev, mapUrl: newUrl }));
    }, []);

    // Handler for Main Image selection
    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainPreview(reader.result as string);
                setFormData((prev: any) => ({ ...prev, image: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handler for Description Images selection
    const handleDescImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPreviews = [...descPreviews];
                newPreviews[index] = reader.result as string;
                setDescPreviews(newPreviews);

                const newDescImages = [...formData.descImages];
                newDescImages[index] = file;
                setFormData((prev: any) => ({ ...prev, descImages: newDescImages }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeMainImage = () => {
        setMainPreview(null);
        setFormData((prev: any) => ({ ...prev, image: '' }));
    };

    const removeDescImage = (index: number) => {
        const newPreviews = [...descPreviews];
        newPreviews[index] = null;
        setDescPreviews(newPreviews);

        const newDescImages = [...formData.descImages];
        newDescImages[index] = '';
        setFormData((prev: any) => ({ ...prev, descImages: newDescImages }));
    };

    /* ================= DETAILS HANDLERS ================= */
    const addDetail = () => {
        setFormData((prev: any) => ({
            ...prev,
            details: [...prev.details, { title: '', description: '', images: [] }]
        }));
    };

    const removeDetail = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            details: prev.details.filter((_: any, i: number) => i !== index)
        }));
    };

    const handleDetailChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newDetails = [...formData.details];
        newDetails[index] = { ...newDetails[index], [name]: value };
        setFormData((prev: any) => ({ ...prev, details: newDetails }));
    };

    const handleDetailImageChange = (detailIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const newDetails = [...formData.details];
            const filePreviews = files.map(file => URL.createObjectURL(file));
            newDetails[detailIndex].images = [...newDetails[detailIndex].images, ...filePreviews];
            setFormData((prev: any) => ({ ...prev, details: newDetails }));
        }
    };

    const removeDetailImage = (detailIndex: number, imageIndex: number) => {
        const newDetails = [...formData.details];
        if (newDetails[detailIndex].images[imageIndex].startsWith('blob:')) {
            URL.revokeObjectURL(newDetails[detailIndex].images[imageIndex]);
        }
        newDetails[detailIndex].images = newDetails[detailIndex].images.filter((_: any, i: number) => i !== imageIndex);
        setFormData((prev: any) => ({ ...prev, details: newDetails }));
    };

    const handleAmenityToggle = (amenity: string | { label: string, description?: string }) => {
        const label = typeof amenity === 'string' ? amenity : amenity.label;
        const description = typeof amenity === 'object' ? amenity.description : '';

        setSelectedAmenities(prev => {
            const exists = prev.find(a => a.label === label);
            if (exists) {
                return prev.filter(a => a.label !== label);
            } else {
                return [...prev, { label, description }];
            }
        });
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (currentStep < steps.length) {
            handleNext();
            return;
        }

        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Submitting villa data:', { ...formData, amenities: selectedAmenities });

        // Clear persistence on success
        localStorage.removeItem('villa_form_step');

        setLoading(false);
        router.push('/beranda/manage-property');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const target = e.target as HTMLElement;
            if (target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (currentStep < steps.length) {
                    handleNext();
                }
            }
        }
    };

    /* ================= WIZARD NAVIGATION ================= */
    const isStepValid = () => {
        if (currentStep === 1) {
            return formData.name && formData.location && formData.simpleDesc && formData.description && formData.categories.length > 0;
        }
        return true;
    };

    const handleNext = () => {
        if (isStepValid()) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length));
            window.scrollTo(0, 0);
        } else {
            alert('Please fill in all required fields and select at least one category.');
        }
    };

    const handleBack = () => {
        if (currentStep === 1 && onBack) {
            onBack();
            return;
        }
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        window.scrollTo(0, 0);
    };

    if (!isInitialized) return null;

    return (
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E9D6C6]/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

            {/* Progress Bar */}
            <nav aria-label="Progress" className="mb-12">
                <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
                    {steps.map((step) => (
                        <li key={step.name} className="md:flex-1">
                            <div
                                className={`group flex flex-col border-l-4 py-2 pl-4 cursor-default transition-all duration-300 ${currentStep > step.id
                                    ? 'border-[#7A3E2C]'
                                    : currentStep === step.id
                                        ? 'border-[#7A3E2C]'
                                        : 'border-gray-100 hover:border-gray-200'
                                    } md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4`}
                            >
                                <span className={`text-xs font-bold uppercase tracking-widest ${currentStep > step.id ? 'text-[#7A3E2C]' :
                                    currentStep === step.id ? 'text-[#7A3E2C]' : 'text-gray-400'
                                    }`}>
                                    Step {step.id}
                                </span>
                                <span className={`text-sm font-medium mt-1 ${currentStep === step.id ? 'text-[#1E1E1E]' : 'text-gray-500'
                                    }`}>{step.name}</span>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>

            {/* Category Banner - Updated for Multiple Selection */}


            <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyDown} className="space-y-10">

                {currentStep === 1 && (
                    <Step1GeneralInfo
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                    />
                )}

                {currentStep === 2 && (
                    <Step2Gallery
                        formData={formData}
                        mainPreview={mainPreview}
                        descPreviews={descPreviews}
                        handleMainImageChange={handleMainImageChange}
                        handleDescImageChange={handleDescImageChange}
                        removeMainImage={removeMainImage}
                        removeDescImage={removeDescImage}
                        addDetail={addDetail}
                        removeDetail={removeDetail}
                        handleDetailChange={handleDetailChange}
                        handleDetailImageChange={handleDetailImageChange}
                        removeDetailImage={removeDetailImage}
                        handleChange={handleChange}
                    />
                )}

                {currentStep === 3 && (
                    <Step3PhysicalDetails
                        formData={formData}
                        selectedAmenities={selectedAmenities}
                        handleAddressChange={handleAddressChange}
                        handleMapUrlChange={handleMapUrlChange}
                        handleAmenityToggle={handleAmenityToggle}
                        handleChange={handleChange}
                        setFormData={setFormData}
                    />
                )}

                {currentStep === 4 && (
                    <Step4Pricing
                        formData={formData}
                        handleChange={handleChange}
                        handleDiscountChange={handleDiscountChange}
                    />
                )}

                {currentStep === 5 && (
                    <Step5Policies
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                    />
                )}

                {currentStep === 6 && (
                    <Step6HouseRules
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                    />
                )}

                {currentStep === 7 && (
                    <Step7SafetyProperty
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}

                {/* Form Actions */}
                <div className="flex items-center justify-between border-t border-[#EFE3D7]/60 pt-8 mt-4">
                    {/* Back Button */}
                    <div>
                        {(currentStep > 1 || onBack) && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#7A3E2C]"
                            >
                                <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back
                            </button>
                        )}
                    </div>

                    <div className="flex gap-4">
                        {/* Next / Save Buttons */}
                        {currentStep < steps.length ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="inline-flex items-center gap-2 justify-center rounded-full bg-[#1E1E1E] px-8 py-3 text-sm font-medium text-white shadow-lg shadow-gray-200 hover:bg-black hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#7A3E2C] focus:ring-offset-2"
                            >
                                Next Step <span className="opacity-60">→</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => handleSubmit()}
                                disabled={loading}
                                className="inline-flex items-center justify-center rounded-full bg-[#7A3E2C] px-8 py-3 text-sm font-medium text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#7A3E2C] focus:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {loading ? 'Saving Property...' : initialData ? 'Update & Save Changes' : 'Finish & Publish Listing'}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
