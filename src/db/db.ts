import { randomUUID } from "node:crypto";

import { CreateUser, User } from "../types/user";

// Para el que le interese, esto es un singleton
// Una clase de la que quiero únicamente una instancia en mi código
// https://es.wikipedia.org/wiki/Singleton
// No quiero permitir que dos instancias distintas (cada una con distinto estado, 
// por ejemplo la primera con 2 users y la segunda con 5 users) anden vagando 
// por mi código
export class DB {
  static #instance: DB; // El # es únicamente por gusto, no hace nada especial
  private users: User[];

  constructor() {
    if (DB.#instance) {
      throw new Error("Usá DB.getInstance()!")
    }

    this.users = [
      { id: "07784fc1-2e06-42d6-b512-7ddc5c59da0a", firstName: "Galo", lastName: "Bello", email: "gbelloponce@huergo.edu.ar", password: "galo123" }
    ]

    // "this" es esta instancia, la meto en la variable estática de mi clase
    DB.#instance = this;
  }

  static getInstance(): DB {
    if (!DB.#instance) {
      DB.#instance = new DB();
    }
    return DB.#instance;
  }

  getAllUsers() {
    return this.users
  }

  getUserById(userIdToFind: string) {
    return this.users.find(user => user.id === userIdToFind)
  }

  createUser(user: CreateUser) {
    const newUser = { id: randomUUID(), ...user };
    this.users.push(newUser)

    return newUser;
  }

  updateUser(userToModify: User) {

    // Itero por todos los usuarios de mi DB, .map() devuelve una lista nueva
    this.users = this.users.map(user => {

      // Si el usuario de mi iteración es el que tengo que modificar
      if (user.id === userToModify.id) {

        // Devuelvo el usuario modificado.
        return userToModify;
      }


      // Si el usuario no es el de mi iteración, lo devuelvo sin cambios
      return user;
    });

  }

  deleteUser(userId: string) {
    this.users = this.users.filter(user => {
      return user.id !== userId
    })
  }
}