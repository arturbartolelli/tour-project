import * as React from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import Script from "next/script";
import { CarouselSpacing } from "@/components/CarouselSpacing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Header />

      <div className="w-[calc(100%-2rem)] max-w-4xl mt-28">
        <Card className="flex items-center justify-center h-1/2 bg-cover bg-center p-4">
          <h1 className="text-4xl font-bold uppercase">Turistando Ceará</h1>
        </Card>

        <Card className="flex items-center justify-center h-1/2 p-4 mt-4">
          <div className="p-4">
            Explore as belezas do Ceará com a facilidade de um site de reservas
            totalmente automático. Aqui, você encontra uma seleção especial de
            passeios e experiências que levam você aos destinos mais encantadores
            deste estado incrível. Com apenas alguns cliques, você pode planejar e
            garantir sua aventura pelo Ceará, aproveitando praias paradisíacas,
            paisagens deslumbrantes e cultura rica, tudo ao seu alcance. Deixe que
            cuidamos dos detalhes, enquanto você se prepara para explorar o melhor
            do Ceará!
          </div>
        </Card>

        <div className="mt-4">
          <CarouselSpacing />
        </div>
        <Footer />
      </div>

      <Script
        src="https://storage.googleapis.com/verbeux-public-images-prod/cdn/bubble.js"
        data-rita-id="69a22013-9afe-11ef-929e-42004e494300"
        rita-url="https://rita.verbeux.com.br"
        strategy="afterInteractive"
      />
    </div>
  );
}
