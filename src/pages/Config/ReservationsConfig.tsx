
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import TableBoard from './Reservations/TableBoard';

const ConfigItem = ({ 
  title, 
  description, 
  icon: Icon, 
  href 
}: { 
  title: string, 
  description: string, 
  icon: React.ElementType, 
  href: string 
}) => (
  <Link to={href}>
    <Card className="h-full transition-all hover:shadow-md hover:border-purple-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-purple-800">{title}</CardTitle>
          <Icon className="h-5 w-5 text-purple-600" />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </Link>
);

// Simple Table icon component since it's not available in lucide-react
const Table = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="8" width="18" height="10" rx="2" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="12" y1="8" x2="12" y2="18" />
    <line x1="7" y1="5" x2="7" y2="8" />
    <line x1="17" y1="5" x2="17" y2="8" />
  </svg>
);

const ReservationsConfig = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reservas</h1>
        <p className="text-gray-600 mb-4">Gestione las mesas y reservaciones de su establecimiento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConfigItem 
          title="Administrar Mesas" 
          description="Gestione las mesas disponibles de su establecimiento" 
          icon={Table} 
          href="/config/reservations/tables" 
        />
        <ConfigItem 
          title="Listado de Reservaciones" 
          description="Consulte y administre las reservas de sus clientes" 
          icon={List} 
          href="/config/reservations/list" 
        />
      </div>
      
      <TableBoard />
    </div>
  );
};

export default ReservationsConfig;
