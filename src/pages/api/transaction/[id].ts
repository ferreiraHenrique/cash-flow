import prisma from "@/lib/prisma";
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

  if (req.method == 'DELETE') {
    await prisma.transaction.delete({where: {id}})
    res.status(200).json({})
    return
  }

  if (req.method == "PUT") {
    const {name, amount, discount, isCredit} = JSON.parse(req.body)

    await prisma.transaction.update({
      where: {id},
      data: {name, amount, discount, isCredit}
    })
    res.status(200).json({})
    return
  }

  res.status(404).json({})
}
