import { v4 as uuidv4 } from "uuid";

import type { User } from '@/types';
import { HttpError } from "@/utils/errors";

const users: User[] = [];

/* a service to make it easiser for handling of users (all functions in one place) */

export const userService = {

  create(payload: Omit<User, "id">): User {
    if (users.some((u) => u.email === payload.email)) {
      throw new HttpError(409, "Email already exists", "EMAIL_EXISTS")
    }

    const user = { id: uuidv4(), ...payload };
    users.push(user);
    return user;
  },

  deleteById(id: string): void {
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      throw new HttpError(404, "User not found", "USER_NOT_FOUND");
    }

    users.splice(index, 1);
  },

  list(): User[] {
    return users;
  },

  _resetForTests(): void {
    users.length = 0
  }
}