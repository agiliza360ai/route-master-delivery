
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Calendar, ChartBar, ChartPie, ClockIcon, DollarSign, Package, Receipt, Truck, Users } from 'lucide-react';

// Sales by payment method data
const paymentMethodData = [
  { name: "Tarjeta de crédito", value: 4200 },
  { name: "Efectivo", value: 2800 },
  { name: "Transferencia", value: 1600 },
  { name: "Yape/Plin", value: 3200 },
];

// Conversion rate data
const conversionData = [
  { name: "Visitas", value: 12000 },
  { name: "Conversiones", value: 1800 },
];

// Order type data (delivery vs pickup)
const orderTypeData = [
  { name: "Delivery", value: 680 },
  { name: "Recojo en tienda", value: 320 },
];

// Daily sales data
const dailySalesData = [
  { day: "Lun", sales: 1200, orders: 45, averageTicket: 26.67 },
  { day: "Mar", sales: 1800, orders: 65, averageTicket: 27.69 },
  { day: "Mié", sales: 1500, orders: 55, averageTicket: 27.27 },
  { day: "Jue", sales: 2200, orders: 78, averageTicket: 28.21 },
  { day: "Vie", sales: 2800, orders: 95, averageTicket: 29.47 },
  { day: "Sáb", sales: 3200, orders: 110, averageTicket: 29.09 },
  { day: "Dom", sales: 2600, orders: 88, averageTicket: 29.55 },
];

// Service time data
const serviceTimeData = [
  { day: "Lun", avgTime: 18, deviation: 4 },
  { day: "Mar", avgTime: 17, deviation: 3 },
  { day: "Mié", avgTime: 19, deviation: 5 },
  { day: "Jue", avgTime: 16, deviation: 3 },
  { day: "Vie", avgTime: 22, deviation: 6 },
  { day: "Sáb", avgTime: 24, deviation: 7 },
  { day: "Dom", avgTime: 20, deviation: 5 },
];

// Top selling products
const topSellingProducts = [
  { name: "Hamburguesa Clásica", quantity: 520, revenue: 5200 },
  { name: "Pizza Familiar", quantity: 380, revenue: 7600 },
  { name: "Pollo a la Brasa", quantity: 340, revenue: 6800 },
  { name: "Lomo Saltado", quantity: 290, revenue: 4350 },
  { name: "Ceviche", quantity: 250, revenue: 5000 },
];

// Chart colors
const COLORS = {
  primary: '#9b87f5',
  secondary: '#7E69AB',
  tertiary: '#6E59A5',
  quaternary: '#D6BCFA',
  delivery: '#8B5CF6',
  pickup: '#D946EF',
  positive: '#10B981',
  negative: '#EF4444',
  neutral: '#6B7280',
};

const SummaryCard = ({ title, value, description, icon: Icon, trend = null }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-purple-600" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-purple-900">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
      {trend && (
        <div className={`text-xs mt-2 flex items-center ${trend.positive ? 'text-green-600' : 'text-red-500'}`}>
          {trend.positive ? '↑' : '↓'} {trend.value}% {trend.text}
        </div>
      )}
    </CardContent>
  </Card>
);

const TimeChart = ({ data }) => (
  <ChartContainer 
    config={{ 
      avgTime: { color: COLORS.primary }, 
      deviation: { color: COLORS.quaternary }
    }}
  >
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <ChartTooltip content={<ChartTooltipContent />} />
      <Legend />
      <Bar dataKey="avgTime" name="Tiempo promedio (min)" fill="var(--color-avgTime)" />
      <Bar dataKey="deviation" name="Desviación (min)" fill="var(--color-deviation)" />
    </BarChart>
  </ChartContainer>
);

