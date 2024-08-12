import prisma from "../data/db.config.js"

const voucherSeeder = async () => {
  for (let i = 0; i < 2; i++) {
    await prisma.voucher.create({
      data: {
        name: "Voucher " + i,
        nominal: 10000,
        is_active: true,
        min_nominal: 50000,
      },
    })
  }
}

export default voucherSeeder
