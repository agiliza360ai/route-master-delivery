import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, LayoutGrid, List as ListIcon } from 'lucide-react';
import { Table as TableType } from '@/types/reservation';
import TableModal from './TableModal';
import { Link } from 'react-router-dom';

const MOCK_TABLES: TableType[] = [
  { id: '1', name: 'Mesa 01', capacity: 2, status: 'available', shape: 'round', size: 'small' },
  { id: '2', name: 'Mesa 02', capacity: 4, status: 'occupied', shape: 'rectangular', size: 'medium' },
  { id: '3', name: 'Mesa 03', capacity: 6, status: 'reserved', shape: 'round', size: 'large' },
  { id: '4', name: 'Mesa 04', capacity: 8, status: 'maintenance', shape: 'rectangular', size: 'large' },
  { id: '5', name: 'Mesa 05', capacity: 4, status: 'available', shape: 'round', size: 'medium' },
  { id: '6', name: 'Mesa 06', capacity: 2, status: 'available', shape: 'round', size: 'small' },
  { id: '7', name: 'Mesa 07', capacity: 6, status: 'available', shape: 'rectangular', size: 'large' },
  { id: '8', name: 'Mesa 08', capacity: 8, status: 'available', shape: 'rectangular', size: 'large' },
  { id: '9', name: 'Mesa 09', capacity: 4, status: 'available', shape: 'round', size: 'medium' },
  { id: '10', name: 'Mesa 10', capacity: 2, status: 'available', shape: 'round', size: 'small' },
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
        return <Badge className="bg-orange-500">Reservada</Badge>;
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
        <div className="flex gap-2">
          <Button onClick={handleAddTable} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> Agregar Mesa
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Listado de Mesas</span>
            <div className="flex items-center gap-2">
              <Link to="/config/reservations">
                <Button variant="outline" size="sm" className="bg-purple-100 border-purple-200 text-purple-700 hover:bg-purple-200">
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="bg-purple-500 border-purple-500 text-white hover:bg-purple-600">
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
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
