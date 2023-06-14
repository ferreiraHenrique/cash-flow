import MainLayout from "@/components/MainLayout";
import MonthList from "@/components/MonthList";
import NavBar from "@/components/NavBar";
import SideMenu from "@/components/SideMenu";
import ModalProvider from "@/contexts/ModalContext";
import MonthsProvider from "@/contexts/MonthContext";
import { styled } from "styled-components";


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
