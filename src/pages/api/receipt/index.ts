import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
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

  const {id: userId} = user

  if (req.method == "GET") {
    const receipts = await prisma.receipt.findMany({
      where: {userId}
    })

    res.status(200).json({receipts})
    return
  }

  if (req.method == 'POST') {
    const {name, baseAmount} = JSON.parse(req.body)

    const receipt = await prisma.receipt.create({
      data: {name, baseAmount, userId}
    })

    const today = new Date()

    const months = await prisma.month.findMany({
      where: {
        userId,
        startAt: {
          gte: new Date(today.getFullYear(), today.getMonth())
        }
      }
    })

    const transactions = months.map(m => (
      {name, amount: baseAmount, discount: 0, isCredit: true, monthId: m.id}
    ))

    await prisma.monthTransaction.createMany({
      data: transactions
    })

    res.status(201).json({receipt})
    return
  }

  res.status(404).json({})
}
