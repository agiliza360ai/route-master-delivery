
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, FileText, Download, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ManualsConfig = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manuales</h1>
          <p className="text-gray-600">Documentación y guías del sistema</p>
        </div>
        <Book className="h-10 w-10 text-delivery-600" />
      </div>

      <Tabs defaultValue="user" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="user">Manual de Usuario</TabsTrigger>
          <TabsTrigger value="admin">Manual de Administrador</TabsTrigger>
          <TabsTrigger value="api">Documentación API</TabsTrigger>
        </TabsList>

        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" /> 
                Manual de Usuario - Plan Básico
              </CardTitle>
              <CardDescription>
                Guía completa para usuarios del sistema de gestión de delivery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">Manual de Usuario Completo</p>
                    <p className="text-sm text-gray-500">PDF - 4.2 MB - Actualizado 10/05/2025</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" /> 
                    Descargar
                  </Button>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base font-medium">Primeros Pasos</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Configuración Inicial</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Creación de Cuenta</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Panel de Control</a>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-base font-medium">Gestión de Entregas</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Crear Nueva Entrega</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Asignación de Repartidores</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Seguimiento en Tiempo Real</a>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-base font-medium">Configuración del Sistema</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Ajustes de la Cuenta</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Personalización</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Integración con otras plataformas</a>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-base font-medium">Reportes y Estadísticas</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Informes Diarios</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Análisis de Rendimiento</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <a href="#" className="text-delivery-600 hover:underline">Exportación de Datos</a>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" /> 
                Descargar Todo
              </Button>
              <Button className="bg-delivery-600 hover:bg-delivery-700 flex items-center gap-1">
                <ExternalLink className="h-4 w-4" /> 
                Centro de Ayuda
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" /> 
                Manual de Administrador
              </CardTitle>
              <CardDescription>
                Guía avanzada para administradores del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">Manual Administrativo Completo</p>
                  <p className="text-sm text-gray-500">PDF - 6.8 MB - Actualizado 12/05/2025</p>
                </div>
                <Button variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" /> 
                  Descargar
                </Button>
              </div>

              <div className="mt-6">
                <p className="text-red-600 p-4 bg-red-50 rounded-md border border-red-200">
                  El acceso completo a la documentación administrativa requiere permisos adicionales. 
                  Contacte con su gestor de cuenta para más información.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" /> 
                Documentación API
              </CardTitle>
              <CardDescription>
                Documentación técnica para desarrolladores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gray-50 rounded-md mb-4">
                <h3 className="text-lg font-medium mb-2">Información de API</h3>
                <p className="mb-4">La API de DeliveryGest permite integrar nuestras funcionalidades en tus propias aplicaciones. La documentación completa está disponible en nuestro portal para desarrolladores.</p>
                <Button className="bg-delivery-600 hover:bg-delivery-700 flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" /> 
                  Portal de Desarrolladores
                </Button>
              </div>

              <div className="border p-4 rounded-md mb-4">
                <p className="font-medium mb-2">Ejemplo de autenticación:</p>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                  <code>
                    {`curl -X POST https://api.deliverygest.com/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
  }'`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="font-medium mb-2">Recursos disponibles:</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Gestión de pedidos</li>
                  <li>Seguimiento de repartidores</li>
                  <li>Notificaciones en tiempo real</li>
                  <li>Reportes y estadísticas</li>
                  <li>Integración con mapas</li>
                </ul>
                <p className="mt-4 text-sm text-gray-500">
                  Nota: El acceso a la API está limitado según el plan contratado. 
                  El plan Básico tiene un límite de 1000 solicitudes por día.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManualsConfig;
