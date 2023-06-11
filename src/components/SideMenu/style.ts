import { styled } from "styled-components"

export const Container = styled.aside`
  max-width: 16rem;
  padding: 4px;

  hr {
    margin-bottom: 16px;
  }
`

export const Logo = styled.a`
`

export const MenuItemList = styled.ul`
`

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
