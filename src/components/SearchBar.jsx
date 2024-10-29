const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="جستجو کالا"
                className="py-2 px-4  w-full focus:outline-none"
            />
        </div>
    );
};

export default SearchBar;