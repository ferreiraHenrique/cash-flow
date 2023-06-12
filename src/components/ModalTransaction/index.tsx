import ModalNewTransaction from "./new"


interface ModalTransactionProps {
  isNew?: boolean
}

export default function ModalTransaction(props: ModalTransactionProps) {
  if (props.isNew) {
    return <ModalNewTransaction />
  }

  return <></>
}
