import { Button } from "semantic-ui-react";
import { FamilyMember, User } from "../../App";

export interface UserDetailsProps {
  user: User | undefined
  setUserDetails: (_: User) => void;
  addFamilyMember: (_: FamilyMember) => void;
}



export default function UserDetails(props: UserDetailsProps) {
  const {addFamilyMember, user} = props
  const familyMember: FamilyMember = {
    age : 0
  }
    return <>
      <Button onClick={() => {addFamilyMember(familyMember)}}>Update</Button>
    </>
}

// {user ? user.familyMembers.map((familyMember) => <div key={familyMember.age}>1</div>) : <div/>}

