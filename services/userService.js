import { DB } from "../db/db.js";

export class UserService {
  constructor() {
    this.db = DB.getInstance();
  }

  getAllUsers() {
    return this.db.getAllUsers()
  }

  createUser(userBody) {
    const newId = randomUUID()
    const newUser = { id: newId, ...userBody }

    this.db.createUser(newUser);

    return newUser;
  }

  updateUser(userId, userBody) {
    const newUser = { id: userId, ...userBody }

    this.db.updateUser(newUser)

    return newUser;
  }

  deleteUser(userId) {
    this.db.deleteUser(userId)
  }
}