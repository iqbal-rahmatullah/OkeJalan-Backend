import prisma from "../data/db.config.js"

const ratingSeeder = async () => {
  await prisma.rating.create({
    data: {
      komentar: "Mantap",
      rating_fasilitas: 5,
      rating_pelayanan: 4,
      angkot_id: 1,
      user_id: 1,
    },
  })

  await prisma.rating.create({
    data: {
      komentar: "Ac nya dingin",
      rating_fasilitas: 4,
      rating_pelayanan: 3,
      angkot_id: 2,
      user_id: 3,
    },
  })
}

export default ratingSeeder
