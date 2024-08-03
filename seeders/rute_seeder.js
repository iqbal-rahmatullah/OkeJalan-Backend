import prisma from "../data/db.config.js"

const ruteSeeder = async () => {
  const angkot = await prisma.angkot.findMany()

  const rute_angkot1 = [
    {
      name: "Terminal Hamid Rusdi 1",
      lat: -7.98474,
      lng: 112.62903,
    },
    {
      name: "Terminal Bayangan Gadang Bumiayu",
      lat: -7.98606,
      lng: 112.62559,
    },
    {
      name: "Jalan Kolonel Sugiono 489",
      lat: -7.99035,
      lng: 112.62244,
    },
    {
      name: "Jalan Kolonel Sugiono 195",
      lat: -7.98815,
      lng: 112.62341,
    },
    {
      name: "Jalan Tanimbar 17",
      lat: -7.98463,
      lng: 112.62745,
    },
    {
      name: "Jalan Syarif Al-Qodri 3",
      lat: -7.98034,
      lng: 112.62838,
    },
    {
      name: "Jalan Kyai Haji Hasyim Ashari 6a",
      lat: -7.97773,
      lng: 112.6264,
    },
    {
      name: "Jalan Jaksa Agung Suprapto 55",
      lat: -7.97333,
      lng: 112.62541,
    },
    {
      name: "Jalan Letjen Sutoyo 91",
      lat: -7.96977,
      lng: 112.62487,
    },
    {
      name: "Jalan Raya Malang - Surabaya 143-145",
      lat: -7.96373,
      lng: 112.62544,
    },
    {
      name: "Jalan Raden Intan 103",
      lat: -7.96147,
      lng: 112.62595,
    },
    {
      name: "Terminal Arjosari",
      lat: -7.95756,
      lng: 112.63275,
    },
  ]

  let startJam = 5
  let startMenit = 0

  for (let i = rute_angkot1.length - 1; i >= 0; i--) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[0].id,
        alamat: rute_angkot1[i].name,
        lat: rute_angkot1[i].lat.toString(),
        long: rute_angkot1[i].lng.toString(),
        jam_tiba: `${startJam.toString().padStart(2, "0")}:${startMenit
          .toString()
          .padStart(2, "0")}`,
        tipe: "berangkat",
      },
    })

    startMenit += 20
    if (startMenit >= 60) {
      startJam++
      startMenit -= 60
    }
  }

  // const rute_angkot2 = [
  //   {
  //     name: "Terminal Arjosari",
  //     lat: -7.929769,
  //     lng: 112.644287,
  //   },
  //   {
  //     name: "Jl. R. Panji Suroso",
  //     lat: -7.946658,
  //     lng: 112.642051,
  //   },
  //   {
  //     name: "Jl. Laksda Adi Sucipto",
  //     lat: -7.954534,
  //     lng: 112.643089,
  //   },
  //   {
  //     name: "Jl. Tenaga",
  //     lat: -7.96224,
  //     lng: 112.637902,
  //   },
  //   {
  //     name: "Jl. Karya Timur",
  //     lat: -7.96195,
  //     lng: 112.634232,
  //   },
  //   {
  //     name: "Jl. Mahakam",
  //     lat: -7.969808,
  //     lng: 112.631428,
  //   },
  //   {
  //     name: "Jl. W. R. Supratman",
  //     lat: -7.977082,
  //     lng: 112.62728,
  //   },
  //   {
  //     name: "Jl. Panglima Sudirman",
  //     lat: -7.98285,
  //     lng: 112.626366,
  //   },
  //   {
  //     name: "Jl. Patimura",
  //     lat: -7.984812,
  //     lng: 112.629799,
  //   },
  //   {
  //     name: "Jl. Trunojoyo",
  //     lat: -7.987398,
  //     lng: 112.628868,
  //   },
  //   {
  //     name: "Jl. Kertanegara",
  //     lat: -7.98867,
  //     lng: 112.63218,
  //   },
  //   {
  //     name: "Jl. Tugu",
  //     lat: -7.98101,
  //     lng: 112.633179,
  //   },
  //   {
  //     name: "Jl. Kahuripan",
  //     lat: -7.98001,
  //     lng: 112.62912,
  //   },
  //   {
  //     name: "Jl. Semeru",
  //     lat: -7.97732,
  //     lng: 112.62603,
  //   },
  //   {
  //     name: "Jl. Ijen",
  //     lat: -7.97631,
  //     lng: 112.62072,
  //   },
  //   {
  //     name: "Jl. Retawu",
  //     lat: -7.970769,
  //     lng: 112.619385,
  //   },
  //   {
  //     name: "Jl. Bondowoso",
  //     lat: -7.96794,
  //     lng: 112.621513,
  //   },
  //   {
  //     name: "Jl. Jombang",
  //     lat: -7.965473,
  //     lng: 112.621376,
  //   },
  //   {
  //     name: "Jl. Surabaya",
  //     lat: -7.963791,
  //     lng: 112.618729,
  //   },
  //   {
  //     name: "Jl. Jakarta",
  //     lat: -7.962244,
  //     lng: 112.618004,
  //   },
  //   {
  //     name: "Jl. Bogor",
  //     lat: -7.96187,
  //     lng: 112.617023,
  //   },
  //   {
  //     name: "Jl. Veteran",
  //     lat: -7.959318,
  //     lng: 112.615601,
  //   },
  //   {
  //     name: "Jl. Sumbersari",
  //     lat: -7.9566,
  //     lng: 112.613388,
  //   },
  //   {
  //     name: "Terminal Landung Sari",
  //     lat: -7.94903,
  //     lng: 112.606812,
  //   },
  // ]

  // startJam = 5
  // for (let i = 0; i < rute_angkot2.length; i++) {
  //   await prisma.rute.create({
  //     data: {
  //       id_angkot: angkot[1].id,
  //       alamat: rute_angkot2[i].name,
  //       lat: rute_angkot2[i].lat.toString(),
  //       long: rute_angkot2[i].lng.toString(),
  //       jam_tiba: `${startJam++}:00`,
  //       tipe: "berangkat",
  //     },
  //   })
  // }

  const ruteBalik = [
    {
      name: "Terminal Hamid Rusdi",
      lat: -7.9847,
      lng: 112.629,
    },
    {
      name: "Jl. Kolonel Sugiono 489",
      lat: -7.9904,
      lng: 112.6224,
    },
    {
      name: "Gadang",
      lat: -7.9861,
      lng: 112.6256,
    },
    {
      name: "Jl. Tanimbar 17",
      lat: -7.9846,
      lng: 112.6275,
    },
    {
      name: "Jl. Syarif Al-Qodri 3",
      lat: -7.9803,
      lng: 112.6284,
    },
    {
      name: "Jl. K.H. Hasyim Ashari 6",
      lat: -7.9777,
      lng: 112.6264,
    },
    {
      name: "Jl. Jaksa Agung Suprapto 55",
      lat: -7.9733,
      lng: 112.6254,
    },
    {
      name: "Jl. Letjen Sutoyo 91",
      lat: -7.959943021418966,
      lng: 112.63694279917416,
    },
    {
      name: "Jl. Raya Surabaya - Malang 143",
      lat: -7.9637,
      lng: 112.6254,
    },
    {
      name: "Terminal Arjosari",
      lat: -7.9615,
      lng: 112.626,
    },
  ]

  startJam = 12
  startMenit = 0

  for (let i = 0; i < ruteBalik.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[0].id,
        alamat: ruteBalik[i].name,
        lat: ruteBalik[i].lat.toString(),
        long: ruteBalik[i].lng.toString(),
        jam_tiba: `${startJam.toString().padStart(2, "0")}:${startMenit
          .toString()
          .padStart(2, "0")}`,
        tipe: "balik",
      },
    })

    startMenit += 20
    if (startMenit >= 60) {
      startJam++
      startMenit -= 60
    }
  }
}

export default ruteSeeder
