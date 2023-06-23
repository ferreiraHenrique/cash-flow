import MainLayout from "@/components/MainLayout";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import ReceiptsProvider from "@/contexts/ReceiptContext";
import ReceiptList from "@/components/ReceiptList";
import ModalProvider from "@/contexts/ModalContext";


export default function ReceitasPage() {
  return (
    <MainLayout>
      <div className="w-full p-6">
        <ReceiptsProvider>
          <ModalProvider>
            <ReceiptList />
          </ModalProvider>
        </ReceiptsProvider>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {redirect: {destination: '/signin'}}
  }

  return {
    props: {session}
  }
}
