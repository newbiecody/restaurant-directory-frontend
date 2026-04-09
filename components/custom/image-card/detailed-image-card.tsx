"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface DetailedImageCardProps {
  src: string;
  alt: string;
  title: string;
  href: string;
  footer?: React.ReactNode;
  className?: string;
  imageClassName?: string;
}

export default function DetailedImageCard({
  src,
  alt,
  title,
  href,
  footer,
  className,
  imageClassName,
}: DetailedImageCardProps) {
  return (
    <Link href={href} className={cn("block group", className)}>
      <div className="overflow-hidden rounded-lg bg-muted">
        <div className="relative w-full aspect-square">
          <Image
            src={src}
            alt={alt}
            fill
            className={cn(
              "object-cover transition-transform group-hover:scale-105",
              imageClassName
            )}
          />
        </div>
        <div className="p-3 space-y-2">
          <h3 className="font-semibold line-clamp-2 group-hover:text-orange-600 transition-colors">
            {title}
          </h3>
          {footer && <div className="text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </Link>
  );
}
