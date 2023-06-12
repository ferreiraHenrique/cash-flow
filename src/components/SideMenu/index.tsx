'use client'

import * as S from './style';


export default function SideMenu() {
  return (
    <S.Container className="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0" aria-expanded="false">
      <S.Logo className="h-19">
        <div className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700">
          <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">Cash Flow</span>
        </div>
        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent bg-gradient-to-r from-transparent via-white to-transparent" />
      </S.Logo>

      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <S.MenuItemList className="flex flex-col pl-0 mb-0">
          <S.MenuItem className="mt-0.5 w-full rounded-2xl selected">
            <a
              className="py-2.7 bg-blue-500/13 opacity-80 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors font-normal"
              href="/dashboard"
            >
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <i className="relative top-0 text-sm leading-normal text-blue-500 ni ni-tv-2"></i>
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Dashboard</span>
            </a>
          </S.MenuItem>
        </S.MenuItemList>
      </div>
    </S.Container>
  )
}
