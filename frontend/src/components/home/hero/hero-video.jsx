import { YouTubePlayer } from "@/components/ui/youtube-video-player";
import { INTRO_VIDEO_ID, INTRO_VIDEO_THUMBNAIL } from "@/data/videos";

export default function HeroVideo({ playLabel }) {
  return (
    <YouTubePlayer
      videoId={INTRO_VIDEO_ID}
      customThumbnail={INTRO_VIDEO_THUMBNAIL}
      playAriaLabel={playLabel}
      className="mt-8 md:mt-10"
      containerClassName="rounded-[18px] border-0 bg-transparent shadow-[0_40px_90px_-44px_rgba(13,13,13,0.38)]"
      playerClassName="aspect-[16/10] md:aspect-[2.15/1]"
      thumbnailClassName="bg-transparent"
      thumbnailImageClassName="opacity-100"
      playButtonClassName="size-16 border-0 bg-white/90 text-weecomi-dark-gray shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white md:size-16"
      playIconClassName="ml-0.5 h-7 w-7 translate-x-0 fill-current text-weecomi-dark-gray md:h-7 md:w-7"
      expandButtonClassName="border-0 bg-white/80 text-weecomi-dark-gray hover:bg-white"
    />
  );
}
