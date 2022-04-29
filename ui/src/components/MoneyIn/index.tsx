import { useEffect, useState } from "react";
import { Button, Container, Grid, Icon, Table } from "semantic-ui-react";
import { LedgerRow } from "../../App"
import AddMoneyInModal from "../AddMoneyInModal";
import styled from "styled-components";

import {
    ChartData,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { chartLabels, chartOptions, graphDataInitialState } from "../../chart/ChartSettings";
import { pengerInn, sortLedger } from "../../data/Ledger";
import NextButton from "../NextButton";
import { StyledBoxSection } from "../StyledBoxSection";
import BackButton from "../BackButton";
import BackForwardControls from "../BackForwardControls";

interface MoneyInProps {
    ledger: Array<LedgerRow>
    addLedgerRow: (_: LedgerRow) => void
    removeLedgerRow: (id: string) => void 
    completeStep: () => void
}

export default function MoneyIn(props: MoneyInProps) {
    const [addMoneyInModalOpen, setAddMoneyInModalOpen] = useState<boolean>(false);
    const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
    const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
    const { ledger, addLedgerRow, completeStep } = props;
    
    useEffect(() => {
        const data = {
            labels: chartLabels,
            datasets: [
              {
                label: 'Penger Inn',
                data: pengerInn(chartLabels, sortedLedger),
                backgroundColor: 'rgb(255, 99, 132)',
              },
            ],
          };

          setGraphData(data);
      }, [sortedLedger]);

    useEffect(() => {
        setSortedLedger(sortLedger(ledger));
      }, [ledger]);


    return <Container>

        { addMoneyInModalOpen && <AddMoneyInModal open={addMoneyInModalOpen} setOpen={setAddMoneyInModalOpen} addLedgerRow={addLedgerRow}   /> }

        <h1>Inntekt og annen støtte</h1>

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

                    if (row.accountTo === "user") {
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
                setAddMoneyInModalOpen(true);
            }}><Icon name='plus' />Legg til inntekt</Button>

        </StyledBoxSection>

        
{/* 
        <StyledGraphContainer>
            <Bar options={chartOptions} data={graphData} />
        </StyledGraphContainer> */}

        <BackForwardControls goBack={() => console.log("foo")} completeStep={completeStep} />    

        
    </Container>
}

const StyledGraphContainer = styled.div`
    height: 100px;
`