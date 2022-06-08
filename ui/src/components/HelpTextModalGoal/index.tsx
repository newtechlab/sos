import styled from "styled-components";
import {
  Button,
  Header,
  Icon,
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
        Hvorfor spør vi om dette?
      </LabelButton>
      <TransitionablePortal
        onClose={() => setOpen(false)}
        open={open}
        transition={transition}
      >
        <StyledSegment
          style={{
            right: "0",
            position: "fixed",
            top: "0",
            bottom: "0",
            zIndex: 1000,
          }}
        >
          <Button icon circular color="blue" onClick={() => setOpen(false)}>
            <Icon name="close" />
          </Button>
          <StyledModalSidebar>
            <StyledDiv>
              <Header>Hva mener vi med sparemål?</Header>
              <StyledParagraph>
                Med sparemål så mener vi om du har noe du sparer til? Har du en
                drøm om å kjøpe en bil, ta med familien på ferie eller noe annet
                som krever at du må spare penger? Ønsker du ganske enkelt bare å
                spare litt til framtiden?
              </StyledParagraph>
              <p>Legg inn et beløp som vi kan hjelpe deg å nå.</p>
            </StyledDiv>
          </StyledModalSidebar>
        </StyledSegment>

        {/* <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<LabelButton>Hvorfor spør vi om dette?</LabelButton>}
      >
        <Modal.Header>Hva mener vi med sparemål?</Modal.Header>

        <Modal.Actions>
          <p>
            Med sparemål så mener vi om du har noe du sparer til? Har du en drøm
            om å kjøpe en bil, ta med familien på ferie eller noe annet som krever
            at du må spare penger? Ønsker du ganske enkelt bare å spare litt til
            framtiden? Legg inn et beløp som vi kan hjelpe deg å nå.
          </p>
          <Button circular basic color="blue" onClick={() => setOpen(false)}>
            Lukk
          </Button>
        </Modal.Actions>
      </Modal> */}
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
const StyledDiv = styled.div`
  width: 40em;
`;

const StyledParagraph = styled.p`
  padding-top: 1em;
`;

const StyledSegment = styled(Segment)`
  margin-top: 0px !important;
`;
