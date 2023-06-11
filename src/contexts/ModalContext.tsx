import { IModal, ModalContextType } from "@/types/modal";
import React, { createContext, useState } from "react";


export const ModalContext = createContext<ModalContextType | null>(null)

function ModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [modal, setModal] = useState<IModal>({open: false})

  const toggleModal = () => {
    setModal((prev) => ({open: !prev.open}))
  }

  return (
    <ModalContext.Provider value={{modal, toggleModal}}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
