import TourCard from "./TourCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import fortaleza from '@/lib/ponte-dos-ingleses-scaled-1024x683.jpg'
import jeri from '@/lib/oquefazerjericoacoara-4-1024x768.webp'
import canoa from '@/lib/praia-canoa-quebrada-ceara.webp'
import cumbuco from '@/lib/O_que_Fazer_na_Praia_do_Cumbuco.webp'
import lagoinha from '@/lib/lagoinha-ceara-capa-740x415.jpg'
import fontes from '@/lib/foto-praia-das-fontes-beberibe-ce.jpg'
import morro from '@/lib/morrobrancobeachceara.jpg'
import icarai from '@/lib/icaraizinho-de-amontada13.jpg'
import paracuru from '@/lib/Farol-de-Paracuru-1024x577.jpeg'
import flexeiras from '@/lib/WhatsApp-Image-2024-02-05-at-15.03.23-scaled.jpeg'

const tourData = [
  {
    name: "Fortaleza",
    price: 180.00,
    description: "Capital vibrante com praias urbanas, Beach Park e vida noturna animada.",
    imageUrl: fortaleza
  },
  {
    name: "Jericoacoara",
    price: 180.00,
    description: "Paisagens paradisíacas com dunas e lagoas cristalinas, ideal para aventuras de buggy.",
    imageUrl: jeri
  },
  {
    name: "Canoa Quebrada",
    price: 160.00,
    description: "Praia famosa pelas falésias e símbolo da lua e estrela.",
    imageUrl: canoa
  },
  {
    name: "Cumbuco",
    price: 140.00,
    description: "Destino ideal para esportes aquáticos e dunas perfeitas para buggys.",
    imageUrl: cumbuco
  },
  {
    name: "Lagoinha",
    price: 140.00,
    description: "Praia tranquila com falésias e um visual encantador.",
    imageUrl: lagoinha
  },
  {
    name: "Praia das Fontes",
    price: 120.00,
    description: "Conhecida pelas fontes naturais e passeios por dunas e cavernas.",
    imageUrl: fontes
  },
  {
    name: "Morro Branco",
    price: 120.00,
    description: "Famosa pelas falésias coloridas e labirintos naturais únicos.",
    imageUrl: morro
  },
  {
    name: "Icaraí de Amontada",
    price: 100.00,
    description: "Praia relaxante ideal para quem busca tranquilidade.",
    imageUrl: icarai
  },
  {
    name: "Paracuru",
    price: 80.00,
    description: "Destino sereno com dunas e recifes perfeitos para explorar.",
    imageUrl: paracuru
  },
  {
    name: "Flexeiras",
    price: 60.00,
    description: "Praia calma com paisagens belíssimas, ideal para um passeio relaxante.",
    imageUrl: flexeiras
  }
];

export function CarouselSpacing() {
  return (
    <Carousel id="tours" className="w-full max-w-4xl mx-auto">
      <CarouselContent className="flex gap-4 p-4">
        {tourData.map((tour, index) => (
          <CarouselItem 
            key={index} 
            className="md:basis-1/2 lg:basis-1/3"
          >
            <TourCard
              title={`${tour.name}`}
              description={tour.description}
              imageUrl={tour.imageUrl}
              price={`R$ ${tour.price.toFixed(2)}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

