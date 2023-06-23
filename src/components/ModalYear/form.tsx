import { Form } from "@unform/web"
import FormInput from "../FormInput"

interface ModalYearFormProps {
  formRef: any
  handleFormSubmit: (data: any) => void
  initialData?: any
}

export default function ModalYearForm(props: ModalYearFormProps) {
  return (
    <Form
      ref={props.formRef}
      onSubmit={props.handleFormSubmit}
      initialData={props.initialData}
    >
      <div className="mt-2 w-full">
        <div className="mb-4">
          <FormInput name="name" placeholder="Ano" />
        </div>
      </div>
    </Form>
  )
}
