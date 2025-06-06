
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Calendar, Book, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface PlanOption {
  id: string;
  name: string;
  price: number;
  billingPeriod: string;
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
}

const planOptions: PlanOption[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 29,
    billingPeriod: 'mes',
    features: [
      'Hasta 50 entregas diarias',
      '2 administradores',
      'Soporte por email',
      'Estadísticas básicas'
    ],
    isCurrent: true
  },
  {
    id: 'pro',
    name: 'Profesional',
    price: 79,
    billingPeriod: 'mes',
    features: [
      'Hasta 200 entregas diarias',
      '5 administradores',
      'Soporte prioritario',
      'Estadísticas avanzadas',
      'API para integración'
    ],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Empresa',
    price: 149,
    billingPeriod: 'mes',
    features: [
      'Entregas ilimitadas',
      'Administradores ilimitados',
      'Soporte 24/7',
      'Estadísticas en tiempo real',
      'API para integración',
      'Personalización completa'
    ]
  }
];

const PlansConfig = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('current');
  
  // Token usage information
  const totalTokens = 5000;
  const usedTokens = 2350;
  const tokenPercentage = Math.round((usedTokens / totalTokens) * 100);
  
  const handleSelectPlan = (planId: string) => {
    toast({
      title: "Plan seleccionado",
      description: `Has seleccionado el plan ${planId}. Contacta con ventas para finalizar el cambio.`,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Planes y Pagos</h1>
          <p className="text-gray-600">Gestione su suscripción y pagos</p>
        </div>
        <FileText className="h-10 w-10 text-purple-600" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-purple-100">
          <TabsTrigger value="current" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">Plan Actual</TabsTrigger>
          <TabsTrigger value="plans" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">Todos los Planes</TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">Información de Pago</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle>Plan Actual: Básico</CardTitle>
              <CardDescription>Detalles de tu suscripción actual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="text-lg font-medium">Plan Básico</p>
                  <p className="text-sm text-gray-500">Facturación mensual</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-900">€29<span className="text-sm font-normal text-gray-500">/mes</span></p>
                </div>
              </div>

              {/* Token usage section */}
              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-purple-600" />
                    <p className="font-medium">Uso de tokens</p>
                  </div>
                  <span className="text-sm font-medium text-purple-800">
                    {usedTokens} / {totalTokens}
                  </span>
                </div>
                <div className="space-y-1">
                  <Progress 
                    value={tokenPercentage} 
                    className="h-2 bg-purple-100 [&>div]:bg-purple-600" 
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{tokenPercentage}% utilizado</span>
                    <span>{totalTokens - usedTokens} tokens restantes</span>
                  </div>
                </div>
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8 border-purple-300 hover:bg-purple-50 text-purple-700"
                  >
                    Comprar tokens adicionales
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-medium">Periodo de facturación</p>
                <div className="flex justify-between items-center">
                  <span>Próxima factura</span>
                  <span className="font-medium">15 junio, 2025</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>29 días restantes</span>
                    <span>15 junio</span>
                  </div>
                  <Progress value={40} className="h-2 bg-purple-100 [&>div]:bg-purple-600" />
                </div>
              </div>

              <div className="space-y-3 pt-3">
                <p className="font-medium">Características incluidas:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Hasta 50 entregas diarias</li>
                  <li>2 administradores</li>
                  <li>Soporte por email</li>
                  <li>Estadísticas básicas</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button variant="outline" onClick={() => setActiveTab('plans')} className="border-purple-300 hover:bg-purple-50">
                Cambiar Plan
              </Button>
              <Button variant="outline" className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700">
                Cancelar Suscripción
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <div className="grid gap-6 md:grid-cols-3">
            {planOptions.map((plan) => (
              <Card key={plan.id} className={`flex flex-col ${plan.isPopular ? 'border-purple-500 relative' : ''}`}>
                {plan.isPopular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="bg-purple-600">Popular</Badge>
                  </div>
                )}
                {plan.isCurrent && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="bg-green-600">Plan Actual</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-purple-900">€{plan.price}</span>
                    <span className="text-sm">/{plan.billingPeriod}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-purple-600"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full ${plan.isCurrent ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : plan.isPopular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'}`}
                    disabled={plan.isCurrent}
                  >
                    {plan.isCurrent ? 'Plan Actual' : 'Seleccionar Plan'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle>Información de Pago</CardTitle>
              <CardDescription>Gestione sus métodos de pago y facturas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Método de pago actual</h3>
                <div className="flex items-center gap-4 p-4 border border-purple-100 rounded-md">
                  <div className="bg-purple-50 rounded p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-700">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Visa terminada en 4242</p>
                    <p className="text-sm text-gray-500">Expira 12/2026</p>
                  </div>
                  <Button variant="ghost" className="ml-auto text-purple-600 hover:text-purple-800 hover:bg-purple-50">Editar</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Historial de facturación</h3>
                <div className="border border-purple-100 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-purple-200">
                    <thead className="bg-purple-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Fecha</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Monto</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Estado</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-purple-800 uppercase tracking-wider">Factura</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-purple-100">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15 May, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€29.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Pagado</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-purple-600 hover:text-purple-800">Descargar</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15 Abr, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€29.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Pagado</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-purple-600 hover:text-purple-800">Descargar</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15 Mar, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€29.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Pagado</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-purple-600 hover:text-purple-800">Descargar</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlansConfig;
