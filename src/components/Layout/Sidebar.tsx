
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Package,
  Settings,
  FileText,
  Badge,
  Book,
  Calendar,
  Ticket
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const ConfigurationSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Configuration menu items
  const configItems = [
    { title: "Datos de Marca", path: "/config/brand", icon: Badge },
    { title: "Planes y Pagos", path: "/config/plans", icon: FileText },
    { title: "Manuales", path: "/config/manuals", icon: Book },
    { title: "Incidencias", path: "/config/incidents", icon: Ticket }
  ];

  // Helper for active route detection
  const isActive = (path: string) => currentPath === path;
  const isExpanded = configItems.some((item) => isActive(item.path));
  
  // Helper for nav classes
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-delivery-100 text-delivery-800 font-medium hover:bg-delivery-100" 
      : "hover:bg-gray-100 text-gray-700";

  return (
    <Sidebar
      className={cn(
        "border-r border-gray-200 bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible
    >
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup open={isExpanded} defaultOpen>
          <SidebarGroupLabel>Configuración</SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} end className={getNavClass}>
                      <item.icon className="mr-2 h-5 w-5 text-delivery-600" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ConfigurationSidebar;
