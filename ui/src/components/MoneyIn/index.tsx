import _ from "lodash";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "semantic-ui-react";
import { LedgerRow } from "../../App"
import AddMoneyInModal from "../AddMoneyInModal";
import styled from "styled-components";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    plugins: {
      title: {
        display: false,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    // responsive: true,
    maintainAspectRatio : false,
    scales: {
      x: {
        stacked: true,
        gridLines: {
            display:false
        }
      },
      y: {
        stacked: true,
        gridLines: {
            display:false
        }
      },
    },
  };

  const labels = _.range(28).map((n) => { return (n+1)})

interface MoneyInProps {
    ledger: Array<LedgerRow>
    addLedgerRow: (_: LedgerRow) => void
    removeLedgerRow: (id: string) => void 
}

const graphDataInitialState = {
    labels,
    datasets: [],
  };

export default function MoneyIn(props: MoneyInProps) {
    const [addMoneyInModalOpen, setAddMoneyInModalOpen] = useState<boolean>(false);
    const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
    const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
    const { ledger, addLedgerRow } = props;
    
    useEffect(() => {
        const data = {
            labels,
            datasets: [
              {
                label: 'Penger Inn',
                data: labels.map((l) => sortedLedger.find((i) => i.dayOfMonth === l && i.accountTo === 'user')?.amount || 0),
                backgroundColor: 'rgb(255, 99, 132)',
              },
            //   {
            //     label: 'Dataset 2',
            //     data: labels.map((l) => sortedLedger.find((i) => i.dayOfMonth === l)?.dayOfMonth || 0),
            //     backgroundColor: 'rgb(75, 192, 192)',
            //   },
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

        { addMoneyInModalOpen && <AddMoneyInModal open={addMoneyInModalOpen} setOpen={setAddMoneyInModalOpen} addLedgerRow={addLedgerRow}   /> }

        <h1>Penger Inn</h1>

        <StyledGraphContainer>
            <Bar options={options} data={graphData} />
        </StyledGraphContainer>

        <Button onClick={() => {
            setAddMoneyInModalOpen(true);
        }}>Add income</Button>

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
        </Table>
    </Container>
}

const StyledGraphContainer = styled.div`
    height: 100px;
`