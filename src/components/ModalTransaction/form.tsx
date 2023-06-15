import { formatCurrency, unformatCurrency } from "@/helpers/formatCurrency";
import { Form } from "@unform/web";
import FormInput from "../FormInput";
import FormInlineSelect from "../FormInlineSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { MonthsContextType } from "@/types/month";
import { MonthsContext } from "@/contexts/MonthContext";
import { useContext } from "react";

interface ModalTransactionFormProps {
  formRef: any
  handleFormSubmit: (data: any) => void
  initialData?: any
}

export default function ModalTransactionForm(props: ModalTransactionFormProps) {
  const {monthSelected} = useContext(MonthsContext) as MonthsContextType

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
        <div className="mb-4">
          <FormInlineSelect
            name="isCredit"
            options={[
              {
                value: true,
                children: (
                  <>
                    <FontAwesomeIcon icon={faArrowUp} />
                    <span className="ml-2">Crédito</span>
                  </>
                )
              },
              {
                value: false,
                children: (
                  <>
                  <FontAwesomeIcon icon={faArrowDown} />
                  <span className="ml-2">Débito</span>
                </>
                )
              }
            ]}
          />
        </div>

        <FormInput
          name="monthId"
          defaultValue={monthSelected?.id}
        />
      </div>
    </Form>
  )
}
