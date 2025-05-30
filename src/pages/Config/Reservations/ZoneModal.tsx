
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface ZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (zoneName: string) => void;
}

const ZoneModal: React.FC<ZoneModalProps> = ({ isOpen, onClose, onSave }) => {
  const [zoneName, setZoneName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zoneName.trim()) {
      onSave(zoneName.trim());
      setZoneName('');
    }
  };

  const handleClose = () => {
    setZoneName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-96 max-w-90vw">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Nueva Zona</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zoneName">Nombre de la zona</Label>
              <Input
                id="zoneName"
                type="text"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                placeholder="Ej: Salón Principal, Terraza, VIP..."
                required
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={!zoneName.trim()}
              >
                Crear Zona
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZoneModal;
