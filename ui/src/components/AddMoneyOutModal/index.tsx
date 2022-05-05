import { Button, Dropdown, Input, Modal } from "semantic-ui-react";
import { LedgerRow, TransactionCategory } from "../../App";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { getDaysOfMonthDropdown } from "../../data/DaysOfMonth";

interface AddMoneyOutModalProps {
    open: boolean;
    setOpen: (_: boolean) => void; 
    addLedgerRow: (_: LedgerRow) => void
}

interface MoneyOutAndCategory {
    name: string;
    category: TransactionCategory;
}

interface DropDownItem {
    key: string;
    text: string;
    value: string;
}

const convertDropdownItem = (item: MoneyOutAndCategory): DropDownItem => {
    return { 
        key: item.name,
        text: item.name,
        value: item.name,
    }
}

export default function AddMoneyInModal(props: AddMoneyOutModalProps) {
    const [to, setTo] = useState<string | undefined>(undefined);
    const [moneyOutItems, setMoneyOutItems] = useState<Map<string,MoneyOutAndCategory>>(new Map<string,MoneyOutAndCategory>()); 
    const [dropDownItems, setDropDownItems] = useState<DropDownItem[]>([]); 
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [day, setDay] = useState<number | undefined>(undefined);
    const { open, setOpen, addLedgerRow } = props;

    useEffect(() => {
        const items = new Map<string,MoneyOutAndCategory>();
        items.set("Streaming service", {
            name: "Streaming service",
            category: TransactionCategory.Personal
        });
        items.set("Mortgage/Rent", {
            name: "Mortgage/Rent",
            category: TransactionCategory.Housing
        });
        setMoneyOutItems(items);
    }, [])

    useEffect(() => {
        const dropDownItems: DropDownItem[] = [];
        moneyOutItems.forEach((value) => {
            const i = convertDropdownItem(value);
            dropDownItems.push(i)
        })
        setDropDownItems(dropDownItems);
    }, [moneyOutItems])

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
            {/* <Input 
                placeholder="Coffee" 
                onChange={ (_, data) => { setTo(data.value?.toString()) }} /> */}
            <Dropdown
                placeholder='i.e. Rent'
                selection
                options={dropDownItems}
                onChange={ (_, data) => { 
                    setTo(data.value?.toString()) 
                                 }}/>
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
                            accountTo: to,
                            category:  moneyOutItems.get(to)?.category || TransactionCategory.Undefined })
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