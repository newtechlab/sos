import { useState } from "react";
import { Button, Card, Container } from "semantic-ui-react";
import styled from "styled-components";
import { FamilyMember } from "../../App";
import AddFamilyMemberCard from "../AddFamilyMemberCard";
import AddFamilyMemberModal from "../AddFamilyMemberModal";
import FamilyMemberCard from "../FamilyMemberCard";

export interface UserDetailsProps {
  familyMembers: Array<FamilyMember>;
  addFamilyMember: (_: FamilyMember) => void;
  completeStep: () => void
}

export default function UserDetails(props: UserDetailsProps) {
  const [addFamilyModalOpen, setAddFamilyModalOpen] = useState<boolean>(false);
  const {addFamilyMember, familyMembers, completeStep} = props
    return <Container>

      <h1>Familiemedlemmer</h1>

      <Card.Group>
        { familyMembers.map((fm) => {
          return <FamilyMemberCard familyMember={fm} />
        }) }
        <AddFamilyMemberCard onClick={() => {setAddFamilyModalOpen(true)}} />
      </Card.Group>

      { addFamilyModalOpen && <AddFamilyMemberModal 
        addFamilyMember={addFamilyMember} 
        open={addFamilyModalOpen} 
        setOpen={setAddFamilyModalOpen} /> }

      <StyledBControlsDiv>

        {/* <Button onClick={() => {
          setAddFamilyModalOpen(true);
        }}>Add Family Member</Button> */}

        <Button circular color="teal" onClick={() => {
          completeStep();
        }}>Neste</Button>

      </StyledBControlsDiv>  

    </Container>
}

const StyledBControlsDiv = styled.div`
    text-align: right;
    padding-top: 40px;
    padding-bottom: 40px;
`
