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

  if (req.method == 'POST') {
    const {name, amount, discount, isCredit, monthId} = JSON.parse(req.body)

    const transaction = await prisma.transaction.create({
      data: {name, amount, discount, isCredit, monthId}
    })

    res.status(201).json(transaction)
    return
  }

  res.status(404).json({})
}
