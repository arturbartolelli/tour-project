import TourCard from "./TourCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import imagem1 from '@/lib/gcxapzuqhqsfp0w5goag.webp';

export function CarouselSpacing() {
  return (
    <Carousel id="tours" className="w-full max-w-4xl mx-auto">
      <CarouselContent className="flex gap-4 p-4">
        {[...Array(5)].map((_, index) => (
          <CarouselItem 
            key={index} 
            className="md:basis-1/2 lg:basis-1/3"
          >
            <TourCard
              title={`Passeio ${index + 1}`}
              description="Um passeio bem legal!"
              imageUrl={imagem1}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
