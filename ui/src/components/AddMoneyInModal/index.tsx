import { Button, Dropdown, Input, Modal } from "semantic-ui-react";
import { LedgerRow } from "../../App";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import _ from "lodash";

interface AddMoneyInModalProps {
    open: boolean;
    setOpen: (_: boolean) => void; 
    addLedgerRow: (_: LedgerRow) => void
}

export default function AddMoneyInModal(props: AddMoneyInModalProps) {
    const [from, setFrom] = useState<string | undefined>(undefined);
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [day, setDay] = useState<number | undefined>(undefined);
    const { open, setOpen, addLedgerRow } = props;

    return <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Show Modal</Button>}
    >
        <Modal.Header>Add money in</Modal.Header>
        <Modal.Content>      
            Money that comes to you each month such as
            <ul>
                <li>Salary</li>
                <li>Benefits</li>
                <li>ect</li>
            </ul>
        </Modal.Content>
        <Modal.Actions>
            <Input 
                placeholder="Salary" 
                onChange={ (_, data) => { setFrom(data.value?.toString()) }} />
            <Input
                placeholder='Amount'
                onChange={ (_, data) => { setAmount(parseInt(data.value?.toString() || "0", 10)) }  }
            />
            <Dropdown
                placeholder='Day of Month'
                selection
                options={_.range(28).map((n) => {
                    const k = (n+1).toString()
                    return {
                        key: k,
                        text: k,
                        value: k,
                      }
                }) }
                onChange={ (_, data) => { 
                    setDay(parseInt(data.value?.toString() || "1", 10)) 
                }}
            />
            <Button color='black' onClick={() => setOpen(false)}>
                cancel
            </Button>
            <Button
                content="Add"
                positive
                onClick={() => {
                    if (from && amount && day) {
                        addLedgerRow({
                            id: uuidv4(), 
                            dayOfMonth: day,
                            amount: amount,
                            accountFrom: from,
                            accountTo: "user" 
                        })
                        setOpen(false)
                    } else {
                        console.log("missing var", from)
                        console.log("missing var", amount)
                        console.log("missing var", day)
                    }                   
                }}
            />
        </Modal.Actions>
    </Modal>
}