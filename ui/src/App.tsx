import "./App.css";
import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { StepDefinition, StepsState } from "./components/Steps";
import { useEffect, useState } from "react";
import UserDetails from "./components/UserDetails";
import MoneyIn from "./components/MoneyIn";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Resultat from "./components/Resultat";
import styled from "styled-components";
import {
  goBackStep,
  goToSpecificStep,
  progressStep,
  updateSteps,
} from "./data/StepProgressor";
import {
  AdjustmentAmountPercent,
  LedgerRowId,
} from "./components/ResultatInteract";
import Home from "./components/Home";
import MoneyOutDebt from "./components/MoneyOutDebt";
import { Button, Icon } from "semantic-ui-react";
import {
  DefaultStateSummary,
  InitialStepsWithPath,
  StateSummary,
} from "./data/StepsInitialState";
import ResultatBalance from "./components/ResultatBalance";
import { calculateMoneyIn, calculateMoneyOut } from "./data/Ledger";

export interface FamilyMember {
  id: string;
  name: string;
  age: string;
  sex?: string;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
}

export enum TransactionCategory {
  // Housing = "HOUSING",
  // Transportation = "TRANSPORTATION",
  // Food = "FOOD",
  // Utilities = "UTILITIES",
  // Clothing = "CLOTHING",
  // Medical_Healthcare = "MEDICAL_HEALTHCARE",
  // Insurance = "INSURANCE",
  // Household_Items = "HOUSEHOLD_ITEMS",
  // Personal = "PERSONAL",
  // Debt = "DEBT",
  // Retirement = "RETIREMENT",
  // Education = "EDUCATION",
  // Savings = "SAVINGS",
  // Gifts_Donations = "GIFTS_DONATIONS",
  // Entertainment = "ENTERTAINMENT",
  // Undefined = "UNDEFINED",
  Food_and_Beverages = "Mat og drikke",
  Clothing_and_Footwear = "Klær og sko",
  Personal_Care = "Personlig pleie",
  Games_and_Subscriptions = "Lek, sport og mediebruk",
  Travel_Expenses = "Reisekostnader",
  Infant_Equipment = "Spedbarnsutstyr",
  Other_Groceries = "Andre daglivarer",
  Household_Items = "Husholdningsartikler",
  Furniture = "Møbler",
  Media_and_Recreation = "Mediebruk og fritid",
  Car = "Bilkostnader",
  Kindergarden = "Barnehage",
  Childcare_other = "AKS/SFO",

  Income = "Income",
  Housing_Benefit = "Housing_Benefit",
  Government_Income = "Government_Income",
  Insurance = "Forsikring",
  Debt = "Gjeld",
  Rent = "Husleie",
  Other = "Annet",
  Electricity = "Strøm",
  Regular_Income = "Fast jobb",
  Part_Time_Income = "Deltidsjobb",
  Social_Support = "NAV-støtte",
  Tax = "Forskuddsskatt",
  Private_Funding = "Privat bidrag",
  Undefined = "UNDEFINED",
}

export const AllTransactionCategories: Array<string> =
  Object.values(TransactionCategory);

export interface LedgerRow {
  id: string;
  dayOfMonth: number;
  amount: number;
  accountFrom: string;
  accountTo: string;
  category: TransactionCategory;
}

export interface Goal {
  name: string;
  amount: number;
}

