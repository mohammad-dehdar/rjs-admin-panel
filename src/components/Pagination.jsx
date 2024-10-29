import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const delta = 1; // Number of pages to show before and after current page
        const range = [];
        const rangeWithDots = [];

        // Always show first page
        range.push(1);

        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i > 1 && i < totalPages) {
                range.push(i);
            }
        }

        // Always show last page
        if (totalPages > 1) {
            range.push(totalPages);
        }

        // Add dots between numbers
        let l;
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            {/* Previous button */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
            >
                <ChevronRight className="w-4 h-4" />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <span className="px-2">...</span>
                    ) : (
                        <button
                            onClick={() => onPageChange(page)}
                            className={`w-8 h-8 rounded-full ${page === currentPage
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                } flex items-center justify-center`}
                        >
                            {page}
                        </button>
                    )}
                </React.Fragment>
            ))}

            {/* Next button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;