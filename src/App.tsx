
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/Layout/AppLayout";
import ConfigLayout from "./components/Layout/ConfigLayout";
import ConfigIndex from "./pages/Config/ConfigIndex";
import BrandConfig from "./pages/Config/BrandConfig";
import PlansConfig from "./pages/Config/PlansConfig";
import ManualsConfig from "./pages/Config/ManualsConfig";
import IncidentsConfig from "./pages/Config/IncidentsConfig";
import ReservationsConfig from "./pages/Config/ReservationsConfig";
import TablesList from "./pages/Config/Tables/TablesList";
import ReservationsList from "./pages/Config/Reservations/ReservationsList";
import SalesDashboard from "./pages/Sales/SalesDashboard";
import UsersManagement from "./pages/Users/UsersManagement";
import GalleryConfig from "./pages/Config/GalleryConfig";
import ChatBotConfig from "./pages/Config/ChatBotConfig";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales" element={<SalesDashboard />} />
            
            <Route path="/config" element={<ConfigLayout />}>
              <Route index element={<ConfigIndex />} />
              <Route path="brand" element={<BrandConfig />} />
              <Route path="plans" element={<PlansConfig />} />
              <Route path="manuals" element={<ManualsConfig />} />
              <Route path="incidents" element={<IncidentsConfig />} />
              <Route path="gallery" element={<GalleryConfig />} />
              <Route path="chatbot" element={<ChatBotConfig />} />
              <Route path="reservations" element={<ReservationsConfig />} />
              <Route path="reservations/tables" element={<TablesList />} />
              <Route path="reservations/list" element={<ReservationsList />} />
            </Route>
            
            <Route path="/users" element={<UsersManagement />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
