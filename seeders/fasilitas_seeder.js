import prisma from "../data/db.config.js"

const fasilitasSeeder = async () => {
  const angkot = await prisma.angkot.findMany()
  const fasiliatas = [
    {
      name: "AC",
      icon: "ac.png",
    },
    {
      name: "Mini TV",
      icon: "mini_tv.png",
    },
    {
      name: "CCTV",
      icon: "cctv.png",
    },
  ]

  for (let i = 0; i < angkot.length; i++) {
    for (let j = 0; j < fasiliatas.length; j++) {
      await prisma.fasilitas.create({
        data: {
          id_angkot: angkot[i].id,
          name: fasiliatas[j].name,
          icon: fasiliatas[j].icon,
        },
      })
    }
  }
}

export default fasilitasSeeder
