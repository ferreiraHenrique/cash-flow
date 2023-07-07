import { Form } from "@unform/web"
import FormInput from "../FormInput"
import { formatCurrency, unformatCurrency } from "@/helpers/formatCurrency"


interface ModalExpenseFormProps {
  formRef: any
  handleFormSubmit: (data: any) => void
  initialData?: any
}

export default function ModalExpenseForm(props: ModalExpenseFormProps) {
  const onInputAmount = (event: any) => {
    const formatted = formatCurrency(unformatCurrency(event.target.value || 0))
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
          <FormInput name="baseAmount" placeholder="Valor base (R$)" onInput={onInputAmount} />
        </div>
      </div>
    </Form>
  )
}
