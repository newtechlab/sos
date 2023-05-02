import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Icon,
  Input,
} from "semantic-ui-react";
import { LedgerRow, TransactionCategory } from "../../App";

import { calculateMoneyOut, sortLedger } from "../../data/Ledger";
import BackForwardControls from "../BackForwardControls";
import { StyledBoxSection } from "../StyledBoxSection";
import { StyledGrid, StyledGridRow, StyledGridRowBottom } from "../MoneyIn";
import { StepDefinition, StepsState } from "../Steps";
import StepHeader from "../StepHeader";
import styled from "styled-components";
import MoneyTotal from "../MoneyTotal";
import HelpTextModalDebt from "../HelpTextModalDebt";
import TrashIcon from "../TrashIcon";
import ErrorBar from "../ErrorBar";
import { v4 as uuidv4 } from "uuid";

interface MoneyOutProps {
  ledger: Array<LedgerRow>;
  addLedgerRow: (_: LedgerRow) => void;
  editLedgerRow: (_: LedgerRow) => void;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  goToStep: (step: StepDefinition) => void;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
  categories: Set<string>;
}
interface MoneyOutAndCategory {
  name: string;
  category: TransactionCategory;
}

interface DropDownItem {
  key: string;
  text: string;
  value: string;
}

const convertDropdownItem = (item: MoneyOutAndCategory): DropDownItem => {
  return {
    key: item.name,
    text: item.name,
    value: item.name,
  };
};

