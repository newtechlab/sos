import _ from "lodash";
import { useEffect, useState } from "react";
import { Button, Container, Progress, Table } from "semantic-ui-react";
import { LedgerRow } from "../../App"
import AddMoneyInModal from "../AddMoneyInModal";
import styled from "styled-components";

import {
    ChartData,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { chartLabels, chartOptions, graphDataInitialState, PengerInnColour, PengerUtColour } from "../../chart/ChartSettings";
import { pengerInn, pengerInnTotal, pengerUt, pengerUtTotal, sortLedger } from "../../data/Ledger";

interface ResultatProps {
    ledger: Array<LedgerRow>
    removeLedgerRow: (id: string) => void 
    completeStep: () => void
}

export default function Resultat(props: ResultatProps) {
    const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
    const [inTotal, setInTotal] = useState<number>(0);
    const [inPercent, setInPercent] = useState<number>(0);
    const [outTotal, setOutTotal] = useState<number>(0);
    const [outPercent, setOutPercent] = useState<number>(0);
    const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
    const { ledger, completeStep } = props;
    
    useEffect(() => {
        const data = {
            labels: chartLabels,
            datasets: [
              {
                label: 'Penger Inn',
                data: pengerInn(chartLabels, sortedLedger),
                backgroundColor: PengerInnColour,
                },
              {
                label: 'Penger Ut',
                data: pengerUt(chartLabels, sortedLedger),
                backgroundColor: PengerUtColour,
              },
            ],
          };

          setGraphData(data);

          const totalIn = pengerInnTotal(chartLabels, sortedLedger)  
          setInTotal(totalIn);
          const totalOut = pengerUtTotal(chartLabels, sortedLedger)
          setOutTotal(totalOut)

          const inPercent = totalIn / (totalIn + totalOut) * 100;
          const outPercent = totalOut / (totalIn + totalOut) * 100;
          setInPercent(inPercent);
          setOutPercent(outPercent);
      }, [sortedLedger]);

    useEffect(() => {
        setSortedLedger(sortLedger(ledger));
      }, [ledger]);  

    return <Container>

        <h1>Resultat</h1>

        <StyledGraphContainer>
            <Bar options={chartOptions} data={graphData} />
        </StyledGraphContainer>

        <StyledComparisonContainer>
            <div>
                <StyledBarTotal>{inTotal}kr</StyledBarTotal>
                <h3>Penger Inn</h3>
                <Progress size='small' percent={inPercent} color='green' />
            </div>
            <div>
                <StyledBarTotal>{outTotal}kr</StyledBarTotal>
                <h3>Penger Ut</h3>
                <Progress size='small' percent={outPercent} color='yellow' />
            </div>
        </StyledComparisonContainer>

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

const StyledBarTotal = styled.h3`
    position: relative;
    float: right;
`

const StyledGraphContainer = styled.div`
    height: 100px;
`

const StyledComparisonContainer = styled.div`
    padding: 50px;
    text-align: left;
`

