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

  if (req.method == "GET") {
    const financings = await prisma.financing.findMany({ where: { userId } })

    res.status(200).json({ financings })
    return
  }

  if (req.method == "POST") {
    const { name, amount, numberOfInstallments, firstDueDate: firstDue } = JSON.parse(req.body)

    const installmentAmount = amount / numberOfInstallments
    const installments = []

    for (let i = 0; i < numberOfInstallments; i++) {
      const currentDate = new Date(firstDue)
      currentDate.setMonth(currentDate.getMonth() + i)

      installments.push({ date: currentDate, amount: installmentAmount, installmentNumber: i + 1 })
    }

    const financing = await prisma.financing.create({
      data: {
        amount,
        name,
        numberOfInstallments,
        userId,
        firstDueDate: new Date(firstDue),
        installments: { create: installments }
      }
    })

    res.status(201).json({ financing })
    return
  }

  res.status(404).json({})
}
