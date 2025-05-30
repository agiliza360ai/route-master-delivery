import React, { useState, useRef } from 'react';
import { Table as TableType } from '@/types/reservation';
import { Edit, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DraggableTableProps {
  table: TableType & { x: number; y: number; width?: number; height?: number };
  isEditMode: boolean;
  onMove: (tableId: string, newX: number, newY: number) => void;
  onEdit: (table: TableType) => void;
  onDelete: (tableId: string) => void;
  onResize: (tableId: string, newSize: TableType['size']) => void;
  onManualResize?: (tableId: string, newWidth: number, newHeight: number) => void;
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

const getTableSize = (size: TableType['size']) => {
  switch (size) {
    case 'small':
      return { width: 60, height: 60 };
    case 'medium':
      return { width: 80, height: 80 };
    case 'large':
      return { width: 100, height: 100 };
    default:
      return { width: 80, height: 80 };
  }
};

const DraggableTable: React.FC<DraggableTableProps> = ({
  table,
  isEditMode,
  onMove,
  onEdit,
  onDelete,
  onResize,
  onManualResize,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const tableRef = useRef<HTMLDivElement>(null);

  const defaultSize = getTableSize(table.size);
  const tableWidth = table.width || defaultSize.width;
  const tableHeight = table.height || defaultSize.height;
  const isRound = table.shape === 'round';

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode || isResizing) return;
    
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

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode || table.shape !== 'rectangular') return;
    
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: tableWidth,
      height: tableHeight,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isResizing && isEditMode) {
      const boardElement = tableRef.current?.parentElement;
      if (boardElement) {
        const boardRect = boardElement.getBoundingClientRect();
        const newX = e.clientX - boardRect.left - dragOffset.x;
        const newY = e.clientY - boardRect.top - dragOffset.y;
        
        onMove(table.id, newX, newY);
      }
    } else if (isResizing && isEditMode && onManualResize) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      const newWidth = Math.max(40, resizeStart.width + deltaX);
      const newHeight = Math.max(40, resizeStart.height + deltaY);
      
      onManualResize(table.id, newWidth, newHeight);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleSizeChange = (newSize: TableType['size']) => {
    onResize(table.id, newSize);
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, resizeStart]);

  return (
    <div
      ref={tableRef}
      className={`absolute border-2 flex flex-col items-center justify-center text-xs font-medium transition-all ${getTableColor(table.status)} ${
        isRound ? 'rounded-full' : 'rounded-lg'
      } ${
        isEditMode ? 'cursor-move hover:shadow-lg' : 'cursor-pointer hover:shadow-md'
      } ${isDragging ? 'shadow-xl scale-105 z-10' : ''} ${isResizing ? 'z-20' : ''}`}
      style={{ 
        left: table.x, 
        top: table.y, 
        width: tableWidth, 
        height: tableHeight 
      }}
      onMouseDown={handleMouseDown}
      onClick={() => !isEditMode && onEdit(table)}
    >
      <div className="font-bold text-sm">{table.name}</div>
      <div className="flex items-center gap-1 text-xs">
        <Users className="h-3 w-3" />
        {table.capacity}
      </div>
      
      {isEditMode && (
        <>
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
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
            <Button
              size="sm"
              variant={table.size === 'small' ? 'default' : 'outline'}
              className="h-5 w-5 p-0 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleSizeChange('small');
              }}
            >
              S
            </Button>
            <Button
              size="sm"
              variant={table.size === 'medium' ? 'default' : 'outline'}
              className="h-5 w-5 p-0 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleSizeChange('medium');
              }}
            >
              M
            </Button>
            <Button
              size="sm"
              variant={table.size === 'large' ? 'default' : 'outline'}
              className="h-5 w-5 p-0 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleSizeChange('large');
              }}
            >
              L
            </Button>
          </div>

          {/* Resize handle for rectangular tables */}
          {table.shape === 'rectangular' && (
            <div
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-500 cursor-se-resize rounded-sm border border-white shadow-sm hover:bg-purple-600"
              onMouseDown={handleResizeMouseDown}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DraggableTable;
