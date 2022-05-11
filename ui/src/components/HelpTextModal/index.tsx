import { useState } from "react";
import styled from "styled-components";
import { Button, Grid, Icon, Image, Modal } from "semantic-ui-react";

interface AddHelpTextModalProps {
  open: boolean;
  setOpen: (_: boolean) => void;
}

export default function OpenHelpTextModal(props: AddHelpTextModalProps) {
  const { open, setOpen } = props;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<LabelButton>Leaser du bil?</LabelButton>}
    >
      <Modal.Header>Hvorfor spør vi om du leaser?</Modal.Header>

      <Modal.Actions>
        <p>Forklarende tekst om leasing og hvorfor vi trenger dette</p>
        <Button circular basic color="blue" onClick={() => setOpen(false)}>
          Lukk
        </Button>
      </Modal.Actions>
    </Modal>
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
