export const Loader = () => {
  return (
    <div
      role="status"
      aria-label="Loading results"
      className="absolute right-4 top-4 z-20 flex items-center justify-center rounded-full bg-black/70 p-2"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-yellow-400" />
    </div>
  );
};
