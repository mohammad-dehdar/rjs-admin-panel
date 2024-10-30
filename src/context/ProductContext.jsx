import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import api from '../config/api';

const ProductContext = createContext();


const useInitialProducts = () => {
    return useQuery({
        queryKey: ['initialProducts'],
        queryFn: async () => {
            const response = await api.get('products?page=1&limit=10');
            return response.data;
        }
    });
};


const useAllProducts = (totalPages) => {
    return useQuery({
        queryKey: ['allProducts', totalPages],
        queryFn: async () => {
            if (!totalPages) return [];
            
            const promises = Array.from({ length: totalPages }, (_, i) =>
                api.get(`products?page=${i + 1}&limit=10`).then(res => res.data.data)
            );
            
            const results = await Promise.all(promises);
            return results.flat();
        },
        enabled: !!totalPages,
        staleTime: 30000 // Cache results for 30 seconds
    });
};

const ProductProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Get initial data to determine total pages
    const { data: initialData } = useInitialProducts();
    
    // Fetch all products
    const { 
        data: allProducts = [], 
        isLoading: isAllProductsLoading,
        error: allProductsError
    } = useAllProducts(initialData?.totalPages);

    // Filter and paginate products
    const { 
        paginatedProducts, 
        totalPages, 
        filteredTotal 
    } = useMemo(() => {
        // Filter products based on search term
        const filtered = allProducts.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Calculate total pages based on filtered results
        const total = filtered.length;
        const pages = Math.max(1, Math.ceil(total / itemsPerPage));

        // Get current page products
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const currentPageProducts = filtered.slice(start, end);

        return {
            paginatedProducts: {
                data: currentPageProducts,
                meta: {
                    totalPages: pages,
                    currentPage,
                    total,
                    limit: itemsPerPage
                }
            },
            totalPages: pages,
            filteredTotal: total
        };
    }, [allProducts, searchTerm, currentPage, itemsPerPage]);


    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const contextValue = {
        products: paginatedProducts,
        isLoading: isAllProductsLoading,
        error: allProductsError,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage
    };

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
};

const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

export default ProductProvider;
export { useProductContext };