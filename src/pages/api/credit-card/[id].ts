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
  const { id } = req.query

  if (!id || typeof id != 'string') {
    res.status(409).json({ error: 'missing id' })
    return
  }

  if (req.method == 'GET') {
    const card = await prisma.creditCard.findFirst({
      where: { id, userId },
      include: { purchases: true }
    })

    res.status(200).json({ creditCard: card })
    return
  }

  res.status(404).json({})
}
