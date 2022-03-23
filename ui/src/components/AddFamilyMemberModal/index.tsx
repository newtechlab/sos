import { Button, Card, Dropdown, Header, Icon, Image, Input, Modal } from "semantic-ui-react";
import { FamilyMember } from "../../App";
import family from './family.png';
import { v4 as uuidv4 } from 'uuid';

interface AddFamilyMemberModalProps {
    open: boolean;
    setOpen: (_: boolean) => void; 
    addFamilyMember: (_: FamilyMember) => void;
}

const ageOptions = [
    {
      key: 'baby',
      text: 'baby',
      value: 'baby',
    //   image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
    {
      key: 'adult',
      text: 'adult',
      value: 'aduly',
    //   image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    }
  ]

export default function AddFamilyMemberModal(props: AddFamilyMemberModalProps) {
    const { open, setOpen, addFamilyMember } = props;

    const newFamilyMember: FamilyMember = {
        id: uuidv4(), 
        age: 0
      }

    return <Modal
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Show Modal</Button>}
    >
        <Modal.Header>Legg til familiemedlem</Modal.Header>
        <Modal.Content image>      
            <Image size='medium' src={family} wrapped />
        </Modal.Content>
        <Modal.Actions>
            <Input placeholder="Bob" />
            <Dropdown
                placeholder='Age'
                selection
                options={ageOptions}
            />
            <Button color='black' onClick={() => setOpen(false)}>
                cancel
            </Button>
            <Button
                content="Add"
                positive
                onClick={() => {
                    addFamilyMember(newFamilyMember)
                    setOpen(false)
                }}
            />
        </Modal.Actions>
    </Modal>
}