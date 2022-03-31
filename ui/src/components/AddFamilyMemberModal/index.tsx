import { Button, Card, Dropdown, Header, Icon, Image, Input, Modal } from "semantic-ui-react";
import { FamilyMember } from "../../App";
import family from './family.png';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

interface AddFamilyMemberModalProps {
    open: boolean;
    setOpen: (_: boolean) => void; 
    addFamilyMember: (_: FamilyMember) => void;
}

const ageOptions = [
    {
      key: '0-3',
      text: '0-3',
      value: '0-3',
    //   image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
    {
      key: '4-14',
      text: '4-14',
      value: '4-14',
    //   image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    },
    {
      key: '15-24',
      text: '15-24',
      value: '15-24',
    //   image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    },
    {
      key: '25+',
      text: '25+',
      value: '25+',
    //   image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    }
  ]

export default function AddFamilyMemberModal(props: AddFamilyMemberModalProps) {
    const [name, setName] = useState<string | undefined>(undefined);
    const [age, setAge] = useState<string | undefined>(undefined);
    const { open, setOpen, addFamilyMember } = props;

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
            <Input placeholder="Bob" onChange={ (_, data) => { setName(data.value?.toString()) }} />
            <Dropdown
                placeholder='Age'
                selection
                options={ageOptions}
                onChange={ (_, data) => { setAge(data.value?.toString()) }  }
            />
            <Button color='black' onClick={() => setOpen(false)}>
                cancel
            </Button>
            <Button
                content="Add"
                positive
                onClick={() => {
                    if (name && age) {
                        addFamilyMember({
                            id: uuidv4(), 
                            name: name,
                            age: age
                        })
                        setOpen(false)
                    }                    
                }}
            />
        </Modal.Actions>
    </Modal>
}