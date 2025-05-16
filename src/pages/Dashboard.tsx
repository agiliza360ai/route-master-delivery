
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, Settings, Users, ChartBar } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardItem = ({ 
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
    <Card className="h-full transition-all hover:shadow-md hover:border-delivery-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-delivery-800">{title}</CardTitle>
          <Icon className="h-5 w-5 text-delivery-600" />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </Link>
);

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Control</h1>
      <p className="text-gray-600 mb-8">Bienvenido al sistema de gestión de delivery. Administre sus entregas, repartidores y configuración.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <DashboardItem 
          title="Entregas" 
          description="Gestionar pedidos y entregas activas" 
          icon={Package} 
          href="/deliveries" 
        />
        <DashboardItem 
          title="Repartidores" 
          description="Administrar flota de repartidores" 
          icon={Truck} 
          href="/drivers" 
        />
        <DashboardItem 
          title="Clientes" 
          description="Base de datos de clientes" 
          icon={Users} 
          href="/customers" 
        />
        <DashboardItem 
          title="Ventas" 
          description="Análisis de ventas y métricas" 
          icon={ChartBar} 
          href="/sales" 
        />
        <DashboardItem 
          title="Configuración" 
          description="Ajustes generales y del sistema" 
          icon={Settings} 
          href="/config" 
        />
      </div>
    </div>
  );
};

export default Dashboard;
