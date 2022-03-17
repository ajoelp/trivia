import { User } from "../../types/models";
import { BaseFactory } from "./BaseFactory";
import { randEmail } from "@ngneat/falso";

export const UserFactory: BaseFactory<User> = {
  build: (attrs = {}) => {
    return {
      email: randEmail(),
      ...attrs,
    } as User;
  },
  buildMany: (count: number, attrs) => {
    return Array.from({ length: count }).map(() => UserFactory.build(attrs));
  },
};
