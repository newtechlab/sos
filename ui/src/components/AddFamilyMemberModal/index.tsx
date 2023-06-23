import {
  Button,
  Dropdown,
  Grid,
  Icon,
  Image,
  Input,
  Modal,
} from "semantic-ui-react";
import { FamilyMember } from "../../App";
import family from "./family.png";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import styled from "styled-components";
import { equal } from "assert";
import { StyledGridRowBottom, StyledGrid } from "../MoneyIn";

interface AddFamilyMemberModalProps {
  open: boolean;
  setOpen: (_: boolean) => void;
  addFamilyMember: (_: FamilyMember) => void;
}

const ageOptions = [
  {
    key: "0-3",
    text: "0-3",
    value: "0-3",
    //   image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: "4-14",
    text: "4-14",
    value: "4-14",
    //   image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
  {
    key: "15-24",
    text: "15-24",
    value: "15-24",
    //   image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
  {
    key: "25+",
    text: "25+",
    value: "25+",
    //   image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
];

export default function AddFamilyMemberModal(props: AddFamilyMemberModalProps) {
  const [name, setName] = useState<string | undefined>(undefined);
  const [age, setAge] = useState<string | undefined>(undefined);
  const { open, setOpen, addFamilyMember } = props;

  return (
    <Modal
      //   size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Legg til familiemedlem</Modal.Header>
      <StyledImageBackground>
        <Modal.Content image>
          <StyledImageSpace>
            <Image size="medium" src={family} wrapped />
          </StyledImageSpace>
        </Modal.Content>
      </StyledImageBackground>
      <Modal.Actions>
        <StyledGrid>
          <Grid.Row columns={4}>
            <Grid.Column textAlign="left">
              <Button
                circular
                basic
                color="blue"
                onClick={() => setOpen(false)}
              >
                Avbryt
              </Button>
            </Grid.Column>

            <Grid.Column>
              <Input
                placeholder="Navn"
                onChange={(_, data) => {
                  setName(data.value?.toString());
                }}
              />
            </Grid.Column>

            <Grid.Column>
              <Dropdown
                placeholder="Alder"
                selection
                options={ageOptions}
                onChange={(_, data) => {
                  setAge(data.value?.toString());
                }}
              />
            </Grid.Column>

            <Grid.Column textAlign="right">
              <Button
                circular
                color="blue"
                onClick={() => {
                  if (name && age) {
                    addFamilyMember({
                      id: uuidv4(),
                      name: name,
                      age: age,
                    });
                    setOpen(false);
                  }
                }}
              >
                <Icon name="plus" />
                Legg til
              </Button>
            </Grid.Column>
          </Grid.Row>
        </StyledGrid>
      </Modal.Actions>
    </Modal>
  );
}
const StyledImageBackground = styled.div`
  background-color: #f1f8f8;
  text-align: center;
`;

const StyledImageSpace = styled.div`
  padding: 1em;
`;
