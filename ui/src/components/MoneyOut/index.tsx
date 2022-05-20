import { useEffect, useState } from "react";
import { Button, Container, Grid, Icon } from "semantic-ui-react";
import { LedgerRow } from "../../App";

import AddMoneyOutModal from "../AddMoneyOutModal";
import { calculateMoneyOut, sortLedger } from "../../data/Ledger";
import BackForwardControls from "../BackForwardControls";
import { StyledBoxSection } from "../StyledBoxSection";
import { StyledGrid, StyledGridRow, StyledGridRowBottom } from "../MoneyIn";
import { StepDefinition, StepsState } from "../Steps";
import StepHeader from "../StepHeader";
import styled from "styled-components";
import MoneyTotal from "../MoneyTotal";

interface MoneyOutProps {
  ledger: Array<LedgerRow>;
  addLedgerRow: (_: LedgerRow) => void;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
  categories: Set<string>;
}

export default function MoneyOut(props: MoneyOutProps) {
  const [addMoneyOutModalOpen, setAddMoneyOutModalOpen] =
    useState<boolean>(false);
  const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
  const [filteredLedger, setFilteredLedger] = useState<LedgerRow[]>([]);
  const [moneyOut, setMoneyOut] = useState<number>(0);
  // const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
  const {
    ledger,
    addLedgerRow,
    removeLedgerRow,
    completeStep,
    goBack,
    activeStep,
    steps,
    categories
  } = props;

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

  useEffect(() => {
    setFilteredLedger(
      sortedLedger.filter((row) => {
        return row.accountFrom === "user";
      })
    );
    setMoneyOut(calculateMoneyOut(sortedLedger))
  }, [sortedLedger]);

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader activeStep={activeStep} steps={steps} />
      </StyledHeader>
      <Container>
        <StyledContainerSpace>
          {addMoneyOutModalOpen && (
            <AddMoneyOutModal
              open={addMoneyOutModalOpen}
              setOpen={setAddMoneyOutModalOpen}
              addLedgerRow={addLedgerRow}
              categories={categories}
            />
          )}

          <h1>Utgifter</h1>
          <StyledBoxSection>
            <StyledGrid>
              {filteredLedger.length > 0 && (
                <Grid.Row>
                  <Grid.Column width={6}>
                    <strong>Artikkel</strong>
                  </Grid.Column>
                  {/* <Grid.Column width={4}>
                            Ordning
                        </Grid.Column> */}
                  <Grid.Column width={6}>
                    <strong>Kategori</strong>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <strong>Beløp</strong>
                  </Grid.Column>
                  {/* <Grid.Column width={3}>
                            <strong>Day of month</strong>
                        </Grid.Column> */}
                </Grid.Row>
              )}
              {filteredLedger.map((row) => {
                if (categories.has(row.category) && row.accountFrom === "user") {
                  return (
                    <StyledGridRow key={row.id}>
                      <Grid.Column width={6}>{row.accountTo}</Grid.Column>
                      <Grid.Column width={6}>{row.category}</Grid.Column>
                      <Grid.Column width={3}>{row.amount}</Grid.Column>
                      {/* <Grid.Column width={3}>{row.dayOfMonth}</Grid.Column> */}
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
                      setAddMoneyOutModalOpen(true);
                    }}
                  >
                    <Icon name="plus" />
                    Legg til kostnader
                  </Button>
                </Grid.Column>
              </StyledGridRowBottom>

              <MoneyTotal text="Utgifter og gjeld" total={moneyOut} />          

            </StyledGrid>
          </StyledBoxSection>

          {/* <StyledGraphContainer>
            <Bar options={chartOptions} data={graphData} />
        </StyledGraphContainer> */}

          {/* <NextButton completeStep={() => completeStep()} /> */}

          <BackForwardControls
            goBack={() => goBack()}
            completeStep={completeStep}
          />
        </StyledContainerSpace>
      </Container>
    </StyledBackgroundColour>
  );
}

// const StyledGraphContainer = styled.div`
//     height: 100px;
// `
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
