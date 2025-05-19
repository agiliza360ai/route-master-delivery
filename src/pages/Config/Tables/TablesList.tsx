
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { Table as TableType } from '@/types/reservation';
import TableModal from './TableModal';

const MOCK_TABLES: TableType[] = [
  { id: '1', name: 'Mesa 1', capacity: 2, status: 'available' },
  { id: '2', name: 'Mesa 2', capacity: 4, status: 'occupied' },
  { id: '3', name: 'Mesa 3', capacity: 6, status: 'reserved' },
  { id: '4', name: 'Mesa 4', capacity: 8, status: 'maintenance' },
  { id: '5', name: 'Mesa 5', capacity: 4, status: 'available' },
];

const TablesList = () => {
  const [tables, setTables] = useState<TableType[]>(MOCK_TABLES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<TableType | null>(null);

  const handleAddTable = () => {
    setSelectedTable(null);
    setIsModalOpen(true);
  };

  const handleEditTable = (table: TableType) => {
    setSelectedTable(table);
    setIsModalOpen(true);
  };

  const handleSaveTable = (table: TableType) => {
    if (selectedTable) {
      // Update existing table
      setTables(tables.map(t => t.id === table.id ? table : t));
    } else {
      // Add new table with unique ID
      const newTable = {
        ...table,
        id: `${Math.floor(Math.random() * 10000)}`,
      };
      setTables([...tables, newTable]);
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: TableType['status']) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500">Disponible</Badge>;
      case 'occupied':
        return <Badge className="bg-red-500">Ocupada</Badge>;
      case 'reserved':
        return <Badge className="bg-blue-500">Reservada</Badge>;
      case 'maintenance':
        return <Badge className="bg-gray-500">Mantenimiento</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mesas</h1>
          <p className="text-gray-600">Gestione las mesas de su establecimiento</p>
        </div>
        <Button onClick={handleAddTable} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> Agregar Mesa
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Mesas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Capacidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tables.map((table) => (
                <TableRow key={table.id}>
                  <TableCell className="font-medium">{table.name}</TableCell>
                  <TableCell>{table.capacity} personas</TableCell>
                  <TableCell>{getStatusBadge(table.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditTable(table)}
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
        <TableModal
          table={selectedTable}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTable}
        />
      )}
    </div>
  );
};

export default TablesList;
