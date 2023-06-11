
export interface IModal {
  open: boolean
}

export type ModalContextType = {
  modal: IModal
  toggleModal: () => void
}
