
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ticket, Search, Filter, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Incident {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  date: string;
  description: string;
}

const incidents: Incident[] = [
  {
    id: 'INC-001',
    title: 'Error en la asignación de repartidores',
    type: 'Sistema',
    status: 'resolved',
    priority: 'high',
    date: '2025-05-10',
    description: 'Al intentar asignar repartidores a pedidos, el sistema muestra error 500.'
  },
  {
    id: 'INC-002',
    title: 'Problemas con la geolocalización',
    type: 'Mapas',
    status: 'in-progress',
    priority: 'medium',
    date: '2025-05-12',
    description: 'La ubicación de los repartidores no se actualiza correctamente en el mapa.'
  },
  {
    id: 'INC-003',
    title: 'Notificaciones no se envían',
    type: 'Notificaciones',
    status: 'pending',
    priority: 'low',
    date: '2025-05-15',
    description: 'Las notificaciones push a los clientes no se están enviando cuando cambia el estado del pedido.'
  }
];

const IncidentsConfig = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('list');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-amber-100 text-amber-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitIncident = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Incidencia reportada",
      description: "Tu incidencia ha sido registrada correctamente. Te notificaremos cuando sea revisada.",
    });
    setActiveTab('list');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Incidencias</h1>
          <p className="text-gray-600">Reporte y seguimiento de incidencias del sistema</p>
        </div>
        <Ticket className="h-10 w-10 text-delivery-600" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="list">Mis Incidencias</TabsTrigger>
            <TabsTrigger value="new">Reportar Incidencia</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Buscar incidencia..." className="pl-9 w-64" />
            </div>
          </div>
        </div>

        <TabsContent value="list">
          {incidents.length > 0 ? (
            <div className="space-y-4">
              {incidents.map((incident) => (
                <Card key={incident.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 py-3">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <Badge variant="outline">{incident.id}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(incident.priority)}>
                          {incident.priority === 'high' && 'Alta'}
                          {incident.priority === 'medium' && 'Media'}
                          {incident.priority === 'low' && 'Baja'}
                        </Badge>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status === 'resolved' && 'Resuelta'}
                          {incident.status === 'in-progress' && 'En proceso'}
                          {incident.status === 'pending' && 'Pendiente'}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="flex justify-between items-center mt-1">
                      <span>Tipo: {incident.type}</span>
                      <span>Reportada el: {incident.date}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-3">
                    <p>{incident.description}</p>
                  </CardContent>
                  <CardFooter className="bg-gray-50 py-3 flex justify-end gap-2">
                    <Button variant="outline" size="sm">Ver Detalles</Button>
                    {incident.status !== 'resolved' && (
                      <Button variant="outline" size="sm" className="text-red-600">Cancelar</Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Ticket className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-1">No hay incidencias</h3>
                <p className="text-gray-500 mb-4">No has reportado ninguna incidencia todavía.</p>
                <Button onClick={() => setActiveTab('new')} className="bg-delivery-600 hover:bg-delivery-700">
                  Reportar Incidencia
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <form onSubmit={handleSubmitIncident}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <CardTitle>Reportar Nueva Incidencia</CardTitle>
                </div>
                <CardDescription>
                  Describe el problema que has encontrado para que podamos solucionarlo lo antes posible
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la incidencia</Label>
                  <Input id="title" placeholder="Escribe un título descriptivo" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incidentType">Tipo de incidencia</Label>
                    <Select required>
                      <SelectTrigger id="incidentType">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">Sistema</SelectItem>
                        <SelectItem value="app">Aplicación</SelectItem>
                        <SelectItem value="maps">Mapas</SelectItem>
                        <SelectItem value="payments">Pagos</SelectItem>
                        <SelectItem value="notifications">Notificaciones</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridad</Label>
                    <Select required>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Selecciona la prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="low">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe detalladamente la incidencia. Incluye los pasos para reproducir el error si es posible." 
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Adjuntar archivos (opcional)</Label>
                  <div className="flex items-center gap-2">
                    <Input id="attachments" type="file" multiple />
                  </div>
                  <p className="text-xs text-gray-500">Puedes adjuntar hasta 3 archivos (máximo 5MB cada uno). Formatos soportados: JPG, PNG, PDF.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab('list')}>Cancelar</Button>
                <Button type="submit" className="bg-delivery-600 hover:bg-delivery-700">Enviar Incidencia</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncidentsConfig;
