import prisma from "../data/db.config.js"
import { faker } from "@faker-js/faker"
import bcrypt from "bcryptjs"

const userSeeder = async () => {
  for (let i = 0; i < 10; i++) {
    await prisma.users.create({
      data: {
        name: faker.person.fullName(),
        email: "user" + i + "@gmail.com",
        password: await bcrypt.hash("password", 10),
        role: i % 2 === 0 ? "user" : "driver",
        no_hp: faker.phone.number(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    })
  }
}

export default userSeeder
