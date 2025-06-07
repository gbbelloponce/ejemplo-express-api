import { Router } from "express";

import { UserService } from "../services/userService"
import { AuthService } from "../services/authService";
import { SessionService } from "../services/sessionService";
import { JwtService } from "../services/jwtService";

const userService = new UserService();
const authService = new AuthService();
const sessionService = new SessionService();
const jwtService = new JwtService();

export const authRouter = Router()

authRouter.post('/register', async (req, res) => {
  try {
    const userFromRequest = req.body;

    const userCreated = await userService.createUser(userFromRequest);

    res.status(201).json({ ok: true, data: userCreated });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.verifyUserCredentials(email, password);

    const token = sessionService.generateUserTokenForSession();
    await sessionService.storeUserSession(user, token);

    /* const accessToken = await jwtService.generateJsonWebAccessToken(user);
    const refreshToken = await jwtService.generateJsonWebRefreshToken(user);
    res.status(201).json({ ok: true, data: { accessToken, refreshToken } }); */

    res.status(201).json({ ok: true, data: token });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

// Para JWT
/* authRouter.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await jwtService.generateJsonWebAccessTokenFromRefreshToken(refreshToken);
    res.status(201).json({ ok: true, data: { accessToken: newAccessToken, refreshToken: newRefreshToken } });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
}) */