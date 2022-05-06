import { useEffect, useState } from "react";
import { Button, Container, Grid, Icon } from "semantic-ui-react";
import { LedgerRow } from "../../App"
import AddMoneyInModal from "../AddMoneyInModal";

import { sortLedger } from "../../data/Ledger";
import { StyledBoxSection } from "../StyledBoxSection";
import BackForwardControls from "../BackForwardControls";
import styled from "styled-components";

interface MoneyInProps {
    ledger: Array<LedgerRow>
    addLedgerRow: (_: LedgerRow) => void
    removeLedgerRow: (id: string) => void 
    completeStep: () => void
    goBack: () => void
}

export default function MoneyIn(props: MoneyInProps) {
    const [addMoneyInModalOpen, setAddMoneyInModalOpen] = useState<boolean>(false);
    const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
    // const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
    const { ledger, addLedgerRow, removeLedgerRow, completeStep, goBack } = props;
    
    // useEffect(() => {
    //     const data = {
    //         labels: chartLabels,
    //         datasets: [
    //           {
    //             label: 'Penger Inn',
    //             data: pengerInn(chartLabels, sortedLedger),
    //             backgroundColor: 'rgb(255, 99, 132)',
    //           },
    //         ],
    //       };

    //       setGraphData(data);
    //   }, [sortedLedger]);

    useEffect(() => {
        setSortedLedger(sortLedger(ledger));
      }, [ledger]);


    return <Container>

        { addMoneyInModalOpen && <AddMoneyInModal open={addMoneyInModalOpen} setOpen={setAddMoneyInModalOpen} addLedgerRow={addLedgerRow}   /> }

        <h1>Lønn og andre støtteordninger</h1>

        <StyledBoxSection>
            
                <StyledGrid>
                    { sortedLedger.length > 0 && 
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <strong>Utbetaler</strong>
                        </Grid.Column>
                        {/* <Grid.Column width={4}>
                            Ordning
                        </Grid.Column> */}
                        <Grid.Column width={6}>
                            <strong>Intervall</strong>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <strong>Beløp</strong>
                        </Grid.Column>
                    </Grid.Row> }   
                        { sortedLedger.map( (row) => {
                            if (row.accountTo === "user") {
                                return <StyledGridRow key={row.id}>
                                        <Grid.Column width={6}>{row.accountFrom}</Grid.Column>
                                        <Grid.Column width={6}>{row.amount}</Grid.Column>
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
                                    setAddMoneyInModalOpen(true);
                                }}><Icon name='plus' />Legg til inntekt</Button>
                            </Grid.Column>
                        </StyledGridRowBottom>
                </StyledGrid> 

            

        </StyledBoxSection>

        
{/* 
        <StyledGraphContainer>
            <Bar options={chartOptions} data={graphData} />
        </StyledGraphContainer> */}

        <BackForwardControls goBack={() => goBack()} completeStep={completeStep} />    

        
    </Container>
}

export const StyledGridRowBottom = styled(Grid.Row)`
    text-align: center;
`

export  const StyledGrid = styled(Grid)`
    width: 100%;
    text-align: left;
`

export const StyledGridRow = styled(Grid.Row)`
    border: 1px solid #3D8EB1;
    border-radius: 5px;
    margin-bottom: 10px;
`

{/* <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Day of month</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                { sortedLedger.map( (row) => {

                    if (row.accountTo === "user") {
                        return <Table.Row key={row.id}>
                            <Table.Cell>{row.accountFrom}</Table.Cell>
                            <Table.Cell>{row.amount}</Table.Cell>
                            <Table.Cell>{row.dayOfMonth}</Table.Cell>
                            </Table.Row>
                    } else {
                        return null
                    }

                })} 
                </Table.Body>
            </Table> */}

// const StyledGraphContainer = styled.div`
//     height: 100px;
// `