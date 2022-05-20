import styled from "styled-components";
import {
  Button,
  Header,
  Segment,
  TransitionablePortal,
} from "semantic-ui-react";
import { Fragment } from "react";

interface AddHelpTextModalProps {
  open: boolean;
  setOpen: (_: boolean) => void;
}

export default function OpenHelpTextModal(props: AddHelpTextModalProps) {
  const { open, setOpen } = props;
  const transition = {
    animation: "fly left",
    duration: 300,
  };

  return (
    <Fragment>
      <LabelButton onClick={() => setOpen(true)}>
        Trenger du hjelp med å finne ut din samlede gjeld?
      </LabelButton>
      <TransitionablePortal
        onClose={() => setOpen(false)}
        open={open}
        transition={transition}
      >
        <Segment
          style={{
            right: "0",
            position: "fixed",
            top: "0",
            bottom: "0",
            zIndex: 1000,
          }}
        >
          <StyledModalSidebar>
            <Header>Hvordan finne din samlede gjeld?</Header>
            <p>Paragrafer og greier om gjeld</p>
            <Button circular basic color="blue" onClick={() => setOpen(false)}>
              Lukk
            </Button>
          </StyledModalSidebar>
        </Segment>
      </TransitionablePortal>
    </Fragment>
  );
}
const LabelButton = styled.button`
  border: 0px;
  color: #3d8eb1;
  background-color: #f1f8f8;
  font-family: Montserrat !important;
  font-weight: 300;
  position: absolute;
  top: 0px;
  right: 0px;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledModalSidebar = styled.div`
  padding: 3em;
`;
