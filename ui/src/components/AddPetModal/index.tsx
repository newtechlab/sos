import { Button, Image, Grid, Icon, Input, Modal } from "semantic-ui-react";
import { LedgerRow, Pet, TransactionCategory } from "../../App";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { StyledGrid, StyledGridRow, StyledGridRowBottom } from "../MoneyIn";
import { StyledCard } from "../StyledFamilyCard";
import styled from "styled-components";
import dog from "./dog.png";

interface AddPetProps {
  open: boolean;
  setOpen: (_: boolean) => void;
  pets: Array<Pet>;
  setPets: (_: Array<Pet>) => void;
}

export default function AddPetModal(props: AddPetProps) {
  const [pet, setPet] = useState<string | undefined>(undefined);
  const { open, setOpen, pets, setPets } = props;

  return (
    <Modal onClose={() => setOpen(false)} open={open} pets={pets}>
      <Modal.Header>Legg til dyr</Modal.Header>
      <StyledImageBackground>
        <Modal.Content image>
          <StyledImageSpace>
            <Image size="medium" src={dog} wrapped />
          </StyledImageSpace>
        </Modal.Content>
      </StyledImageBackground>
      {/* <Modal.Content>
        Dina dyr, tex hund eller katt
      </Modal.Content> */}
      <Modal.Actions>
        <StyledGrid>
          <StyledGridRowBottom>
            <Grid.Column width={3}>
              <Button
                circular
                basic
                color="blue"
                onClick={() => setOpen(false)}
              >
                Avbryt
              </Button>
            </Grid.Column>
            {/* <Input 
                placeholder="Coffee" 
                onChange={ (_, data) => { setTo(data.value?.toString()) }} /> */}
            <Grid.Column width={8}>
              <Input
                placeholder="Skriv inn dyret her (f.eks Hest)"
                style={{ width: "100%" }}
                onChange={(_, data) => {
                  setPet(data.value?.toString());
                }}
              />
            </Grid.Column>

            <Grid.Column width={4}>
              <Button
                circular
                color="blue"
                onClick={() => {
                  if (pet) {
                    setPets([...pets, { id: uuidv4(), name: pet, type: pet }]);
                  }
                  setOpen(false);
                }}
              >
                <Icon name="plus" />
                Legg til
              </Button>
            </Grid.Column>
          </StyledGridRowBottom>
        </StyledGrid>
      </Modal.Actions>
    </Modal>
  );
}

const CenterTextDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AddPetCard = styled.div`
  margin: 10px;
  background: unset !important;
  border: 2px dashed #a5c8d7;
  width: 212px;
  height: 206px;
  position: relative;
  border-radius: 5px;
  cursor: pointer;
`;
const StyledImageBackground = styled.div`
  background-color: #f1f8f8;
  text-align: center;
`;

const StyledImageSpace = styled.div`
  padding: 1em;
`;
