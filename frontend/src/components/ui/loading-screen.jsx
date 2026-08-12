import RouteStateBackground from "@/components/common/route-state-background";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-80 overflow-hidden bg-[#f6f7f8]" role="status" aria-live="polite">
      <RouteStateBackground />
      <div className="relative flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    </div>
  );
}
