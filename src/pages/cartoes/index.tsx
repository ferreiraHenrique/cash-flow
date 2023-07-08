import MainLayout from "@/components/MainLayout";
import CreditCardsProvider from "@/contexts/CreditCardContext";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import ModalProvider from "@/contexts/ModalContext";
import CreditCardList from "@/components/CreditCardList";



export default function CartoesPage() {
  return (
    <MainLayout>
      <div className="w-full p-6">
        <CreditCardsProvider>
          <ModalProvider>
            <CreditCardList />
          </ModalProvider>
        </CreditCardsProvider>
      </div>
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
