import prisma from "../data/db.config.js"

const angkotSeeder = async () => {
  const angkotName = [
    "AG",
    "GL",
    "GA",
    "LDG",
    "AG/AH",
    "AL",
    "ADL",
    "MT",
    "MK",
    "ABB",
    "AJG",
    "ASD",
  ]
  const sopir = await prisma.users.findMany({
    where: {
      role: "driver",
    },
  })

  for (let i = 0; i < angkotName.length; i++) {
    await prisma.angkot.create({
      data: {
        name: angkotName[i],
        image: `angkot1.png`,
        id_sopir: sopir[i].id,
        kuota: 20,
      },
    })
  }
}

export default angkotSeeder
