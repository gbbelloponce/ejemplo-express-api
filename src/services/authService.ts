import { compare } from "bcrypt";

import { db } from "../db/db";

export class AuthService {
  async verifyUserCredentials(email: string, unencryptedPassword: string) {
    try {
      const user = await db.user.findFirst({
        where: {
          email,
          deletedAt: null
        }
      })

      if (!user) {
        throw new Error(`No se encontró el usuario con email ${email}`)
      }

      const validPassword = await compare(unencryptedPassword, user.password)

      if (!validPassword) {
        throw new Error(`La contraseña no es correcta.`)
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al verificar credenciales del usuario. Mira los logs para más información.`)
    }
  }
}