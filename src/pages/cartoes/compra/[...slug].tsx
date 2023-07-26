import MainLayout from "@/components/MainLayout";
import PurchaseInstallmentList from "@/components/PurchaseInstallmentList";
import CreditCardsProvider from "@/contexts/CreditCardContext";
import ModalProvider from "@/contexts/ModalContext";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";


export default function CartaoCompraPage() {
  const router = useRouter()
  const { slug } = router.query

  if (!Array.isArray(slug)) return <></>
  if (slug.length != 2) return <></>

  const [cardId, purchaseId] = slug

  return (
    <MainLayout>
      <CreditCardsProvider id={cardId}>
        <div className="w-full p-6">
          <ModalProvider>
            <PurchaseInstallmentList purchaseId={purchaseId} />
          </ModalProvider>
        </div>
      </CreditCardsProvider>
    </MainLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return { redirect: { destination: '/signin' } }
  }

  return {
    props: { session }
  }
}
