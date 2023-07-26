import { Form } from "@unform/web"
import FormInput from "../FormInput"


interface ModalCreditCardFormProps {
  fomrRef: any
  handleFormSubmit: (data: any) => void
  initialData?: any
}

export default function ModalCreditCardForm(props: ModalCreditCardFormProps) {
  return (
    <Form
      ref={props.fomrRef}
      onSubmit={props.handleFormSubmit}
      initialData={props.initialData}
    >
      <div className="mt-2 w-full">
        <div className="mb-4">
          <FormInput name="name" placeholder="Nome" />
        </div>
        <div className="mb-4">
          <FormInput name="lastNumbers" placeholder="Últimos 4 digitos" />
        </div>
      </div>
    </Form>
  )
}
