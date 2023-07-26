import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    res.status(404).json({
      error: 'session not found'
    })
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!user) {
    res.status(404).json({
      error: 'user not found'
    })
    return
  }

  const { id: userId } = user
  const { id } = req.query

  if (!id || typeof id != 'string') {
    res.status(409).json({ error: 'missing id' })
    return
  }

  if (req.method == "PUT") {
    const { amount, date } = JSON.parse(req.body)
    await prisma.creditCardPurchaseInstallment.update({
      where: { id },
      data: { amount, date: new Date(date) }
    })

    const installment = await prisma.creditCardPurchaseInstallment.findFirst({
      where: { id }
    })

    const installments = await prisma.creditCardPurchaseInstallment.findMany({
      where: { creditCardPurchaseId: installment?.creditCardPurchaseId }
    })

    const totalAmount = installments.reduce((t, i) => t + i.amount, 0)
    await prisma.creditCardPurchase.update({
      where: { id: installment?.creditCardPurchaseId },
      data: { amount: totalAmount }
    })

    res.status(200).json({})
    return
  }

  res.status(404).json({})
}
