export interface Contact {
  id: string;       // MongoDB _id exposed as virtual `id`
  name: string;
  email: string | null;
  phone: string;
  isActive: boolean;
}
