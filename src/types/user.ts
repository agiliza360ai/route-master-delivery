
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  position: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
}
