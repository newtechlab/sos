import { Button, Container, Grid, Input, Modal } from "semantic-ui-react";
import { LedgerRow, StyledOverridesDiv } from "../../App";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import DaySelector from "../DaySelector";
import styled from "styled-components";

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
        <StyledModalContent>   
            <StyledOverridesDiv>  
                <Container>
                    <h1> Ny inntekt </h1>

                    <StyledModalBody>
                        Money that comes to you each month such as
                        <ul>
                            <li>Salary</li>
                            <li>Benefits</li>
                            <li>ect</li>
                        </ul>

                        <Grid columns={2}>
                            <Grid.Column width={2}>Item</Grid.Column>
                            <Grid.Column width={14}>
                                <Input 
                                placeholder="Salary" 
                                onChange={ (_, data) => { setFrom(data.value?.toString()) }} />
                            </Grid.Column>
                            <Grid.Column width={2}>Amount</Grid.Column>
                            <Grid.Column width={14}>
                                <Input
                                    placeholder='Amount'
                                    onChange={ (_, data) => { setAmount(parseInt(data.value?.toString() || "0", 10)) }  }
                                />
                            </Grid.Column>

                        </Grid>

                        <br/>    

                        <DaySelector itemSelected={(day) => { setDay(day) }} />

                        <br/>

                        <Grid columns={2}>
                            <Grid.Column>
                                <Button 
                                    basic 
                                    circular 
                                    color="teal"
                                    onClick={() => setOpen(false)}>
                                    cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column textAlign="right">
                                <Button
                                    content="Add"
                                    circular 
                                    color="teal"
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
                            </Grid.Column>
                        </Grid>    

                        
                        
                    </StyledModalBody>
                </Container>
            </StyledOverridesDiv>

        </StyledModalContent>

        {/* <Modal.Actions> */}
            
            {/* <Dropdown
                placeholder='Day of Month'
                selection
                options={getDaysOfMonthDropdown()}
                onChange={ (_, data) => { 
                    setDay(parseInt(data.value?.toString() || "1", 10)) 
                }}
            /> */}
           
        {/* </Modal.Actions> */}
    </Modal>
}

export const StyledModalContent = styled(Modal.Content)`
    padding: 0 !important;  
`;

export const StyledModalBody = styled.div`
    background-color: #f1f8f8;  
    padding: 20px;
`;