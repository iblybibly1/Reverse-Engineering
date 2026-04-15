"use client";

import Image, { ImageProps } from "next/image";

const PLACEHOLDER = "https://placehold.co/800x600/e2e8f0/64748b?text=Horse+Show";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallback?: string;
}

export default function SafeImage({ fallback = PLACEHOLDER, ...props }: SafeImageProps) {
  return (
    <Image
      {...props}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = fallback;
      }}
    />
  );
}
