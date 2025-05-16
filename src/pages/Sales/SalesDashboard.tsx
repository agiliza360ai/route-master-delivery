import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Calendar, ChartBar, ChartPie, ClockIcon, DollarSign, Package, Receipt, Truck, Users, Check, Utensils } from 'lucide-react';

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
  { day: "Lun", sales: 1200, orders: 45, averageTicket: 26.67, serviceTime: 20 },
  { day: "Mar", sales: 1800, orders: 65, averageTicket: 27.69, serviceTime: 18 },
  { day: "Mié", sales: 1500, orders: 55, averageTicket: 27.27, serviceTime: 19 },
  { day: "Jue", sales: 2200, orders: 78, averageTicket: 28.21, serviceTime: 17 },
  { day: "Vie", sales: 2800, orders: 95, averageTicket: 29.47, serviceTime: 22 },
  { day: "Sáb", sales: 3200, orders: 110, averageTicket: 29.09, serviceTime: 24 },
  { day: "Dom", sales: 2600, orders: 88, averageTicket: 29.55, serviceTime: 20 },
];

// Process time data (average time in minutes for each stage)
const processTimeData = [
  { name: "Aceptado", time: 3, icon: Check },
  { name: "En Cocina", time: 12, icon: Utensils },
  { name: "En Camino", time: 15, icon: Truck },
  { name: "Entregado", time: 2, icon: Package }
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
  // Process stage colors
  accepted: '#10B981',  // Soft green
  kitchen: '#F97316',   // Bright orange
  transit: '#0EA5E9',   // Ocean blue
  delivered: '#8B5CF6', // Vivid purple
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

const ServiceTimeCard = ({ avgTime, trend }) => (
  <Card className="col-span-1">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        Tiempo de Atención
      </CardTitle>
      <ClockIcon className="h-4 w-4 text-purple-600" />
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center text-center">
        <div className="text-3xl font-bold text-purple-900">{avgTime.toFixed(2)} min</div>
        <p className="text-xs text-muted-foreground mt-1">Promedio</p>
        <div className={`text-xs mt-2 flex items-center ${trend.positive ? 'text-green-600' : 'text-red-500'}`}>
          {trend.positive ? '↓' : '↑'} {Math.abs(trend.value).toFixed(1)}% vs. objetivo
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProcessTimeChart = ({ data }) => {
  // Find total time for percentage calculation
  const totalTime = data.reduce((sum, process) => sum + process.time, 0);
  
  // Add percentage to each item
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: Math.round((item.time / totalTime) * 100)
  }));
  
  // Get color based on process name
  const getColor = (name) => {
    switch (name) {
      case "Aceptado": return COLORS.accepted;
      case "En Cocina": return COLORS.kitchen;
      case "En Camino": return COLORS.transit;
      case "Entregado": return COLORS.delivered;
      default: return COLORS.primary;
    }
  };
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-800">
          Tiempo Promedio por Proceso
        </CardTitle>
        <CardDescription>Total: {totalTime} minutos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={dataWithPercentage}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" unit=" min" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100}
                tick={({ x, y, payload }) => {
                  const Icon = data.find(item => item.name === payload.value)?.icon;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text x={-10} y={4} textAnchor="end" fill="#666">
                        {payload.value}
                      </text>
                      {Icon && (
                        <foreignObject x={-35} y={-8} width={16} height={16}>
                          <Icon className="h-4 w-4" />
                        </foreignObject>
                      )}
                    </g>
                  );
                }}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  if (name === "time") return [`${value} min (${props.payload.percentage}%)`, "Tiempo"];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar 
                dataKey="time" 
                name="Tiempo (min)" 
                radius={[0, 4, 4, 0]}
                barSize={30}
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const SalesDashboard = () => {
  // Calculate summary metrics
  const totalSales = dailySalesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = dailySalesData.reduce((sum, day) => sum + day.orders, 0);
  const avgTicket = totalSales / totalOrders;
  const avgServiceTime = serviceTimeData.reduce((sum, day) => sum + day.avgTime, 0) / serviceTimeData.length;
  
  // Calcular el tiempo promedio de atención por orden considerando también el volumen de órdenes
  const weightedServiceTime = dailySalesData.reduce((sum, day) => sum + (day.serviceTime * day.orders), 0);
  const avgServiceTimePerOrder = weightedServiceTime / totalOrders;

  // Tendencia vs objetivo (asumimos un objetivo de 18.5 minutos)
  const targetServiceTime = 18.5;
  const serviceTimeTrend = {
    value: ((avgServiceTimePerOrder - targetServiceTime) / targetServiceTime) * 100,
    positive: avgServiceTimePerOrder <= targetServiceTime
  };
  
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
        <ServiceTimeCard 
          avgTime={avgServiceTimePerOrder}
          trend={serviceTimeTrend}
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
            <CardTitle className="text-lg font-semibold text-purple-800">Tiempos de Atención por Día</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <TimeChart data={serviceTimeData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nuevo gráfico de tiempo promedio por proceso */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ProcessTimeChart data={processTimeData} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold text-purple-800">Productos Destacados</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-semibold mb-3 text-purple-700">Por Cantidad</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-right">Cantidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topSellingProducts
                      .slice()
                      .sort((a, b) => b.quantity - a.quantity)
                      .map((product) => (
                        <TableRow key={`qty-${product.name}`}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell className="text-right font-medium">{product.quantity}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-3 text-purple-700">Por Facturación</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-right">Facturación (S/)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topSellingProducts
                      .slice()
                      .sort((a, b) => b.revenue - a.revenue)
                      .map((product) => (
                        <TableRow key={`rev-${product.name}`}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell className="text-right font-medium">S/ {product.revenue}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesDashboard;
