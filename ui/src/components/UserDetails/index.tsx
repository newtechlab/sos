import { useState } from "react";
import { Button, Card, Container } from "semantic-ui-react";
import { FamilyMember } from "../../App";
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
      <Card.Group>
        { familyMembers.map((fm) => {
          return <FamilyMemberCard />
        }) }
      </Card.Group>

      { addFamilyModalOpen && <AddFamilyMemberModal 
        addFamilyMember={addFamilyMember} 
        open={addFamilyModalOpen} 
        setOpen={setAddFamilyModalOpen} /> }

      <Button onClick={() => {
        setAddFamilyModalOpen(true);
      }}>Add Family Member</Button>

      <Button onClick={() => {
        completeStep();
      }}>Next</Button>

    </Container>
}
