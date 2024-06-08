import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const IconAd: React.FC<{ iconAds: any[] }> = ({ iconAds }) => {
  const currentDate = new Date();

  // 根据 order 字段对图标广告进行排序
  const sortedAds = [...iconAds].sort((a, b) => a.attributes.order - b.attributes.order);

  return (
    <section className="max-w-5xl mx-auto bg-white">
      {/* 标题和更多链接 */}
      <div className="flex justify-between bg-purple-500 items-center">
        <h2 className="text-lg font-bold text-white px-4 py-2 rounded">精品APP下载-破解版</h2>
        <Link href="/more" className="text-blue-500 hover:text-blue-700 hover:underline">
          点击收藏发布页
        </Link>
      </div>
      {/* 网格布局 */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 mt-4">
        {sortedAds
          .filter((ad) => new Date(ad.attributes.expirationDate) > currentDate)
          .map((ad) => (
            <div key={ad.id} className="flex flex-col items-center">
              <Link
                href={ad.attributes.targetUrl}
                target={ad.attributes.openInNewTab ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <Image
                  src={ad.attributes.imageUrl}
                  alt={ad.attributes.nema}
                  width={80}
                  height={80}
                  className="rounded-full"
                  unoptimized
                />
                <span className="mt-2 text-sm text-black font-semibold text-center">
                  {ad.attributes.nema}
                </span>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default IconAd;