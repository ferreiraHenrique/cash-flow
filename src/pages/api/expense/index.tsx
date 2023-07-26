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

  const { id: userId } = user

  if (req.method == 'GET') {
    const expenses = await prisma.expense.findMany({
      where: { userId }
    })

    res.status(200).json({ expenses })
    return
  }

  if (req.method == "POST") {
    const { name, baseAmount, startAt: _startAt } = JSON.parse(req.body)

    const startAt = new Date(_startAt)

    const expense = await prisma.expense.create({
      data: { name, baseAmount, userId, startAt }
    })

    const months = await prisma.month.findMany({
      where: {
        userId,
        startAt: {
          gte: new Date(startAt.getFullYear(), startAt.getMonth())
        }
      }
    })

    const transactions = months.map(m => (
      { name, amount: baseAmount, discount: 0, isCredit: false, monthId: m.id }
    ))

    await prisma.monthTransaction.createMany({
      data: transactions
    })

    res.status(201).json({ expense })
    return
  }

  res.status(404).json({})
}
