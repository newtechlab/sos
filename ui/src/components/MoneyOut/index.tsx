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
import AddMoneyOutModal from "../AddMoneyOutModal";

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
                data: chartLabels.map((l) => sortedLedger.find((i) => i.dayOfMonth === l && i.accountTo !== 'user')?.amount || 0),
                backgroundColor: 'rgb(75, 192, 192)',
              },
            //   {
            //     label: 'Dataset 3',
            //     data: labels.map((l) => sortedLedger.find((i) => i.dayOfMonth === l)?.dayOfMonth || 0),
            //     backgroundColor: 'rgb(53, 162, 235)',
            //   },
            ],
          };

          setGraphData(data);
      }, [sortedLedger]);

    useEffect(() => {
        setSortedLedger(_.orderBy(ledger, ["dayOfMonth"], ["asc"]));
      }, [ledger]);


    return <Container>

        { addMoneyOutModalOpen && <AddMoneyOutModal 
            open={addMoneyOutModalOpen} 
            setOpen={setAddMoneyOutModalOpen} 
            addLedgerRow={addLedgerRow}   /> }

        <h1>Penger Ut</h1>

        <StyledGraphContainer>
            <Bar options={chartOptions} data={graphData} />
        </StyledGraphContainer>

        <Button onClick={() => {
            setAddMoneyOutModalOpen(true);
        }}>Add Outgoings</Button>

        <Button onClick={() => {
            completeStep();
        }}>Next</Button>

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
        </Table>
    </Container>
}

const StyledGraphContainer = styled.div`
    height: 100px;
`