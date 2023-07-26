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

  if (req.method == 'GET') {
    const creditCards = await prisma.creditCard.findMany({
      where: {userId},
    })

    res.status(200).json({creditCards})
    return
  }

  if (req.method == 'POST') {
    const {name, lastNumbers} = JSON.parse(req.body)

    const creditCard = await prisma.creditCard.create({
      data: {name, lastNumbers, userId}
    })

    res.status(201).json({creditCard})
    return
  }

  res.status(404).json({})
}
