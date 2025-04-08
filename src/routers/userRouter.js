import { Router } from "express"

import { UserService } from "../services/userService.js"

const userService = new UserService();

export const userRouter = Router()

userRouter.get('/', (_, res) => {
  const users = userService.getAllUsers();
  return res.status(200).json({ ok: true, data: users })
})

userRouter.get('/:id', (_, res) => {
  const userIdToGet = req.params.id;
  const user = userService.getUserById(userIdToGet);
  return res.status(200).json({ ok: true, data: user })
})

userRouter.post('/', (req, res) => {
  const userFromRequest = req.body;
  const userCreated = userService.createUser(userFromRequest);
  return res.status(201).json({ ok: true, data: userCreated });
})

userRouter.put('/:id', (req, res) => {
  const userIdToModify = req.params.id;
  const userBody = req.body;

  const userModified = userService.updateUser({ id: userIdToModify, ...userBody });

  return res.status(200).json({ ok: true, data: userModified });
})

userRouter.patch('/:id', (req, res) => {
  const userIdToModify = req.params.id;
  const userBody = req.body;

  const fullUser = userService.getUserById(userIdToModify);

  // Primero desestructuro todo el fullUser, luego desestructuro los atributos que me
  // hayan pasado en el body para sobrescribir los primeros
  const fullUserBody = { ...fullUser, ...userBody }

  const userModified = userService.updateUser(fullUserBody);

  return res.status(200).json({ ok: true, data: userModified });
})

userRouter.delete('/:id', (req, res) => {
  const userIdToDelete = req.params.id;

  userService.deleteUser(userIdToDelete)

  return res.status(200).json({ ok: true })
})