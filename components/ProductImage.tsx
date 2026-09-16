'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
}

export default function ProductImage({
  src,
  alt,
  priority = false,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        'relative w-full aspect-[4/5] bg-[#EFECE6] overflow-hidden flex items-center justify-center',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          'object-contain object-center p-4 transition-all duration-700 ease-out',
          isLoading ? 'scale-105 blur-xs opacity-0' : 'scale-100 blur-0 opacity-100'
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
