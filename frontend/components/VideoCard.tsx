// app/components/VideoCard.tsx
import Image from "next/image";
import { CgEye } from "react-icons/cg";
import Link from "next/link";

type VideoProps = {
  vod_id: string;
  vod_name: string;
  vod_pic: string;
  type_name: string;
  vod_time: string;
};

export default function VideoCard({ video }: { video: VideoProps }) {
  return (
      <Link href={`/detail/${video.vod_id}`} prefetch={true}>
    <div className="relative group">
         
              <div className="relative overflow-hidden rounded-lg">
                  <Image
                      src={video.vod_pic}
                      alt={video.vod_name}
                      width={640}
                      priority={true}
                      height={360}
                      className="transition-transform duration-300 group-hover:scale-110"
                       />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300">
                      <CgEye className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
              
      </div>
      <h3 className="mt-2 text-sm sm:text-xs">{video.vod_name}</h3>
    </div>
    </Link>
  );
}