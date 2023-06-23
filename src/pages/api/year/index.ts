import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Month } from "@/types/month";



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

  if (req.method == 'GET') {
    const {byLabel} = req.query

    if (typeof byLabel == 'string') {
      const year = await prisma.year.findFirst({
        where: {userId: user.id, name: byLabel},
        include: {months: {include: {transactions: true}}}
      })
      res.status(200).json({year})
      return
    }

    const years = await prisma.year.findMany({
      where: {userId: user.id},
    })

    res.status(200).json({years})
    return
  }

  if (req.method == 'POST') {
    const {name: yearName} = JSON.parse(req.body)

    const newMonths = []
    for(let i=0; i<12; i++) {
      const currentMonth = new Date(yearName, i)
      const monthLabel = `${
        currentMonth.toLocaleString('pt-BR', {month: 'long'}).charAt(0).toUpperCase()
      }${currentMonth.toLocaleString('pt-BR', {month: 'long'}).slice(1)}`

      newMonths.push(
        {
          name: monthLabel,
          startAt: currentMonth,
          userId: user.id
        }
      )
    }

    const year = await prisma.year.create({
      data: {
        name: yearName,
        userId: user.id,
        startAt: new Date(yearName, 0),
        months: {create: newMonths}
      },
      include: {
        months: true
      }
    })

    res.status(200).json(year)
    return
  }

  res.status(404).json({})
}
