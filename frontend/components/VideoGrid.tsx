// app/components/VideoGrid.tsx
import VideoCard from "@/components/VideoCard";

interface Video {
  vod_id: string;
  vod_name: string;
  vod_pic: string;
  type_name: string; // 添加 type_name 属性
  vod_time: string; // 添加 vod_time 属性
}

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-2">
      {videos.map((video) => (
        <VideoCard key={video.vod_id} video={video} />
      ))}
    </div>
  );
}