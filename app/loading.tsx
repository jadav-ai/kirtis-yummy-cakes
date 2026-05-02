export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 font-serif italic text-dark-rose tracking-widest animate-pulse">
          PREPARING SOMETHING SWEET...
        </p>
      </div>
    </div>
  )
}
