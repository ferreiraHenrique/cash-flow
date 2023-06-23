import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";


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

  const {id} = req.query

  if (!id || typeof id != 'string') {
    res.status(409).json({error: 'missing id'})
    return
  }

  if (req.method == 'DELETE') {
    await prisma.month.delete({where: {id}})
    res.status(200).json({})
    return
  }

  if (req.method == 'PUT') {
    const {name} = JSON.parse(req.body)

    await prisma.month.update({
      where: {id},
      data: {name}
    })
    res.status(200).json({})
    return
  }

  if (req.method == 'GET') {
    const month = await prisma.month.findFirst({
      where: {id, userId},
      include: {transactions: true}
    })
    res.status(200).json({month})
    return
  }

  res.status(404).json({})
}
