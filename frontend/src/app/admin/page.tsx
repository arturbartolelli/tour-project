'use client'

import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Edit } from "lucide-react";

type Reserva = {
  data: {
    createdAt: string;
    deletedAt: string;
    updatedAt: string;
    date: string;
    time: string;
    city: string;
    price: number;
    reservation: string;
    uuid: string;
  };
};

const initialReservas: Reserva[] = [
  {
    data: {
      createdAt: "2023-11-01",
      deletedAt: "",
      updatedAt: "2023-11-01",
      date: "2023-12-01",
      time: "09:00",
      city: "Jericoacoara",
      price: 250,
      reservation: "João Cleber",
      uuid: "RES001",
    },
  },
];

export default function Admin() {
  const [reservas, setReservas] = useState<Reserva[]>(initialReservas);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleEdit = (reserva: Reserva) => {
    setSelectedReserva(reserva);
    setIsSheetOpen(true);
  };

  const handleSaveChanges = () => {
    setReservas((prevReservas) =>
      prevReservas.map((reserva) =>
        reserva.data.uuid === selectedReserva?.data.uuid
          ? selectedReserva
          : reserva
      )
    );
    setIsSheetOpen(false);
  };

  const handleInputChange = (field: keyof Reserva["data"], value: string | number) => {
    setSelectedReserva((prev) => ({
      data: {
        ...prev!.data,
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <Tabs defaultValue="reservas" className=" mt-28">
        <TabsList className="grid grid-cols-2 justify-center">
          <TabsTrigger value="reservas">Reservas</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>
        <TabsContent value="reservas">
          <Card className="w-full max-w-4xl p-6 shadow-lg rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Edição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservas.map((reserva: Reserva) => (
                  <TableRow key={reserva.data.uuid}>
                    <TableCell className="font-medium">{reserva.data.uuid}</TableCell>
                    <TableCell>{reserva.data.reservation}</TableCell>
                    <TableCell>{reserva.data.date}</TableCell>
                    <TableCell>{reserva.data.time}</TableCell>
                    <TableCell>{`R$${reserva.data.price.toFixed(2)}`}</TableCell>
                    <TableCell>{reserva.data.city}</TableCell>
                    <TableCell>
                      <Button variant="outline" onClick={() => handleEdit(reserva)}>
                        <Edit />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sheet para edição */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Reserva</SheetTitle>
            <SheetDescription>
              Faça alterações nas informações da reserva. Clique em salvar quando terminar.
            </SheetDescription>
          </SheetHeader>
          {selectedReserva && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reservation" className="text-right">
                  Passeio
                </Label>
                <Input
                  id="reservation"
                  value={selectedReserva.data.reservation}
                  onChange={(e) => handleInputChange("reservation", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedReserva.data.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Hora
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={selectedReserva.data.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Preço
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={selectedReserva.data.price}
                  onChange={(e) => handleInputChange("price", Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  Cidade
                </Label>
                <Input
                  id="city"
                  value={selectedReserva.data.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={handleSaveChanges} type="submit">
                Salvar Alterações
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
