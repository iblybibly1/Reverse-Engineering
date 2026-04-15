"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Crown } from "lucide-react";
import ImageModal from "@/components/ui/ImageModal";

interface GalleryGridProps {
  winnerSrc: string;
  entrySrcs: string[];
  className?: string;
}

export default function GalleryGrid({ winnerSrc, entrySrcs, className = "" }: GalleryGridProps) {
  const allImages = [winnerSrc, ...entrySrcs];
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const openModal = (index: number) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);
  const goNext = useCallback(() => {
    setModalIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : 0));
  }, [allImages.length]);
  const goPrev = useCallback(() => {
    setModalIndex((prev) =>
      prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0
    );
  }, [allImages.length]);

  return (
    <>
      <div className={`space-y-8 ${className}`}>
        {/* Winner */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900">Winner</h2>
          </div>
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow"
            onClick={() => openModal(0)}
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/9] max-h-[500px]">
              <Image
                src={winnerSrc}
                alt="Class Winner"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/1200x800/1e3a5f/ffffff?text=Winner+Image";
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Winner ribbon */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-amber-400 text-amber-900 px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
              <Crown className="w-4 h-4" />
              Winner
            </div>
            <div className="absolute bottom-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Click to zoom
            </div>
          </div>
        </div>

        {/* Other entries */}
        {entrySrcs.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">All Entries</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {entrySrcs.map((src, idx) => (
                <div
                  key={src}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
                  onClick={() => openModal(idx + 1)}
                >
                  <Image
                    src={src}
                    alt={`Entry ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/400x400/e2e8f0/64748b?text=Entry";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-2 left-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                    Entry {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalIndex !== null && (
        <ImageModal
          images={allImages}
          currentIndex={modalIndex}
          onClose={closeModal}
          onNext={goNext}
          onPrev={goPrev}
          altPrefix="Gallery image"
        />
      )}
    </>
  );
}
