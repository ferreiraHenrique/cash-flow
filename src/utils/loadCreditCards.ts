import { CreditCard, ICreditCard } from "@/types/creditCard"


export default async function loadCreditCards(userId: string): Promise<ICreditCard[]> {
  const cards = await prisma.creditCard.findMany({
    where: { userId },
    include: { purchases: { include: { installments: true } } }
  })

  return cards.map(c => new CreditCard(c))
}
