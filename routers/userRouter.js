import { Router } from "express"

export const userRouter = Router()

userRouter.get('/', (_, res) => {
  const users = userService.getUsers();
  return res.status(200).json({ ok: true, data: users })
})

userRouter.get('/:id', (_, res) => {
  /**
   * - Agarrar id de request body
   * - Pararselo a userService.getUserById() y agarrar lo que devuelva
   * - Devolverlo con ok: true
   */
})

userRouter.post('/', (req, res) => {
  /**
   * - Agarrar user de request body
   * - Pasarselo a userService.createUser() y agarrar lo que devuelva
   * - Devolverlo con ok: true y codigo de estado correspondiente
   */
})

userRouter.put('/:id', (req, res) => {
  /**
   * - Agarrar id de request url
   * - Agarrar user de request body
   * - Pasarle la desestructuracion entre el id de la request 
   *      y el body de la request a userService.updateUser() 
   *        y agarrar lo que devuelva
   * - Devolverlo con ok: true y codigo de estado correspondiente
   */
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
  /**
   * - Agarrar id de request url
   * - Pasarselo a userService.deleteUser()
   * - Devolver ok: true y codigo de estado correspondiente
   */
})