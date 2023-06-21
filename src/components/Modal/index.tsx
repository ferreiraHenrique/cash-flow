import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useContext, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalContext } from '@/contexts/ModalContext'
import { ModalContextType } from '@/types/modal'


const ButtonConfirm = styled.button`
  border: 1px solid var(--main-color);
  color: var(--main-color);

  &:hover {
    color: white;
    background-color: var(--main-color);
  }
`

interface ModalProps {
  title?: string
  cancelButtonText?: string
  confirmButtonText: string
  isDanger?: string
  content?: React.ReactNode
  showIcon?: boolean
  onConfirm: () => void
}

export default function Modal(props:ModalProps){
  const {modal, toggleModal} = useContext(ModalContext) as ModalContextType

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={modal.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={toggleModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {props.showIcon &&
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                    }
                    <div className="mt-3 ml-3 text-center w-full">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {props.title}
                      </Dialog.Title>
                      {props.content}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <ButtonConfirm
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto transition-all ease-in"
                    onClick={() => {props.onConfirm(); toggleModal();}}
                  >
                    {props.confirmButtonText}
                  </ButtonConfirm>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={toggleModal}
                    ref={cancelButtonRef}
                  >
                    {props.cancelButtonText || "Cancelar"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
