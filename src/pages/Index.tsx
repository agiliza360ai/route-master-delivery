
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, Truck, Users, Settings, ChevronRight, CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-delivery-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package size={28} />
            <Link to="/" className="text-xl font-bold">DeliveryGest</Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-delivery-200 transition-colors">Características</a>
            <a href="#pricing" className="hover:text-delivery-200 transition-colors">Planes</a>
            <Link to="/dashboard" className="hover:text-delivery-200 transition-colors">Acceder</Link>
          </nav>
          
          <Button 
            variant="outline" 
            className="bg-white text-delivery-600 hover:bg-delivery-50 border-white"
          >
            Iniciar Sesión
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="bg-delivery-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Sistema de Gestión para Servicios de Delivery</h1>
              <p className="text-xl text-delivery-100 mb-8">Optimiza tus operaciones de entrega, ahorra tiempo y aumenta la satisfacción de tus clientes con nuestra plataforma integral.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-delivery-700 hover:bg-delivery-100 text-lg py-6 px-8" 
                  asChild
                >
                  <Link to="/dashboard">Comenzar Ahora</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-delivery-600 text-lg py-6 px-8" 
                  asChild
                >
                  <a href="#features">Conocer Más</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Características Principales</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Nuestra plataforma ofrece todas las herramientas que necesitas para gestionar eficientemente tus servicios de delivery.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-delivery-100 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                  <Package className="h-7 w-7 text-delivery-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestión de Pedidos</h3>
                <p className="text-gray-600">Control total sobre tus pedidos desde la creación hasta la entrega con seguimiento en tiempo real.</p>
              </div>

              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-delivery-100 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                  <Truck className="h-7 w-7 text-delivery-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flota de Repartidores</h3>
                <p className="text-gray-600">Administra tu flota de repartidores, asigna rutas optimizadas y monitorea su desempeño.</p>
              </div>

              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-delivery-100 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                  <Users className="h-7 w-7 text-delivery-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestión de Clientes</h3>
                <p className="text-gray-600">Base de datos completa de clientes con historial de pedidos y preferencias de entrega.</p>
              </div>

              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-delivery-100 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                  <Settings className="h-7 w-7 text-delivery-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Configuración Avanzada</h3>
                <p className="text-gray-600">Personaliza el sistema según tus necesidades con opciones de configuración avanzada para tu negocio.</p>
              </div>

              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-delivery-100 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-delivery-600">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 8.5V7a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1.5" />
                    <path d="M8 12a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5z" />
                    <path d="M16 17.5V19a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1.5" />
                    <path d="M20 12a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5z" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Estadísticas y Reportes</h3>
                <p className="text-gray-600">Analiza el rendimiento de tu negocio con reportes detallados y estadísticas en tiempo real.</p>
              </div>

              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-delivery-100 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-delivery-600">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Multiusuario</h3>
                <p className="text-gray-600">Gestiona permisos y roles para tu equipo con acceso personalizado según responsabilidades.</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button 
                className="bg-delivery-600 hover:bg-delivery-700 text-lg" 
                asChild
              >
                <Link to="/dashboard" className="flex items-center gap-1">
                  Probar Ahora <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Planes Disponibles</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Elige el plan que mejor se adapte a las necesidades de tu negocio.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Plan Básico */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                <div className="p-6 border-b">
                  <h3 className="text-2xl font-bold mb-1">Básico</h3>
                  <p className="text-gray-500">Para negocios pequeños</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">€29</span>
                    <span className="text-gray-500">/mes</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Hasta 50 entregas diarias</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>2 administradores</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Soporte por email</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Estadísticas básicas</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-delivery-600 hover:bg-delivery-700" asChild>
                    <Link to="/dashboard">Seleccionar</Link>
                  </Button>
                </div>
              </div>

              {/* Plan Profesional */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-delivery-500 relative transform scale-105">
                <div className="absolute top-0 left-0 right-0 bg-delivery-500 text-white text-center py-1 text-sm font-medium">
                  Recomendado
                </div>
                <div className="p-6 border-b mt-4">
                  <h3 className="text-2xl font-bold mb-1">Profesional</h3>
                  <p className="text-gray-500">Para negocios en crecimiento</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">€79</span>
                    <span className="text-gray-500">/mes</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Hasta 200 entregas diarias</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>5 administradores</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Soporte prioritario</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Estadísticas avanzadas</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>API para integración</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-delivery-600 hover:bg-delivery-700" asChild>
                    <Link to="/dashboard">Seleccionar</Link>
                  </Button>
                </div>
              </div>

              {/* Plan Empresa */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                <div className="p-6 border-b">
                  <h3 className="text-2xl font-bold mb-1">Empresa</h3>
                  <p className="text-gray-500">Para grandes operaciones</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">€149</span>
                    <span className="text-gray-500">/mes</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Entregas ilimitadas</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Administradores ilimitados</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Soporte 24/7</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Estadísticas en tiempo real</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>API con mayor capacidad</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Personalización completa</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-delivery-600 hover:bg-delivery-700" asChild>
                    <Link to="/dashboard">Seleccionar</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-delivery-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para optimizar tus entregas?</h2>
            <p className="text-xl text-delivery-100 mb-8 max-w-2xl mx-auto">
              Únete a miles de negocios que ya han mejorado su servicio de delivery con nuestra plataforma.
            </p>
            <Button 
              className="bg-white text-delivery-700 hover:bg-delivery-100 text-lg py-6 px-8"
              asChild
            >
              <Link to="/dashboard">Comenzar Ahora</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Package size={24} />
                <span className="text-xl font-bold">DeliveryGest</span>
              </div>
              <p className="text-gray-400 mb-4">
                Sistema de gestión integral para servicios de delivery. Optimiza tus entregas y mejora la satisfacción de tus clientes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Producto</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Características</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">Planes</a></li>
                <li><Link to="/config" className="text-gray-400 hover:text-white">Configuración</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Seguridad</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Sobre nosotros</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Clientes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contacto</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Centro de ayuda</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentación</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Estado del sistema</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 DeliveryGest. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Términos</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
