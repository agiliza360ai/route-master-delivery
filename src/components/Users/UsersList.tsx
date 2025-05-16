
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Users, MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import { User as UserType } from '@/types/user';

interface UsersListProps {
  users: UserType[];
  onViewDetails: (user: UserType) => void;
  onToggleStatus: (userId: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, onViewDetails, onToggleStatus }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No se encontraron usuarios</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map(user => (
        <Card 
          key={user.id} 
          className={`overflow-hidden border border-purple-100 ${
            user.status === 'inactive' ? 'bg-purple-50' : 'bg-white'
          }`}
        >
          <CardContent className="p-0">
            <div className="flex justify-between items-center p-4 border-b border-purple-100">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                  <User className="text-purple-700 h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.position}</p>
                </div>
              </div>
              <Switch 
                checked={user.status === 'active'}
                onCheckedChange={() => onToggleStatus(user.id)}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-start">
                <Users className="h-5 w-5 text-purple-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Rol</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Correo</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-purple-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Teléfono</p>
                  <p className="text-sm text-gray-600">{user.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-purple-100 flex justify-end">
              <Button 
                variant="ghost" 
                className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-0"
                onClick={() => onViewDetails(user)}
              >
                Ver detalles <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UsersList;
