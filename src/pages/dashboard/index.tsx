'use client'

import MainLayout from '@/components/MainLayout';
import TransactionList from '@/components/TransactionList';
import ModalProvider from '@/contexts/ModalContext';
import MonthsProvider from '@/contexts/MonthContext';
import MonthListResumeCard from '@/components/MonthListResumeCard';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';


export default function DashboardPage() {
  return (
    <MainLayout>
      <MonthsProvider>
        <div className='w-full px-6 py-6 mx-2'>
          <div className='grid grid-cols-4 gap-6'>
            <MonthListResumeCard />
          </div>

          <ModalProvider>
            <TransactionList />
          </ModalProvider>
        </div>
      </MonthsProvider>
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
