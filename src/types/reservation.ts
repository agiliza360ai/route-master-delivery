
export interface Table {
  id: string;
  name: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
}

export interface Reservation {
  id: string;
  tableId: string;
  customerName: string;
  customerPhone: string;
  people: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  notes?: string;
}
