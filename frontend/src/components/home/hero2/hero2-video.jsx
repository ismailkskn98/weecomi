import { YouTubePlayer } from "@/components/ui/youtube-video-player";
import { INTRO_VIDEO_ID, INTRO_VIDEO_THUMBNAIL } from "@/data/videos";

/** Corporate intro video frame for the standalone video band. */
export default function Hero2Video({ playLabel }) {
  return (
    <YouTubePlayer
      videoId={INTRO_VIDEO_ID}
      customThumbnail={INTRO_VIDEO_THUMBNAIL}
      playAriaLabel={playLabel}
      className="w-full"
      containerClassName="overflow-hidden rounded-sm border border-black/[0.06] bg-white shadow-[0_28px_80px_-40px_rgba(21,29,38,0.45)]"
      playerClassName="aspect-video"
      thumbnailClassName="bg-weecomi-light-gray/40"
      thumbnailImageClassName="opacity-100"
      playButtonClassName="size-14 border border-white/40 bg-weecomi-dark-gray/90 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-weecomi-dark-gray md:size-16"
      playIconClassName="ml-0.5 h-6 w-6 translate-x-0 fill-current text-white md:h-7 md:w-7"
      expandButtonClassName="border-0 bg-white/85 text-weecomi-dark-gray hover:bg-white"
    />
  );
}
