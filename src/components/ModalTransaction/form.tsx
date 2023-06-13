import { formatCurrency, unformatCurrency } from "@/helpers/formatCurrency";
import { Form } from "@unform/web";
import FormInput from "../FormInput";

interface ModalTransactionFormProps {
  formRef: any
  handleFormSubmit: (data: any) => void
  initialData?: any
}

export default function ModalTransactionForm(props: ModalTransactionFormProps) {
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
          <FormInput name="amount" placeholder="Valor (R$)" onInput={onInputAmount} />
        </div>
        <div className="mb-4">
          <FormInput name="discount" placeholder="Desconto (R$)" onInput={onInputAmount} />
        </div>
      </div>
    </Form>
  )
}
