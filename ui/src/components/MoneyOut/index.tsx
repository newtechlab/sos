import { useEffect, useState } from "react";
import { Button, Container, Grid, Icon, Table } from "semantic-ui-react";
import { LedgerRow } from "../../App"

import AddMoneyOutModal from "../AddMoneyOutModal";
import { sortLedger } from "../../data/Ledger";
import BackForwardControls from "../BackForwardControls";
import { StyledBoxSection } from "../StyledBoxSection";
import { StyledGrid, StyledGridRow, StyledGridRowBottom } from "../MoneyIn";

interface MoneyOutProps {
    ledger: Array<LedgerRow>
    addLedgerRow: (_: LedgerRow) => void
    removeLedgerRow: (id: string) => void 
    completeStep: () => void
    goBack: () => void
}

export default function MoneyOut(props: MoneyOutProps) {
    const [addMoneyOutModalOpen, setAddMoneyOutModalOpen] = useState<boolean>(false);
    const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
    // const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
    const { ledger, addLedgerRow, removeLedgerRow, completeStep, goBack } = props;
    
    // useEffect(() => {
    //     const data = {
    //         labels: chartLabels,
    //         datasets: [
    //           {
    //             label: 'Penger Ut',
    //             data: pengerUt(chartLabels, sortedLedger),
    //             backgroundColor: PengerUtColour,
    //           },
    //         ],
    //       };

    //       setGraphData(data);
    //   }, [sortedLedger]);

    useEffect(() => {
        setSortedLedger(sortLedger(ledger));
      }, [ledger]);


    return <Container>

        { addMoneyOutModalOpen && <AddMoneyOutModal 
            open={addMoneyOutModalOpen} 
            setOpen={setAddMoneyOutModalOpen} 
            addLedgerRow={addLedgerRow}   /> }

        <h1>Regninger og Kostnader</h1>    
        <StyledBoxSection>
            
            <StyledGrid>
                    { sortedLedger.length > 0 && 
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <strong>Item</strong>
                        </Grid.Column>
                        {/* <Grid.Column width={4}>
                            Ordning
                        </Grid.Column> */}
                        <Grid.Column width={4}>
                            <strong>Category</strong>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <strong>Amount</strong>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <strong>Day of month</strong>
                        </Grid.Column>
                    </Grid.Row> }   
                        { sortedLedger.map( (row) => {
                            if (row.accountTo === "user") {
                                return <StyledGridRow key={row.id}>
                                        <Grid.Column width={4}>{row.accountTo}</Grid.Column>
                                        <Grid.Column width={4}>{row.category}</Grid.Column>
                                        <Grid.Column width={4}>{row.amount}</Grid.Column>
                                        <Grid.Column width={3}>{row.dayOfMonth}</Grid.Column>
                                        <Grid.Column width={1}>
                                            <Icon
                                                onClick={() => { removeLedgerRow(row.id) }}
                                                name="trash alternate outline" 
                                                color="blue" 
                                            />
                                        </Grid.Column>
                                    </StyledGridRow>
                            } else {
                                return null
                            }
                        })} 
                        <StyledGridRowBottom>
                            <Grid.Column width={16}>
                                <Button circular color="blue" onClick={() => {
                                    setAddMoneyOutModalOpen(true);
                                }}><Icon name='plus' />Legg til kostnader</Button>
                            </Grid.Column>
                        </StyledGridRowBottom>
                </StyledGrid> 

        </StyledBoxSection>

        {/* <StyledGraphContainer>
            <Bar options={chartOptions} data={graphData} />
        </StyledGraphContainer> */}

    
        {/* <NextButton completeStep={() => completeStep()} /> */}

        

        <BackForwardControls goBack={() => goBack() } completeStep={completeStep} />   

    </Container>
}

// const StyledGraphContainer = styled.div`
//     height: 100px;
// `