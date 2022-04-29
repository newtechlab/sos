import { useEffect, useState } from "react";
import { Button, Container, Icon, Table } from "semantic-ui-react";
import { LedgerRow } from "../../App"
import styled from "styled-components";

import {
    ChartData,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { chartLabels, chartOptions, graphDataInitialState, PengerUtColour } from "../../chart/ChartSettings";
import AddMoneyOutModal from "../AddMoneyOutModal";
import { pengerUt, sortLedger } from "../../data/Ledger";
import NextButton from "../NextButton";
import BackForwardControls from "../BackForwardControls";
import { StyledBoxSection } from "../StyledBoxSection";

interface MoneyOutProps {
    ledger: Array<LedgerRow>
    addLedgerRow: (_: LedgerRow) => void
    removeLedgerRow: (id: string) => void 
    completeStep: () => void
}

export default function MoneyOut(props: MoneyOutProps) {
    const [addMoneyOutModalOpen, setAddMoneyOutModalOpen] = useState<boolean>(false);
    const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
    const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
    const { ledger, addLedgerRow, completeStep } = props;
    
    useEffect(() => {
        const data = {
            labels: chartLabels,
            datasets: [
              {
                label: 'Penger Ut',
                data: pengerUt(chartLabels, sortedLedger),
                backgroundColor: PengerUtColour,
              },
            ],
          };

          setGraphData(data);
      }, [sortedLedger]);

    useEffect(() => {
        setSortedLedger(sortLedger(ledger));
      }, [ledger]);


    return <Container>

        { addMoneyOutModalOpen && <AddMoneyOutModal 
            open={addMoneyOutModalOpen} 
            setOpen={setAddMoneyOutModalOpen} 
            addLedgerRow={addLedgerRow}   /> }

        <h1>Lønn og andre støtteordninger</h1>    
        <StyledBoxSection>
            
            { sortedLedger.length > 0 ? <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Item</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Day of month</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                { sortedLedger.map( (row) => {

                    if (row.accountTo !== "user") {
                        return <Table.Row key={row.id}>
                            <Table.Cell>{row.accountFrom}</Table.Cell>
                            <Table.Cell>{row.amount}</Table.Cell>
                            <Table.Cell>{row.dayOfMonth}</Table.Cell>
                            </Table.Row>
                    } else {
                        return <></>
                    }

                })} 
                </Table.Body>
            </Table> : <></> }

            <Button circular color="blue" onClick={() => {
                setAddMoneyOutModalOpen(true);
            }}><Icon name='plus' />Legg til inntekt</Button>

        </StyledBoxSection>

        {/* <StyledGraphContainer>
            <Bar options={chartOptions} data={graphData} />
        </StyledGraphContainer> */}

    
        {/* <NextButton completeStep={() => completeStep()} /> */}

        

        <BackForwardControls goBack={() => console.log("foo")} completeStep={completeStep} />   

    </Container>
}

const StyledGraphContainer = styled.div`
    height: 100px;
`