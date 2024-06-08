import React from 'react';
import Link from 'next/link';

const HiddenLinks: React.FC<{ hiddenLinks: any[] }> = ({ hiddenLinks }) => {
  // 根据 order 字段对隐藏链接进行排序
  const sortedLinks = [...hiddenLinks].sort((a, b) => a.attributes.order - b.attributes.order);

  return (
    <section className="max-w-5xl mx-auto bg-white">
      {/* 标题和更多链接 */}
      <div className="flex justify-between bg-purple-500 items-center">
        <h2 className="text-lg font-bold text-white px-4 py-2 rounded">近期搜索</h2>
        <Link href="/more" className="text-blue-500 hover:text-blue-700 hover:underline">
          点击收藏发布页
        </Link>
      </div>

      {/* 网格布局 */}
      <div className="grid grid-flow-col auto-cols-max mt-4 pb-4">
        {sortedLinks.map((link) => (
          <Link
            key={link.id}
            href={link.attributes.url}
            target={link.attributes.openInNewTab ? '_blank' : '_self'}
            rel="noopener noreferrer"
          >
            {/* 按钮样式 */}
            <button type="button" className="relative px-4 py-2 ml-2 overflow-hidden font-semibold rounded bg-gray-100 text-gray-900">
              {link.attributes.name}
              <span className="absolute top-0 right-0 px-5 py-1 text-xs tracki text-center bg-orange-400 uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3">
                🔥
              </span>
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HiddenLinks;