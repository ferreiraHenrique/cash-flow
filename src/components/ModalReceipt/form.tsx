import { Form } from "@unform/web"
import FormInput from "../FormInput"
import { formatCurrency, unformatCurrency } from "@/helpers/formatCurrency"
import FormInlineSelect from "../FormInlineSelect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"


interface ModalReceiptFormProps {
  formRef: any
  handleFormSubmit: (data: any) => void
  initialData?: any
}

export default function ModalReceiptForm(props: ModalReceiptFormProps) {
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
