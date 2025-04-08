// Omit permite, dado un type o interface
// crear otro tipo de dato ommitiendo ciertos campos
export interface CreateUser extends Omit<User, 'id'> { }

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}