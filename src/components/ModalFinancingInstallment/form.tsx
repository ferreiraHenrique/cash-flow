import { Form } from "@unform/web";
import FormInput from "../FormInput";
import { formatCurrency, unformatCurrency } from "@/helpers/formatCurrency";

interface ModalFinancingInstallmentFormProps {
  formRef: any
  handleFormSubmit: (data: any) => void
  initialData?: any
}

export default function ModalFinancingInstallmentForm(props: ModalFinancingInstallmentFormProps) {
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
        <FormInput name="amount" placeholder="Valor (R$)" onInput={onInputAmount} />
      </div>
      <div className="mb-4 grid gap-2 grid-cols-[30%,1fr] items-center">
        <label htmlFor="date" className="text-xs text-left">Data</label>
        <FormInput name="date" dataType="date" />
      </div>
    </Form>
  )
}
