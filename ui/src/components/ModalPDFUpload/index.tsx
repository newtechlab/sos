import styled from "styled-components";
import {
  Button,
  Header,
  Segment,
  TransitionablePortal,
  Icon,
} from "semantic-ui-react";
import { Fragment } from "react";

interface PDFModalProps {
  open: boolean;
  setOpen: (_: boolean) => void;
}

export default function OpenPDFModal(props: PDFModalProps) {
  const { open, setOpen } = props;
  const transition = {
    animation: "fly left",
    duration: 300,
  };

  return (
    <Fragment>
      <Button color="blue" circular onClick={() => setOpen(true)}>
        Last opp PDF
      </Button>
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
              <Header>Har du gjprt dette før</Header>
              <StyledParagraph>
                Hvis du lastet ned PDFen så kan du laste den opp igjen her, så
                slipper du å legge inn alt på nytt.
              </StyledParagraph>
            </StyledDiv>
          </StyledModalSidebar>
        </StyledSegment>
      </TransitionablePortal>
    </Fragment>
  );
}

const StyledModalSidebar = styled.div`
  padding: 3em;
`;

const StyledDiv = styled.div`
  width: 40em;
`;

const StyledParagraph = styled.p`
  padding-top: 1em;
`;

export const StyledGaryBox = styled.div`
  padding: 2em;
  background-color: #f5f5f0;
  border-radius: 0.25em;
  margin-top: 2em;
  margin-bottom: 2em;
`;

const StyledSegment = styled(Segment)`
  margin-top: 0px !important;
  overflow: scroll;
`;
