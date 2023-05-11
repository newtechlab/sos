import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Icon,
  Input,
} from "semantic-ui-react";
import styled from "styled-components";
import {
  Ages,
  FamilyMember,
  HouseSituation,
  InitialUserInfo,
  LedgerRow,
  Pet,
  UserInformation,
} from "../../App";

import BackForwardControls from "../BackForwardControls";
import HelpTextModalGoal from "../HelpTextModalGoal";
import { JaNei } from "../JaNei";
import StepHeader from "../StepHeader";
import { StepDefinition, StepsState } from "../Steps";
import PdfConverter from "../../services/PdfService/PdfConverter";
import { AdjustmentAmountPercent, LedgerRowId } from "../ResultatInteract";
import { v4 as uuidv4 } from "uuid";
import { StyledBoxSection } from "../StyledBoxSection";
import { StyledGrid, StyledGridRow, StyledGridRowBottom } from "../MoneyIn";
import TrashIcon from "../TrashIcon";
import OpenHelpTextModalSalary from "../HelpTextModalSalary";

export interface UserDetailsProps {
  familyMembers: Array<FamilyMember>;
  pets: Array<Pet>;
  userDetails: UserInformation;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
  addFamilyMember: (_: FamilyMember) => void;
  editFamilyMember: (_: FamilyMember) => void;
  deletePet: (id: string) => void;
  deleteFamilyMember: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  goToStep: (step: StepDefinition) => void;
  setPreviousData: (data: any[]) => void;
  setFamilyMembers: (_: Array<FamilyMember>) => void;
  setLedger: (_: Array<LedgerRow>) => void;
  setUserDetails(_: UserInformation): void;
  setAdjustments(_: Map<LedgerRowId, AdjustmentAmountPercent>): void;
  addPet: (_: Pet) => void;
  setPets: (_: Array<Pet>) => void;
  editPet: (_: Pet) => void;
  resetSession: () => void;
}

export interface PdfFormat {
  previousData: any[]; // previous / historical sessions
  familyMembers: Array<FamilyMember>;
  ledger: Array<LedgerRow>;
  userDetails: UserInformation | undefined;
  adjustments: Map<LedgerRowId, AdjustmentAmountPercent>;
  pets: Array<Pet>;
}

const genders: string[] = [
  "Mann",
  "Kvinne",
  "Trans",
  "Transperson",
  "Intersex",
  "Interkjønn",
];

const cars: number[] = [0, 1, 2, 3, 4];
const yesno: string[] = ["Ja", "Nei"];
const sfo: string[] = ["Nei", "Heltid", "Deltid"];

interface DropDownItem {
  key: string | number;
  text: string | number;
  value: string | number;
}

export enum Optionals {
  Pregnant = "Gravid",
  Sfo = "SFO",
  Student = "Student",
  Kindergarden = "Barnehage",
  FreeSfo = "Gratis kjernetid SFO",
}

const mapToOptionals = (familyMember: FamilyMember) => {
  const optionals: string[] = [];
  if (familyMember.gender != "Mann") {
    if (
      [Ages.year14_17, Ages.year18_19, Ages.year20_30, Ages.year31_50].includes(
        familyMember.age
      )
    ) {
      optionals.push(Optionals.Pregnant);
    }
  }
  if (
    [Ages.year1, Ages.year2, Ages.year3, Ages.year4_5].includes(
      familyMember.age
    )
  ) {
    optionals.push(Optionals.Kindergarden);
  } else if ([Ages.year6_9, Ages.year10_13].includes(familyMember.age)) {
    optionals.push(Optionals.Sfo);
    optionals.push(Optionals.FreeSfo);
  } else if ([Ages.year20_30].includes(familyMember.age)) {
    optionals.push(Optionals.Student);
  }
  return optionals;
};

const convertDropdownItem = (item: string): DropDownItem => {
  return {
    key: item,
    text: item,
    value: item,
  };
};