export enum Car {
  OWN = "OWN",
  NOTOWN = "RENT",
  UNDEFINED = "UNDEFINED",
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export enum HouseSituation {
  OWN = "OWN",
  RENT = "RENT",
  UNDEFINED = "UNDEFINED",
}

export interface UserInformation {
  goal: Goal;
  car: Car;
  house: HouseSituation;
  otherAssets: string;
}

export const InitialUserInfo: UserInformation = {
  goal: { name: "", amount: 0 },
  car: Car.UNDEFINED,
  house: HouseSituation.UNDEFINED,
  otherAssets: "",
};

function rehydrate<T>(name: string, ifEmpty: T): T {
  const item = localStorage.getItem(name);

  return item ? (JSON.parse(item) as T) : ifEmpty;
}

function rehydrateMap<A, B>(name: string, ifEmpty: Map<A, B>): Map<A, B> {
  const item = localStorage.getItem(name);

  if (item) {
    return new Map<A, B>(JSON.parse(item));
  }

  return ifEmpty;
}

function rehydrateSet<A>(name: string, ifEmpty: Set<A>): Set<A> {
  const item = localStorage.getItem(name);

  if (item) {
    return new Set<A>(JSON.parse(item) as Array<A>);
  }

  return ifEmpty;
}

function App() {
  const navigate = useNavigate();
  const [stateSummary, setStateSummary] =
    useState<StateSummary>(DefaultStateSummary);
  const [pets, setPets] = useState<Array<Pet>>(rehydrate("pets", []));
  const [previousData, setPreviousData] = useState<unknown[]>(
    rehydrate("previousData", [])
  );
  const [steps, setSteps] = useState<StepsState>(
    InitialStepsWithPath(
      window.location.pathname,
      DefaultStateSummary,
      rehydrateSet("completedStepGroups", new Set())
    )
  );
  const [familyMembers, setFamilyMembers] = useState<Array<FamilyMember>>(
    rehydrate("familyMembers", [])
  );
  const [ledger, setLedger] = useState<Array<LedgerRow>>(
    rehydrate("ledger", [])
  );
  const [userDetails, setUserDetails] = useState<UserInformation>(
    rehydrate("userDetails", InitialUserInfo)
  );
  const [adjustments, setAdjustments] = useState<
    Map<LedgerRowId, AdjustmentAmountPercent>
  >(
    rehydrateMap<LedgerRowId, AdjustmentAmountPercent>(
      "adjustments",
      new Map<LedgerRowId, AdjustmentAmountPercent>()
    )
  );

  const purpleMonkeyDishWasher = (familyMember: FamilyMember) => {
    setFamilyMembers(familyMembers.concat(familyMember));
  };

  const editPurpleMonkeyDishWasher = (familyMember: FamilyMember) => {
    setFamilyMembers(
      familyMembers.map((item) =>
        item.id === familyMember.id ? familyMember : item
      )
    );
  };

  const addLedgerRow = (ledgerRow: LedgerRow) => {
    setLedger(ledger.concat(ledgerRow));
  };

  const editLedgerRow = (ledgerRow: LedgerRow) => {
    setLedger(
      ledger.map((item) => (item.id === ledgerRow.id ? ledgerRow : item))
    );
  };

  const addPet = (pet: Pet) => {
    setPets(pets.concat(pet));
  };

  const editPet = (pet: Pet) => {
    setPets(pets.map((item) => (item.id === pet.id ? pet : item)));
  };

  const deleteLedgerRow = (id: string) => {
    const filtered = ledger.filter((row) => {
      return row.id !== id;
    });

    setLedger(filtered);
  };

  const deletePet = (id: string) => {
    const filtered = pets.filter((row) => {
      return row.id !== id;
    });

    setPets(filtered);
  };

  const deleteFamilyMember = (id: string) => {
    const filtered = familyMembers.filter((row) => {
      return row.id !== id;
    });

    setFamilyMembers(filtered);
  };

  useEffect(() => {
    localStorage.setItem(
      "previousData",
      JSON.stringify(Array.from(previousData))
    );
    localStorage.setItem(
      "completedStepGroups",
      JSON.stringify(Array.from(steps.completedGroups.keys()))
    );
    localStorage.setItem("familyMembers", JSON.stringify(familyMembers));
    localStorage.setItem("ledger", JSON.stringify(ledger));
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    localStorage.setItem("pets", JSON.stringify(pets));
    localStorage.setItem(
      "adjustments",
      JSON.stringify(Array.from(adjustments.entries()))
    );
  }, [
    previousData,
    steps,
    familyMembers,
    ledger,
    userDetails,
    adjustments,
    pets,
  ]);

  useEffect(() => {
    const moneyIn = calculateMoneyIn(ledger);
    const moneyOut = calculateMoneyOut(ledger);

    setStateSummary({
      familyMemberCount:
        familyMembers.length > 0 ? familyMembers.length : undefined,
      moneyIn: moneyIn > 0 ? moneyIn.toString() : undefined,
      moneyOut: moneyOut > 0 ? moneyOut.toString() : undefined,
    });
  }, [ledger, familyMembers]);

  useEffect(() => {
    setSteps(updateSteps(steps, stateSummary));
  }, [stateSummary]);

  const completeStep = () => {
    const newState = progressStep(steps, stateSummary);
    setSteps(newState);
    navigate(newState.steps[newState.activeStepId]?.path || "/");
  };

  const goBack = () => {
    const newState = goBackStep(steps, stateSummary);
    setSteps(newState);
    navigate(newState.steps[newState.activeStepId]?.path || "/");
  };

  const goToStep = (step: StepDefinition) => {
    const newState = goToSpecificStep(step, steps, stateSummary);
    setSteps(newState);
    navigate(newState.steps[newState.activeStepId]?.path || "/");
  };

  const openFeedbackForm = () => {
    window.open("https://forms.gle/M6ou5EjrdY4tv8BJ8", "_blank")?.focus();
  };

  const resetSession = () => {
    // clear previous sessions
    localStorage.clear();
    setPets([]);
    setPreviousData([]);
    setSteps(
      InitialStepsWithPath(
        window.location.pathname,
        DefaultStateSummary,
        rehydrateSet("completedStepGroups", new Set())
      )
    );
    setFamilyMembers([]);
    setLedger([]);
    setUserDetails(InitialUserInfo);
    setAdjustments(new Map<LedgerRowId, AdjustmentAmountPercent>());
  };

  const activeStep = steps.steps.find((s) => s.id === steps.activeStepId);

  useEffect(() => {
    console.log(ledger);
    console.log(adjustments);
  }, [adjustments]);

  return (
    <StyledRootDiv className="App">
      <FeedbackButton
        color="purple"
        circular
        onClick={() => openFeedbackForm()}
      >
        {" "}
        <Icon name="chat" />
        Send oss din tilbakemelding{" "}
      </FeedbackButton>
      <StyledOverridesDiv>
        <StyledBodyDiv>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  // setPreviousData={setPreviousData}
                  // setFamilyMembers={setFamilyMembers}
                  // setLedger={setLedger}
                  // setUserDetails={setUserDetails}
                  // setAdjustments={setAdjustments}
                  // setPets={setPets}
                  resetSession={resetSession}
                />
              }
            />
            <Route
              path="/family"
              element={
                <UserDetails
                  setPreviousData={setPreviousData}
                  setFamilyMembers={setFamilyMembers}
                  setPets={setPets}
                  setLedger={setLedger}
                  setUserDetails={setUserDetails}
                  setAdjustments={setAdjustments}
                  familyMembers={familyMembers}
                  addFamilyMember={purpleMonkeyDishWasher}
                  editFamilyMember={editPurpleMonkeyDishWasher}
                  activeStep={activeStep}
                  steps={steps}
                  completeStep={completeStep}
                  goBack={goBack}
                  goToStep={goToStep}
                  userDetails={userDetails}
                  pets={pets}
                  addPet={addPet}
                  editPet={editPet}
                  deletePet={deletePet}
                  deleteFamilyMember={deleteFamilyMember}
                  resetSession={resetSession}
                />
              }
            />

            <Route
              path="/penger-inn"
              element={
                <MoneyIn
                  ledger={ledger}
                  addLedgerRow={addLedgerRow}
                  editLedgerRow={editLedgerRow}
                  removeLedgerRow={deleteLedgerRow}
                  completeStep={completeStep}
                  goBack={goBack}
                  goToStep={goToStep}
                  steps={steps}
                />
              }
            />
            <Route
              path="/penger-ut"
              element={
                <MoneyOutDebt
                  ledger={ledger}
                  addLedgerRow={addLedgerRow}
                  editLedgerRow={editLedgerRow}
                  removeLedgerRow={deleteLedgerRow}
                  completeStep={completeStep}
                  goBack={goBack}
                  goToStep={goToStep}
                  activeStep={activeStep}
                  steps={steps}
                  categories={new Set(AllTransactionCategories)}
                />
              }
            />
            <Route
              path="/resultat1"
              element={
                <ResultatBalance
                  ledger={ledger}
                  removeLedgerRow={deleteLedgerRow}
                  completeStep={completeStep}
                  goal={userDetails.goal}
                  goBack={goBack}
                  activeStep={activeStep}
                  steps={steps}
                  adjustments={adjustments}
                  setAdjustments={setAdjustments}
                  goToStep={goToStep}
                />
              }
            />
            <Route
              path="/end"
              element={
                <Resultat
                  ledger={ledger}
                  familyMembers={familyMembers}
                  adjustments={adjustments}
                  removeLedgerRow={deleteLedgerRow}
                  completeStep={completeStep}
                  userDetails={userDetails}
                  previousData={previousData}
                  goBack={goBack}
                  pets={pets}
                  resetSession={resetSession}
                />
              }
            />
          </Routes>
        </StyledBodyDiv>
      </StyledOverridesDiv>
    </StyledRootDiv>
  );
}

export const StyledOverridesDiv = styled.div`
  div,
  p,
  h3,
  h4,
  button,
  table {
    font-family: Regular;
  }
  h1 {
    font-family: Regular;
    font-size: 2.125rem;
    line-height: 2.5rem;
  }
  h2 {
    font-family: Regular;
    font-size: 1.625 rem;
    line-height: 2rem;
  }
`;

export const FeedbackButton = styled(Button)`
  z-index: 1000;
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export const StyledRootDiv = styled.div`
  background-color: #f1f8f8;
  height: 100%;
  min-height: 100vh;
`;

const StyledBodyDiv = styled.div`
  text-align: left;
`;

export default App;
