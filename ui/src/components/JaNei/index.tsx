import { Grid } from "semantic-ui-react";
import styled, { css } from "styled-components";

interface JaNeiProps {
  optionOneSelected: boolean;
  optionOneText: string;
  optionOneClick: () => void;

  optionTwoSelected: boolean;
  optionTwoText: string;
  optionTwoClick: () => void;
}

export const JaNei = (props: JaNeiProps) => (
  <Grid columns={2}>
    <Grid.Column width={8}>
      <ButtonDotted
        selected={props.optionOneSelected}
        onClick={props.optionOneClick}
      >
        {props.optionOneText}
      </ButtonDotted>
    </Grid.Column>
    <Grid.Column width={8}>
      <ButtonDotted
        selected={props.optionTwoSelected}
        onClick={props.optionTwoClick}
      >
        {props.optionTwoText}
      </ButtonDotted>
    </Grid.Column>
  </Grid>
);

interface ButtonDottedProps {
  selected: boolean;
}

const ButtonDotted = styled.button<ButtonDottedProps>`
  border: 2px dashed #3d8eb1;
  border-radius: 0.5em;
  font-weight: bold !important;
  height: 145px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? "#ffffff" : "#F1F8F8")};
  border: 2px
    ${(props) => (props.selected ? "solid #3D8EB1" : "dashed #a5c8d7")};
  &:hover {
    background-color: #ffffff;
    border: 3px solid #3d8eb1;
    cursor: pointer;
  }
`;
