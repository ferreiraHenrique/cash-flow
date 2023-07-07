import MainLayout from "@/components/MainLayout";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import ExpensesProvider from "@/contexts/ExpenseContext";
import ModalProvider from "@/contexts/ModalContext";
import ExpenseList from "@/components/ExpenseList";


export default function DespesasPage() {
  return (
    <MainLayout>
      <div className="w-full p-6">
        <ExpensesProvider>
          <ModalProvider>
            <ExpenseList />
          </ModalProvider>
        </ExpensesProvider>
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
