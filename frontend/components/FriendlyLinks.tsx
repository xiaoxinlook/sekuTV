import React from 'react';
import Link from 'next/link';
import { ImRedo2 } from "react-icons/im";

const FriendlyLinks: React.FC<{ friendLinks: any[] }> = ({ friendLinks }) => {
  // 根据 order 字段对友情链接进行排序
  const sortedLinks = [...friendLinks].sort((a, b) => a.attributes.order - b.attributes.order);

  return (
    <section className="max-w-5xl mx-auto bg-white">
      {/* 标题和更多链接 */}
      <div className="flex justify-between bg-purple-500 items-center">
        <h2 className="text-lg font-bold text-white px-4 py-2 rounded">合作伙伴</h2>
        <Link href="/more" className="text-blue-500 hover:text-blue-700 hover:underline">
          点击收藏发布页
        </Link>
      </div>

      {/* 网格布局 */}
      <div className="flex flex-wrap mt-4 pb-4 gap-2">
        {sortedLinks.map((link) => (
          <Link
            key={link.id}
            href={link.attributes.url}
            target={link.attributes.openInNewTab ? '_blank' : '_self'}
            rel="noopener noreferrer"
          >
            {/* 按钮样式 */}
            <button
              type="button"
              className="relative flex items-center justify-center px-3 py-2 overflow-hidden border-2 border-purple-800 font-semibold rounded bg-gray-100 text-gray-900"
            >
              <span className="text-sm">{link.attributes.name}</span>
              <span className="absolute top-0 right-0 px-2 py-1 text-xs tracking-tight text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 bg-orange-400">
                <ImRedo2 className="w-3 h-3" />
              </span>
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FriendlyLinks;