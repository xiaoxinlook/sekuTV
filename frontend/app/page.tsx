import Link from "next/link";
import { fetchVideoList, fetchVideoDetails } from "@/config/api";
import VideoGrid from "@/components/VideoGrid";

export default async function Home() {
  const categories = [
    { id: "1", name: "精品国产" },
    { id: "7", name: "探花实录" },
    { id: "12", name: "白虎萝莉" },
    { id: "14", name: "网红主播" },
  ];

  // 获取网站数据
  const res = await fetch('http://localhost:1337/api/website');
  const data = await res.json();
  const websiteData = data.data.attributes;
  const API_BASE_URL = websiteData.API_BASE_URL;
  const releaseUrl = websiteData.release;

  const videoDetailsByCategory = [];

  for (const category of categories) {
    const data = await fetchVideoList(API_BASE_URL, category.id, 1);
    const vodIds = data.list.slice(0, 8).map((item: any) => item.vod_id);
    const details = await fetchVideoDetails(API_BASE_URL, vodIds);
    videoDetailsByCategory.push({ category: category.name, videos: details.list });
  }

  return (
    <>
      {videoDetailsByCategory.map(({ category, videos }) => (
        <div key={category}>
          {/* 标题和更多链接 */}
          <div className="flex justify-between bg-purple-500 items-center">
            <h2 className="text-lg font-bold text-white px-4 py-2 rounded">{category}</h2>
            <Link href={releaseUrl} className="text-blue-500 hover:text-blue-700 hover:underline">
              点击收藏发布页
            </Link>
          </div>

          {/* 网格布局 */}
          <VideoGrid videos={videos} />
        </div>
      ))}
    </>
  );
}