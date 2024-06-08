import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BannerAd: React.FC<{ bannerAds: any[] }> = ({ bannerAds }) => {
  const currentDate = new Date();

  // 根据 order 字段对广告进行排序
  const sortedAds = [...bannerAds].sort((a, b) => a.attributes.order - b.attributes.order);

  return (
    <section className="max-w-5xl mx-auto bg-white">
      <div className="flex flex-col space-y-4">
        {sortedAds.map((ad) => {
          if (new Date(ad.attributes.expirationDate) >= currentDate) {
            return (
              <Link
                key={ad.id}
                href={ad.attributes.targetUrl}
                target={ad.attributes.openInNewTab ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                <Image
                  src={ad.attributes.imageUrl}
                  width={960}
                  height={80}
                  alt={ad.attributes.description}
                  className="w-full h-20"
                  loading="lazy"
                  unoptimized
                />
              </Link>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
};

export default BannerAd;