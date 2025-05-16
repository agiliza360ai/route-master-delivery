
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';

const AppLayout = () => {
  return (
    <SidebarProvider collapsedWidth={64}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="flex flex-grow w-full">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
