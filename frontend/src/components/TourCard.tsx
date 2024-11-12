'use client'

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
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

export default function TourCard({
  title,
  description,
  imageUrl,
  price,
}: {
  title: string;
  description: string;
  imageUrl: StaticImageData;
  price: string
}) {
  const navigate = useRouter()

  return (
    <Card className="w-full text-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 text-center">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-md"
          width={500}
          height={500}
        />
        <p className="p-4 h-24">{description}</p>
        <Badge variant={"secondary"}>
          <p>{price}</p>
        </Badge>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => navigate.push('https://wa.me/5585986540056')}>Reserve já!</Button>
      </CardFooter>
    </Card>
  );
}
