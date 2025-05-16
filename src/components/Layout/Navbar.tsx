
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChartBar } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="bg-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Package size={28} />
          <Link to="/" className="text-xl font-bold">DeliveryGest</Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-purple-200 transition-colors">Inicio</Link>
          <Link to="/dashboard" className="hover:text-purple-200 transition-colors">Panel</Link>
          <Link to="/sales" className="hover:text-purple-200 transition-colors">Ventas</Link>
          <Link to="/config" className="hover:text-purple-200 transition-colors">Configuración</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-purple-700">
            Mi Cuenta
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <span className="sr-only">Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
