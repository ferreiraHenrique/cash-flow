import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    res.status(404).send({
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
    res.status(404).send({
      error: 'user not found'
    })
    return
  }

  if (req.method == 'GET') {
    const months = await prisma.month.findMany({
      where: {
        userId: user.id
      }
    })

    res.status(200).json({months})
  }

  if (req.method == 'POST') {
    const {name} = JSON.parse(req.body)

    const month = await prisma.month.create({
      data: {
        name,
        userId: user.id
      }
    })

    res.status(200).json(month)
  }

  res.status(404).json({})
}