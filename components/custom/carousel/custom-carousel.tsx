"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface GenericCarouselProps<T> {
  initialItems: T[];
  // This function tells the component how to turn one data object into a UI element
  renderItem: (item: T) => React.ReactNode;
  // Unique key generator for the list
  itemKey: (item: T) => string | number;
  title?: string;
}

export default function CustomCarousel<T>({
  initialItems,
  renderItem,
  itemKey,
  title,
}: GenericCarouselProps<T>) {
  const [items] = useState<T[]>(initialItems);

  return (
    <section className="py-6">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

      <Carousel className="relative w-full">
        <CarouselContent className="px-1">
          {items.map((item) => (
            <CarouselItem
              key={itemKey(item)}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 py-1"
            >
              {renderItem(item)}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute -top-10 right-12 left-auto translate-y-0" />
        <CarouselNext className="absolute -top-10 right-0 translate-y-0" />
      </Carousel>
    </section>
  );
}
