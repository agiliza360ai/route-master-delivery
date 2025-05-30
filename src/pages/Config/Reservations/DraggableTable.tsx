
import React, { useState, useRef } from 'react';
import { Table as TableType } from '@/types/reservation';
import { Edit, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DraggableTableProps {
  table: TableType & { x: number; y: number };
  isEditMode: boolean;
  onMove: (tableId: string, newX: number, newY: number) => void;
  onEdit: (table: TableType) => void;
  onDelete: (tableId: string) => void;
}

const getTableColor = (status: TableType['status']) => {
  switch (status) {
    case 'available':
      return 'bg-white border-gray-300 text-gray-800';
    case 'occupied':
      return 'bg-red-100 border-red-300 text-red-800';
    case 'reserved':
      return 'bg-orange-100 border-orange-300 text-orange-800';
    case 'maintenance':
      return 'bg-gray-200 border-gray-400 text-gray-600';
    default:
      return 'bg-white border-gray-300 text-gray-800';
  }
};

const DraggableTable: React.FC<DraggableTableProps> = ({
  table,
  isEditMode,
  onMove,
  onEdit,
  onDelete,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const tableRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    
    e.preventDefault();
    setIsDragging(true);
    
    const rect = tableRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !isEditMode) return;
    
    const boardElement = tableRef.current?.parentElement;
    if (boardElement) {
      const boardRect = boardElement.getBoundingClientRect();
      const newX = e.clientX - boardRect.left - dragOffset.x;
      const newY = e.clientY - boardRect.top - dragOffset.y;
      
      onMove(table.id, newX, newY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={tableRef}
      className={`absolute w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center text-xs font-medium transition-all ${getTableColor(table.status)} ${
        isEditMode ? 'cursor-move hover:shadow-lg' : 'cursor-pointer hover:shadow-md'
      } ${isDragging ? 'shadow-xl scale-105 z-10' : ''}`}
      style={{ left: table.x, top: table.y }}
      onMouseDown={handleMouseDown}
      onClick={() => !isEditMode && onEdit(table)}
    >
      <div className="font-bold text-sm">{table.name}</div>
      <div className="flex items-center gap-1 text-xs">
        <Users className="h-3 w-3" />
        {table.capacity}
      </div>
      
      {isEditMode && (
        <div className="absolute -top-2 -right-2 flex gap-1">
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0 bg-white border-purple-300 hover:bg-purple-50"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(table);
            }}
          >
            <Edit className="h-3 w-3 text-purple-600" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0 bg-white border-red-300 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(table.id);
            }}
          >
            <Trash2 className="h-3 w-3 text-red-600" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DraggableTable;
