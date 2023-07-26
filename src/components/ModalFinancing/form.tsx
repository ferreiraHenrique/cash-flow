import { Form } from "@unform/web";
import FormInput from "../FormInput";
import { formatCurrency, unformatCurrency } from "@/helpers/formatCurrency";

interface ModalFinancingFormProps {
  formRef: any
  handleFormSubmit: (data: any) => void
  initialData?: any
}

export default function ModalFinancingForm(props: ModalFinancingFormProps) {
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
        <label htmlFor="firstDueDate" className="text-xs text-left">Primeiro vencimento</label>
        <FormInput name="firstDueDate" placeholder="Data da primeira parcela" dataType="date" />
      </div>
    </Form>
  )
}
