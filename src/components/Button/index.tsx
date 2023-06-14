import React from "react"
import { styled } from "styled-components"


const Container = styled.button`
  border: 1px solid var(--main-color);
  color: var(--main-color);
`

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
}

export default function Button(props: ButtonProps){
  return (
    <Container
      {...props}
      className="rounded px-4 ml-2 text-sm"
    >
      {props.text}
    </Container>
  )
}
