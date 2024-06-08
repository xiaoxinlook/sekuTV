import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CategoryList from "@/components/CategoryList";
import BannerAd from "@/components/BannerAd";
import HiddenLinks from "@/components/HiddenLinks";
import SearchTags from "@/components/SearchTags";
import IconAd from "@/components/IconAd";
import FriendlyLinks from "@/components/FriendlyLinks";
import Search from "@/components/Search";
import Matomo from '@/components/Matomo'
import Header from "@/components/header";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | 色库TV',
    default: '色库TV- 汇聚精品视频', 
  }, 
  description: "色库TV- 汇聚精品视频",
  keywords: ['真实乱伦', '精品国产', '日韩精选', '反差骚货', '激情动漫', '白虎萝莉', '网红主播'],
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
 // 获取 Banner 广告数据
 const resBanner = await fetch('http://localhost:1337/api/banner-ads');
 const dataBanner = await resBanner.json();
 const bannerAds = dataBanner.data;
 // 获取图标广告数据
 const resIcon = await fetch('http://localhost:1337/api/icon-ads');
 const dataIcon = await resIcon.json();
 const iconAds = dataIcon.data;
  // 获取友链数据
 const reslink = await fetch('http://localhost:1337/api/friend-links');
 const datalink = await reslink.json();
 const friendLinks = datalink.data;

 const reshidden = await fetch('http://localhost:1337/api/anlian-links');
 const datahidden = await reshidden.json();
 const hiddenLinks = datahidden.data;

 const resCategory = await fetch('http://localhost:1337/api/categories?populate=subcategories');
 const dataCategory = await resCategory.json();
 const categories = dataCategory.data;

 const res = await fetch('http://localhost:1337/api/website?populate=tag');
  const data = await res.json();
  const websiteData = data.data.attributes;
  const tags = data.data.attributes.tag.map((tag: any) => tag.name);


  return (
    <html lang="zh-CN">
      <body className={inter.className}>
      <Header tips={websiteData.tips} release={websiteData.release} />
        <CategoryList categories={categories} />
        <Search />
        {bannerAds && bannerAds.length > 0 && <BannerAd bannerAds={bannerAds} />}
        {hiddenLinks && hiddenLinks.length > 0 && <HiddenLinks hiddenLinks={hiddenLinks} />}
        {tags && tags.length > 0 && <SearchTags tags={tags} />}
        {iconAds && iconAds.length > 0 && <IconAd iconAds={iconAds} />}
        <FriendlyLinks friendLinks={friendLinks} />
        <main className="flex min-h-screen max-w-5xl mx-auto flex-col items-center bg-white justify-between">{children}</main>
        <Footer telegram={websiteData.Telegram} email={websiteData.email} footer={websiteData.footer} />
        <Matomo/>
      </body>
    </html>
  );
}
