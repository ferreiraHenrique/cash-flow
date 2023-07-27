import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Month } from "@/types/month";
import { Year } from "@/types/year";
import { CreditCard } from "@/types/creditCard";
import { MonthTransaction } from "@/types/monthTransaction";
import loadCreditCards from "@/utils/loadCreditCards";
import { getMonthLabel } from "@/helpers/formatDate";
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

  if (req.method == 'GET') {
    const { byLabel } = req.query

    const cards = await loadCreditCards(userId)
    const financings = await loadFinancings(userId)

    if (typeof byLabel == 'string') {
      const _year = await prisma.year.findFirst({
        where: { userId, name: byLabel },
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

    const _years = await prisma.year.findMany({
      where: { userId },
      include: { months: { include: { transactions: true } } }
    })

    const years = _years.map(y => {
      const months = y.months.map(m => {
        const month = new Month(m)
        month.addCreditCards(cards)
        month.addFinancings(financings)
        return month
      })

      return new Year({ ...y, months })
    })

    res.status(200).json({ years })
    return
  }

  if (req.method == 'POST') {
    return postHandler(req, res, userId)
  }

  res.status(404).json({})
}

async function postHandler(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { name: yearName } = JSON.parse(req.body)

  const newMonths = []
  for (let i = 0; i < 12; i++) {
    const startAt = new Date(yearName, i)
    const monthLabel = getMonthLabel(startAt)

    newMonths.push({ name: monthLabel, startAt, userId })
  }

  const year = await prisma.year.create({
    data: {
      name: yearName,
      userId,
      startAt: new Date(yearName, 0),
      months: { create: newMonths }
    },
    include: {
      months: true
    }
  })

  let transactions: any[] = []

  for (let i = 0; i < year.months.length; i++) {
    const m = year.months[i]

    const receipts = await prisma.receipt.findMany({
      where: {
        userId,
        isActive: true,
        OR: [
          { startAt: { lte: m.startAt }, endAt: null },
          { startAt: { lte: m.startAt }, endAt: { gte: m.startAt } },
        ],
      }
    })
    transactions = [
      ...transactions,
      ...receipts.map(r => ({ name: r.name, amount: r.baseAmount, isCredit: true, monthId: m.id }))
    ]

    const expenses = await prisma.expense.findMany({
      where: { userId, isActive: true, startAt: { lte: m.startAt } }
    })
    transactions = [
      ...transactions,
      ...expenses.map(e => ({ name: e.name, amount: e.baseAmount, isCredit: false, monthId: m.id }))
    ]
  }

  if (transactions.length) {
    await prisma.monthTransaction.createMany({ data: transactions })
  }

  res.status(200).json(year)
  return
}