const convertDropdownItemNumber = (item: number): DropDownItem => {
  return {
    key: item,
    text: item,
    value: item,
  };
};

export const firstStep = "/family";

export default function UserDetails(props: UserDetailsProps) {
  const [addHelpTextGoalModalOpen, OpenHelpTextGoalModal] =
    useState<boolean>(false);
  const [helptextModalOpen, setHelpTextModalOpen] = useState<boolean>(false);

  const [pdfDropped, setPdfDropped] = useState<boolean>(false);

  const ageOptions: DropDownItem[] = Object.values(Ages).map((item) => {
    return convertDropdownItem(item);
  });

  const genderOptions: DropDownItem[] = genders.map((item) => {
    return convertDropdownItem(item);
  });

  const carOptions: DropDownItem[] = cars.map((item) => {
    return convertDropdownItemNumber(item);
  });

  const yesnoOptions: DropDownItem[] = yesno.map((item) => {
    return convertDropdownItem(item.toString());
  });

  const sfoOptions: DropDownItem[] = sfo.map((item) => {
    return convertDropdownItem(item.toString());
  });

  const {
    setFamilyMembers,
    editFamilyMember,
    setLedger,
    setUserDetails,
    setPreviousData,
    setAdjustments,
    addPet,
    editPet,
    addFamilyMember,
    completeStep,
    goBack,
    goToStep,
    familyMembers,
    steps,
    userDetails,
    pets,
    setPets,
    deletePet,
    deleteFamilyMember,
  } = props;
  const onDrop = useCallback((acceptedFiles) => {
    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      try {
        if (event?.target?.readyState === FileReader.DONE) {
          const attachments = await PdfConverter.getAttachmentAsObject(
            event.target.result
          );
          setPreviousData(attachments.previousData);
          setFamilyMembers(attachments.familyMembers);
          setLedger(attachments.ledger);
          setUserDetails(attachments.userDetails || InitialUserInfo);
          setAdjustments(attachments.adjustments);
          setPets(attachments.pets);
        }
        setPdfDropped(true);
      } catch (err) {
        console.error("Load PDF error", err);
        alert(
          "There was an issue loading the PDF. Did you load the correct file?"
        );
      }
    };
    fileReader.readAsArrayBuffer(acceptedFiles[0]);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const getPregnant = (fm: FamilyMember) => (
    <StyledPadding>
      Gravid
      <Dropdown
        fluid
        search
        selection
        placeholder="Gravid"
        options={yesnoOptions}
        onChange={(_, data) => {
          editFamilyMember({
            ...fm,
            pregnant: data.value?.toString() === "Ja" ? true : false,
          });
        }}
        value={fm.pregnant ? "Ja" : "Nei"}
      />
    </StyledPadding>
  );

  const getStudent = (fm: FamilyMember) => (
    <StyledPadding>
      Student
      <Dropdown
        fluid
        search
        selection
        placeholder="Student"
        options={yesnoOptions}
        onChange={(_, data) => {
          editFamilyMember({
            ...fm,
            student: data.value?.toString() === "Ja" ? true : false,
          });
        }}
        value={fm.student ? "Ja" : "Nei"}
      />
    </StyledPadding>
  );

  const getFreeSfo = (fm: FamilyMember) => (
    <StyledPadding>
      Gratis kjernetid SFO
      <Dropdown
        fluid
        search
        selection
        placeholder="Gratis kjernetid SFO"
        options={yesnoOptions}
        onChange={(_, data) => {
          editFamilyMember({
            ...fm,
            freeSfo: data.value?.toString() === "Ja" ? true : false,
          });
        }}
        value={fm.freeSfo ? "Ja" : "Nei"}
      />
    </StyledPadding>
  );

  const getKindergarden = (fm: FamilyMember) => (
    <StyledPadding>
      Barnehage
      <Dropdown
        fluid
        search
        selection
        placeholder="Barnehage"
        options={yesnoOptions}
        onChange={(_, data) => {
          editFamilyMember({
            ...fm,
            kindergarden: data.value?.toString() === "Ja" ? true : false,
          });
        }}
        value={fm.kindergarden ? "Ja" : "Nei"}
      />
    </StyledPadding>
  );

  const getSfo = (fm: FamilyMember) => (
    <StyledPadding>
      AKS/SFO
      <Dropdown
        fluid
        search
        selection
        placeholder="AKS/SFO"
        options={sfoOptions}
        onChange={(_, data) => {
          editFamilyMember({
            ...fm,
            sfo: data.value?.toString() as string,
          });
        }}
        value={fm.sfo}
      />
    </StyledPadding>
  );

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader steps={steps} goToStep={goToStep} />
      </StyledHeader>
      <Container>
        <StyledContainerSpace>
          {!pdfDropped ? (
            <StyledBoxSection {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <StyledDragParagraphActive>Slipp fil</StyledDragParagraphActive>
              ) : (
                <div>
                  <Styledtitle> Har du gjort dette før?</Styledtitle>
                  <Ingress>
                    {" "}
                    Hvis du lastet ned en PDF forrige gang du gjorde dette, så
                    kan du laste den opp igjen her. Da bruker vi den til å fylle
                    ut feltene, så slipper du å fylle inn all informasjonen på
                    nytt.
                  </Ingress>
                  <Button
                    circular
                    color="blue"
                    alt="Last opp PDF fra forrige gjennomgang"
                  >
                    Last opp PDF
                  </Button>
                </div>
              )}
            </StyledBoxSection>
          ) : null}

          <StyledHeadingDiv>
            <h1>Familiemedlemmer</h1>
            <h3>Hvem består familien av?</h3>
            <StyledBoxSection>
              <StyledGrid>
                {familyMembers
                  ? familyMembers.map((fm) => {
                      return (
                        <StyledGridRow key={fm.id}>
                          <Grid.Column width={5}>
                            Navn
                            <Input
                              fluid
                              placeholder="Navn"
                              onChange={(_, data) => {
                                editFamilyMember({
                                  ...fm,
                                  name: data.value?.toString(),
                                });
                              }}
                              labelPosition="right"
                              value={fm.name}
                            />
                          </Grid.Column>
                          <Grid.Column width={5} textAlign="left">
                            Kjønn
                            <Dropdown
                              fluid
                              search
                              selection
                              placeholder="Kjønn"
                              options={genderOptions}
                              onChange={(_, data) => {
                                editFamilyMember({
                                  ...fm,
                                  gender: data.value?.toString() as string,
                                });
                              }}
                              value={fm.gender}
                            />
                            {mapToOptionals(fm).includes(Optionals.Pregnant)
                              ? getPregnant(fm)
                              : null}
                            {mapToOptionals(fm).includes(Optionals.Sfo)
                              ? getSfo(fm)
                              : null}
                            {mapToOptionals(fm).includes(Optionals.Kindergarden)
                              ? getKindergarden(fm)
                              : null}
                            {mapToOptionals(fm).includes(Optionals.Student) &&
                            !mapToOptionals(fm).includes(Optionals.Pregnant)
                              ? getStudent(fm)
                              : null}
                          </Grid.Column>
                          <Grid.Column width={5} textAlign="left">
                            Alder
                            <Dropdown
                              fluid
                              search
                              selection
                              placeholder="Alder"
                              options={ageOptions}
                              onChange={(_, data) => {
                                editFamilyMember({
                                  ...fm,
                                  age: data.value?.toString() as Ages,
                                });
                              }}
                              value={fm.age}
                            />
                            {mapToOptionals(fm).includes(Optionals.FreeSfo)
                              ? getFreeSfo(fm)
                              : null}
                            {mapToOptionals(fm).includes(Optionals.Student) &&
                            mapToOptionals(fm).includes(Optionals.Pregnant)
                              ? getStudent(fm)
                              : null}
                          </Grid.Column>
                          <Grid.Column
                            width={1}
                            verticalAlign="top"
                            textAlign="right"
                          >
                            <TrashIcon
                              color="blue"
                              itemId={fm.id}
                              onClick={deleteFamilyMember}
                            />
                          </Grid.Column>
                        </StyledGridRow>
                      );
                    })
                  : null}
                <StyledGridRowBottom>
                  <Grid.Column width={16}>
                    <Button
                      circular
                      color="blue"
                      onClick={() => {
                        addFamilyMember({
                          id: uuidv4(),
                          name: "",
                          age: Ages.unknown,
                          gender: "",
                        });
                      }}
                    >
                      <Icon name="plus" />
                      Legg til medlem
                    </Button>
                  </Grid.Column>
                </StyledGridRowBottom>
              </StyledGrid>
            </StyledBoxSection>
          </StyledHeadingDiv>

          <StyledHeadingDiv>
            <h1>Annen familieinformasjon</h1>
            <OpenHelpTextModalSalary
              open={helptextModalOpen}
              setOpen={setHelpTextModalOpen}
            />
            <StyledBoxSection>
              <StyledGrid>
                <StyledGridRow>
                  <Grid.Column width={8} textAlign="left">
                    Antall fossilbiler i husstanden
                    <Dropdown
                      fluid
                      search
                      selection
                      placeholder="Antall fossilbiler i husstanden"
                      options={carOptions}
                      onChange={(_, data) => {
                        setUserDetails({
                          ...userDetails,
                          car: {
                            ...userDetails.car,
                            fossil: data?.value as number,
                          },
                        });
                      }}
                      value={userDetails?.car?.fossil}
                    />
                    <StyledPadding>
                      Brutto årsinntekt
                      <Input
                        fluid
                        type="number"
                        placeholder="Brutto årsinntekt"
                        onChange={(_, data) => {
                          setUserDetails({
                            ...userDetails,
                            salary: parseInt(data?.value),
                          });
                        }}
                        labelPosition="right"
                        value={userDetails.salary}
                      />
                    </StyledPadding>
                  </Grid.Column>
                  <Grid.Column width={8} textAlign="left">
                    Antall elbiler i husstanden
                    <Dropdown
                      fluid
                      search
                      selection
                      placeholder="Antall elbiler i husstanden"
                      options={carOptions}
                      onChange={(_, data) => {
                        setUserDetails({
                          ...userDetails,
                          car: {
                            ...userDetails.car,
                            electric: data?.value as number,
                          },
                        });
                      }}
                      value={userDetails?.car?.electric}
                    />
                  </Grid.Column>
                </StyledGridRow>
              </StyledGrid>
            </StyledBoxSection>
          </StyledHeadingDiv>

          <StyledHeadingDiv>
            <h1>Boligsituasjon</h1>

            <JaNei
              optionOneSelected={userDetails.house === HouseSituation.OWN}
              optionOneText="Eie"
              optionOneClick={() => {
                setUserDetails({
                  ...userDetails,
                  house: HouseSituation.OWN,
                });
              }}
              optionTwoSelected={userDetails.house === HouseSituation.RENT}
              optionTwoText="Leie"
              optionTwoClick={() => {
                setUserDetails({
                  ...userDetails,
                  house: HouseSituation.RENT,
                });
              }}
            />
          </StyledHeadingDiv>

          <StyledHeadingDiv>
            <h1>Eier du noen dyr?</h1>
            <StyledBoxSection>
              <StyledGrid>
                {pets.length ? (
                  <Grid.Row>
                    <Grid.Column width={9}>
                      <strong>Navn</strong>
                    </Grid.Column>
                    <Grid.Column width={5} textAlign="left">
                      <strong>Type dyr</strong>
                    </Grid.Column>
                  </Grid.Row>
                ) : null}
                {pets
                  ? pets.map((pet) => {
                      return (
                        <StyledGridRow key={pet.id}>
                          <Grid.Column width={9}>
                            <Input
                              fluid
                              placeholder="Navn"
                              onChange={(_, data) => {
                                editPet({
                                  ...pet,
                                  name: data.value?.toString(),
                                });
                              }}
                              labelPosition="right"
                              value={pet.name}
                            />
                          </Grid.Column>
                          <Grid.Column width={5} textAlign="left">
                            <Input
                              fluid
                              placeholder="Skriv inn dyret her (f.eks Hest)"
                              onChange={(_, data) => {
                                editPet({
                                  ...pet,
                                  type: data.value?.toString(),
                                });
                              }}
                              labelPosition="right"
                              value={pet.type}
                            />
                          </Grid.Column>
                          <Grid.Column
                            width={2}
                            verticalAlign="middle"
                            textAlign="center"
                          >
                            <TrashIcon
                              color="blue"
                              itemId={pet.id}
                              onClick={deletePet}
                            />
                          </Grid.Column>
                        </StyledGridRow>
                      );
                    })
                  : null}
                <StyledGridRowBottom>
                  <Grid.Column width={16}>
                    <Button
                      circular
                      color="blue"
                      onClick={() => {
                        addPet({
                          id: uuidv4(),
                          name: "",
                          type: "",
                        });
                      }}
                    >
                      <Icon name="plus" />
                      Legg til dyr
                    </Button>
                  </Grid.Column>
                </StyledGridRowBottom>
              </StyledGrid>
            </StyledBoxSection>
          </StyledHeadingDiv>

          <StyledHeadingDiv>
            <h1>Har familien et sparemål?</h1>
            <HelpTextModalGoal
              open={addHelpTextGoalModalOpen}
              setOpen={OpenHelpTextGoalModal}
            />
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Input
                  placeholder="Skriv inn målet her (f.eks ferietur)"
                  value={props.userDetails.goal?.name}
                  onChange={(_, data) => {
                    props.setUserDetails({
                      ...props.userDetails,
                      goal: {
                        name: data.value?.toString(),
                        amount: props.userDetails.goal?.amount || 0,
                      },
                    });
                  }}
                  style={{ width: "100%" }}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Input
                  placeholder="ca beløp"
                  value={props.userDetails.goal?.amount || ""}
                  onChange={(_, data) => {
                    props.setUserDetails({
                      ...props.userDetails,
                      goal: {
                        name: props.userDetails.goal?.name || "",
                        amount: parseInt(data.value),
                      },
                    });
                  }}
                  label="Kr"
                  labelPosition="right"
                  style={{ width: "100%" }}
                />
              </Grid.Column>
            </Grid>
          </StyledHeadingDiv>

          <BackForwardControls
            goBack={() => goBack()}
            completeStep={completeStep}
          />

          {/* </StyledBControlsDiv> */}
        </StyledContainerSpace>
      </Container>
    </StyledBackgroundColour>
  );
}

export const StyledBackgroundColour = styled.div`
  background-color: #f1f8f8;
  width: 100%;
`;

export const StyledContainerSpace = styled.div`
  padding-top: 3em;
  padding-bottom: 4em;
`;
export const StyledHeader = styled.div`
  background-color: #ffffff;
  width: 100%;
`;

const StyledHeadingDiv = styled.div`
  position: relative;
  margin-bottom: 4em;
`;

const CenterTextDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledDragParagraphActive = styled.p`
  background-color: #f1f8f8 !important;
  font-weight: bold !important;
  border: 2px solid #3d8eb1;
  padding: 4em;
  border-radius: 3px;
`;

const Styledtitle = styled.h1`
  font-weight: bold !important;
  font-size: x-large;
  padding-top: 1em;
`;

const Ingress = styled.p`
  font-size: medium;
  padding-bottom: 2em;
`;

export const StyledIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledPadding = styled.div`
  padding-top: 1rem;
`;
