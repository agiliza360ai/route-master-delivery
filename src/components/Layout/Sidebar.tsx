
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Package,
  Settings,
  FileText,
  Badge,
  Book,
  Calendar,
  Ticket,
  Users,
  ImageIcon,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
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
    { title: "ChatBot IA", path: "/config/chatbot", icon: Bot },
    { title: "Reservas", path: "/config/reservations", icon: Calendar },
    { title: "Galería", path: "/config/gallery", icon: ImageIcon },
    { title: "Manuales", path: "/config/manuals", icon: Book },
    { title: "Incidencias", path: "/config/incidents", icon: Ticket }
  ];

  // Helper for active route detection
  const isActive = (path: string) => currentPath === path;
  const isExpanded = configItems.some((item) => isActive(item.path));
  
  // Helper for nav classes
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-purple-100 text-purple-800 font-medium hover:bg-purple-100" 
      : "hover:bg-gray-100 text-gray-700";

  return (
    <Sidebar
      className={cn(
        "border-r border-purple-100 bg-white transition-all duration-300",
        sidebar.state === "collapsed" ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end text-purple-600 hover:text-purple-800 hover:bg-purple-50" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-700">Configuración</SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} end className={getNavClass}>
                      <item.icon className="mr-2 h-5 w-5 text-purple-600" />
                      {sidebar.state !== "collapsed" && <span>{item.title}</span>}
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
