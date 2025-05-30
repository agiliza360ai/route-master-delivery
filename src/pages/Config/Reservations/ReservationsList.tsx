import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { Table as TableType, Reservation } from '@/types/reservation';
import ReservationModal from './ReservationModal';

// Mock data for tables and reservations
const MOCK_TABLES: TableType[] = [
  { id: '1', name: 'Mesa 01', capacity: 2, status: 'available', shape: 'round', size: 'small' },
  { id: '2', name: 'Mesa 02', capacity: 4, status: 'occupied', shape: 'rectangular', size: 'medium' },
  { id: '3', name: 'Mesa 03', capacity: 6, status: 'reserved', shape: 'round', size: 'large' },
  { id: '4', name: 'Mesa 04', capacity: 8, status: 'maintenance', shape: 'rectangular', size: 'large' },
  { id: '5', name: 'Mesa 05', capacity: 4, status: 'available', shape: 'round', size: 'medium' },
];

const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: '1',
    tableId: '1',
    customerName: 'Juan Pérez',
    customerPhone: '555-123-4567',
    people: 2,
    date: '2025-05-25',
    time: '19:00',
    status: 'confirmed'
  },
  {
    id: '2',
    tableId: '3',
    customerName: 'María García',
    customerPhone: '555-987-6543',
    people: 4,
    date: '2025-05-25',
    time: '20:30',
    status: 'pending'
  },
  {
    id: '3',
    tableId: '5',
    customerName: 'Carlos Rodríguez',
    customerPhone: '555-456-7890',
    people: 3,
    date: '2025-05-26',
    time: '13:00',
    status: 'seated'
  },
  {
    id: '4',
    tableId: '2',
    customerName: 'Laura Martínez',
    customerPhone: '555-789-0123',
    people: 2,
    date: '2025-05-26',
    time: '21:00',
    status: 'cancelled'
  },
  {
    id: '5',
    tableId: '4',
    customerName: 'Pedro Sánchez',
    customerPhone: '555-234-5678',
    people: 6,
    date: '2025-05-27',
    time: '20:00',
    status: 'completed'
  }
];

const ReservationsList = () => {
  const [reservations, setReservations] = useState<Reservation[]>(MOCK_RESERVATIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const handleAddReservation = () => {
    setSelectedReservation(null);
    setIsModalOpen(true);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleSaveReservation = (reservation: Reservation) => {
    if (selectedReservation) {
      // Update existing reservation
      setReservations(reservations.map(r => r.id === reservation.id ? reservation : r));
    } else {
      // Add new reservation with unique ID
      const newReservation = {
        ...reservation,
        id: `${Math.floor(Math.random() * 10000)}`,
      };
      setReservations([...reservations, newReservation]);
    }
    setIsModalOpen(false);
  };

  const getTableNameById = (tableId: string) => {
    const table = MOCK_TABLES.find(t => t.id === tableId);
    return table ? table.name : 'Mesa no encontrada';
  };

  const getStatusBadge = (status: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pendiente</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-500">Confirmada</Badge>;
      case 'seated':
        return <Badge className="bg-green-500">Sentados</Badge>;
      case 'completed':
        return <Badge className="bg-purple-500">Completada</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelada</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reservaciones</h1>
          <p className="text-gray-600">Gestione las reservas de su establecimiento</p>
        </div>
        <Button onClick={handleAddReservation} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> Nueva Reservación
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Listado de Reservaciones</span>
            <div className="flex items-center gap-2">
              <Link to="/config/reservations">
                <Button variant="outline" size="sm" className="bg-purple-100 border-purple-200 text-purple-700 hover:bg-purple-200">
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="bg-purple-500 border-purple-500 text-white hover:bg-purple-600">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Mesa</TableHead>
                <TableHead>Personas</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.customerName}</TableCell>
                  <TableCell>{getTableNameById(reservation.tableId)}</TableCell>
                  <TableCell>{reservation.people}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditReservation(reservation)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isModalOpen && (
        <ReservationModal
          reservation={selectedReservation}
          tables={MOCK_TABLES}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveReservation}
        />
      )}
    </div>
  );
};

export default ReservationsList;
