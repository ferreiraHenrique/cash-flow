import { Form } from "@unform/web"
import FormInput from "../FormInput"
import { formatCurrency, unformatCurrency } from "@/helpers/formatCurrency"


interface ModalPurchaseFormProps {
  formRef: any
  handleFormSubmit: (data: any) => void
  initialData?: any
}

export default function ModalPurchaseForm(props: ModalPurchaseFormProps) {
  const onInputAmount = (event: any) => {
    const formatted = formatCurrency(unformatCurrency(event.target.value))
    event.target.value = formatted
  }

  return (
    <Form
      ref={props.formRef}
      onSubmit={props.handleFormSubmit}
      initialData={props.initialData}
    >
      <div className="mt-2 w-full">
        <div className="mb-4">
          <FormInput name="name" placeholder="Nome" />
        </div>
        <div className="mb-4">
          <FormInput name="amount" placeholder="Valor (R$)" onInput={onInputAmount} />
        </div>
        <div className="mb-4">
          <FormInput name="numberOfInstallments" placeholder="Qtde de parcelas" dataType="number" />
        </div>
        <div className="mb-4 grid gap-2 grid-cols-[30%,1fr] items-center">
          <label htmlFor="date" className="text-xs text-left">Data da compra</label>
          <FormInput name="date" placeholder="Data da compra" dataType="date" />
        </div>
        <div className="mb-4 grid gap-2 grid-cols-[30%,1fr] items-center">
          <label htmlFor="firstDueDate" className="text-xs text-left">Primeiro vencimento</label>
          <FormInput name="firstDueDate" placeholder="Data da primeira parcela" dataType="date" />
        </div>
      </div>
    </Form>
  )
}
