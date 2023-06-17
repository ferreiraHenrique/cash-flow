'use client'

import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCurrentPage } from "@/types/page"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"


export default function NavBar(){
  const router = useRouter()
  const currentPage = getCurrentPage(router)

  return (
    <div className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
      <h6 className="mb-0 font-bold text-white capitalize">{currentPage.label}</h6>

      <ul className="flex flex-row ml-auto justify-end pl-0 mb-0 list-none md-max:w-full">
        <li className="flex items-center">
          <a className="block px-0 py-2 text-sm font-semibold text-white transition-all ease-nav-brand">
            <FontAwesomeIcon icon={faUser} />
            <span className="hidden sm:inline ml-1">Henrique</span>
          </a>
        </li>
        <li className="flex items-center ml-4">
          <a
            className="block px-0 py-2 text-sm font-semibold text-white transition-all ease-nav-brand"
            onClick={() => {
              signOut()
            }}
          >
            <FontAwesomeIcon icon={faSignOut} />
          </a>
        </li>
      </ul>
    </div>
  )
}
