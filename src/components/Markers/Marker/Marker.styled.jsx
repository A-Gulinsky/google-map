import styled from "@emotion/styled";

import { ReactComponent as DeleteIcon } from "../../../assets/icon-delete.svg";

export const Span = styled.span`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  
  border-radius: 20px;

  background-color: #492a2a;
  color: white;

  font-size: 30px;
  z-index: 1;
`

export const TestDiv = styled.div`
  position: absolute;
  top: 0;
  left: 48px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;


  background-color: #000000d9;
  padding: 5px 7px;
  border-radius: 6px;
  width: 130px;
  z-index: 200;
`

export const ButtonDelete = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;

  display: block;
  margin-left: auto;

  margin-left: auto;

  cursor: pointer;
  margin-top: 10px;
`

export const Delete = styled(DeleteIcon)`
  width: 20px;
  height: 20px;
  fill: #692323;
`

export const DetailsText = styled.p`
  text-align: left;
  font-size: 16px;
  color: #5c5c5c;
  font-weight: 600;

  & span {
    display: inline-block;
    margin-left: auto;
    font-weight: 600;
    color: #03abff;
  }
`

export const TimeStamp = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #427c6bcf;

  margin-top: 10px;
`