import styled from "@emotion/styled";

export const Button = styled.button`
  position: absolute;
  top: 1%;
  right: 10%;

  background-color: #ffffff;
  color: #000000;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  border: none;
  border-radius: 2px;

  height: 40px;
  padding: 0 17px;

  cursor: pointer;

  transition: 250ms;

  &:hover {
    transform: scale(1.02);
  }
`