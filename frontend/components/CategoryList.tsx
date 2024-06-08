import React from 'react';
import Link from 'next/link';

const CategoryList: React.FC<{ categories: any[] }> = ({ categories }) => {
  // 根据 order 字段对一级分类进行排序
  const sortedCategories = [...categories].sort((a, b) => a.attributes.order - b.attributes.order);

  return (
    <section className="max-w-5xl mx-auto bg-white">
      {sortedCategories.map((category) => (
        <div key={category.id} className="grid grid-rows-2 grid-flow-col md:grid-rows-1 gap-2 px-2 py-2">
          <Link href={category.attributes.typeUrl || '/'}>
            <button className="row-span-2 sm:row-span-1 bg-violet-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-md font-bold hover:bg-violet-800 transition duration-200">
              {category.attributes.name}
            </button>
          </Link>
          {category.attributes.subcategories.length > 0 && (
            category.attributes.subcategories.map((subcategory: any) => {
              const subcategoryUrl = subcategory.maccmsID ? `/type/${subcategory.maccmsID}` : subcategory.typeUrl || '/';
              return (
                <Link key={subcategory.id} href={subcategoryUrl}>
                  <button className="bg-gray-100 bg-opacity-80 backdrop-filter backdrop-blur-md text-violet-600 px-1 py-0.5 sm:px-2 sm:py-1 rounded-md text-xs sm:text-sm font-medium hover:bg-opacity-100 transition duration-200 whitespace-nowrap">
                    {subcategory.name}
                  </button>
                </Link>
              );
            })
          )}
        </div>
      ))}
    </section>
  );
};

export default CategoryList;