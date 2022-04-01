import { Button, Dropdown, Input, Modal } from "semantic-ui-react";
import { LedgerRow } from "../../App";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { getDaysOfMonthDropdown } from "../../data/DaysOfMonth";

interface AddMoneyOutModalProps {
    open: boolean;
    setOpen: (_: boolean) => void; 
    addLedgerRow: (_: LedgerRow) => void
}

export default function AddMoneyInModal(props: AddMoneyOutModalProps) {
    const [to, setTo] = useState<string | undefined>(undefined);
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
            Money that you pay each month
            <ul>
                <li>Transport</li>
                <li>Coffee</li>
                <li>Shopping</li>
            </ul>
        </Modal.Content>
        <Modal.Actions>
            <Input 
                placeholder="Coffee" 
                onChange={ (_, data) => { setTo(data.value?.toString()) }} />
            <Input
                placeholder='Amount'
                onChange={ (_, data) => { setAmount(parseInt(data.value?.toString() || "0", 10)) }  }
            />
            <Dropdown
                placeholder='Day of Month'
                selection
                options={getDaysOfMonthDropdown()}
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
                    if (to && amount && day) {
                        addLedgerRow({
                            id: uuidv4(), 
                            dayOfMonth: day,
                            amount: amount,
                            accountFrom: "user",
                            accountTo: to
                        })
                        setOpen(false)
                    } else {
                        console.log("missing var", to)
                        console.log("missing var", amount)
                        console.log("missing var", day)
                    }                   
                }}
            />
        </Modal.Actions>
    </Modal>
}