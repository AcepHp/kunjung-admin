import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export type BreadCrumbItem = {
    name: string;
    href?: string;
    disabled?: boolean;
};

interface BreadCrumbsProps {
    items: BreadCrumbItem[];
    title?: string;
    description?: string;
    className?: string;
    isLoading?: boolean;
}

export default function BreadCrumbs({
    items,
    title,
    description,
    className,
    isLoading = false,
}: BreadCrumbsProps) {
    // 1) Skeleton Loading State
    if (isLoading) {
        return (
            <div
                className={[
                    "flex items-center justify-between gap-3 animate-pulse",
                    "flex-wrap",
                    className,
                ].join(" ")}
            >
                {/* Left: Breadcrumb Pill Skeleton */}
                <div className="h-8 w-48 rounded-full bg-gray-200"></div>

                {/* Right: Title/Description Skeleton */}
                <div className="flex flex-col items-end space-y-2">
                    <div className="h-5 w-32 rounded bg-gray-200"></div>
                    {description && (
                        <div className="h-3 w-48 rounded bg-gray-200"></div>
                    )}
                </div>
            </div>
        );
    }

    // 2) Normal State
    if (!items?.length) return null;

    const lastIndex = items.length - 1;

    return (
        <div
            className={[
                "flex items-center justify-between gap-3",
                "flex-wrap", // ✅ aman kalau layar kecil
                className,
            ].join(" ")}
        >
            {/* LEFT: Breadcrumb pill (auto width) */}
            <nav
                aria-label="Breadcrumb"
                className={[
                    "inline-flex items-center rounded-full",
                    "border border-[#E9D6C6] bg-[#FAF4EC]",
                    "px-3 py-1.5 text-[11px] sm:text-xs",
                    "text-gray-500 shadow-[0_4px_12px_rgba(0,0,0,0.04)]",
                ].join(" ")}
            >
                {items.map((item, index) => {
                    const isLast = index === lastIndex;
                    const isDisabled = item.disabled;

                    return (
                        <div key={`${item.name}-${index}`} className="flex items-center">
                            {index > 0 && (
                                <ChevronRightIcon className="mx-1.5 h-3 w-3 text-[#C3A086]" />
                            )}

                            {item.href && !isLast && !isDisabled ? (
                                <Link
                                    href={item.href}
                                    className="font-medium text-[#7A3E2C] hover:text-[#5C2D20] transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <span
                                    className={[
                                        "font-medium",
                                        isLast
                                            ? "text-[#2E2620]"
                                            : isDisabled
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-500",
                                    ].join(" ")}
                                >
                                    {item.name}
                                </span>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* RIGHT: Title */}
            {(title || description) && (
                <div className="text-right">
                    {title && (
                        <h1 className="text-sm sm:text-base font-semibold text-[#2E2620] leading-tight">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="mt-0.5 text-[11px] text-gray-500">
                            {description}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
