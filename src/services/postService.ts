import { eq, isNull } from "drizzle-orm";

import { db } from "../db/db";
import { PostCreate, Post, postsTable } from "../db/tables/posts";

export class PostService {
  async getAllPosts() {
    try {
      const posts = await db.query.postsTable.findMany({
        with: {
          author: true
        }
      });

      return posts;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener posteos. Mira los logs para más información.")
    }
  }

  async getPostById(postId: string) {
    try {
      const post = await db.query.postsTable.findFirst({
        where: (posts, { eq }) => eq(posts.id, postId),
        with: {
          author: true
        }
      })

      return post;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al obtener posteo con id ${postId}. Mira los logs para más información.`)
    }
  }

  async createPost(postToCreate: PostCreate) {
    try {
      const user = await db
        .insert(postsTable)
        .values(postToCreate)
        .returning();

      return user;
    } catch (error) {
      console.error("Error creando posteo: ", postToCreate)
      console.error(error);
      throw new Error("Error al crear posteo. Mira los logs para más información.")
    }
  }

  async updatePost(postToModify: Post) {
    try {
      const users = await db
        .update(postsTable)
        .set(postToModify)
        .where(eq(postsTable.id, postToModify.id))
        .returning()

      return users[0]
    } catch (error) {
      console.error("Error actualizando posteo: ", postToModify)
      console.error(error);
      throw new Error(`Error al actualizar el posteo con id ${postToModify.id}. Mira los logs para más información.`)
    }
  }

  async deletePost(postId: string) {
    try {
      const user = await db
        .update(postsTable)
        .set({
          deletedAt: new Date()
        })
        .where(eq(postsTable.id, postId))
        .returning()

      return user[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar el posteo con id ${postId}. Mira los logs para más información.`)
    }
  }
}