'use client'

import SideMenu from '@/components/SideMenu';
import MainLayout from '@/components/MainLayout';
import { styled } from 'styled-components';
import NavBar from '@/components/NavBar';
import MonthResumeCard from '@/components/MonthResumeCard';
import TransactionList from '@/components/TransactionList';
import ModalProvider from '@/contexts/ModalContext';
import TransactionsProvider from '@/contexts/TransactionsContext';


const MainContainer = styled.main`
  margin-left: 17rem;
`

const Content = styled.div``

export default function DashboardPage() {
  return (
    <MainLayout>
      <SideMenu />

      <MainContainer className='relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl'>
        <NavBar />

        <Content className='w-full px-6 py-6 mx-2'>
          <div className='grid grid-cols-4 gap-6'>
            <MonthResumeCard />
            <MonthResumeCard />
            <MonthResumeCard />
            <MonthResumeCard />
          </div>

          <TransactionsProvider>
            <ModalProvider>
              <TransactionList />
            </ModalProvider>
          </TransactionsProvider>
        </Content>
      </MainContainer>
    </MainLayout>
  )
}
