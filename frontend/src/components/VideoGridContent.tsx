import { useEffect, useRef, useState } from "react";
import { formatAgoTime, formatDuration, formatViews } from "./lib/formattingFn";

type VideoGridContentProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VideoGridContent = ({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridContentProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  //   Control the video play on hover
  useEffect(() => {
    if (videoRef.current == null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          alt=""
          className={`block w-full h-full object-cover  ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? "opacity-100" : "opacity-0"
          }`}
        />
      </a>

      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            src={channel.profileUrl}
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {formatViews(views)} Views . {formatAgoTime(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGridContent;
