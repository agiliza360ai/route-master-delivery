
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, FileText, Book, Ticket, ImageIcon, Calendar, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const ConfigIndex = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Configuración</h1>
      <p className="text-gray-600 mb-8">Gestione la configuración de su sistema de delivery</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConfigItem 
          title="Datos de Marca" 
          description="Gestione la información sensible de su marca" 
          icon={Badge} 
          href="/config/brand" 
        />
        <ConfigItem 
          title="Planes y Pagos" 
          description="Administre su plan contratado y opciones de pago" 
          icon={FileText} 
          href="/config/plans" 
        />
        <ConfigItem 
          title="ChatBot IA" 
          description="Configure el estilo de comunicación de su bot de WhatsApp" 
          icon={Bot} 
          href="/config/chatbot" 
        />
        <ConfigItem 
          title="Manuales" 
          description="Acceda al manual de uso de su plan contratado" 
          icon={Book} 
          href="/config/manuals" 
        />
        <ConfigItem 
          title="Incidencias" 
          description="Reporte y gestione incidencias del sistema" 
          icon={Ticket} 
          href="/config/incidents" 
        />
        <ConfigItem 
          title="Galería" 
          description="Gestione las imágenes de su negocio" 
          icon={ImageIcon} 
          href="/config/gallery" 
        />
        <ConfigItem 
          title="Reservas" 
          description="Administre las reservas y mesas de su negocio" 
          icon={Calendar} 
          href="/config/reservations" 
        />
      </div>
    </div>
  );
};

export default ConfigIndex;
