
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Badge,
  FileText,
  Book,
  Ticket,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarMenu
} from "@/components/ui/sidebar";

const ConfigurationSidebar = () => {
  const sidebar = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Configuration menu items
  const configItems = [
    { title: "Datos de Marca", path: "/config/brand", icon: Badge },
    { title: "Planes y Pagos", path: "/config/plans", icon: FileText },
    { title: "Usuarios", path: "/users", icon: Users },
    { title: "Manuales", path: "/config/manuals", icon: Book },
    { title: "Incidencias", path: "/config/incidents", icon: Ticket }
  ];

  // Helper for active route detection
  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);
  
  // Helper for nav classes
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-purple-100 text-purple-800 font-medium hover:bg-purple-100" 
      : "hover:bg-gray-100 text-gray-600";

  return (
    <Sidebar
      className={cn(
        "border-r border-purple-100 bg-white fixed left-0 top-0 h-full z-40",
        "w-64"
      )}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-800 text-lg font-medium px-4 pt-6 pb-2">
            Configuración
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} end className={getNavClass}>
                      <item.icon className="mr-3 h-5 w-5 text-purple-600" />
                      <span className="text-base">{item.title}</span>
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
