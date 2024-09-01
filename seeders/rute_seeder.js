import prisma from "../data/db.config.js"

const ruteSeeder = async () => {
  const angkot = await prisma.angkot.findMany()
  let startJam
  let startMenit

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

  startJam = 5
  startMenit = 0

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

  //Rute angkot2
  const rute_angkot2 = [
    {
      name: "Terminal Bayangan Gadang",
      lat: -8.019289497264914,
      lng: 112.62822856629136,
    },
    {
      name: "Jl. S. Supriyadi",
      lat: -8.005665468921283,
      lng: 112.61858788836025,
    },
    {
      name: "Jl. Susanto",
      lat: -7.995935009465999,
      lng: 112.62835887301615,
    },
    {
      name: "Jl. Kalimantan",
      lat: -7.992159805990939,
      lng: 112.62414114047579,
    },
    {
      name: "Jl. Arif Margono",
      lat: -7.985742200823017,
      lng: 112.62407596931179,
    },
    {
      name: "Jl. Retawu",
      lat: -7.9706312999999955,
      lng: 112.61968901349192,
    },
    {
      name: "Jl. Veteran Malang",
      lat: -7.957085814809678,
      lng: 112.61793877857268,
    },
    {
      name: "Jl. Gajayana",
      lat: -7.946885683991287,
      lng: 112.60887365767205,
    },
    {
      name: "Jl. Raya Tlogomas",
      lat: -7.926306557664694,
      lng: 112.60186865952421,
    },
    {
      name: "Terminal Landungsari",
      lat: -7.924904340798895,
      lng: 112.59788071138514,
    },
  ]

  startJam = 6
  startMenit = 0

  for (let i = 0; i < rute_angkot2.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[1].id,
        alamat: rute_angkot2[i].name,
        lat: rute_angkot2[i].lat.toString(),
        long: rute_angkot2[i].lng.toString(),
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

  const ruteBalik2 = [
    {
      name: "Terminal Landungsari",
      lat: -7.9249255935412855,
      lng: 112.59788071138514,
    },
    {
      name: "Jl. Raya Tlogomas",
      lat: -7.926210920636161,
      lng: 112.60182574418012,
    },
    {
      name: "Jl. Bandung",
      lat: -7.961220218554744,
      lng: 112.6235886460323,
    },
    {
      name: "Jl. Besar Ijen",
      lat: -7.968920472923639,
      lng: 112.62335234418012,
    },
    {
      name: "Jl. Kawi",
      lat: -7.977956400229636,
      lng: 112.62402461349191,
    },
    {
      name: "Jl. Merdeka Utara",
      lat: -7.981772149796641,
      lng: 112.63084842698385,
    },
    {
      name: "Jl. Kyai H. Hasyim Ashari",
      lat: -7.982240278425733,
      lng: 112.6268555846559,
    },
    {
      name: "Jl. Nusakambangan",
      lat: -7.987875730003462,
      lng: 112.62666894418012,
    },
    {
      name: "Jl. Niaga",
      lat: -7.997854961519045,
      lng: 112.62728831163975,
    },
    {
      name: "Jl. Satsui Tubun",
      lat: -8.02145802735347,
      lng: 112.6233635460323,
    },
    {
      name: "Terminal Hamid Rusdi",
      lat: -8.025848772565858,
      lng: 112.64300218650806,
    },
  ]

  startJam = 13
  startMenit = 0

  for (let i = 0; i < ruteBalik2.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[1].id,
        alamat: ruteBalik2[i].name,
        lat: ruteBalik2[i].lat.toString(),
        long: ruteBalik2[i].lng.toString(),
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

  //Rute angkot3
  const rute_angkot3 = [
    {
      name: "Terminal Bayangan Gadang",
      lat: -8.022136697926552,
      lng: 112.62831440639023,
    },
    {
      name: "Jl. Satsui Tubun",
      lat: -8.02152177053009,
      lng: 112.6231167828037,
    },
    {
      name: "Jl. Arif Margono",
      lat: -7.985412832051514,
      lng: 112.62414034232795,
    },
    {
      name: "Jl. Ade Irma Suryani",
      lat: -7.984422053825867,
      lng: 112.62849171349191,
    },
    {
      name: "Jl. Kyai H. Wahid Hasyim",
      lat: -7.983713203103798,
      lng: 112.62896574232795,
    },
    {
      name: "Jl. Kauman Dalam",
      lat: -7.9831714773916715,
      lng: 112.6272939460323,
    },
    {
      name: "Jl. Kyai H. Hasyim Ashari",
      lat: -7.9822190286534225,
      lng: 112.62693068650806,
    },
    {
      name: "Jl. Merdeka Utara",
      lat: -7.98150652725906,
      lng: 112.63100935952421,
    },
    {
      name: "Jl. Majapahit",
      lat: -7.97834592522428,
      lng: 112.63277465581989,
    },
    {
      name: "Jl. Pajajaran",
      lat: -7.9752180738771195,
      lng: 112.63562671534407,
    },
    {
      name: "Jl. Cokroaminoto",
      lat: -7.970845246063329,
      lng: 112.6364219846559,
    },
    {
      name: "Jl. Wage Rudolf Supratman",
      lat: -7.965389121457062,
      lng: 112.6367612,
    },
    {
      name: "Jl. Letjend S. Parman",
      lat: -7.949987139906673,
      lng: 112.63957202883604,
    },
    {
      name: "Jl. Raden Intan",
      lat: -7.931176975865595,
      lng: 112.65379500370433,
    },
    {
      name: "Terminal Arjosari Malang",
      lat: -7.933207524612596,
      lng: 112.65904956720502,
    },
  ]

  startJam = 8
  startMenit = 0

  for (let i = 0; i < rute_angkot3.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[2].id,
        alamat: rute_angkot3[i].name,
        lat: rute_angkot3[i].lat.toString(),
        long: rute_angkot3[i].lng.toString(),
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

  const ruteBalik3 = [
    {
      name: "Terminal Arjosari Malang",
      lat: -7.933207524612596,
      lng: 112.6589959230249,
    },
    {
      name: "Jl. Simpang Panji Suroso",
      lat: -7.934098777375754,
      lng: 112.65466864603229,
    },
    {
      name: "Jl. Letjend S. Parman",
      lat: -7.949817128305398,
      lng: 112.63956130000001,
    },
    {
      name: "Jl. Letjen Sutoyo",
      lat: -7.96013323994801,
      lng: 112.63686701349191,
    },
    {
      name: "Jl. Panglima Sudirman Utara",
      lat: -7.968461093279673,
      lng: 112.63740862883603,
    },
    {
      name: "Jl. Trunojoyo",
      lat: -7.977208824833324,
      lng: 112.63682365767205,
    },
    {
      name: "Jl. Tugu",
      lat: -7.976723524399558,
      lng: 112.63349362883605,
    },
    {
      name: "Jl. Majapahit",
      lat: -7.978250300329043,
      lng: 112.63277465581989,
    },
    {
      name: "Jl. Sutan Syahrir",
      lat: -7.985930230773312,
      lng: 112.63075052883605,
    },
    {
      name: "Jl. Tanimbar",
      lat: -7.990002932342832,
      lng: 112.6272017846559,
    },
    {
      name: "Jl. Satsui Tubun",
      lat: -8.021479275080123,
      lng: 112.62325625767204,
    },
    {
      name: "Terminal Bayangan Gadang",
      lat: -8.022742256690035,
      lng: 112.62746679814784,
    },
  ]

  startJam = 14
  startMenit = 0

  for (let i = 0; i < ruteBalik3.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[2].id,
        alamat: ruteBalik3[i].name,
        lat: ruteBalik3[i].lat.toString(),
        long: ruteBalik3[i].lng.toString(),
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

  //Rute angkot4
  const rute_angkot4 = [
    {
      name: "Terminal Landungsari Malang",
      lat: -7.92395012491449,
      lng: 112.59897289789322,
    },
    {
      name: "Jl. MT. Haryono",
      lat: -7.942984611468592,
      lng: 112.61040600185217,
    },
    {
      name: "Jl. Mayjen Panjaitan Gg. 17",
      lat: -7.953114989765564,
      lng: 112.61852994418012,
    },
    {
      name: "Jl. Brigjend Slamet Riadi",
      lat: -7.967700994783095,
      lng: 112.6289267,
    },
    {
      name: "Jl. Jenderal Basuki Rahmat",
      lat: -7.978060525045014,
      lng: 112.62948190185219,
    },
    {
      name: "Jl. Merdeka Barat 1",
      lat: -7.981619177535638,
      lng: 112.63033814418013,
    },
    {
      name: "Gg. Mebelan",
      lat: -7.982656276135648,
      lng: 112.62849318836025,
    },
    {
      name: "Jl. Ade Irma Suryani",
      lat: -7.984507052450116,
      lng: 112.62854535767204,
    },
    {
      name: "Jl. Pasar Besar",
      lat: -7.985761505016532,
      lng: 112.63356858836023,
    },
    {
      name: "Jl. Sersan Harun",
      lat: -7.986549171849802,
      lng: 112.6327676536656,
    },
    {
      name: "Jl. Prof. Moch Yamin",
      lat: -7.989546082690985,
      lng: 112.63188508650808,
    },
    {
      name: "Jl. Sartono S.H",
      lat: -7.99298545713174,
      lng: 112.63233128650806,
    },
    {
      name: "Jl. Kolonel Sugiono",
      lat: -8.011810738298143,
      lng: 112.62915165767204,
    },
  ]

  startJam = 9
  startMenit = 0

  for (let i = 0; i < rute_angkot4.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[3].id,
        alamat: rute_angkot4[i].name,
        lat: rute_angkot4[i].lat.toString(),
        long: rute_angkot4[i].lng.toString(),
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

  const ruteBalik4 = [
    {
      name: "Terminal Bayangan Gadang",
      lat: -8.02288036645712,
      lng: 112.62756335767207,
    },
    {
      name: "Jl. Kolonel Sugiono",
      lat: -8.011800114182464,
      lng: 112.62915165767204,
    },
    {
      name: "Jl. Sartono S.H",
      lat: -7.993049204764448,
      lng: 112.63229909999998,
    },
    {
      name: "Jl. Irian Jaya",
      lat: -7.991374179596355,
      lng: 112.62996431534408,
    },
    {
      name: "Jl. Tanimbar",
      lat: -7.99000293234283,
      lng: 112.62729834418012,
    },
    {
      name: "Jl. Sulawesi",
      lat: -7.987291080216464,
      lng: 112.6261061018522,
    },
    {
      name: "Jl. Syarif Al-Qodri",
      lat: -7.98565630245552,
      lng: 112.62875767301612,
    },
    {
      name: "Jl. Ade Irma Suryani",
      lat: -7.984400804167037,
      lng: 112.62853462883602,
    },
    {
      name: "Jl. Kyai H. Hasyim Ashari",
      lat: -7.982474025848175,
      lng: 112.62691995767204,
    },
    {
      name: "Jl. Kawi",
      lat: -7.978105150163961,
      lng: 112.62407825767204,
    },
    {
      name: "Jl. Bromo",
      lat: -7.975880573985983,
      lng: 112.6269503306882,
    },
    {
      name: "Jl. Buring",
      lat: -7.971021023764881,
      lng: 112.62609927301615,
    },
    {
      name: "Jl. Besar Ijen",
      lat: -7.968782344885005,
      lng: 112.6233845306882,
    },
    {
      name: "Jl. Bandung",
      lat: -7.961145840525732,
      lng: 112.62343844232795,
    },
    {
      name: "Jl. Veteran Malang",
      lat: -7.957075189270585,
      lng: 112.61760618465591,
    },
    {
      name: "Jl. Mayjend Panjaitan",
      lat: -7.955318190679023,
      lng: 112.62123454232797,
    },
    {
      name: "Jl. Mayjen Hariyono",
      lat: -7.942984611468592,
      lng: 112.61038454418012,
    },
    {
      name: "Terminal Landungsari",
      lat: -7.924953788104679,
      lng: 112.59803374047577,
    },
  ]

  startJam = 15
  startMenit = 0

  for (let i = 0; i < ruteBalik4.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[3].id,
        alamat: ruteBalik4[i].name,
        lat: ruteBalik4[i].lat.toString(),
        long: ruteBalik4[i].lng.toString(),
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

  //Rute angkot5
  const rute_angkot5 = [
    {
      name: "Terminal Arjosari ",
      lat: -7.933339248449385,
      lng: 112.65905776306563,
    },
    {
      name: "Jalan Simpang Panji Suroso",
      lat: -7.935868265224826,
      lng: 112.65741154454393,
    },
    {
      name: "Jl. Raden Intan",
      lat: -7.931372801351383,
      lng: 112.65372695962482,
    },
    {
      name: "Jl. Ahmad Yani",
      lat: -7.93611176910312,
      lng: 112.64502182053606,
    },
    {
      name: "Jl. Letjen Sutoyo",
      lat: -7.956740689816496,
      lng: 112.63804492999333,
    },
    {
      name: "Jl. Jaksa Agung Suprapto",
      lat: -7.969335890343923,
      lng: 112.63233919003383,
    },
    {
      name: "Jl. Jenderal Basuki Rahmat",
      lat: -7.9781736695630325,
      lng: 112.62946546384022,
    },
    {
      name: "Jl. Merdeka Utara",
      lat: -7.981807622415398,
      lng: 112.63087307872007,
    },
    {
      name: "Jl. Merdeka Timur",
      lat: -7.982922626496948,
      lng: 112.63142973401327,
    },
    {
      name: "Jl. S.W Pranoto",
      lat: -7.984382455745662,
      lng: 112.63111453321456,
    },
    {
      name: "Jl. Sersan Harun",
      lat: -7.986783283781444,
      lng: 112.63276625327842,
    },
    {
      name: "Jl. Prof. Moch Yamin",
      lat: -7.9898261253179745,
      lng: 112.63186371795976,
    },
    {
      name: "Jl. Sartono S.H",
      lat: -7.993053737827185,
      lng: 112.63232096808197,
    },
    {
      name: "Jl. Kolonel Sugiono",
      lat: -8.012082808802028,
      lng: 112.62897976278823,
    },
    {
      name: "Terminal Bayangan Gadang",
      lat: -8.023011345364711,
      lng: 112.62753302611232,
    },
  ]

  startJam = 10
  startMenit = 0

  for (let i = 0; i < rute_angkot5.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[4].id,
        alamat: rute_angkot5[i].name,
        lat: rute_angkot5[i].lat.toString(),
        long: rute_angkot5[i].lng.toString(),
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

  const ruteBalik5 = [
    {
      name: "Jl. Kauman",
      lat: -8.02607546345035,
      lng: 112.614716773728,
    },
    {
      name: "Jl. K.H. Hasyim Ashari",
      lat: -7.982643285581959,
      lng: 112.62681890076426,
    },
    {
      name: "Jl. Kolonel Sugiono",
      lat: -8.011922598798108,
      lng: 112.62926629399496,
    },
    {
      name: "Jl. Sartono S.H",
      lat: -7.993183836384704,
      lng: 112.63229041761585,
    },
    {
      name: "Jl. Irian Jaya",
      lat: -7.991506646558346,
      lng: 112.6299134213203,
    },
    {
      name: "Jl. Tanimbar",
      lat: -7.990261958379839,
      lng: 112.62721525976102,
    },
    {
      name: "Jl. Sulawesi",
      lat: -7.9875056751400635,
      lng: 112.62604179591642,
    },
    {
      name: "Jl. Yulius Usman",
      lat: -7.98598372197649,
      lng: 112.62665411390269,
    },
    {
      name: "Jl. Syarif Al-Qodri",
      lat: -7.986233279812354,
      lng: 112.62872356080696,
    },
    {
      name: "Jl. Kauman",
      lat: -8.025905483528163,
      lng: 112.61420178959881,
    },
    {
      name: "Jl. K.H. Hasyim Ashari",
      lat: -7.982562247477258,
      lng: 112.62697860305298,
    },
    {
      name: "Jl. Jenderal Basuki Rahmat",
      lat: -7.978090913228129,
      lng: 112.62934678366628,
    },
    {
      name: "Jl. Letjen Sutoyo",
      lat: -7.960169212476557,
      lng: 112.63690039423123,
    },
    {
      name: "Jl. Ahmad Yani",
      lat: -7.936084888896907,
      lng: 112.64519699370288,
    },
    {
      name: "Terminal Arjosari",
      lat: -7.9334496119605795,
      lng: 112.65910156519134,
    },
  ]

  startJam = 16
  startMenit = 0

  for (let i = 0; i < ruteBalik5.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[4].id,
        alamat: ruteBalik5[i].name,
        lat: ruteBalik5[i].lat.toString(),
        long: ruteBalik5[i].lng.toString(),
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

  //Rute angkot6
  const rute_angkot6 = [
    {
      name: "Terminal Arjosari",
      lat: -7.933472516421807,
      lng: 112.65890926596393,
    },
    {
      name: "Jl. Raden Panji Suroso",
      lat: -7.936957696174902,
      lng: 112.6497650093618,
    },
    {
      name: "Jl. Karya Timur",
      lat: -7.9506403935983245,
      lng: 112.64128015353376,
    },
    {
      name: "Jl. W.R. Supratman",
      lat: -7.9655073307032955,
      lng: 112.63668793130807,
    },
    {
      name: "Jl. Patimura",
      lat: -7.973161444170269,
      lng: 112.63457923109891,
    },
    {
      name: "Jl. Semeru",
      lat: -7.974534542677947,
      lng: 112.62531092124858,
    },
    {
      name: "Jl. Besar Ijen",
      lat: -7.969041537593229,
      lng: 112.6232628781302,
    },
    {
      name: "Indomaret Mayjend Panjaitan",
      lat: -7.954511853251109,
      lng: 112.62058055999094,
    },
    {
      name: "Terminal Landungsari",
      lat: -7.924929101325974,
      lng: 112.59826458105884,
    },
  ]

  startJam = 6
  startMenit = 0

  for (let i = 0; i < rute_angkot6.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[5].id,
        alamat: rute_angkot6[i].name,
        lat: rute_angkot6[i].lat.toString(),
        long: rute_angkot6[i].lng.toString(),
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

  const ruteBalik6 = [
    {
      name: "Terminal Landungsari",
      lat: -7.957504092479263,
      lng: 112.61754213997877,
    },
    {
      name: "Jl. Veteran",
      lat: -7.957457224327012,
      lng: 112.61775602783719,
    },
    {
      name: "Jl. Semeru",
      lat: -7.974488164077588,
      lng: 112.62549280059159,
    },
    {
      name: "Jl. Kertanegara",
      lat: -7.977463368993457,
      lng: 112.63544582547976,
    },
    {
      name: "Jl. Panglima Sudirman",
      lat: -7.973777456302996,
      lng: 112.63842623103157,
    },
    {
      name: "Jl. Karya Timur",
      lat: -7.9505800792508525,
      lng: 112.64118194054177,
    },
    {
      name: "Jl. Raden Panji Suroso",
      lat: -7.937043955008872,
      lng: 112.6497253823263,
    },
    {
      name: "Terminal Arjosari",
      lat: -7.9334310794716245,
      lng: 112.65882343527552,
    },
  ]

  startJam = 11
  startMenit = 0

  for (let i = 0; i < ruteBalik6.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[5].id,
        alamat: ruteBalik6[i].name,
        lat: ruteBalik6[i].lat.toString(),
        long: ruteBalik6[i].lng.toString(),
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

  //Rute angkot 7
  const rute_angkot7 = [
    {
      name: "Terminal Landungsari",
      lat: -7.9252716875499,
      lng: 112.59805951147204,
    },
    {
      name: "Jl. Tugu",
      lat: -7.976923316024667,
      lng: 112.63347882739458,
    },
    {
      name: "Jl. Kertanegara",
      lat: -7.977475967519393,
      lng: 112.63542965306175,
    },
    {
      name: "Jl. Trunojoyo",
      lat: -7.97731444919064,
      lng: 112.63678288950707,
    },
    {
      name: "Jl. Dr. Cipto",
      lat: -7.968190986506367,
      lng: 112.63507356072495,
    },
    {
      name: "Jl. Panglima Sudirman",
      lat: -7.973554979689308,
      lng: 112.63855921252318,
    },
    {
      name: "Jl. W.R. Supratman",
      lat: -7.965529078341139,
      lng: 112.63672980835474,
    },
    {
      name: "Jl. Letjen Sutoyo",
      lat: -7.960341640687106,
      lng: 112.636941141613,
    },
    {
      name: "Jl. Letjend S. Parman",
      lat: -7.950114458995917,
      lng: 112.63962198020013,
    },
    {
      name: "Jl. Ahmad Yani",
      lat: -7.935957375885733,
      lng: 112.64506824767058,
    },
    {
      name: "Terminal Arjosari",
      lat: -7.9335661477675465,
      lng: 112.65886292522273,
    },
  ]

  startJam = 7
  startMenit = 0

  for (let i = 0; i < rute_angkot7.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[6].id,
        alamat: rute_angkot7[i].name,
        lat: rute_angkot7[i].lat.toString(),
        long: rute_angkot7[i].lng.toString(),
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

  const ruteBalik7 = [
    {
      name: "Terminal Landungsari",
      lat: -7.925101665722952,
      lng: 112.59788785009566,
    },
    {
      name: "Jl. Tugu",
      lat: -7.976944566072288,
      lng: 112.63351101390266,
    },
    {
      name: "Jl. Kertanegara",
      lat: -7.977465342509533,
      lng: 112.63547256840585,
    },
    {
      name: "Jl. Trunojoyo",
      lat: -7.977229449070413,
      lng: 112.63680434717912,
    },
    {
      name: "Jl. Dr. Cipto",
      lat: -7.968265363255804,
      lng: 112.63500918770882,
    },
    {
      name: "Jl. Panglima Sudirman",
      lat: -7.973746231653413,
      lng: 112.6385377548511,
    },
    {
      name: "Jl. W.R. Supratman",
      lat: -7.965465326416365,
      lng: 112.63669762184668,
    },
    {
      name: "Jl. Letjen Sutoyo",
      lat: -7.96032038977748,
      lng: 112.63691968394095,
    },
    {
      name: "Jl. Letjend S. Parman",
      lat: -7.950057580365124,
      lng: 112.63952538127427,
    },
    {
      name: "Jl. Ahmad Yani",
      lat: -7.936084888896907,
      lng: 112.64498241698237,
    },
    {
      name: "Terminal Arjosari",
      lat: -7.9334496119605795,
      lng: 112.65888698847084,
    },
  ]

  startJam = 12
  startMenit = 0

  for (let i = 0; i < ruteBalik7.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[6].id,
        alamat: ruteBalik7[i].name,
        lat: ruteBalik7[i].lat.toString(),
        long: ruteBalik7[i].lng.toString(),
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

  //Rute angkot 8
  const rute_angkot8 = [
    {
      name: "Terminal Angkot Mulyorejo",
      lat: -7.99102484539818,
      lng: 112.5974826390308,
    },
    {
      name: "Jl. Sutan Syahrir",
      lat: -7.985584984603771,
      lng: 112.62429371712045,
    },
    {
      name: "Jl. Kyai Tamin",
      lat: -7.988304924060836,
      lng: 112.62705370813168,
    },
    {
      name: "Jl. Laksamana Martadinata",
      lat: -7.986944956596897,
      lng: 112.64181636824375,
    },
    {
      name: "Jl. Gatot Subroto",
      lat: -7.988899292845498,
      lng: 112.63056964820954,
    },
    {
      name: "Jl. Ir. H. Juanda",
      lat: -7.987905038517164,
      lng: 112.63626236232483,
    },
    {
      name: "Jl. Muharto",
      lat: -7.984225008082211,
      lng: 112.64471967723253,
    },
    {
      name: "Jl. Ki Ageng Gribig",
      lat: -7.985610204949506,
      lng: 112.65917564023445,
    },
    {
      name: "Jl. Mayjen Sungkono",
      lat: -8.03065186786731,
      lng: 112.64456416736355,
    },
    {
      name: "Terminal Tlogowaru",
      lat: -8.03945620316851,
      lng: 112.65553035968195,
    },
  ]

  startJam = 8
  startMenit = 0

  for (let i = 0; i < rute_angkot8.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[7].id,
        alamat: rute_angkot8[i].name,
        lat: rute_angkot8[i].lat.toString(),
        long: rute_angkot8[i].lng.toString(),
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

  const ruteBalik8 = [
    {
      name: "Terminal Tlogowaru",
      lat: -8.032657174824843,
      lng: 112.65278377765955,
    },
    {
      name: "Jl. Wonokoyo",
      lat: -8.014874724751948,
      lng: 112.66008848059462,
    },
    {
      name: "Jl. Mayjen Sungkono",
      lat: -8.037450925544034,
      lng: 112.64454908094214,
    },
    {
      name: "Jl. Ki Ageng Gribig",
      lat: -7.984250228511924,
      lng: 112.65917164023449,
    },
    {
      name: "Jl. Muharto",
      lat: -7.99374474860977,
      lng: 112.6392110131877,
    },
    {
      name: "Jl. Ir. H. Juanda",
      lat: -7.987905038517164,
      lng: 112.64449760839206,
    },
    {
      name: "Jl. Kebalen Wetan",
      lat: -7.988304924060836,
      lng: 112.64038708622132,
    },
    {
      name: "Jl. Kyai Tamin",
      lat: -7.986944956596897,
      lng: 112.62979979015408,
    },
    {
      name: "Jl. P. Tendean",
      lat: -8.224882189725305,
      lng: 112.64363073169343,
    },
    {
      name: "Jl. Syarif Al-Qodri",
      lat: -7.985584984603771,
      lng: 112.62928078116529,
    },
    {
      name: "Ayu Suryani",
      lat: -7.8192805162500285,
      lng: 112.68875867542712,
    },
    {
      name: "Jl. Sutan Syahrir",
      lat: -7.977425057574257,
      lng: 112.62565550813164,
    },
    {
      name: "Terminal Angkot Mulyorejo",
      lat: -7.986944956596897,
      lng: 112.59610934801961,
    },
  ]

  startJam = 13
  startMenit = 0

  for (let i = 0; i < ruteBalik8.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[7].id,
        alamat: ruteBalik8[i].name,
        lat: ruteBalik8[i].lat.toString(),
        long: ruteBalik8[i].lng.toString(),
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

  //Rute angkot 9
  const rute_angkot9 = [
    {
      name: "Terminal Madyopuro",
      lat: -7.977349601750145,
      lng: 112.67915699107654,
    },
    {
      name: "Jl. Ki Ageng Gribig",
      lat: -7.974730266715464,
      lng: 112.65505076720085,
    },
    {
      name: "Jl. Muharto",
      lat: -7.996464633689617,
      lng: 112.64607296824373,
    },
    {
      name: "Jl. Zaenal Zakse",
      lat: -7.99374474860977,
      lng: 112.6405208862213,
    },
    {
      name: "Pasar Besar Malang",
      lat: -7.9815795064229125,
      lng: 112.62867317737006,
    },
    {
      name: "Jl. Zainul Arifin",
      lat: -7.985584984603771,
      lng: 112.6289695491429,
    },
    {
      name: "Jl. Aries Munandar",
      lat: -7.985584984603771,
      lng: 112.63583600419894,
    },
    {
      name: "Jl. MGR Sugiyopranoto",
      lat: -7.980691713081323,
      lng: 112.62766404793854,
    },
    {
      name: "Jl. Merdeka Timur",
      lat: -7.985489899557959,
      lng: 112.63453050313285,
    },
    {
      name: "Alun-Alun Malang",
      lat: -7.982624504754734,
      lng: 112.62489796602638,
    },
    {
      name: "Jl. Kauman",
      lat: -8.059410768486988,
      lng: 112.5961401959351,
    },
    {
      name: "Jl. Kawi",
      lat: -7.976387142427606,
      lng: 112.63045260268953,
    },
    {
      name: "Jl. Besar Ijen",
      lat: -7.974845849766756,
      lng: 112.62545716085836,
    },
    {
      name: "Jl. Pahlawan Trip",
      lat: -7.971092365530914,
      lng: 112.62820374268196,
    },
    {
      name: "Jl. Surabaya",
      lat: -7.9652083749155,
      lng: 112.61447083248454,
    },
    {
      name: "Jl. Bendungan Sutami",
      lat: -7.96740175301495,
      lng: 112.6131761818602,
    },
    {
      name: "Makam Kleseman",
      lat: -7.963676929786468,
      lng: 112.61586302995339,
    },
    {
      name: "Karangbesuki",
      lat: -7.9652083749155,
      lng: 112.60024413641732,
    },
  ]

  startJam = 9
  startMenit = 0

  for (let i = 0; i < rute_angkot9.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[8].id,
        alamat: rute_angkot9[i].name,
        lat: rute_angkot9[i].lat.toString(),
        long: rute_angkot9[i].lng.toString(),
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

  const ruteBalik9 = [
    {
      name: "Karangbesuki",
      lat: -7.959768170700789,
      lng: 112.60024413641732,
    },
    {
      name: "Jl. Bendungan Sutami",
      lat: -7.961961577934451,
      lng: 112.611802890849,
    },
    {
      name: "Jl. Surabaya",
      lat: -7.969288480648804,
      lng: 112.61859070551816,
    },
    {
      name: "Jl. Pahlawan Trip",
      lat: -7.96429219668442,
      lng: 112.62545716065956,
    },
    {
      name: "Jl. Guntur",
      lat: -7.9698116439534505,
      lng: 112.6235334569273,
    },
    {
      name: "Jl.brigjen Slamet Riadi",
      lat: -7.967959258940886,
      lng: 112.62957703387535,
    },
    {
      name: "Jl. Merapi",
      lat: -7.982051701364423,
      lng: 112.6203569749049,
    },
    {
      name: "Jl. Bromo",
      lat: -7.976611721080684,
      lng: 112.6239209069273,
    },
    {
      name: "Jl. Semeru",
      lat: -7.97797172293871,
      lng: 112.63387828501698,
    },
    {
      name: "Jl. Kahuripan",
      lat: -7.973891703794964,
      lng: 112.62420246591611,
    },
    {
      name: "Jl. Tugu",
      lat: -7.971171668421351,
      lng: 112.63106892097215,
    },
    {
      name: "Jl. Mojopahit",
      lat: -7.97797172293871,
      lng: 112.62633965692731,
    },
    {
      name: "Jl. Jenderal Basuki Rahmat",
      lat: -7.976611721080684,
      lng: 112.62694229793856,
    },
    {
      name: "Jl. Merdeka Utara",
      lat: -7.982266533865165,
      lng: 112.62766404797989,
    },
    {
      name: "Jl. Merdeka Timur",
      lat: -7.974609958121317,
      lng: 112.63041063009923,
    },
    {
      name: "Jl. MGR Sugiyopranoto",
      lat: -7.97972722023989,
      lng: 112.6402459708908,
    },
    {
      name: "Jl. Sutan Syahrir",
      lat: -7.995104693416545,
      lng: 112.6325279631877,
    },
    {
      name: "Jl. Kyai Tamin",
      lat: -7.985584984603771,
      lng: 112.63529295419892,
    },
    {
      name: "Jl. Kopral Usman",
      lat: -7.99102484539818,
      lng: 112.63835688622132,
    },
    {
      name: "Pasar Besar Malang",
      lat: -7.98014505135447,
      lng: 112.6320228631877,
    },
    {
      name: "Jl. Gatot Subroto",
      lat: -7.990259253799478,
      lng: 112.63605431225439,
    },
    {
      name: "Jl. Ir. H. Juanda",
      lat: -7.981105149256134,
      lng: 112.63625736232481,
    },
    {
      name: "Jl. Muharto",
      lat: -7.99374474860977,
      lng: 112.64470417723253,
    },
    {
      name: "Jl. Ki Ageng Gribig",
      lat: -7.985610204949506,
      lng: 112.6660380952905,
    },
    {
      name: "Terminal Madyopuro",
      lat: -7.973269576875357,
      lng: 112.67366382712011,
    },
  ]

  startJam = 13
  startMenit = 0

  for (let i = 0; i < ruteBalik9.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[8].id,
        alamat: ruteBalik9[i].name,
        lat: ruteBalik9[i].lat.toString(),
        long: ruteBalik9[i].lng.toString(),
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

  //Rute angkot 10
  const rute_angkot10 = [
    {
      name: "Polowijen",
      lat: -7.924075039192802,
      lng: 112.64166634812537,
    },
    {
      name: "Jl. Cakalang",
      lat: -7.934286929113586,
      lng: 112.63861075724671,
    },
    {
      name: "Jl. Ikan Tombro Timur",
      lat: -7.924765807234818,
      lng: 112.6345659162355,
    },
    {
      name: "Jl. Terusan Ikan Paus I",
      lat: -7.936174651213127,
      lng: 112.63204483483648,
    },
    {
      name: "Jl. Ikan Paus",
      lat: -7.938894918765603,
      lng: 112.63891128989252,
    },
    {
      name: "Jl. Simpang Borobudur",
      lat: -7.935047382489204,
      lng: 112.64159830424316,
    },
    {
      name: "Jl. Ahmad Yani",
      lat: -7.937616295067593,
      lng: 112.64577712166947,
    },
    {
      name: "Jl. Laksda Adi Sucipto",
      lat: -7.938426928763149,
      lng: 112.65558051867582,
    },
    {
      name: "Jl. Simpang L.A. Sucipto",
      lat: -7.948863392019443,
      lng: 112.65651974686345,
    },
    {
      name: "Jl. Warinoi",
      lat: -7.975156086491361,
      lng: 112.64998273931968,
    },
    {
      name: "Jl. Raden Patah",
      lat: -7.975251714699185,
      lng: 112.64634131703941,
    },
    {
      name: "Pasar Bunulrejo Malang",
      lat: -7.968451614965853,
      lng: 112.6477146080506,
    },
  ]

  startJam = 10
  startMenit = 0

  for (let i = 0; i < rute_angkot10.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[9].id,
        alamat: rute_angkot10[i].name,
        lat: rute_angkot10[i].lat.toString(),
        long: rute_angkot10[i].lng.toString(),
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

  const ruteBalik10 = [
    {
      name: "Pasar Bunulrejo Malang",
      lat: -7.980691713081323,
      lng: 112.64634131703941,
    },
    {
      name: "Jl. Memberamo",
      lat: -7.969811643953463,
      lng: 112.65183448108422,
    },
    {
      name: "Jl. Warinoi",
      lat: -7.967829479299276,
      lng: 112.64972811691962,
    },
    {
      name: "Jl. Simpang L.A. Sucipto",
      lat: -7.950223486018633,
      lng: 112.65926632888586,
    },
    {
      name: "Jl. Laksda Adi Sucipto",
      lat: -7.952028011752054,
      lng: 112.65558051867582,
    },
    {
      name: "Jl. Ahmad Yani",
      lat: -7.933535874292549,
      lng: 112.64715041268067,
    },
    {
      name: "Jl. Borobudur",
      lat: -7.941848036257668,
      lng: 112.63795474918714,
    },
    {
      name: "Jl. Ikan Paus",
      lat: -7.938894918765603,
      lng: 112.6375379988813,
    },
    {
      name: "Jl. Ikan Paus VII",
      lat: -7.9354444642788255,
      lng: 112.63507829885471,
    },
    {
      name: "Jl. Terusan Ikan Paus I",
      lat: -7.93753478724031,
      lng: 112.6361647078701,
    },
    {
      name: "Jl. Ikan Piranha Atas",
      lat: -7.9320942161278,
      lng: 112.64085063090371,
    },
    {
      name: "Jl. Ikan Tombro Timur",
      lat: -7.913884255412923,
      lng: 112.63319262522431,
    },
    {
      name: "Jl. Cakalang",
      lat: -7.935647071387617,
      lng: 112.64547721230275,
    },
    {
      name: "Polowijen",
      lat: -7.933596177059174,
      lng: 112.65127938520382,
    },
  ]

  startJam = 14
  startMenit = 0

  for (let i = 0; i < ruteBalik10.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[9].id,
        alamat: ruteBalik10[i].name,
        lat: ruteBalik10[i].lat.toString(),
        long: ruteBalik10[i].lng.toString(),
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

  //Rute angkot 12
  const rute_angkot12 = [
    {
      name: "Terminal Arjosari",
      lat: -7.933493866863484,
      lng: 112.65899515398517,
    },
    {
      name: "Jl. Simpang Panji Suroso",
      lat: -7.9323037363865865,
      lng: 112.64996147405209,
    },
    {
      name: "Jl. Raden Panji Suroso",
      lat: -7.935831613127185,
      lng: 112.64972543965953,
    },
    {
      name: "Jl. Plaosan Timur",
      lat: -7.941209023281761,
      lng: 112.65133417722973,
    },
    {
      name: "Jl. Tlk. Grajakan",
      lat: -7.945022908302996,
      lng: 112.65556133862361,
    },
    {
      name: "Jl. Laksda Adi Sucipto",
      lat: -7.945849199498041,
      lng: 112.65240692168194,
    },
    {
      name: "Jl. Batubara",
      lat: -7.952583282045875,
      lng: 112.64906569159722,
    },
    {
      name: "Jl. Laksda Adi Sucipto",
      lat: -7.945721689518025,
      lng: 112.65244983702604,
    },
    {
      name: "Jl. Tembaga",
      lat: -7.953699750170446,
      lng: 112.64890138198749,
    },
    {
      name: "Jl. Emas",
      lat: -7.956686783655865,
      lng: 112.64910440368688,
    },
    {
      name: "Sulfat Indah",
      lat: -7.962044238155766,
      lng: 112.6520366238062,
    },
    {
      name: "Jl. Tumenggung Suryo",
      lat: -7.962439357533952,
      lng: 112.64094615167537,
    },
    {
      name: "Sanan Sentra Industri Tempe",
      lat: -7.960759706357087,
      lng: 112.64354535976139,
    },
    {
      name: "Jl. Barito,",
      lat: -7.959880647549582,
      lng: 112.6397538980495,
    },
    {
      name: "Jl. Mahakam",
      lat: -7.963954379201912,
      lng: 112.63698991158736,
    },
    {
      name: "Jl. Indragiri",
      lat: -7.958855216910117,
      lng: 112.64054128567436,
    },
    {
      name: "Jl. Letjen Sutoyo",
      lat: -7.9604676951492985,
      lng: 112.63682957337532,
    },
    {
      name: "Jl. Sarangan Atas ",
      lat: -7.95962813804524,
      lng: 112.6324800595409,
    },
    {
      name: "Jl. Mawar",
      lat: -7.956640304032833,
      lng: 112.63189023489218,
    },
    {
      name: "Jl. Bungur",
      lat: -7.954756998058355,
      lng: 112.6318339269257,
    },
    {
      name: "Jl. Melati",
      lat: -7.954381718140326,
      lng: 112.63165612942001,
    },
    {
      name: "Jl. Kalpataru",
      lat: -7.949421265226839,
      lng: 112.62867063272512,
    },
    {
      name: "Jl. Cengkeh",
      lat: -7.94659062841709,
      lng: 112.62294595814635,
    },
    {
      name: "Soekarno Hatta",
      lat: -7.93472924782438,
      lng: 112.62874064061205,
    },
    {
      name: "Jl. M. Panjaitan ",
      lat: -7.954356662804847,
      lng: 112.62055776818852,
    },
    {
      name: "Jl. Bandung",
      lat: -7.961784205947041,
      lng: 112.62402051887867,
    },
    {
      name: "Jl. Garut",
      lat: -7.962779429061086,
      lng: 112.62349515231774,
    },
    {
      name: "Jl. Jakarta",
      lat: -7.963172421093925,
      lng: 112.62178892099024,
    },
    {
      name: "Jl. Surabaya Dalam",
      lat: -7.9657524982956165,
      lng: 112.61835569347824,
    },
    {
      name: "Jl. Gresik",
      lat: -7.966604552068883,
      lng: 112.61792760414373,
    },
    {
      name: "Jl. Bondowoso",
      lat: -7.966562207351422,
      lng: 112.6159564760017,
    },
    {
      name: "Jl. Taman Wilis",
      lat: -7.97391987444271,
      lng: 112.6163529842124,
    },
    {
      name: "Jl. Kawi Atas",
      lat: -7.975279885253259,
      lng: 112.61801237072922,
    },
    {
      name: "Jl. Mundu",
      lat: -7.974429879026634,
      lng: 112.6140390932012,
    },
    {
      name: "Jl. Raya Langsep",
      lat: -7.978086923077018,
      lng: 112.61335356179828,
    },
    {
      name: "Jl. Terusan Dieng",
      lat: -7.972646890229474,
      lng: 112.6073733511503,
    },
    {
      name: "Jl. Puncak Dieng",
      lat: -7.971879849748401,
      lng: 112.59544044025193,
    },
  ]

  startJam = 8
  startMenit = 0

  for (let i = 0; i < rute_angkot12.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[11].id,
        alamat: rute_angkot12[i].name,
        lat: rute_angkot12[i].lat.toString(),
        long: rute_angkot12[i].lng.toString(),
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

  const ruteBalik12 = [
    {
      name: "Terminal Arjosari",
      lat: -7.933493866863484,
      lng: 112.65899515398517,
    },
    {
      name: "Jl. Simpang Panji Suroso",
      lat: -7.9323037363865865,
      lng: 112.64996147405209,
    },
    {
      name: "Jl. Raden Panji Suroso",
      lat: -7.935831613127185,
      lng: 112.64972543965953,
    },
    {
      name: "Jl. Plaosan Timur",
      lat: -7.941209023281761,
      lng: 112.65133417722973,
    },
    {
      name: "Jl. Tlk. Grajakan",
      lat: -7.945022908302996,
      lng: 112.65556133862361,
    },
    {
      name: "Jl. Laksda Adi Sucipto",
      lat: -7.945849199498041,
      lng: 112.65240692168194,
    },
    {
      name: "Jl. Batubara",
      lat: -7.952583282045875,
      lng: 112.64906569159722,
    },
    {
      name: "Jl. Laksda Adi Sucipto",
      lat: -7.945721689518025,
      lng: 112.65244983702604,
    },
    {
      name: "Jl. Tembaga",
      lat: -7.953699750170446,
      lng: 112.64890138198749,
    },
    {
      name: "Jl. Emas",
      lat: -7.956686783655865,
      lng: 112.64910440368688,
    },
    {
      name: "Sulfat Indah",
      lat: -7.962044238155766,
      lng: 112.6520366238062,
    },
    {
      name: "Jl. Tumenggung Suryo",
      lat: -7.962439357533952,
      lng: 112.64094615167537,
    },
    {
      name: "Sanan Sentra Industri Tempe",
      lat: -7.960759706357087,
      lng: 112.64354535976139,
    },
    {
      name: "Jl. Barito,",
      lat: -7.959880647549582,
      lng: 112.6397538980495,
    },
    {
      name: "Jl. Mahakam",
      lat: -7.963954379201912,
      lng: 112.63698991158736,
    },
    {
      name: "Jl. Indragiri",
      lat: -7.958855216910117,
      lng: 112.64054128567436,
    },
    {
      name: "Jl. Letjen Sutoyo",
      lat: -7.9604676951492985,
      lng: 112.63682957337532,
    },
    {
      name: "Jl. Sarangan Atas ",
      lat: -7.95962813804524,
      lng: 112.6324800595409,
    },
    {
      name: "Jl. Mawar",
      lat: -7.956640304032833,
      lng: 112.63189023489218,
    },
    {
      name: "Jl. Bungur",
      lat: -7.954756998058355,
      lng: 112.6318339269257,
    },
    {
      name: "Jl. Melati",
      lat: -7.954381718140326,
      lng: 112.63165612942001,
    },
    {
      name: "Jl. Kalpataru",
      lat: -7.949421265226839,
      lng: 112.62867063272512,
    },
    {
      name: "Jl. Cengkeh",
      lat: -7.94659062841709,
      lng: 112.62294595814635,
    },
    {
      name: "Soekarno Hatta",
      lat: -7.93472924782438,
      lng: 112.62874064061205,
    },
    {
      name: "Jl. M. Panjaitan ",
      lat: -7.954356662804847,
      lng: 112.62055776818852,
    },
    {
      name: "Jl. Bandung",
      lat: -7.961784205947041,
      lng: 112.62402051887867,
    },
    {
      name: "Jl. Garut",
      lat: -7.962779429061086,
      lng: 112.62349515231774,
    },
    {
      name: "Jl. Jakarta",
      lat: -7.963172421093925,
      lng: 112.62178892099024,
    },
    {
      name: "Jl. Surabaya Dalam",
      lat: -7.9657524982956165,
      lng: 112.61835569347824,
    },
    {
      name: "Jl. Gresik",
      lat: -7.966604552068883,
      lng: 112.61792760414373,
    },
    {
      name: "Jl. Bondowoso",
      lat: -7.966562207351422,
      lng: 112.6159564760017,
    },
    {
      name: "Jl. Taman Wilis",
      lat: -7.97391987444271,
      lng: 112.6163529842124,
    },
    {
      name: "Jl. Kawi Atas",
      lat: -7.975279885253259,
      lng: 112.61801237072922,
    },
    {
      name: "Jl. Mundu",
      lat: -7.974429879026634,
      lng: 112.6140390932012,
    },
    {
      name: "Jl. Raya Langsep",
      lat: -7.978086923077018,
      lng: 112.61335356179828,
    },
    {
      name: "Jl. Terusan Dieng",
      lat: -7.972646890229474,
      lng: 112.6073733511503,
    },
    {
      name: "Jl. Puncak Dieng",
      lat: -7.971879849748401,
      lng: 112.59544044025193,
    },
  ]

  ruteBalik12.reverse()

  startJam = 13
  startMenit = 0

  for (let i = 0; i < ruteBalik12.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[11].id,
        alamat: ruteBalik12[i].name,
        lat: ruteBalik12[i].lat.toString(),
        long: ruteBalik12[i].lng.toString(),
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

  //Rute angkot 11
  const rute_angkot11 = [
    {
      name: "Terminal Arjosari",
      lat: -7.93439200678307,
      lng: 112.65881231348186,
    },
    {
      name: "Suroso AC",
      lat: -7.9887941657099795,
      lng: 112.59632757247199,
    },
    {
      name: "Jl. Ahmad Yani,",
      lat: -7.935830554410605,
      lng: 112.64529457092682,
    },
    {
      name: "Jl. Letjen S. Parman",
      lat: -7.946221544079254,
      lng: 112.64150524975413,
    },
    {
      name: "Jl. Letjen Sutoyo Kedawung",
      lat: -7.960401373733898,
      lng: 112.63688242700131,
    },
    {
      name: "Jl. Indragiri",
      lat: -7.958802056591148,
      lng: 112.64023744870072,
    },
    {
      name: "Jl. Tumenggung Suryo",
      lat: -7.962295258262775,
      lng: 112.64123076246473,
    },
    {
      name: "Jl. Hamid Rusdi",
      lat: -7.969731996728313,
      lng: 112.64323074978904,
    },
    {
      name: "Kesatrian",
      lat: -7.977476914554931,
      lng: 112.64248452857835,
    },
    {
      name: "Jl. Pahlawan Trip",
      lat: -7.967510686001348,
      lng: 112.62113445765459,
    },
    {
      name: "Urip Sumoharjo ",
      lat: -7.975290071106734,
      lng: 112.64158155884772,
    },
    {
      name: "Laboratorium Klinik Patimura",
      lat: -7.972858167526752,
      lng: 112.63385794712063,
    },
    {
      name: "Taman Trunojoyo",
      lat: -7.976380837357238,
      lng: 112.63650163967702,
    },
    {
      name: "Jembatan Embong Brantas",
      lat: -7.990964623560996,
      lng: 112.64086012766775,
    },
    {
      name: "Jl. Zaenal Zakse",
      lat: -7.987862204991781,
      lng: 112.63760647949374,
    },
    {
      name: "MARTADINATA",
      lat: -7.98952440796896,
      lng: 112.6349763609545,
    },
    {
      name: "Jl. Kyai Tamin",
      lat: -7.987864255666955,
      lng: 112.63254660224655,
    },
    {
      name: "Jl. Prof. Moch Yamin",
      lat: -7.989379353212161,
      lng: 112.6324545630613,
    },
    {
      name: "Jl. Peltu Sujono",
      lat: -7.996625955265973,
      lng: 112.62903038525248,
    },
    {
      name: "Jl. Susanto",
      lat: -7.9969908064388555,
      lng: 112.6288976334265,
    },
    {
      name: "Jl. Sigura - Gura",
      lat: -7.957516912034971,
      lng: 112.61343487837047,
    },
    {
      name: "Jl. Sonokeling",
      lat: -8.001361650356346,
      lng: 112.62819112598287,
    },
    {
      name: "Bandungrejosari",
      lat: -8.00183467285106,
      lng: 112.6247983064629,
    },
    {
      name: "Terminal Hamid Rusdi",
      lat: -8.025432528807723,
      lng: 112.64407410632037,
    },
  ]

  startJam = 10
  startMenit = 0

  for (let i = 0; i < rute_angkot11.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[10].id,
        alamat: rute_angkot11[i].name,
        lat: rute_angkot11[i].lat.toString(),
        long: rute_angkot11[i].lng.toString(),
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

  const ruteBalik11 = [
    {
      name: "Terminal Hamid Rusdi",
      lat: -8.02659313438206,
      lng: 112.6432460192406,
    },
    {
      name: "Jl. Satsui Tubun",
      lat: -8.021323730448605,
      lng: 112.62401994508372,
    },
    {
      name: "Sukun",
      lat: -7.997480664192024,
      lng: 112.61809304290706,
    },
    {
      name: "Bandungrejosari",
      lat: -8.001880126609398,
      lng: 112.62466348721337,
    },
    {
      name: "Jl. Sonokeling",
      lat: -8.001370156311728,
      lng: 112.62680925441838,
    },
    {
      name: "Ciptomulyo",
      lat: -7.998480830187257,
      lng: 112.62826870323006,
    },
    {
      name: "Jl. Susanto",
      lat: -7.996355414406544,
      lng: 112.62869752955878,
    },
    {
      name: "Jl. Peltu Sujono",
      lat: -7.996355414406544,
      lng: 112.62959118721336,
    },
    {
      name: "Jl. Sartono SH",
      lat: -7.99397551531618,
      lng: 112.63190861579477,
    },
    {
      name: "Jl. R.E. Martadinata",
      lat: -7.989618061947196,
      lng: 112.63517041004219,
    },
    {
      name: "Jl. Kyai Tamin",
      lat: -7.988173101013667,
      lng: 112.63216633595519,
    },
    {
      name: "Jl. Kopral Usman",
      lat: -7.986983129346242,
      lng: 112.63422627247199,
    },

    {
      name: " Jl. Pasar Besar",
      lat: -7.98621380956456,
      lng: 112.63362545765459,
    },
    {
      name: "Jl. Zainul Arifin",
      lat: -7.983345978289061,
      lng: 112.6339687804074,
    },
    {
      name: "Jl. Aries Munandar",
      lat: -7.98057960894854,
      lng: 112.63328213490179,
    },
    {
      name: "Jl. Pahlawan Trip",
      lat: -7.966745306356999,
      lng: 112.62053405126433,
    },
    {
      name: "Jl. Trunojoyo",
      lat: -7.9758959978456385,
      lng: 112.63657582485959,
    },
    {
      name: "Cokro Aminoto",
      lat: -8.003915444233348,
      lng: 112.6107998832157,
    },
    {
      name: "Jl. Dr. Cipto",
      lat: -7.968211356681575,
      lng: 112.63434422696636,
    },
    {
      name: "Jl. Panglima Sudirman Utara",
      lat: -7.968635378725157,
      lng: 112.63743413174159,
    },
    {
      name: "Jl. Tumenggung Suryo",
      lat: -7.9630280698600595,
      lng: 112.6415540047752,
    },
    {
      name: "Jl. Barito",
      lat: -7.959794993172804,
      lng: 112.63863576137639,
    },
    {
      name: "Jl. Mahakam",
      lat: -7.963595827998475,
      lng: 112.6364041634832,
    },
    {
      name: "Jl. Karya Timur",
      lat: -7.950867752230807,
      lng: 112.641039020646,
    },
    {
      name: "Jl. Ciliwung",
      lat: -7.9530803202413285,
      lng: 112.64198341530916,
    },
    {
      name: "Jl. Letjen S. Parman III",
      lat: -7.946666410026918,
      lng: 112.63983739101121,
    },
    {
      name: "Jl. Ahmad Yani",
      lat: -7.936331306698189,
      lng: 112.64490165870798,
    },
    {
      name: "Terminal Arjosari",
      lat: -7.9325571960292125,
      lng: 112.65880623019645,
    },
  ]

  startJam = 14
  startMenit = 0

  for (let i = 0; i < ruteBalik11.length; i++) {
    await prisma.rute.create({
      data: {
        id_angkot: angkot[10].id,
        alamat: ruteBalik11[i].name,
        lat: ruteBalik11[i].lat.toString(),
        long: ruteBalik11[i].lng.toString(),
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
