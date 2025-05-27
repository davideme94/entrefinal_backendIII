import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

export const generateUsers = () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 70 }),
    password: bcrypt.hashSync("coder123", 10),
    role: Math.random() > 0.5 ? "admin" : "user",
    pets: []
  };
};
