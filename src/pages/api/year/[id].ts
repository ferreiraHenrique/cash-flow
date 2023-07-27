import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import loadCreditCards from "@/utils/loadCreditCards";
import { Year } from "@/types/year";
import loadFinancings from "@/utils/loadFinancings";



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

  if (req.method == 'GET') {
    const cards = await loadCreditCards(userId)
    const financings = await loadFinancings(userId)

    const _year = await prisma.year.findFirst({
      where: { id, userId: user.id },
      include: { months: { include: { transactions: true } } }
    })
    const year = new Year(_year)
    year.months = year.months.map(m => {
      m.addCreditCards(cards)
      m.addFinancings(financings)
      return m
    })

    res.status(200).json({ year })
    return
  }

  if (req.method == 'DELETE') {
    await prisma.year.delete({
      where: { id }
    })
    res.status(200).json({})
    return
  }

  res.status(404).json({})
}
