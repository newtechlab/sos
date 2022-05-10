import { useEffect, useState } from "react";
import { Button, Container, Grid, Icon } from "semantic-ui-react";
import { LedgerRow } from "../../App";
import AddMoneyInModal from "../AddMoneyInModal";

import { sortLedger } from "../../data/Ledger";
import { StyledBoxSection } from "../StyledBoxSection";
import BackForwardControls from "../BackForwardControls";
import styled from "styled-components";
import { StepDefinition, StepsState } from "../Steps";
import StepHeader from "../StepHeader";

interface MoneyInProps {
  ledger: Array<LedgerRow>;
  addLedgerRow: (_: LedgerRow) => void;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
}

export default function MoneyIn(props: MoneyInProps) {
  const [addMoneyInModalOpen, setAddMoneyInModalOpen] =
    useState<boolean>(false);
  const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
  const [filteredLedger, setFilteredLedger] = useState<LedgerRow[]>([]);
  // const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
  const {
    ledger,
    addLedgerRow,
    removeLedgerRow,
    completeStep,
    goBack,
    activeStep,
    steps,
  } = props;

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

  useEffect(() => {
    setFilteredLedger(
      sortedLedger.filter((row) => {
        return row.accountTo === "user";
      })
    );
  }, [sortedLedger]);

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader activeStep={activeStep} steps={steps} />
      </StyledHeader>
      <Container>
        <StyledContainerSpace>
          {addMoneyInModalOpen && (
            <AddMoneyInModal
              open={addMoneyInModalOpen}
              setOpen={setAddMoneyInModalOpen}
              addLedgerRow={addLedgerRow}
            />
          )}

          <h1>Lønn, støtteordninger og andre inntekter</h1>

          <StyledBoxSection>
            <StyledGrid>
              {filteredLedger.length > 0 && (
                <Grid.Row>
                  <Grid.Column width={6}>
                    <strong>Type inntekt</strong>
                  </Grid.Column>
                  {/* <Grid.Column width={4}>
                            Ordning
                        </Grid.Column> */}
                  <Grid.Column width={6}>
                    <strong>Beløp</strong>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <strong>Dato</strong>
                  </Grid.Column>
                </Grid.Row>
              )}
              {filteredLedger.map((row) => {
                if (row.accountTo === "user") {
                  return (
                    <StyledGridRow key={row.id}>
                      <Grid.Column width={6}>{row.accountFrom}</Grid.Column>
                      <Grid.Column width={6}>{row.amount}</Grid.Column>
                      <Grid.Column width={3}>{row.dayOfMonth}</Grid.Column>
                      <Grid.Column width={1}>
                        <Icon
                          onClick={() => {
                            removeLedgerRow(row.id);
                          }}
                          name="trash alternate outline"
                          color="blue"
                        />
                      </Grid.Column>
                    </StyledGridRow>
                  );
                } else {
                  return null;
                }
              })}
              <StyledGridRowBottom>
                <Grid.Column width={16}>
                  <Button
                    circular
                    color="blue"
                    onClick={() => {
                      setAddMoneyInModalOpen(true);
                    }}
                  >
                    <Icon name="plus" />
                    Legg til inntekt
                  </Button>
                </Grid.Column>
              </StyledGridRowBottom>
            </StyledGrid>
          </StyledBoxSection>

          {/* 
        <StyledGraphContainer>
            <Bar options={chartOptions} data={graphData} />
        </StyledGraphContainer> */}

          <BackForwardControls
            goBack={() => goBack()}
            completeStep={completeStep}
          />
        </StyledContainerSpace>
      </Container>
    </StyledBackgroundColour>
  );
}

export const StyledGridRowBottom = styled(Grid.Row)`
  text-align: center;
`;

export const StyledGrid = styled(Grid)`
  width: 100%;
  text-align: left;
`;

export const StyledGridRow = styled(Grid.Row)`
  border: 1px solid #3d8eb1;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const StyledBackgroundColour = styled.div`
  background-color: #f1f8f8;
  width: 100%;
`;

const StyledContainerSpace = styled.div`
  padding-top: 3em;
  padding-bottom: 4em;
`;
const StyledHeader = styled.div`
  background-color: #ffffff;
  width: 100%;
`;

// {
/* <Table>
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
            </Table> */
// }

// const StyledGraphContainer = styled.div`
//     height: 100px;
// `
