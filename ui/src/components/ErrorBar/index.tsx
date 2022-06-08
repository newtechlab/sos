import styled from "styled-components";
import { Icon } from "semantic-ui-react";

interface ErrorBarProps {
  msg: string;
}
export default function ErrorBar(props: ErrorBarProps) {
  return (
    <StyledError>
      <Icon name="exclamation" /> {props.msg}
    </StyledError>
  );
}

const StyledError = styled.div`
  background-color: #fdeeee;
  padding: 0.5em 1em 0.5em 2em;
  width: 300px;
  text-align: center;
  border-radius: 0.25em;
  margin: 1em 0 0 0;
`;
