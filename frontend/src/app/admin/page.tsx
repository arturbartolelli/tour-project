import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const reservas = [
  {
    reservaId: "RES001",
    statusReserva: "Confirmada",
    passeio: "Passeio na Praia de Jericoacoara",
    dia: "2023-12-01",
    hora: "09:00",
    preco: "R$250,00",
    nomeCliente: "João Silva",
    emailCliente: "joao.silva@example.com",
  },
  {
    reservaId: "RES002",
    statusReserva: "Pendente",
    passeio: "Visita ao Parque Nacional de Ubajara",
    dia: "2023-12-02",
    hora: "14:00",
    preco: "R$150,00",
    nomeCliente: "Maria Oliveira",
    emailCliente: "maria.oliveira@example.com",
  },
  {
    reservaId: "RES003",
    statusReserva: "Cancelada",
    passeio: "City Tour em Fortaleza",
    dia: "2023-12-03",
    hora: "10:00",
    preco: "R$350,00",
    nomeCliente: "Carlos Santos",
    emailCliente: "carlos.santos@example.com",
  },
  {
    reservaId: "RES004",
    statusReserva: "Confirmada",
    passeio: "Passeio nas Dunas de Canoa Quebrada",
    dia: "2023-12-04",
    hora: "11:00",
    preco: "R$450,00",
    nomeCliente: "Ana Souza",
    emailCliente: "ana.souza@example.com",
  },
  {
    reservaId: "RES005",
    statusReserva: "Confirmada",
    passeio: "Trilha na Serra de Guaramiranga",
    dia: "2023-12-05",
    hora: "15:00",
    preco: "R$550,00",
    nomeCliente: "Pedro Lima",
    emailCliente: "pedro.lima@example.com",
  },
  {
    reservaId: "RES006",
    statusReserva: "Pendente",
    passeio: "Passeio de Barco em Paracuru",
    dia: "2023-12-06",
    hora: "08:00",
    preco: "R$200,00",
    nomeCliente: "Julia Araújo",
    emailCliente: "julia.araujo@example.com",
  },
  {
    reservaId: "RES007",
    statusReserva: "Cancelada",
    passeio: "Visita ao Centro Histórico de Sobral",
    dia: "2023-12-07",
    hora: "13:00",
    preco: "R$300,00",
    nomeCliente: "Rafael Costa",
    emailCliente: "rafael.costa@example.com",
  },
];

export default function Admin() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <Card className="w-[calc(100%-2rem)] max-w-4xl mt-28 p-6 shadow-lg rounded-lg">
        <Table>
          <TableCaption>Lista de reservas de passeios em cidades turísticas do Ceará.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Reserva ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Passeio</TableHead>
              <TableHead>Dia</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Nome do Cliente</TableHead>
              <TableHead>Email do Cliente</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservas.map((reserva) => (
              <TableRow key={reserva.reservaId}>
                <TableCell className="font-medium">{reserva.reservaId}</TableCell>
                <TableCell>{reserva.statusReserva}</TableCell>
                <TableCell>{reserva.passeio}</TableCell>
                <TableCell>{reserva.dia}</TableCell>
                <TableCell>{reserva.hora}</TableCell>
                <TableCell>{reserva.preco}</TableCell>
                <TableCell>{reserva.nomeCliente}</TableCell>
                <TableCell>{reserva.emailCliente}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
