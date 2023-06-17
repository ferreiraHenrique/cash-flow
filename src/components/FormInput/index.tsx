import { useField } from "@unform/core"
import { useEffect, useRef } from "react"


interface FormInputProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string
  customClasses?: string
}

export default function FormInput({name, customClasses, ...rest}: FormInputProps) {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      }
    })
  }, [fieldName, registerField])

  return <input
    name={name}
    ref={inputRef}
    defaultValue={defaultValue}
    {...rest}
    className={`placeholder:text-gray-500 text-sm rounded border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 focus:shadow-primary-outline w-full ${customClasses}`}
  />
}