const PieChartComponent = ({ data, colors, title, dataKey = "value", nameKey = "name" }) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-purple-800">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={2}
              dataKey={dataKey}
              nameKey={nameKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const SalesDashboard = () => {
  // Calculate summary metrics
  const totalSales = dailySalesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = dailySalesData.reduce((sum, day) => sum + day.orders, 0);
  const avgTicket = totalSales / totalOrders;
  const avgServiceTime = serviceTimeData.reduce((sum, day) => sum + day.avgTime, 0) / serviceTimeData.length;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Ventas</h1>
        <p className="text-gray-600 mt-2">Análisis detallado de métricas de venta y rendimiento</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <SummaryCard 
          title="Ventas Totales" 
          value={`S/ ${totalSales.toLocaleString()}`}
          description="Últimos 7 días" 
          icon={DollarSign}
          trend={{ positive: true, value: 12.5, text: "vs. semana anterior" }}
        />
        <SummaryCard 
          title="Pedidos" 
          value={totalOrders}
          description="Órdenes completadas" 
          icon={Receipt}
          trend={{ positive: true, value: 8.2, text: "vs. semana anterior" }}
        />
        <SummaryCard 
          title="Ticket Promedio" 
          value={`S/ ${avgTicket.toFixed(2)}`}
          description="Por orden" 
          icon={ChartBar}
          trend={{ positive: true, value: 3.7, text: "vs. semana anterior" }}
        />
        <SummaryCard 
          title="Tiempo de Atención" 
          value={`${avgServiceTime} min`}
          description="Promedio" 
          icon={ClockIcon}
          trend={{ positive: false, value: 5.2, text: "vs. objetivo" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <PieChartComponent 
          data={paymentMethodData}
          colors={[COLORS.primary, COLORS.secondary, COLORS.tertiary, COLORS.quaternary]}
          title="Ventas por Método de Pago"
        />
        <PieChartComponent 
          data={orderTypeData}
          colors={[COLORS.delivery, COLORS.pickup]}
          title="Ventas por Tipo de Entrega"
        />
        <Card className="col-span-1 md:col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-800">Tasa de Conversión</CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-2 pt-4">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-700">15%</div>
                  <div className="text-sm text-muted-foreground">Tasa de conversión</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Conversiones", value: 1800 },
                      { name: "No convertidos", value: 10200 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={70}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    <Cell fill={COLORS.positive} />
                    <Cell fill={COLORS.neutral} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between w-full pt-2 text-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-purple-600 mr-2"></div>
                <span>1,800 conversiones</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-400 mr-2"></div>
                <span>12,000 visitas</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-800">Ventas y Órdenes por Día</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer 
                config={{ 
                  sales: { color: COLORS.primary }, 
                  orders: { color: COLORS.secondary }
                }}
              >
                <LineChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    name="Ventas (S/)" 
                    yAxisId="left" 
                    stroke="var(--color-sales)" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    name="Órdenes" 
                    yAxisId="right" 
                    stroke="var(--color-orders)" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-800">Tiempos de Atención</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <TimeChart data={serviceTimeData} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <Tabs defaultValue="quantity" className="w-full">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-purple-800">Productos Destacados</CardTitle>
                <TabsList>
                  <TabsTrigger value="quantity">Por Cantidad</TabsTrigger>
                  <TabsTrigger value="revenue">Por Facturación</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="quantity" className="mt-0 pt-0">
              <div className="h-[300px]">
                <ChartContainer 
                  config={{ 
                    quantity: { color: COLORS.primary }
                  }}
                >
                  <BarChart 
                    data={topSellingProducts.slice().sort((a, b) => b.quantity - a.quantity)} 
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={150} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="quantity" name="Cantidad vendida" fill="var(--color-quantity)" />
                  </BarChart>
                </ChartContainer>
              </div>
            </TabsContent>
            <TabsContent value="revenue" className="mt-0 pt-0">
              <div className="h-[300px]">
                <ChartContainer 
                  config={{ 
                    revenue: { color: COLORS.secondary }
                  }}
                >
                  <BarChart 
                    data={topSellingProducts.slice().sort((a, b) => b.revenue - a.revenue)} 
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={150} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" name="Facturación (S/)" fill="var(--color-revenue)" />
                  </BarChart>
                </ChartContainer>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesDashboard;
