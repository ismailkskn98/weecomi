export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <div className="size-8 animate-spin rounded-full border-2 border-weecomi-dark-gray/15 border-t-weecomi-orange" />
    </div>
  );
}
