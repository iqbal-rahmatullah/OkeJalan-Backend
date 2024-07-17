import prisma from "../data/db.config.js"

const ruteSeeder = async () => {
  const angkot = await prisma.angkot.findMany()
  const rute_angkot1 = [
    {
      name: "Terminal Arjosari",
      lat: -7.929769,
      lng: 112.644287,
    },
    {
      name: "Jl. Simpang R. Panji Suroso",
      lat: -7.945667,
      lng: 112.642594,
    },
    {
      name: "Jl. Raden Intan",
      lat: -7.958282,
      lng: 112.637016,
    },
    {
      name: "Jl. Jend A. Yani",
      lat: -7.960419,
      lng: 112.627193,
    },
    {
      name: "Jl. Letjen S. Parman",
      lat: -7.964072,
      lng: 112.619049,
    },
    {
      name: "Jl. Letjen Sutoyo",
      lat: -7.966491,
      lng: 112.611053,
    },
    {
      name: "Jl. Jakgung Suprapto",
      lat: -7.977719,
      lng: 112.61589,
    },
    {
      name: "Jl. Basuki Rahmat",
      lat: -7.97729,
      lng: 112.63063,
    },
    {
      name: "Merdeka Utara",
      lat: -7.97793,
      lng: 112.632477,
    },
    {
      name: "Jl. Merdeka Timur",
      lat: -7.980191,
      lng: 112.632446,
    },
    {
      name: "Jl. Sukarjowiryo Panoto",
      lat: -7.983527,
      lng: 112.634377,
    },
    {
      name: "Jl. Pasar Besar",
      lat: -7.984759,
      lng: 112.637276,
    },
    {
      name: "Jl. Sersan Harun",
      lat: -7.987389,
      lng: 112.639961,
    },
    {
      name: "Jl. Prof. Moh. Yamin",
      lat: -7.989215,
      lng: 112.642029,
    },
    {
      name: "Jl. Sartono SH",
      lat: -7.991879,
      lng: 112.645287,
    },
    {
      name: "Jl. Kol. Sugiono",
      lat: -7.996063,
      lng: 112.649345,
    },
    {
      name: "Terminal Gadang",
      lat: -8.003539,
      lng: 112.65583,
    },
  ]

  const rute_angkot2 = [
    {
      name: "Terminal Arjosari",
      lat: -7.929769,
      lng: 112.644287,
    },
    {
      name: "Jl. R. Panji Suroso",
      lat: -7.946658,
      lng: 112.642051,
    },
    {
      name: "Jl. Laksda Adi Sucipto",
      lat: -7.954534,
      lng: 112.643089,
    },
    {
      name: "Jl. Tenaga",
      lat: -7.96224,
      lng: 112.637902,
    },
    {
      name: "Jl. Karya Timur",
      lat: -7.96195,
      lng: 112.634232,
    },
    {
      name: "Jl. Mahakam",
      lat: -7.969808,
      lng: 112.631428,
    },
    {
      name: "Jl. W. R. Supratman",
      lat: -7.977082,
      lng: 112.62728,
    },
    {
      name: "Jl. Panglima Sudirman",
      lat: -7.98285,
      lng: 112.626366,
    },
    {
      name: "Jl. Patimura",
      lat: -7.984812,
      lng: 112.629799,
    },
    {
      name: "Jl. Trunojoyo",
      lat: -7.987398,
      lng: 112.628868,
    },
    {
      name: "Jl. Kertanegara",
      lat: -7.98867,
      lng: 112.63218,
    },
    {
      name: "Jl. Tugu",
      lat: -7.98101,
      lng: 112.633179,
    },
    {
      name: "Jl. Kahuripan",
      lat: -7.98001,
      lng: 112.62912,
    },
    {
      name: "Jl. Semeru",
      lat: -7.97732,
      lng: 112.62603,
    },
    {
      name: "Jl. Ijen",
      lat: -7.97631,
      lng: 112.62072,
    },
    {
      name: "Jl. Retawu",
      lat: -7.970769,
      lng: 112.619385,
    },
    {
      name: "Jl. Bondowoso",
      lat: -7.96794,
      lng: 112.621513,
    },
    {
      name: "Jl. Jombang",
      lat: -7.965473,
      lng: 112.621376,
    },
    {
      name: "Jl. Surabaya",
      lat: -7.963791,
      lng: 112.618729,
    },
    {
      name: "Jl. Jakarta",
      lat: -7.962244,
      lng: 112.618004,
    },
    {
      name: "Jl. Bogor",
      lat: -7.96187,
      lng: 112.617023,
    },
    {
      name: "Jl. Veteran",
      lat: -7.959318,
      lng: 112.615601,
    },
    {
      name: "Jl. Sumbersari",
      lat: -7.9566,
      lng: 112.613388,
    },
    {
      name: "Terminal Landung Sari",
      lat: -7.94903,
      lng: 112.606812,
    },
  ]

  let startJam = 5
  for (let i = 0; i < rute_angkot1.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[0].id,
        alamat: rute_angkot1[i].name,
        lat: rute_angkot1[i].lat.toString(),
        long: rute_angkot1[i].lng.toString(),
        jam_tiba: `${startJam++}:00`,
        tipe: "berangkat",
      },
    })
  }

  startJam = 5
  for (let i = 0; i < rute_angkot2.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[1].id,
        alamat: rute_angkot2[i].name,
        lat: rute_angkot2[i].lat.toString(),
        long: rute_angkot2[i].lng.toString(),
        jam_tiba: `${startJam++}:00`,
        tipe: "berangkat",
      },
    })
  }
}

export default ruteSeeder
