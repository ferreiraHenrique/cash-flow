import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";



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

  const {id} = req.query

  if (!id || typeof id != 'string') {
    res.status(409).json({error: 'missing id'})
    return
  }

  if (req.method == 'GET') {
    const year = await prisma.year.findFirst({
      where: {id, userId: user.id},
      include: {months: {include: {transactions: true}}}
    })

    res.status(200).json({year})
    return
  }

  res.status(404).json({})
}
