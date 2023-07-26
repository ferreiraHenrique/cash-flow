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

  if (req.method == 'PUT') {
    const { isActive } = JSON.parse(req.body)

    await prisma.expense.update({
      where: { id },
      data: { isActive }
    })

    res.status(200).json({})
    return
  }


  res.status(404).json({})
}
