import { Financing, IFinancing } from "@/types/financing";


export default async function loadFinancings(userId: string): Promise<IFinancing[]> {
  const financings = await prisma.financing.findMany({
    where: { userId },
    include: { installments: true }
  })

  return financings.map(f => new Financing(f))
}