export default function MoneyOut(props: MoneyOutProps) {
  const [belopEndError, setBelopEndError] = useState<boolean>(false);
  const [addMoneyOutModalOpen, setAddMoneyOutModalOpen] =
    useState<boolean>(false);
  const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
  const [filteredLedger, setFilteredLedger] = useState<LedgerRow[]>([]);
  const [moneyOutDebt, setMoneyOutDebt] = useState<number>(0);
  const [moneyOutExpenses, setMoneyOutExpenses] = useState<number>(0);
  // const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
  const [addHelpTextDebtModalOpen, OpenHelpTextDebtModal] =
    useState<boolean>(false);

  const [dropDownItemsDebt, setDropDownItemsDebt] = useState<DropDownItem[]>(
    []
  );
  const [dropDownItemsExpenses, setDropDownItemsExpenses] = useState<
    DropDownItem[]
  >([]);

  const [moneyOutItems, setMoneyOutItems] = useState<
    Map<string, MoneyOutAndCategory>
  >(new Map<string, MoneyOutAndCategory>());
  const {
    ledger,
    addLedgerRow,
    editLedgerRow,
    removeLedgerRow,
    completeStep,
    goBack,
    goToStep,
    steps,
    categories,
  } = props;

  useEffect(() => {
    const items = new Map<string, MoneyOutAndCategory>();
    items.set("Abonnement (Netflix, HBO, Spill m.m)", {
      name: "Abonnement (Netflix, HBO, Spill m.m)",
      category: TransactionCategory.Media_and_Subscriptions,
    });
    items.set("Sport, trening og fritid", {
      name: "Sport, trening og fritid",
      category: TransactionCategory.Recreation,
    });
    items.set("Transport (trikk, tog, buss)", {
      name: "Transport (trikk, tog, buss)",
      category: TransactionCategory.Travel_Expenses,
    });
    items.set("Huslån", {
      name: "Huslån",
      category: TransactionCategory.Debt,
    });
    items.set("Husleie", {
      name: "Husleie",
      category: TransactionCategory.Rent,
    });
    items.set("Reise (Fly, hotell)", {
      name: "Reise (Fly, hotell)",
      category: TransactionCategory.Travel_Expenses,
    });
    items.set("Mat og drikke", {
      name: "Mat og drikke",
      category: TransactionCategory.Food_and_Beverages,
    });
    items.set("Strøm", {
      name: "Strøm",
      category: TransactionCategory.Electricity,
    });
    items.set("Klær og sko", {
      name: "Klær og sko",
      category: TransactionCategory.Clothing_and_Footwear,
    });
    items.set("Personlig pleie", {
      name: "Personlig pleie",
      category: TransactionCategory.Personal_Care,
    });
    items.set("Forsikring", {
      name: "Forsikring",
      category: TransactionCategory.Insurance,
    });
    items.set("Andre bokostnader (kommunale avgifter m.m.)", {
      name: "Andre bokostnader (kommunale avgifter m.m.)",
      category: TransactionCategory.Household_Items,
    });
    items.set("Husholdningsartikler", {
      name: "Husholdningsartikler",
      category: TransactionCategory.Household_Items,
    });
    items.set("Annen gjeld", {
      name: "Annen gjeld",
      category: TransactionCategory.Debt,
    });
    items.set("Billån", {
      name: "Billån",
      category: TransactionCategory.Debt,
    });
    items.set("Faste donasjoner", {
      name: "Faste donasjoner",
      category: TransactionCategory.Personal_Care,
    });
    setMoneyOutItems(items);
  }, []);

  useEffect(() => {
    const dropDownItemsDebt: DropDownItem[] = [];
    const dropDownItemsExpenses: DropDownItem[] = [];
    moneyOutItems.forEach((value) => {
      const i = convertDropdownItem(value);
      if (value.category === TransactionCategory.Debt) {
        dropDownItemsDebt.push(i);
      } else {
        dropDownItemsExpenses.push(i);
      }
    });
    setDropDownItemsDebt(dropDownItemsDebt);
    setDropDownItemsExpenses(dropDownItemsExpenses);
  }, [moneyOutItems]);

  useEffect(() => {
    setSortedLedger(sortLedger(ledger));
  }, [ledger]);

  useEffect(() => {
    setFilteredLedger(
      sortedLedger.filter((row) => {
        return row.accountFrom === "user" && categories.has(row.category);
      })
    );
  }, [sortedLedger]);

  useEffect(() => {
    setMoneyOutDebt(
      calculateMoneyOut(
        filteredLedger.filter(
          (item) => item.category === TransactionCategory.Debt
        )
      )
    );
    setMoneyOutExpenses(
      calculateMoneyOut(
        filteredLedger.filter(
          (item) => item.category !== TransactionCategory.Debt
        )
      )
    );
  }, [filteredLedger]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getDateArray = () => {
    const arr = [];
    for (let i = 1; i <= 28; i++) {
      arr.push({
        key: i,
        text: i.toString(),
        value: i,
      });
    }
    return arr;
  };

  const DayCategories = getDateArray();

  let belopError = false;
  const validateInput = (inputvalue: string) => {
    const validNumber = RegExp(/^[0-9\b]+$/);
    validNumber.test(inputvalue) ? (belopError = false) : (belopError = true);
  };

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader steps={steps} goToStep={goToStep} />
      </StyledHeader>
      <StyledContainer>
        <StyledContainerSpace>
          <StyledDiv>
            <h1>
              <strong>Penger ut</strong>
            </h1>
            <h2>
              <strong>Gjeld</strong>
            </h2>
            <HelpTextModalDebt
              open={addHelpTextDebtModalOpen}
              setOpen={OpenHelpTextDebtModal}
            />
          </StyledDiv>
          <StyledBoxSection>
            <StyledGrid>
              {filteredLedger.filter(
                (item) => item.category === TransactionCategory.Debt
              ).length > 0 && (
                <Grid.Row>
                  <Grid.Column width={5}>
                    <strong>Gjeld</strong>
                  </Grid.Column>
                  {/* <Grid.Column width={4}>
                            Ordning
                        </Grid.Column> */}
                  <Grid.Column width={4}>
                    <strong>Dato for forfall hver mnd.</strong>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <strong>Beløp</strong>
                  </Grid.Column>
                  {/* <Grid.Column width={3}>
                            <strong>Day of month</strong>
                        </Grid.Column> */}
                </Grid.Row>
              )}
              {filteredLedger
                .filter((item) => item.category === TransactionCategory.Debt)
                .map((row) => {
                  return (
                    <StyledGridRow key={row.id}>
                      <Grid.Column width={5}>
                        <Dropdown
                          fluid
                          search
                          selection
                          placeholder="Velg utgift"
                          options={dropDownItemsDebt}
                          onChange={(_, data) => {
                            editLedgerRow({
                              ...row,
                              accountTo: data.value?.toString() as string,
                            });
                          }}
                          value={row.accountTo}
                        />
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <Dropdown
                          search
                          selection
                          placeholder="Dag"
                          options={DayCategories}
                          onChange={(_, data) => {
                            editLedgerRow({
                              ...row,
                              dayOfMonth: parseInt(
                                data.value?.toString() || "0",
                                10
                              ),
                            });
                          }}
                          value={row.dayOfMonth}
                        />
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Input
                          fluid
                          placeholder="f.eks 10 000"
                          onChange={(_, data) => {
                            validateInput(data.value);
                            editLedgerRow({
                              ...row,
                              amount: parseInt(
                                data.value?.toString() || "0",
                                10
                              ),
                            });
                          }}
                          value={row.amount}
                          label={{ basic: true, content: "kr" }}
                          labelPosition="right"
                        />
                        {belopError || belopEndError ? (
                          <ErrorBar msg="Vennligst skriv inn et nummer" />
                        ) : (
                          ""
                        )}
                      </Grid.Column>
                      <Grid.Column
                        verticalAlign="middle"
                        textAlign="center"
                        width={1}
                      >
                        <TrashIcon
                          onClick={removeLedgerRow}
                          color="blue"
                          itemId={row.id}
                        />
                      </Grid.Column>
                    </StyledGridRow>
                  );
                })}
              <StyledGridRowBottom>
                <Grid.Column width={16}>
                  <Button
                    circular
                    color="blue"
                    onClick={() => {
                      addLedgerRow({
                        id: uuidv4(),
                        dayOfMonth: 0,
                        amount: 0,
                        accountFrom: "user",
                        accountTo: "",
                        category: TransactionCategory.Debt,
                      });
                    }}
                  >
                    <Icon name="plus" />
                    Legg til gjeld
                  </Button>
                </Grid.Column>
              </StyledGridRowBottom>

              <MoneyTotal text="Totalt gjeld" total={moneyOutDebt} />
            </StyledGrid>
          </StyledBoxSection>
        </StyledContainerSpace>
      </StyledContainer>
      <StyledContainer>
        <StyledContainerSpace>
          <StyledDiv>
            <StyledSpace>
              <h2>
                <strong>Utgifter</strong>
              </h2>
            </StyledSpace>
          </StyledDiv>
          <StyledBoxSection>
            <StyledGrid>
              {filteredLedger.filter(
                (item) => item.category != TransactionCategory.Debt
              ).length > 0 && (
                <Grid.Row>
                  <Grid.Column width={10}>
                    <strong>Utgift</strong>
                  </Grid.Column>

                  <Grid.Column width={5}>
                    <strong>Beløp</strong>
                  </Grid.Column>
                </Grid.Row>
              )}
              {filteredLedger
                .filter((item) => item.category != TransactionCategory.Debt)
                .map((row) => {
                  return (
                    <StyledGridRow key={row.id}>
                      <Grid.Column width={10}>
                        <Dropdown
                          search
                          selection
                          placeholder="Velg utgift"
                          options={dropDownItemsExpenses}
                          onChange={(_, data) => {
                            editLedgerRow({
                              ...row,
                              accountTo: data.value?.toString() as string,
                            });
                          }}
                          value={row.accountTo}
                        />
                      </Grid.Column>
                      <Grid.Column width={5}>
                        <Input
                          fluid
                          placeholder="f.eks 10 000"
                          onChange={(_, data) => {
                            validateInput(data.value);
                            editLedgerRow({
                              ...row,
                              amount: parseInt(
                                data.value?.toString() || "0",
                                10
                              ),
                            });
                          }}
                          label={{ basic: true, content: "kr" }}
                          labelPosition="right"
                          value={row.amount}
                        />
                        {belopError || belopEndError ? (
                          <ErrorBar msg="Vennligst skriv inn et nummer" />
                        ) : (
                          ""
                        )}
                      </Grid.Column>
                      {/* <Grid.Column width={3}>{row.dayOfMonth}</Grid.Column> */}
                      <Grid.Column
                        verticalAlign="middle"
                        textAlign="center"
                        width={1}
                      >
                        <TrashIcon
                          onClick={removeLedgerRow}
                          color="blue"
                          itemId={row.id}
                        />
                      </Grid.Column>
                    </StyledGridRow>
                  );
                })}
              <StyledGridRowBottom>
                <Grid.Column width={16}>
                  <Button
                    circular
                    color="blue"
                    onClick={() => {
                      addLedgerRow({
                        id: uuidv4(),
                        dayOfMonth: 0,
                        amount: 0,
                        accountFrom: "user",
                        accountTo: "",
                        category: TransactionCategory.Undefined,
                      });
                    }}
                  >
                    <Icon name="plus" />
                    Legg til utgift
                  </Button>
                </Grid.Column>
              </StyledGridRowBottom>

              <MoneyTotal text="Totalt utgifter" total={moneyOutExpenses} />
            </StyledGrid>
          </StyledBoxSection>

          <BackForwardControls
            goBack={() => goBack()}
            completeStep={completeStep}
          />
        </StyledContainerSpace>
      </StyledContainer>
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

const StyledContainer = styled(Container)`
  position: relative;
`;

const StyledDiv = styled.div`
  position: relative;
`;

const StyledSpace = styled.p`
  padding-bottom: 2em;
`;
