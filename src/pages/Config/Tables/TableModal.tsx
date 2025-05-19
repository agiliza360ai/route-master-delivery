
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Table } from '@/types/reservation';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface TableModalProps {
  table: Table | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (table: Table) => void;
}

const TableModal: React.FC<TableModalProps> = ({
  table,
  isOpen,
  onClose,
  onSave,
}) => {
  const form = useForm<Table>({
    defaultValues: table || {
      id: '',
      name: '',
      capacity: 4,
      status: 'available',
    },
  });

  const handleSubmit = (data: Table) => {
    onSave({
      ...data,
      id: table?.id || '', // ID will be generated if new
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{table ? 'Editar Mesa' : 'Agregar Mesa'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Mesa</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Mesa 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidad</FormLabel>
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="available" id="available" />
                        <Label htmlFor="available">Disponible</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="occupied" id="occupied" />
                        <Label htmlFor="occupied">Ocupada</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="reserved" id="reserved" />
                        <Label htmlFor="reserved">Reservada</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="maintenance" id="maintenance" />
                        <Label htmlFor="maintenance">Mantenimiento</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                {table ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TableModal;
