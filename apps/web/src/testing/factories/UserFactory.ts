import { User } from "../../types/models";
import { BaseFactory } from "./BaseFactory";
import { randEmail, randUuid } from "@ngneat/falso";

export const UserFactory: BaseFactory<User> = {
  build: (attrs = {}) => {
    return {
      id: randUuid(),
      email: randEmail(),
      ...attrs,
    } as User;
  },
  buildMany: (count: number, attrs) => {
    return Array.from({ length: count }).map(() => UserFactory.build(attrs));
  },
};
