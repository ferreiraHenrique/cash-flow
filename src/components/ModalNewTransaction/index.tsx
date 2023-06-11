import { useState } from "react";
import Modal from "../Modal";
import Input from "../Input";

interface ModalNewTransactionProps {

}

export default function ModalNewTransaction(props: ModalNewTransactionProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)

  const onConfirm = () => {
    alert("CONFIRMOU")
  }

  return <Modal
    onConfirm={onConfirm}
    title="Criar nova transação"
    confirmButtonText="Adicionar transação"
    children={
      <div className="mt-2 w-full">
        <div className="mb-4">
          <Input placeholder="Nome" />
        </div>
        <div className="mb-4">
          <Input placeholder="Valor (R$)" />
        </div>
      </div>
    }
  />
}
