import {
  Button,
  Container,
  Dropdown,
  Grid,
  Input,
  Modal,
} from "semantic-ui-react";
import { LedgerRow, StyledOverridesDiv, TransactionCategory } from "../../App";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import DaySelector from "../DaySelector";
import styled from "styled-components";
import ErrorBar from "../ErrorBar";

interface AddMoneyInModalProps {
  open: boolean;
  setOpen: (_: boolean) => void;
  addLedgerRow: (_: LedgerRow) => void;
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

const convertDropdownItem = (item: MoneyInAndCategory): DropDownItem => {
  return {
    key: item.name,
    text: item.name,
    value: item.name,
  };
};

let belopError = false;
const validateInput = (inputvalue: string) => {
  const validNumber = RegExp(/^[0-9\b]+$/);
  validNumber.test(inputvalue) ? (belopError = false) : (belopError = true);
};

export default function AddMoneyInModal(props: AddMoneyInModalProps) {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [subcategories, setSubcategories] = useState<Array<DropDownItem>>([]);
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [moneyInItems, setMoneyInItems] = useState<
    Map<string, MoneyInAndCategory>
  >(new Map<string, MoneyInAndCategory>());
  const [dropDownItems, setDropDownItems] = useState<DropDownItem[]>([]);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [day, setDay] = useState<number | undefined>(undefined);
  const { open, setOpen, addLedgerRow } = props;
  const [belopEndError, setBelopEndError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [typeError, setTypeError] = useState<boolean>(false);

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
      key: "Housbanken",
      text: "Housbanken",
      value: "Housbanken",
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

  useEffect(() => {
    const dropDownItems: DropDownItem[] = [];
    moneyInItems.forEach((value) => {
      const i = convertDropdownItem(value);
      dropDownItems.push(i);
    });
    setDropDownItems(dropDownItems);
  }, [moneyInItems]);

  useEffect(() => {
    if (category) {
      const items = incomeTypes.get(category);
      if (items) {
        if (items?.length === 1) {
          setFrom(items[0].value);
        }
        setSubcategories(items);
      }
    }
  }, [category]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <StyledModalContent>
        <StyledOverridesDiv>
          <Container>
            <StyledContainerSpace>
              <ModalHeader>
                {" "}
                <h1>Ny inntekt</h1>{" "}
              </ModalHeader>

              <StyledModalBody>
                <StyledIngress>
                  Penger du får inn på konto jevnlig. Det kan være lønn,
                  barnebidrag, trygd eller annen støtte. Det man ikke bør legge
                  inn er gaver eller lignende, fordi man ikke kan regne med at
                  det kommer inn jevnlig og derfor ikke bør regnes med i et
                  budsjett.
                </StyledIngress>

                <Grid columns={2}>
                  <Grid.Column width={2}>Type</Grid.Column>
                  <Grid.Column width={14}>
                    <Dropdown
                      search
                      selection
                      placeholder="Kategori"
                      options={Categories}
                      onChange={(_, data) => {
                        setCategory(data.value?.toString());
                        setTypeError(false);
                      }}
                    />
                    {typeError ? (
                      <ErrorBar msg="Vennligst velg en innteksttype" />
                    ) : (
                      ""
                    )}
                  </Grid.Column>

                  {category && subcategories.length > 1 && (
                    <>
                      <Grid.Column width={2}>Ordning</Grid.Column>
                      <Grid.Column width={14}>
                        <Dropdown
                          search
                          selection
                          placeholder="Ordning"
                          options={subcategories}
                          onChange={(_, data) => {
                            setFrom(data.value?.toString());
                          }}
                        />
                      </Grid.Column>
                    </>
                  )}

                  <Grid.Column width={2}>Beløp</Grid.Column>
                  <Grid.Column width={14}>
                    <Input
                      placeholder="f.eks 10 000"
                      onChange={(_, data) => {
                        validateInput(data.value);
                        setAmount(parseInt(data.value?.toString() || "0", 10));
                      }}
                    />
                    {belopError || belopEndError ? (
                      <ErrorBar msg="Vennligst skriv inn et nummer" />
                    ) : (
                      ""
                    )}
                  </Grid.Column>
                </Grid>

                <br />
                <DaySelector
                  itemSelected={(day) => {
                    setDay(day);
                    setDateError(false);
                  }}
                />
                {dateError ? <ErrorBar msg="Vennligst velg en dato" /> : ""}

                <br />
                <Grid columns={2}>
                  <Grid.Column>
                    <Button
                      circular
                      basic
                      color="blue"
                      onClick={() => setOpen(false)}
                    >
                      Avbryt
                    </Button>
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <Button
                      circular
                      content="Legg til"
                      color="blue"
                      onClick={() => {
                        if (from && amount && day) {
                          addLedgerRow({
                            id: uuidv4(),
                            dayOfMonth: day,
                            amount: amount,
                            accountFrom: from,
                            accountTo: "user",
                            category: TransactionCategory.Income,
                          });
                          setOpen(false);
                        }
                        if (!day) {
                          setDateError(true);
                        }
                        if (!from) {
                          setTypeError(true);
                        }
                        if (!amount) {
                          setBelopEndError(true);
                        } else {
                          console.log("missing var", from);
                          console.log("missing var", amount);
                          console.log("missing var", day);
                        }
                      }}
                    />
                  </Grid.Column>
                </Grid>
              </StyledModalBody>
            </StyledContainerSpace>
          </Container>
        </StyledOverridesDiv>
      </StyledModalContent>

      {/* <Modal.Actions> */}

      {/* <Dropdown
                placeholder='Day of Month'
                selection
                options={getDaysOfMonthDropdown()}
                onChange={ (_, data) => { 
                    setDay(parseInt(data.value?.toString() || "1", 10)) 
                }}
            /> */}

      {/* </Modal.Actions> */}
    </Modal>
  );
}

export const StyledModalContent = styled(Modal.Content)`
  padding: 0 !important;
`;

export const ModalHeader = styled.div`
  padding: 3em;
`;

export const StyledModalBody = styled.div`
  background-color: #f1f8f8;
  padding: 3em;
`;

const StyledContainerSpace = styled.div``;
const StyledIngress = styled.div`
  padding-bottom: 2em;
`;
