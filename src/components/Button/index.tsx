import React from "react"


interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
  customClassess?: string
}

export default function Button(props: ButtonProps){
  return (
    <button
      {...props}
      className={props.customClassess || `default-button rounded px-4 ml-2 text-sm`}
    >
      {props.text}
    </button>
  )
}
