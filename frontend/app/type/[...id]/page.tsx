// /type/[id]/page.tsx
import { fetchVideoList, fetchVideoDetails } from '@/config/api';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';
import type { Metadata } from 'next'
import Script from 'next/script';

interface Video {
  vod_id: string;
  vod_name: string;
  vod_pic: string;
  type_name: string;
  vod_time: string;
  vod_play_url: string;
}

type VideoListProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: VideoListProps): Promise<Metadata> {
  const typeId = params.id[0];
  const page = Number(searchParams.page) || 1;

  // 获取网站数据
  const res = await fetch('http://localhost:1337/api/website');
  const data = await res.json();
  const API_BASE_URL = data.data.attributes.API_BASE_URL;

  // 获取视频列表
  const videoListData = await fetchVideoList(API_BASE_URL, typeId, page);
  const { total, pagecount, list: videos } = videoListData;

  // 获取视频详情
  const videoDetails = await Promise.all(
    videos.map(async (video: Video) => {
      const details = await fetchVideoDetails(API_BASE_URL, [video.vod_id]);
      return details.list[0];
    })
  );

  const categoryName = videoDetails[0]?.type_name || '';

  return {
    title: `${categoryName} - 视频分类`,
    description: `探索色库TV的${categoryName}分类,共有${total}个视频。当前显示第${page}页,共${pagecount}页。`,
  };
}

export default async function VideoList({ params, searchParams }: VideoListProps) {
  const typeId = params.id[0];
  const page = Number(params.id[1]) || 1; // 从路由参数中获取页码
  // 获取网站数据
  const res = await fetch('http://localhost:1337/api/website');
  const data = await res.json();
  const API_BASE_URL = data.data.attributes.API_BASE_URL;
  const allianceAText = data.data.attributes.AllianceA[0].children[0].text;

  // 获取视频列表
  const videoListData = await fetchVideoList(API_BASE_URL, typeId, page);
  const { total, pagecount, list: videos } = videoListData;

  // 获取视频详情
  const videoDetails = await Promise.all(
    videos.map(async (video: Video) => {
      const details = await fetchVideoDetails(API_BASE_URL, [video.vod_id]);
      return details.list[0];
    })
  );

  const categoryName = videoDetails[0]?.type_name || '';

  return (
    <div>
      <div className="flex bg-purple-500 text-white px-2 py-2">
        <h1 className="text-2xl font-bold">分类: {categoryName}</h1>
      </div>
      <div className="m-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videoDetails.map((video) => (
          <VideoCard key={video.vod_id} video={video} />
        ))}
      </div>
      {pagecount > 1 && (
        <Pagination
          totalPages={pagecount}
          currentPage={page}
          basePath={`/type/${typeId}`}
        />
      )}
      <Script id="AllianceA" strategy="lazyOnload">{`${allianceAText}`}</Script>
    </div>
  );
}