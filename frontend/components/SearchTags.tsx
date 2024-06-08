import React from 'react';
import Link from 'next/link';

const SearchTags: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <section className="max-w-5xl mx-auto bg-white">
      {/* 标题和更多链接 */}
      <div className="flex justify-between bg-purple-500 items-center">
        <h2 className="text-lg font-bold text-white px-4 py-2 rounded">热门搜索</h2>
        <Link href="/more" className="text-blue-500 hover:text-blue-700 hover:underline">
          点击收藏发布页
        </Link>
      </div>

      {/* 网格布局 */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-4">
        {tags.map((tag) => (
          <Link key={tag} href={`/search/${tag}`}>
            {/* 按钮样式 */}
            <button type="button" className="px-2 py-2 font-medium text-sm md:text-base text-black border-black rounded hover:text-blue-700">
              {tag}
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SearchTags;