
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit3, Plus, Settings } from 'lucide-react';
import { Table as TableType } from '@/types/reservation';
import TableModal from '../Tables/TableModal';
import DraggableTable from './DraggableTable';

// Mock data for tables with positions
const MOCK_TABLES: (TableType & { x: number; y: number })[] = [
  { id: '1', name: 'M01', capacity: 2, status: 'available', x: 100, y: 100 },
  { id: '2', name: 'M02', capacity: 4, status: 'occupied', x: 250, y: 150 },
  { id: '3', name: 'M03', capacity: 6, status: 'reserved', x: 400, y: 200 },
  { id: '4', name: 'M04', capacity: 8, status: 'maintenance', x: 150, y: 300 },
  { id: '5', name: 'M05', capacity: 4, status: 'available', x: 350, y: 350 },
];

const TableBoard: React.FC = () => {
  const [tables, setTables] = useState(MOCK_TABLES);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<TableType | null>(null);
  const [boardSize] = useState({ width: 800, height: 600 });

  const handleTableMove = (tableId: string, newX: number, newY: number) => {
    if (!isEditMode) return;
    
    setTables(tables.map(table => 
      table.id === tableId 
        ? { ...table, x: Math.max(0, Math.min(newX, boardSize.width - 80)), y: Math.max(0, Math.min(newY, boardSize.height - 80)) }
        : table
    ));
  };

  const handleAddTable = () => {
    setSelectedTable(null);
    setIsModalOpen(true);
  };

  const handleEditTable = (table: TableType) => {
    setSelectedTable(table);
    setIsModalOpen(true);
  };

  const handleSaveTable = (tableData: TableType) => {
    if (selectedTable) {
      // Update existing table
      setTables(tables.map(t => t.id === tableData.id ? { ...t, ...tableData } : t));
    } else {
      // Add new table
      const newTable = {
        ...tableData,
        id: `${Math.floor(Math.random() * 10000)}`,
        x: 50,
        y: 50,
      };
      setTables([...tables, newTable]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTable = (tableId: string) => {
    setTables(tables.filter(t => t.id !== tableId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Distribución de Mesas</h2>
          <p className="text-gray-600">Organiza la distribución de las mesas en tu establecimiento</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleAddTable}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Mesa
          </Button>
          <Button
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
            className={isEditMode ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200 text-purple-700 hover:bg-purple-50"}
          >
            <Edit3 className="mr-2 h-4 w-4" />
            {isEditMode ? 'Finalizar Edición' : 'Modificar Distribución'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-600" />
            Plano del Restaurante
            {isEditMode && (
              <span className="text-sm font-normal text-purple-600 bg-purple-100 px-2 py-1 rounded">
                Modo Edición Activo
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="relative border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 overflow-hidden"
            style={{ width: boardSize.width, height: boardSize.height }}
          >
            {tables.map((table) => (
              <DraggableTable
                key={table.id}
                table={table}
                isEditMode={isEditMode}
                onMove={handleTableMove}
                onEdit={handleEditTable}
                onDelete={handleDeleteTable}
              />
            ))}
            
            {tables.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Settings className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No hay mesas configuradas</p>
                  <p className="text-sm">Haz clic en "Agregar Mesa" para comenzar</p>
                </div>
              </div>
            )}
          </div>
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

export default TableBoard;
