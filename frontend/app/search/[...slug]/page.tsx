// /search/[[slug]]/page.tsx
import { fetchVideoList, fetchVideoDetails } from '@/config/api';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';
import type { Metadata } from 'next';
import Script from 'next/script';

interface Video {
  vod_id: string;
  vod_name: string;
  vod_pic: string;
  type_name: string;
  vod_time: string;
  vod_play_url: string;
}

type SearchResultProps = {
  params: { slug?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: SearchResultProps): Promise<Metadata> {
  const encodedSearchTerm = params.slug?.[0] || '';
  const page = Number(params.slug?.[1]) || 1;
  const searchTerm = decodeURIComponent(encodedSearchTerm);

  // 获取网站数据
  const res = await fetch('http://localhost:1337/api/website');
  const data = await res.json();
  const API_BASE_URL = data.data.attributes.API_BASE_URL;

  // 获取视频列表
  const videoListData = await fetchVideoList(API_BASE_URL, undefined, page, searchTerm);
  const { total, pagecount } = videoListData;

  const title = `"${searchTerm}"的搜索结果`;
  const description = `在色库TV探索关于"${searchTerm}"的${total}个搜索结果。当前显示第${page}页,共${pagecount}页。`;

  return {
    title,
    description,
  };
}

export default async function SearchResult({ params, searchParams }: SearchResultProps) {
  const encodedSearchTerm = params.slug?.[0] || '';
  const page = Number(params.slug?.[1]) || 1;

  // 对编码后的搜索词进行解码
  const searchTerm = decodeURIComponent(encodedSearchTerm);

  // 获取网站数据
  const res = await fetch('http://localhost:1337/api/website');
  const data = await res.json();
  const API_BASE_URL = data.data.attributes.API_BASE_URL;
  const allianceAText = data.data.attributes.AllianceA[0].children[0].text;

  // 获取视频列表
  const videoListData = await fetchVideoList(API_BASE_URL, undefined, page, searchTerm);
  const { total, pagecount } = videoListData;
  const videos = videoListData.list;

  // 获取视频详情
  const videoDetails = await Promise.all(
    videos.map(async (video: Video) => {
      const details = await fetchVideoDetails(API_BASE_URL, [video.vod_id]);
      return details.list[0];
    })
  );

  return (
    <div>
      <div className="flex bg-purple-500 text-white px-2 py-2">
        <h1 className="text-2xl font-bold">搜索结果: {searchTerm}</h1>
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
          basePath={`/search/${searchTerm}`}
        />
      )}
      <Script id="AllianceA" strategy="lazyOnload">{`${allianceAText}`}</Script>
    </div>

  );
}