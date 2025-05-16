
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UsersList from '@/components/Users/UsersList';
import { UserModal } from '@/components/Users/UserModal';
import { User } from '@/types/user';

// Mock user data
const initialUsers: User[] = [
  {
    id: "1",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@agiliza360.ai",
    role: "Administrador",
    position: "Gerente de Sistemas",
    phone: "+51 987 654 321",
    address: "Av. Defensores del Morro 890, Lima",
    status: "active"
  },
  {
    id: "2",
    name: "María Rodríguez",
    email: "maria.rodriguez@agiliza360.ai",
    role: "Usuario",
    position: "Coordinadora de Ventas",
    phone: "+51 987 123 456",
    address: "Jr. Ramón Castilla 456, Lima",
    status: "active"
  },
  {
    id: "3",
    name: "Juan Pérez",
    email: "juan.perez@agiliza360.ai",
    role: "Usuario",
    position: "Asistente Administrativo",
    phone: "+51 998 765 432",
    address: "Av. Larco 328, Lima",
    status: "inactive"
  }
];

const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateModal = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (userData: User) => {
    if (userData.id) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === userData.id ? userData : user
      ));
    } else {
      // Create new user
      const newUser = {
        ...userData,
        id: String(Date.now())
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800">Gestión de Usuarios</h1>
        <p className="text-gray-600">Administra la información de los usuarios del sistema</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="w-full max-w-md">
          <Input 
            placeholder="Buscar usuario..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-purple-200 focus:border-purple-500"
          />
        </div>
        <Button 
          onClick={handleOpenCreateModal}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar Usuario
        </Button>
      </div>

      <UsersList 
        users={filteredUsers} 
        onViewDetails={handleOpenEditModal}
        onToggleStatus={handleToggleStatus}
      />

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={currentUser}
      />
    </div>
  );
};

export default UsersManagement;
