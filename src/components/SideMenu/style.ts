import { styled } from "styled-components"


export const MenuItem = styled.li`
  text-align: center;

  a {
    padding: 10px;
  }

  &.selected {
    background-color: rgb(94 114 228 / 0.13);

    a {
      font-weight: bold;
    }
  }
`
