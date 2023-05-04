import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Icon,
  Dropdown,
  Input,
} from "semantic-ui-react";
import { LedgerRow } from "../../App";
import AddMoneyInModal from "../AddMoneyInModal";

import { calculateMoneyIn, sortLedger } from "../../data/Ledger";
import { StyledBoxSection } from "../StyledBoxSection";
import BackForwardControls from "../BackForwardControls";
import styled from "styled-components";
import { StepDefinition, StepsState } from "../Steps";
import StepHeader from "../StepHeader";
import MoneyTotal from "../MoneyTotal";
import TrashIcon from "../TrashIcon";
import { TransactionCategory } from "../../App";
import { v4 as uuidv4 } from "uuid";
import ErrorBar from "../ErrorBar";
import OpenHelpTextModal from "../HelpTextModalIncome";
interface MoneyInProps {
  ledger: Array<LedgerRow>;
  addLedgerRow: (_: LedgerRow) => void;
  editLedgerRow: (_: LedgerRow) => void;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  goToStep: (step: StepDefinition) => void;
  steps: StepsState;
}

interface MoneyInAndCategory {
  name: string;
  category: TransactionCategory;
}

interface DropDownItem {
  key: string;
  text: string;
  value: string;
}

export default function MoneyIn(props: MoneyInProps) {
  const [helptextModalOpen, setHelpTextModalOpen] = useState<boolean>(false);
  const [belopEndError, setBelopEndError] = useState<boolean>(false);
  const [subcategories, setSubcategories] = useState<Array<DropDownItem>>([]);
  const [dropDownItems, setDropDownItems] = useState<DropDownItem[]>([]);
  const [moneyInItems, setMoneyInItems] = useState<
    Map<string, MoneyInAndCategory>
  >(new Map<string, MoneyInAndCategory>());
  const [addMoneyInModalOpen, setAddMoneyInModalOpen] =
    useState<boolean>(false);
  const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
  const [filteredLedger, setFilteredLedger] = useState<LedgerRow[]>([]);
  const [moneyIn, setMoneyIn] = useState<number>(0);
  const {
    ledger,
    addLedgerRow,
    removeLedgerRow,
    completeStep,
    goBack,
    steps,
    goToStep,
    editLedgerRow,
  } = props;

  useEffect(() => {
    setSortedLedger(ledger);
  }, [ledger]);

  useEffect(() => {
    setFilteredLedger(
      sortedLedger.filter((row) => {
        return row.accountTo === "user";
      })
    );

    setMoneyIn(calculateMoneyIn(sortedLedger));
  }, [sortedLedger]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const Categories = [
    {
      key: TransactionCategory.Income,
      text: "Lønn",
      value: TransactionCategory.Income,
    },
    {
      key: TransactionCategory.Housing_Benefit,
      text: "Husbanken",
      value: TransactionCategory.Housing_Benefit,
    },
    {
      key: TransactionCategory.Government_Income,
      text: "NAV",
      value: TransactionCategory.Government_Income,
    },
  ];

  const incomeTypes: Map<string, Array<DropDownItem>> = new Map<
    string,
    Array<DropDownItem>
  >();
  incomeTypes.set("Housing_Benefit", [
    {
      key: "Husbanken",
      text: "Husbanken",
      value: "Husbanken",
    },
  ]);
  incomeTypes.set("Income", [
    {
      key: "Lønn",
      text: "Lønn",
      value: "Lønn",
    },
  ]);

  incomeTypes.set("Government_Income", [
    {
      key: "Sosialhjelp",
      text: "Sosialhjelp",
      value: "Sosialhjelp",
    },
    {
      key: "Barnetrygd",
      text: "Barnetrygd",
      value: "Barnetrygd",
    },
    {
      key: "Dagpenger",
      text: "Dagpenger",
      value: "Dagpenger",
    },
    {
      key: "Sykepenger",
      text: "Sykepenger",
      value: "Sykepenger",
    },
    {
      key: "Foreldrepenger",
      text: "Foreldrepenger",
      value: "Foreldrepenger",
    },
    {
      key: "Kontantstøtte",
      text: "Kontantstøtte",
      value: "Kontantstøtte",
    },
    {
      key: "Pensjon",
      text: "Pensjon",
      value: "Pensjon",
    },
    {
      key: "Arbeidsavklaringspenger",
      text: "Arbeidsavklaringspenger",
      value: "Arbeidsavklaringspenger",
    },
    {
      key: "Tiltakspenger",
      text: "Tiltakspenger",
      value: "Tiltakspenger",
    },
    {
      key: "Uførepensjon",
      text: "Uførepensjon",
      value: "Uførepensjon",
    },
    {
      key: "Kvalifiseringsstønad",
      text: "Kvalifiseringsstønad",
      value: "Kvalifiseringsstønad",
    },
    {
      key: "Overgangsstønad",
      text: "Overgangsstønad",
      value: "Overgangsstønad",
    },
    {
      key: "Barnebidrag",
      text: "Barnebidrag",
      value: "Barnebidrag",
    },
    {
      key: "Forskuddsbidrag",
      text: "Forskuddsbidrag",
      value: "Forskuddsbidrag",
    },
    {
      key: "Introduksjonsstønad",
      text: "Introduksjonsstønad",
      value: "Introduksjonsstønad",
    },
    {
      key: "Grunnstønad",
      text: "Grunnstønad",
      value: "Grunnstønad",
    },
    {
      key: "Hjelpestønad",
      text: "Hjelpestønad",
      value: "Hjelpestønad",
    },
    {
      key: "Engangsstønad",
      text: "Engangsstønad",
      value: "Engangsstønad",
    },
    {
      key: "Omsorgslønn",
      text: "Omsorgslønn",
      value: "Omsorgslønn",
    },
    {
      key: "Barnetilsyn",
      text: "Barnetilsyn",
      value: "Barnetilsyn",
    },
  ]);

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

  const convertDropdownItem = (item: MoneyInAndCategory): DropDownItem => {
    return {
      key: item.name,
      text: item.name,
      value: item.name,
    };
  };

  useEffect(() => {
    const dropDownItems: DropDownItem[] = [];
    moneyInItems.forEach((value) => {
      const i = convertDropdownItem(value);
      dropDownItems.push(i);
    });
    setDropDownItems(dropDownItems);
  }, [moneyInItems]);

  const setCategory = (category: string | undefined, row: LedgerRow) => {
    if (category) {
      const items = incomeTypes.get(category);
      if (items) {
        if (items?.length === 1) {
          editLedgerRow({
            ...row,
            accountFrom: items[0].value,
            category:
              category === "Income"
                ? TransactionCategory.Income
                : TransactionCategory.Housing_Benefit,
          });
        } else {
          editLedgerRow({
            ...row,
            category: TransactionCategory.Government_Income,
          });
          setSubcategories(items);
        }
      }
    }
  };

  const getValueCategory = (row: LedgerRow) => {
    console.log("catrow: ", row);
    if (row.category === TransactionCategory.Government_Income) {
      return "NAV";
    } else if (row.category === TransactionCategory.Income) {
      return "Lønn";
    } else if (row.category === TransactionCategory.Housing_Benefit) {
      return "Husbanken";
    } else {
      return "";
    }
  };

  const getSubcategories = (row: LedgerRow) => {
    if (row.category === TransactionCategory.Government_Income) {
      const items = incomeTypes.get(row.category);
      if (items) {
        setSubcategories(items);
      }
    }
  };

  useEffect(() => {
    const items = incomeTypes.get(TransactionCategory.Government_Income);
    if (items) {
      setSubcategories(items);
    }
  }, []);

  console.log(filteredLedger);

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader steps={steps} goToStep={goToStep} />
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

          <h1>Penger inn</h1>
          <h2>Inntekt og annen støtte</h2>
          <OpenHelpTextModal
            open={helptextModalOpen}
            setOpen={setHelpTextModalOpen}
          />

          <StyledBoxSection>
            <StyledGrid>
              {filteredLedger.length > 0 && (
                <Grid.Row>
                  <StyledGridColumn width={3}>
                    <strong>Inntekt</strong>
                  </StyledGridColumn>
                  <Grid.Column width={4}>
                    <strong>Ordning</strong>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <strong>Dato for utbetaling</strong>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <strong>Beløp</strong>
                  </Grid.Column>
                </Grid.Row>
              )}
              {filteredLedger.map((row) => {
                if (row.accountTo === "user") {
                  return (
                    <StyledGridRow key={row.id}>
                      <StyledGridColumn width={3}>
                        <Dropdown
                          search
                          selection
                          placeholder="Kategori"
                          options={Categories}
                          onChange={(_, data) => {
                            setCategory(data.value?.toString(), row);
                          }}
                          value={row.category}
                        />
                      </StyledGridColumn>
                      <Grid.Column width={4}>
                        {row.category ===
                        TransactionCategory.Government_Income ? (
                          <Dropdown
                            search
                            selection
                            placeholder="Ordning"
                            options={subcategories}
                            onChange={(_, data) => {
                              editLedgerRow({
                                ...row,
                                accountFrom: data.value?.toString() as string,
                              });
                            }}
                            value={row.accountFrom}
                          />
                        ) : (
                          <div>-</div>
                        )}
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

                      <StyledGridColumn width={3}>
                        <Input
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
                      </StyledGridColumn>

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
                      addLedgerRow({
                        id: uuidv4(),
                        dayOfMonth: 0,
                        amount: 0,
                        accountFrom: "",
                        accountTo: "user",
                        category: TransactionCategory.Undefined,
                      });
                    }}
                  >
                    <Icon name="plus" />
                    Legg til inntekt
                  </Button>
                </Grid.Column>
              </StyledGridRowBottom>

              <MoneyTotal text="Inntekter" total={moneyIn} />
            </StyledGrid>
          </StyledBoxSection>

          <BackForwardControls
            goBack={() => goBack()}
            completeStep={completeStep}
          />
        </StyledContainerSpace>
      </Container>
    </StyledBackgroundColour>
  );
}

export const StyledTotalGrid = styled(Grid)`
  background-color: #f5f5f0;
`;

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
  background-color: #f1f8f8;
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

const StyledGridColumn = styled(Grid.Column)`
  margin-right: 2rem;
`;
