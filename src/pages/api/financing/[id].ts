import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import loadCreditCards from "@/utils/loadCreditCards";
import { Year } from "@/types/year";



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
    const financing = await prisma.financing.findFirst({
      where: { id, userId },
      include: { installments: true }
    })

    res.status(200).json({ financing })
    return
  }

  res.status(404).json({})
}
