import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit3, Plus, Settings, Undo, MapPin } from 'lucide-react';
import { Table as TableType } from '@/types/reservation';
import TableModal from '../Tables/TableModal';
import DraggableTable from './DraggableTable';
import ZoneModal from './ZoneModal';

// Mock data for zones
const MOCK_ZONES = [
  { id: '1', name: 'Salón Principal' },
  { id: '2', name: 'Terraza' },
  { id: '3', name: 'Zona VIP' },
];

// Mock data for tables with positions, shapes, sizes and custom dimensions
const MOCK_TABLES: (TableType & { x: number; y: number; width?: number; height?: number; zoneId: string })[] = [
  { id: '1', name: 'M01', capacity: 2, status: 'available', shape: 'round', size: 'small', x: 100, y: 100, zoneId: '1' },
  { id: '2', name: 'M02', capacity: 4, status: 'occupied', shape: 'rectangular', size: 'medium', x: 250, y: 150, width: 120, height: 80, zoneId: '1' },
  { id: '3', name: 'M03', capacity: 6, status: 'reserved', shape: 'round', size: 'large', x: 400, y: 200, zoneId: '2' },
  { id: '4', name: 'M04', capacity: 8, status: 'maintenance', shape: 'rectangular', size: 'large', x: 150, y: 300, width: 140, height: 100, zoneId: '2' },
  { id: '5', name: 'M05', capacity: 4, status: 'available', shape: 'round', size: 'medium', x: 350, y: 350, zoneId: '3' },
];

const TableBoard: React.FC = () => {
  const [tables, setTables] = useState(MOCK_TABLES);
  const [zones, setZones] = useState(MOCK_ZONES);
  const [selectedZone, setSelectedZone] = useState('1');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<TableType | null>(null);
  const [boardSize] = useState({ width: 800, height: 600 });
  const [history, setHistory] = useState<(typeof MOCK_TABLES)[]>([MOCK_TABLES]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Filter tables by selected zone
  const filteredTables = tables.filter(table => table.zoneId === selectedZone);

  const saveToHistory = (newTables: typeof tables) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newTables);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const previousIndex = historyIndex - 1;
      setTables(history[previousIndex]);
      setHistoryIndex(previousIndex);
    }
  };

  const handleTableMove = (tableId: string, newX: number, newY: number) => {
    if (!isEditMode) return;
    
    const newTables = tables.map(table => 
      table.id === tableId 
        ? { ...table, x: Math.max(0, Math.min(newX, boardSize.width - 80)), y: Math.max(0, Math.min(newY, boardSize.height - 80)) }
        : table
    );
    setTables(newTables);
    saveToHistory(newTables);
  };

  const handleTableResize = (tableId: string, newSize: TableType['size']) => {
    const newTables = tables.map(table => 
      table.id === tableId 
        ? { ...table, size: newSize, width: undefined, height: undefined }
        : table
    );
    setTables(newTables);
    saveToHistory(newTables);
  };

  const handleManualResize = (tableId: string, newWidth: number, newHeight: number) => {
    if (!isEditMode) return;
    
    const newTables = tables.map(table => 
      table.id === tableId 
        ? { ...table, width: newWidth, height: newHeight }
        : table
    );
    setTables(newTables);
    saveToHistory(newTables);
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
    let newTables;
    if (selectedTable) {
      newTables = tables.map(t => t.id === tableData.id ? { ...t, ...tableData } : t);
    } else {
      const newTable = {
        ...tableData,
        id: `${Math.floor(Math.random() * 10000)}`,
        x: 50,
        y: 50,
        zoneId: selectedZone,
      };
      newTables = [...tables, newTable];
    }
    setTables(newTables);
    saveToHistory(newTables);
    setIsModalOpen(false);
  };

  const handleDeleteTable = (tableId: string) => {
    const newTables = tables.filter(t => t.id !== tableId);
    setTables(newTables);
    saveToHistory(newTables);
  };

  const handleCreateZone = () => {
    setIsZoneModalOpen(true);
  };

  const handleSaveZone = (zoneName: string) => {
    const newZone = {
      id: `${Math.floor(Math.random() * 10000)}`,
      name: zoneName,
    };
    setZones([...zones, newZone]);
    setIsZoneModalOpen(false);
  };

  const getCurrentZoneName = () => {
    const zone = zones.find(z => z.id === selectedZone);
    return zone?.name || 'Zona sin nombre';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Distribución de Mesas</h2>
          <p className="text-gray-600">Organiza la distribución de las mesas en tu establecimiento</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Zona:</span>
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Seleccionar zona" />
            </SelectTrigger>
            <SelectContent>
              {zones.map((zone) => (
                <SelectItem key={zone.id} value={zone.id}>
                  {zone.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleCreateZone}
          variant="outline"
          size="sm"
          className="border-purple-200 text-purple-700 hover:bg-purple-50"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva Zona
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-600" />
              {getCurrentZoneName()}
              {isEditMode && (
                <span className="text-sm font-normal text-purple-600 bg-purple-100 px-2 py-1 rounded">
                  Modo Edición Activo - Arrastra las mesas y redimensiona las rectangulares
                </span>
              )}
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={handleAddTable}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="mr-2 h-4 w-4" /> Agregar Mesa
              </Button>
              <Button
                onClick={handleUndo}
                disabled={historyIndex === 0}
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Undo className="mr-2 h-4 w-4" />
                Deshacer
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
        </CardHeader>
        <CardContent>
          <div 
            className="relative border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 overflow-hidden"
            style={{ 
              width: boardSize.width, 
              height: boardSize.height,
              backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            {filteredTables.map((table) => (
              <DraggableTable
                key={table.id}
                table={table}
                isEditMode={isEditMode}
                onMove={handleTableMove}
                onEdit={handleEditTable}
                onDelete={handleDeleteTable}
                onResize={handleTableResize}
                onManualResize={handleManualResize}
              />
            ))}
            
            {filteredTables.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Settings className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No hay mesas en {getCurrentZoneName()}</p>
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

      {isZoneModalOpen && (
        <ZoneModal
          isOpen={isZoneModalOpen}
          onClose={() => setIsZoneModalOpen(false)}
          onSave={handleSaveZone}
        />
      )}
    </div>
  );
};

export default TableBoard;
