
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Table as TableType } from '@/types/reservation';

// Mock data for tables
const MOCK_TABLES: (TableType & { reservationsCount?: number, timeRemaining?: string })[] = [
  { id: '1', name: 'M01', capacity: 2, status: 'available', shape: 'round', size: 'small' },
  { id: '2', name: 'M02', capacity: 4, status: 'occupied', shape: 'rectangular', size: 'medium' },
  { id: '3', name: 'M03', capacity: 6, status: 'reserved', shape: 'round', size: 'large', reservationsCount: 4, timeRemaining: '71d 22h 21m 53s' },
  { id: '4', name: 'M04', capacity: 8, status: 'maintenance', shape: 'rectangular', size: 'large' },
  { id: '5', name: 'M05', capacity: 4, status: 'available', shape: 'round', size: 'medium' },
  { id: '6', name: 'M06', capacity: 2, status: 'available', shape: 'round', size: 'small' },
  { id: '7', name: 'M07', capacity: 6, status: 'available', shape: 'rectangular', size: 'large' },
  { id: '8', name: 'M08', capacity: 8, status: 'available', shape: 'rectangular', size: 'large' },
  { id: '9', name: 'M09', capacity: 4, status: 'available', shape: 'round', size: 'medium' },
  { id: '10', name: 'M10', capacity: 2, status: 'available', shape: 'round', size: 'small' },
];

const getTableColor = (status: TableType['status']) => {
  switch (status) {
    case 'available':
      return 'bg-white border-gray-200';
    case 'occupied':
      return 'bg-red-50 border-red-200';
    case 'reserved':
      return 'bg-orange-50 border-orange-200';
    case 'maintenance':
      return 'bg-gray-100 border-gray-300';
    default:
      return 'bg-white border-gray-200';
  }
};

const TableSelector: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {MOCK_TABLES.map((table) => (
        <Link to={`/config/reservations/tables?id=${table.id}`} key={table.id}>
          <div className={`rounded-md border-2 p-4 h-32 cursor-pointer hover:shadow-md transition-all ${getTableColor(table.status)}`}>
            <div className="text-lg font-bold mb-1">{table.name}</div>
            
            {table.reservationsCount ? (
              <div className="text-sm text-gray-700">
                {table.reservationsCount} Pedidos
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock size={12} className="mr-1" />
                  {table.timeRemaining}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                {table.status === 'available' ? 'Disponible' :
                 table.status === 'occupied' ? 'Ocupada' :
                 table.status === 'reserved' ? 'Reservada' : 'Mantenimiento'}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TableSelector;
