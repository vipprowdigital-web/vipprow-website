export default function Loading() {
  return (
    <main className="py-44 max-w-7xl mx-auto">
      <div className="text-center text-gray-400">
        Loading articles…
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-xl bg-white/5"
          />
        ))}
      </div>
    </main>
  );
}
