import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image, { StaticImageData } from "next/image";

export default function TourCard({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: StaticImageData;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <Image src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md" width={500} height={500}/>
        <p className="p-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Reserve já!</Button>
      </CardFooter>
    </Card>
  );
}
