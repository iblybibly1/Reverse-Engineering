export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
      <div className="skeleton aspect-video w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 rounded-lg w-3/4" />
        <div className="skeleton h-4 rounded-lg w-1/2" />
        <div className="skeleton h-4 rounded-lg w-full" />
        <div className="skeleton h-4 rounded-lg w-4/5" />
      </div>
    </div>
  );
}
