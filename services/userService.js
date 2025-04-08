import { DB } from "../db/db.js";

export class UserService {
  constructor() {
    this.db = DB.getInstance();
  }

  getAllUsers() {
    return this.db.getAllUsers()
  }

  getUserById(userId) {
    return this.db.getUserById(userId)
  }

  createUser(userToCreate) {
    this.db.createUser(userToCreate);

    return newUser;
  }

  updateUser(userToModify) {
    this.db.updateUser(userToModify)

    return userToModify;
  }

  deleteUser(userId) {
    this.db.deleteUser(userId)
  }
}