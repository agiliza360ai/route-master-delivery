
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, Reservation } from '@/types/reservation';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ReservationModalProps {
  reservation: Reservation | null;
  tables: Table[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (reservation: Reservation) => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  reservation,
  tables,
  isOpen,
  onClose,
  onSave,
}) => {
  const availableTables = tables.filter(table => 
    table.status === 'available' || 
    (reservation && table.id === reservation.tableId)
  );

  const form = useForm<Reservation>({
    defaultValues: reservation || {
      id: '',
      tableId: availableTables.length > 0 ? availableTables[0].id : '',
      customerName: '',
      customerPhone: '',
      people: 2,
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      status: 'pending',
      notes: ''
    },
  });

  const handleSubmit = (data: Reservation) => {
    onSave({
      ...data,
      id: reservation?.id || '', // ID will be generated if new
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{reservation ? 'Editar Reservación' : 'Nueva Reservación'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. 555-123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="people"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personas</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          max={20} 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tableId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mesa</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          {...field}
                        >
                          {availableTables.map((table) => (
                            <option key={table.id} value={table.id}>
                              {table.name} (Cap. {table.capacity})
                            </option>
                          ))}
                          {availableTables.length === 0 && (
                            <option value="" disabled>No hay mesas disponibles</option>
                          )}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-2 gap-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pending" id="pending" />
                          <Label htmlFor="pending">Pendiente</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="confirmed" id="confirmed" />
                          <Label htmlFor="confirmed">Confirmada</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="seated" id="seated" />
                          <Label htmlFor="seated">Sentados</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="completed" id="completed" />
                          <Label htmlFor="completed">Completada</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cancelled" id="cancelled" />
                          <Label htmlFor="cancelled">Cancelada</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas</FormLabel>
                    <FormControl>
                      <Input placeholder="Información adicional" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                {reservation ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
