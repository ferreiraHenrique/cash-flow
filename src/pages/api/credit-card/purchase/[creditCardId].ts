import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";


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
  const { creditCardId } = req.query

  if (!creditCardId || typeof creditCardId != 'string') {
    res.status(409).json({ error: 'missing credit card id' })
    return
  }

  if (req.method == 'POST') {
    const { amount, date, name, numberOfInstallments, firstDueDate: firstDue } = JSON.parse(req.body)

    const installmentAmount = amount / numberOfInstallments
    const installments = []

    for (let i = 0; i < numberOfInstallments; i++) {
      const currentDate = new Date(firstDue)
      currentDate.setMonth(
        currentDate.getMonth() + i
      )

      installments.push({
        date: currentDate,
        amount: installmentAmount,
        installmentNumber: i + 1
      })
    }

    const purchase = await prisma.creditCardPurchase.create({
      data: {
        amount,
        date: new Date(date),
        name,
        numberOfInstallments,
        creditCardId,
        firstDueDate: new Date(firstDue),
        installments: { create: installments }
      }
    })

    res.status(201).json({ purchase })
    return
  }

  res.status(404).json({})
}
