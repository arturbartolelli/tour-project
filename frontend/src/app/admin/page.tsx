"use client";

import { useCallback, useEffect, useState } from "react";
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
import { Edit, Trash2 } from "lucide-react";
import { getTours, updateTour, deleteTours, getUsers } from "./actions";
import { isActionError } from "@/utils/error";
import { formatDateAndTime } from "@/lib/utils";
import { toast } from "sonner";

export type Reserva = {
  id: string;
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

export type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  uuid: string;
};

export default function Admin() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const getTourList = useCallback(async () => {
    const res = await getTours();
    if (isActionError(res)) {
      console.error("Erro ao carregar reservas:", res);
      return;
    }
    setReservas(res);
  }, []);

  const getUserList = useCallback(async () => {
    const res = await getUsers();
    if (isActionError(res)) {
      console.error("Error:", res);
      return;
    }
    setUsers(res);
  }, []);

  useEffect(() => {
    getTourList();
    getUserList();
  }, [getTourList, getUserList]);

  const handleEdit = (reserva: Reserva) => {
    setSelectedReserva(reserva);
    setIsSheetOpen(true);
  };

  const handleSaveChanges = async () => {
    if (selectedReserva) {
      const id = selectedReserva.id;

      const payload = {
        reservation: selectedReserva.reservation,
        price: selectedReserva.price,
        city: selectedReserva.city,
      };

      const res = await updateTour(id, payload);

      if (isActionError(res)) {
        toast("Erro ao atualizar reserva");
        console.error("Error", res);
        return;
      }

      toast("Reserva atualizada");

      setReservas((prevReservas) =>
        prevReservas.map((reserva) =>
          reserva.uuid === id ? { ...reserva, ...selectedReserva } : reserva
        )
      );

      setIsSheetOpen(false);
      getTourList()
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteTours(id);
    if (isActionError(res)) {
      console.error("Erro ao excluir reserva:", res);
      return;
    }
    setReservas((prevReservas) =>
      prevReservas.filter((reserva) => reserva.id !== id)
    );

    toast("Reserva excluída com sucesso");
  };

  const handleInputChange = (field: keyof Reserva, value: string | number) => {
    setSelectedReserva((prev) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : null
    );
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
                  <TableHead>Excluir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservas.map((reserva) => {
                  const { date, time } = formatDateAndTime(
                    reserva.date,
                    reserva.time
                  );
                  return (
                    <TableRow key={reserva.id}>
                      <TableCell className="font-medium">
                        {reserva.id}
                      </TableCell>
                      <TableCell>{reserva.reservation}</TableCell>
                      <TableCell>{date}</TableCell>
                      <TableCell>{time}</TableCell>
                      <TableCell>{`R$${reserva.price.toFixed(2)}`}</TableCell>
                      <TableCell>{reserva.city}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          onClick={() => handleEdit(reserva)}
                        >
                          <Edit />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          onClick={() => handleDelete(reserva.id)}
                        >
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card className="w-full max-w-4xl p-6 shadow-lg rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Administrador</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.isAdmin ? "Sim" : "Não"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Reserva</SheetTitle>
            <SheetDescription>
              Faça alterações nas informações da reserva. Clique em salvar
              quando terminar.
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
                  value={selectedReserva.reservation}
                  onChange={(e) =>
                    handleInputChange("reservation", e.target.value)
                  }
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
                  value={selectedReserva.price}
                  onChange={(e) =>
                    handleInputChange("price", Number(e.target.value))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  Cidade
                </Label>
                <Input
                  id="city"
                  value={selectedReserva.city}
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
