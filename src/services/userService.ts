import { DB } from "../db/db";

import { CreateUser } from "../types/user";

import { User } from "../types/user";

export class UserService {

  private db: DB;

  constructor() {
    this.db = DB.getInstance();
  }

  getAllUsers() {
    return this.db.getAllUsers()
  }

  getUserById(userId: string) {
    return this.db.getUserById(userId)
  }

  createUser(userToCreate: CreateUser) {
    const userCreated = this.db.createUser(userToCreate);

    return userCreated;
  }

  updateUser(userToModify: User) {
    this.db.updateUser(userToModify)

    return userToModify;
  }

  deleteUser(userId: string) {
    this.db.deleteUser(userId)
  }
}