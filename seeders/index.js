import userSeeder from "./user_seeder.js"
import angkotSeeder from "./angkot_seeder.js"
import fasilitasSeeder from "./fasilitas_seeder.js"
import ruteSeeder from "./rute_seeder.js"
import ratingSeeder from "./rating_seeder.js"

const main = async () => {
  try {
    await userSeeder()
    console.log("User seeder completed")
  } catch (error) {
    console.log("Error in user seeder:", error)
  }

  try {
    await angkotSeeder()
    console.log("Angkot seeder completed")
  } catch (error) {
    console.log("Error in angkot seeder:", error)
  }

  try {
    await fasilitasSeeder()
    console.log("Fasilitas seeder completed")
  } catch (error) {
    console.log("Error in fasilitas seeder:", error)
  }

  try {
    await ruteSeeder()
    console.log("Rute seeder completed")
  } catch (error) {
    console.log("Error in rute seeder:", error)
  }

  try {
    await ratingSeeder()
    console.log("Rating seeder completed")
  } catch (error) {
    console.log("Error in rating seeder:", error)
  }
}

main().catch((error) => {
  console.log("Error in main:", error)
})
