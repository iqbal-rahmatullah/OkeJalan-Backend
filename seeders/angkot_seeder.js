import prisma from "../data/db.config.js"

const angkotSeeder = async () => {
  const angkotName = ["AG", "AL"]
  const sopir = await prisma.users.findMany({
    where: {
      role: "driver",
    },
  })

  for (let i = 0; i < 2; i++) {
    await prisma.angkot.create({
      data: {
        name: angkotName[i],
        image: `angkot${i + 1}.png`,
        id_sopir: sopir[i].id,
        kuota: 20,
      },
    })
  }
}

export default angkotSeeder
