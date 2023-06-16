import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await prisma.user.create({
    data: {
      email: 'henrique.ferreira.paula@gmail.com',
      name: 'Henrique Ferreira'
    }
  })

  res.status(200).json({ name: 'John Doe' })
}
