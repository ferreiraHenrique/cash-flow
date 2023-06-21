import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { useField } from '@unform/core'


const Selector = styled.div<{
  width: number,
  start: number
}>`
  box-shadow: rgb(221, 221, 221) 0px 1px 5px 1px;
  padding: 0px;
  transition: all 0.5s ease 0s;
  transform: translate3d(${props => props.start}px, 0px, 0px);
  width: ${props => props.width}%;
`

interface FormInlineSelectProps {
  name: string
  options: any[]
}

export default function FormInlineSelect(props: FormInlineSelectProps) {
  const ref = useRef<HTMLLIElement | null>(null)

  const [start, setStart] = useState(0)
  const width = 100 / 2

  const inputRef = useRef<HTMLInputElement | null>(null)
  const { fieldName, defaultValue, registerField, error } = useField(props.name)
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
      },
    })
  }, [fieldName, registerField])

  useEffect(() => {
    const selected = inputRef?.current?.value || ''

    props.options.forEach((op, i) => {
      if (op.value.toString() == selected) {
        if (i == 0) return
        setStart(ref?.current?.clientWidth || 0)
      }
    })
  })

  return (
    <>
      <div className="relative right-0">
        <ul className="relative flex flex-wrap p-1 list-none bg-gray-50 rounded-xl">
          <li
            className="z-30 flex-auto text-center cursor-pointer"
            ref={ref}
            onClick={() => {
              setStart(0)
              if (!inputRef?.current) return
              inputRef.current.value = props.options[0].value
            }}
          >
            <a className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg bg-inherit text-slate-700">
              {props.options[0].children}
            </a>
          </li>

          {props.options.slice(1).map((op, i) => (
            <li
              className="z-30 flex-auto text-center cursor-pointer"
              key={i}
              onClick={() => {
                setStart(ref?.current?.clientWidth || 0);
                if (!inputRef?.current) return
                inputRef.current.value = op.value
              }}
            >
              <a className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg bg-inherit text-slate-700">
                {op.children}
              </a>
            </li>
          ))}

          <Selector
            className='z-10 absolute text-slate-700 rounded-lg bg-inherit flex-auto text-center bg-none border-0 block'
            width={width}
            start={start}
          >
            <a className='z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg text-slate-700 bg-white text-white'>
              -
            </a>
          </Selector>
        </ul>

        <input
          id={fieldName}
          name="isCredit"
          ref={inputRef}
          defaultValue={defaultValue}
          className='hidden'
        />
      </div>
    </>
  )
}
