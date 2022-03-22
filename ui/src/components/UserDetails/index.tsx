import { Button } from "semantic-ui-react";

export interface UserDetailsProps {
  setUserDetails: (_: string) => void;
}


export default function UserDetails(props: UserDetailsProps) {
  const {setUserDetails} = props
    return <>
    <Button onClick={() => {setUserDetails("Foobar")}}>Update</Button>
    </>
}

