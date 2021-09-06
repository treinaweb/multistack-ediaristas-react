import { useState, useMemo } from 'react';

export default function usePagination(itemsList: unknown[], itemsPerPage = 10) {
    const [currentPage, setCurrentPage] = useState(1),
        totalPages = useMemo(() => {
            if (itemsList.length > itemsPerPage) {
                return Math.ceil(itemsList.length / itemsPerPage);
            }
            return 1;
        }, [itemsList, itemsPerPage]);

    return {
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
    };
}
