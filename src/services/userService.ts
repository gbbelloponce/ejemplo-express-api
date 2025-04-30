import { eq, isNull } from "drizzle-orm";

import { db } from "../db/db";
import { UserCreate, User, usersTable } from "../db/tables/users";

export class UserService {
  async getAllUsers() {
    try {
      const users = await db.query.usersTable.findMany()

      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuarios. Mira los logs para más información.")
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await db.query.usersTable.findFirst({
        where: (users, { eq }) => eq(users.id, userId)
      })

      if (!user) {
        throw new Error(`No se encontró el usuario con id ${userId}`)
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al obtener usuario con id ${userId}. Mira los logs para más información.`)
    }
  }

  async getUserProfileById(userId: string) {
    try {
      const userWithPosts = await db.query.usersTable.findFirst({
        where: (users, { eq }) => eq(users.id, userId),
        with: {
          posts: true
        }
      })

      if (!userWithPosts) {
        throw new Error(`No se encontró el usuario con id ${userId}`)
      }

      return userWithPosts;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al obtener perfil de usuario con id ${userId}. Mira los logs para más información.`)
    }
  }

  async createUser(userToCreate: UserCreate) {
    try {
      const user = await db
        .insert(usersTable)
        .values(userToCreate)
        .returning();

      return user;
    } catch (error) {
      console.error("Error creando usuario: ", userToCreate)
      console.error(error);
      throw new Error("Error al crear usuario. Mira los logs para más información.")
    }
  }

  async updateUser(userToModify: User) {
    try {

      const existingUser = await db.query.usersTable.findFirst({
        where: (users, { eq }) => eq(users.id, userToModify.id)
      })

      if (!existingUser) {
        throw new Error(`No se encontró el usuario con id ${userToModify.id}`)
      }

      const users = await db
        .update(usersTable)
        .set(userToModify)
        .returning()

      return users[0]
    } catch (error) {
      console.error("Error actualizando usuario: ", userToModify)
      console.error(error);
      throw new Error(`Error al actualizar el usuario con id ${userToModify.id}. Mira los logs para más información.`)
    }
  }

  async deleteUser(userId: string) {
    try {

      const existingUser = await db.query.usersTable.findFirst({
        where: (users, { eq }) => eq(users.id, userId)
      })

      if (!existingUser) {
        throw new Error(`No se encontró el usuario con id ${userId}`)
      }

      const user = await db
        .update(usersTable)
        .set({
          deletedAt: new Date()
        })
        .where(eq(usersTable.id, userId))
        .returning()

      return user[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar el usuario con id ${userId}. Mira los logs para más información.`)
    }
  }
}