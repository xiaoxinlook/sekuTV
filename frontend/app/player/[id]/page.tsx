// app/detail/[id]/page.tsx
import VideoCard from "@/components/VideoCard";
import { fetchVideoDetails, fetchVideoList } from "@/config/api";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";
import type { Metadata, ResolvingMetadata } from 'next'
import Script from "next/script";

interface Video {
  vod_id: string;
  vod_name: string;
  vod_pic: string;
  type_name: string;
  vod_time: string;
  vod_play_url: string; 
}

interface VideoDetailProps {
  params: {
    id: string;
  };
}
export async function generateMetadata({ params }: VideoDetailProps): Promise<Metadata> {
    const { id } = params;
  // 获取网站数据
    const res = await fetch('http://localhost:1337/api/website?populate=playLink');
    const data = await res.json();
    const websiteData = data.data.attributes;
    const API_BASE_URL = websiteData.API_BASE_URL;
  // 获取视频详情
    const videoDetailData = await fetchVideoDetails(API_BASE_URL, [id]);
    const video: Video = videoDetailData.list[0];
  
    const title = `${video.vod_name} - 在线播放`;
    const description = `当前 ${video.vod_name}在线播放页,  ${video.type_name} 分类下的视频.`;
    const ogImage = `${video.vod_pic}`;
  
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${video.vod_name} 在线播放`,
          },
        ],
      },
    };
  }

export default async function VideoDetail({ params }: VideoDetailProps) {
  const { id } = params;
  
  // 获取网站数据
  const res = await fetch('http://localhost:1337/api/website');
  const data = await res.json();
  const websiteData = data.data.attributes;
  const API_BASE_URL = websiteData.API_BASE_URL;
  const allianceBText = data.data.attributes.AllianceB?.[0]?.children?.[0]?.text;
  // 获取视频详情
  const videoDetailData = await fetchVideoDetails(API_BASE_URL, [id]);
  const video: Video = videoDetailData.list[0];
  // 获取视频列表
  const videoListData = await fetchVideoList(API_BASE_URL);
  const total = videoListData.total;

  // 生成8个随机视频ID
  const randomVideoIds = generateRandomVideoIds(total, 8);

  // 使用 fetchVideoDetails 查询随机视频的详情
  const relatedVideosData = await fetchVideoDetails(API_BASE_URL,randomVideoIds);
  const relatedVideos: Video[] = relatedVideosData.list;
  // 自动切割视频名称,提取关键词作为搜索标签
  const tags = extractTags(video.vod_name);

  return (
    <div className="w-full">
      {/* 面包屑导航 */}
      <div className="flex bg-purple-500 text-white px-4 py-2">
        <Link href="/" className="text-white hover:underline">
          首页
        </Link>
        <span className="mx-2">/</span>
        <span>{video.type_name}</span>
        <span className="mx-2">/</span>
        <span>{video.vod_name}</span>
      </div>

      {/* 视频详情 */}
      <div className="mt-8">
     <VideoPlayer video={video} />
     </div>



     <div className="mt-12">
<div className="flex justify-between bg-purple-500 items-center">
            <h2 className="text-lg font-bold text-white px-4 py-2 rounded">相关推荐</h2>
            <Link href="/more" className="text-blue-500 hover:text-blue-700 hover:underline">
              点击收藏发布页
            </Link>
          </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-2">
        {relatedVideos.map((video) => (
          <VideoCard key={video.vod_id} video={video} />
        ))}
      </div>
    </div>
    {allianceBText && (
  <Script id="AllianceB" strategy="lazyOnload">
    {`${allianceBText}`}
  </Script>
)}
    </div>
  );
}

// 自动切割视频名称,提取关键词作为搜索标签
function extractTags(videoName: string): string[] {
  // 移除视频名称中的特殊字符和空格
  const cleanedName = videoName.replace(/[【】\[\]()（）\s]+/g, '');
  // 提取 2 个字的搜索标签
  const tags: string[] = [];
  for (let i = 0; i < cleanedName.length - 1; i++) {
    const tag = cleanedName.slice(i, i + 2);
    tags.push(tag);
  }
  return tags;
}
// 生成指定数量的随机视频ID
function generateRandomVideoIds(total: number, count: number): string[] {
  const randomVideoIds: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomId = Math.floor(Math.random() * total) + 1;
    randomVideoIds.push(randomId.toString());
  }
  return randomVideoIds;
}