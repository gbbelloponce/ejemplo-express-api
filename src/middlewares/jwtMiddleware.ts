import { User } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const jwtAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Los tokens JWT vienen en el formato "Bearer <token>", asi que extraigo el token
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: "No hay token!" })
    return;
  }

  try {
    // Agarro el payload del token JWT
    const decodedUser = verify(token, process.env.JWT_SECRET) as User;

    // Valido el payload del token JWT
    if (!decodedUser.id || !decodedUser.email) {
      throw new Error("Token invalido!")
    }

    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(403).json({ error: (error as Error).message })
  }
  
}