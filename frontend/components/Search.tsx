'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
      router.push(`/search/${encodedSearchTerm}`);
    }
  };

  return (
    <section className="max-w-5xl mx-auto bg-white">
      <div className="flex items-center justify-center my-2">
        <input
          type="text"
          placeholder="搜索..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors duration-300"
        >
          搜...
        </button>
      </div>
    </section>
  );
};

export default Search;