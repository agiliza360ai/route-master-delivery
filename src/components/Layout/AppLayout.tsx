
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full bg-gray-50">
        <Navbar />
        
        <div className="flex flex-grow w-full">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
