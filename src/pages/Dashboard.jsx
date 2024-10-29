import { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import { getCookie } from "../utils/cookie";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
import AddProductModal from "../components/AddProductModal";
import Pagination from "../components/Pagination";
import settingvector from "../assets/setting-3.svg";

const Dashboard = () => {
    const { 
        searchTerm, 
        setSearchTerm, 
        currentPage, 
        setCurrentPage,
        totalPages 
    } = useProductContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const username = getCookie('username');

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6">
            <div className="border mb-8 flex flex-row-reverse justify-between items-center bg-white p-3 rounded-2xl">
                <div className="flex items-start">
                    <div className="border bg-slate-400 h-10 ml-2"></div>
                    <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
                    <div className="mr-2">
                        <p>{username}</p>
                        <p className="text-sm font-light leading-[2px]">مدیر</p>
                    </div>
                </div>
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                />
            </div>
            <div className="flex justify-between items-end mb-2">
                <div className="flex gap-2 items-center">
                    <img src={settingvector} alt="" />
                    <h2 className="text-2xl">مدیریت کالا</h2>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#55A3F0] text-white rounded-[10px] p-2.5 hover:bg-blue-600"
                >
                    افزودن محصول
                </button>
            </div>

            <ProductList />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {isModalOpen && (
                <AddProductModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default Dashboard;