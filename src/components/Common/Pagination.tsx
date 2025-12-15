"use client";

type PaginationProps = {
    page: number;
    total: number;
    pageSize?: number; // default 10
    onPageChange: (page: number) => void;
};

export default function Pagination({
    page,
    total,
    pageSize = 10,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (totalPages <= 1) return null;

    const start = (page - 1) * pageSize + 1;
    const end = Math.min(total, page * pageSize);

    const goToPage = (target: number) => {
        if (target < 1 || target > totalPages) return;
        onPageChange(target);
    };

    return (
        <div className="flex flex-col gap-2 items-start justify-between sm:flex-row sm:items-center">
            {/* Info text */}
            <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-medium text-[#2E2620]">
                    {start}–{end}
                </span>{" "}
                of{" "}
                <span className="font-medium text-[#2E2620]">
                    {total}
                </span>{" "}
                slides
            </p>

            {/* Controls */}
            <div className="inline-flex items-center gap-1 text-xs">
                <button
                    type="button"
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="rounded-full border border-[#E9D6C6] px-3 py-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAF4EC] transition"
                >
                    Prev
                </button>

                {/* Simple numbered pages (karena data kecil) */}
                {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNumber = idx + 1;
                    const isActive = pageNumber === page;
                    return (
                        <button
                            key={pageNumber}
                            type="button"
                            onClick={() => goToPage(pageNumber)}
                            className={[
                                "min-w-[32px] rounded-full px-2 py-1 text-center transition",
                                isActive
                                    ? "bg-[#7A3E2C] text-white"
                                    : "border border-[#E9D6C6] text-[#2E2620] hover:bg-[#FAF4EC]",
                            ].join(" ")}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                <button
                    type="button"
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="rounded-full border border-[#E9D6C6] px-3 py-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAF4EC] transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
