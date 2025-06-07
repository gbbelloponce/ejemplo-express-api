import { User } from "@prisma/client";
import { randomUUID } from "node:crypto";

import { db } from "../db/db";

export class SessionService {
  async storeUserSession(user: User, token: string) {
    try {
      await db.session.create({
        data: {
          token,
          userId: user.id
        }
      })
    } catch (error) {
      console.error(error);
      throw new Error(`Error al almacenar sesión del usuario. Mira los logs para más información.`)
    }
  }

  generateUserTokenForSession() {
    return randomUUID();
  }
}