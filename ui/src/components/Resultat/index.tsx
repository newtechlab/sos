import _ from "lodash";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "semantic-ui-react";
import { LedgerRow } from "../../App"
import AddMoneyInModal from "../AddMoneyInModal";
import styled from "styled-components";

import {
    ChartData,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { chartLabels, chartOptions, graphDataInitialState } from "../../chart/ChartSettings";
import { pengerInn, pengerUt, sortLedger } from "../../data/Ledger";

interface ResultatProps {
    ledger: Array<LedgerRow>
    removeLedgerRow: (id: string) => void 
    completeStep: () => void
}

export default function Resultat(props: ResultatProps) {
    const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
    const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
    const { ledger, completeStep } = props;
    
    useEffect(() => {
        const data = {
            labels: chartLabels,
            datasets: [
              {
                label: 'Penger Inn',
                data: pengerInn(chartLabels, sortedLedger),
                backgroundColor: 'rgb(255, 99, 132)',
                },
              {
                label: 'Penger Ut',
                data: pengerUt(chartLabels, sortedLedger),
                backgroundColor: 'rgb(75, 192, 192)',
              },
            ],
          };

          setGraphData(data);
      }, [sortedLedger]);

    useEffect(() => {
        setSortedLedger(sortLedger(ledger));
      }, [ledger]);


    return <Container>

        <h1>Resultat</h1>

        <StyledGraphContainer>
            <Bar options={chartOptions} data={graphData} />
        </StyledGraphContainer>

        <Button onClick={() => {
            completeStep();
        }}>Finish</Button>

        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Day of month</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            { sortedLedger.map( (row) => {
                return <Table.Row key={row.id}>
                    <Table.Cell>{row.accountFrom}</Table.Cell>
                    <Table.Cell>{row.amount}</Table.Cell>
                    <Table.Cell>{row.dayOfMonth}</Table.Cell>
                    </Table.Row>
            })} 
            </Table.Body>
        </Table>
    </Container>
}

const StyledGraphContainer = styled.div`
    height: 100px;
`