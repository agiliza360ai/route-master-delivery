
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const BrandConfig = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Datos guardados",
      description: "La información de la marca ha sido actualizada correctamente.",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Datos de Marca</h1>
          <p className="text-gray-600">Configure la información sensible de su marca</p>
        </div>
        <Badge className="h-10 w-10 text-delivery-600" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Información General</CardTitle>
          <CardDescription>Datos principales de identificación de la empresa</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                <Input id="companyName" placeholder="Ingrese el nombre de la empresa" defaultValue="DeliveryGest Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Número de Identificación Fiscal</Label>
                <Input id="taxId" placeholder="Ingrese el NIF/CIF" defaultValue="B12345678" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección Fiscal</Label>
              <Input id="address" placeholder="Ingrese la dirección fiscal" defaultValue="Calle Principal 123, Ciudad" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" placeholder="Ciudad" defaultValue="Madrid" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Código Postal</Label>
                <Input id="postalCode" placeholder="Código Postal" defaultValue="28001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input id="country" placeholder="País" defaultValue="España" />
              </div>
            </div>
          </CardContent>

          <CardHeader className="pt-6">
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="Correo electrónico" defaultValue="contacto@deliverygest.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="Número de teléfono" defaultValue="+34 91 123 4567" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Sitio Web</Label>
              <Input id="website" placeholder="URL del sitio web" defaultValue="https://www.deliverygest.com" />
            </div>
          </CardContent>

          <CardHeader className="pt-6">
            <CardTitle>Personalización de Marca</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo de la Empresa</Label>
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 bg-gray-100 rounded-md flex items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <Button type="button" variant="outline">Subir Logo</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandDesc">Descripción de la Marca</Label>
              <Textarea 
                id="brandDesc" 
                placeholder="Breve descripción de su marca y servicios" 
                defaultValue="DeliveryGest es una plataforma integral de gestión para servicios de entrega a domicilio, ofreciendo soluciones eficientes para negocios de todos los tamaños."
                rows={4}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline">Cancelar</Button>
            <Button type="submit" className="bg-delivery-600 hover:bg-delivery-700">Guardar Cambios</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default BrandConfig;
