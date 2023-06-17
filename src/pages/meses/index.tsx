import MainLayout from "@/components/MainLayout";
import MonthList from "@/components/MonthList";
import NavBar from "@/components/NavBar";
import SideMenu from "@/components/SideMenu";
import ModalProvider from "@/contexts/ModalContext";
import MonthsProvider from "@/contexts/MonthContext";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { styled } from "styled-components";
import { authOptions } from "../api/auth/[...nextauth]";


const MainContainer = styled.main`
  margin-left: 17rem;
`

export default function MesesPage() {
  return (
    <MainLayout>
      <SideMenu />

      <MainContainer className='relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl'>
        <NavBar />

        <div className='w-full px-6 py-6 mx-2'>
          <MonthsProvider>
            <ModalProvider>
              <MonthList />
            </ModalProvider>
          </MonthsProvider>
        </div>
      </MainContainer>
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
