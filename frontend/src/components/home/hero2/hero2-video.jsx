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
      containerClassName="overflow-hidden rounded-xl bg-white"
      playerClassName="aspect-video"
      thumbnailClassName="bg-weecomi-dark-gray"
      thumbnailImageClassName="opacity-100"
      playButtonClassName="size-16 border-0 bg-weecomi-orange text-white shadow-[0_12px_40px_-12px_rgba(240,159,47,0.7)] transition hover:scale-105 hover:bg-weecomi-orange/90 md:size-[4.5rem]"
      playIconClassName="ml-0.5 h-7 w-7 translate-x-0 fill-current text-white md:h-8 md:w-8"
      expandButtonClassName="border-0 bg-white/90 text-weecomi-dark-gray shadow-sm hover:bg-white"
    />
  );
}
