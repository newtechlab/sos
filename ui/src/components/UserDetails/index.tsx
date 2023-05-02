import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Grid,
  GridRow,
  Icon,
  Input,
} from "semantic-ui-react";
import styled from "styled-components";
import {
  Car,
  FamilyMember,
  HouseSituation,
  InitialUserInfo,
  LedgerRow,
  Pet,
  UserInformation,
} from "../../App";
import AddFamilyMemberCard from "../AddFamilyMemberCard";
import AddFamilyMemberModal from "../AddFamilyMemberModal";
import BackForwardControls from "../BackForwardControls";
import FamilyMemberCard from "../FamilyMemberCard";
import HelpTextModalGoal from "../HelpTextModalGoal";
import { JaNei } from "../JaNei";
import StepHeader from "../StepHeader";
import { StepDefinition, StepsState } from "../Steps";
import AddPetModal from "../AddPetModal";
import { StyledCard } from "../StyledFamilyCard";
import PetMemberCard from "../PetCard";
import PdfConverter from "../../services/PdfService/PdfConverter";
import { AdjustmentAmountPercent, LedgerRowId } from "../ResultatInteract";
import { v4 as uuidv4 } from "uuid";
import { StyledBoxSection } from "../StyledBoxSection";
import { StyledGrid, StyledGridRow, StyledGridRowBottom } from "../MoneyIn";
import TrashIcon from "../TrashIcon";
import { add } from "lodash";
import { getValue } from "@testing-library/user-event/dist/utils";

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

export const firstStep = "/family";

export default function UserDetails(props: UserDetailsProps) {
  const [addFamilyModalOpen, setAddFamilyModalOpen] = useState<boolean>(false);
  const [addPetModalOpen, setAddPetModalOpen] = useState<boolean>(false);
  const [addHelpTextGoalModalOpen, OpenHelpTextGoalModal] =
    useState<boolean>(false);
  const [pdfDropped, setPdfDropped] = useState<boolean>(false);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
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
  const navigate = useNavigate();
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

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader steps={steps} goToStep={goToStep} />
      </StyledHeader>
      <Container>
        <StyledContainerSpace>
          {addFamilyModalOpen && (
            <AddFamilyMemberModal
              addFamilyMember={addFamilyMember}
              open={addFamilyModalOpen}
              setOpen={setAddFamilyModalOpen}
            />
          )}
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
                {familyMembers.length ? (
                  <Grid.Row>
                    <Grid.Column width={9}>
                      <strong>Navn</strong>
                    </Grid.Column>
                    <Grid.Column width={5} textAlign="left">
                      <strong>Alder</strong>
                    </Grid.Column>
                  </Grid.Row>
                ) : null}

                {familyMembers
                  ? familyMembers.map((fm) => {
                      return (
                        <StyledGridRow key={fm.id}>
                          <Grid.Column width={9}>
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
                          <Grid.Column width={5} textAlign="right">
                            <Input
                              fluid
                              placeholder="Alder"
                              onChange={(_, data) => {
                                editFamilyMember({
                                  ...fm,
                                  age: data.value?.toString(),
                                });
                              }}
                              labelPosition="right"
                              value={fm.age}
                            />
                          </Grid.Column>
                          <Grid.Column
                            width={2}
                            verticalAlign="middle"
                            textAlign="center"
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
                          age: "",
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
            <h1>Eier familien bil eller andre kjøretøy?</h1>

            <JaNei
              optionOneSelected={userDetails.car === Car.OWN}
              optionOneText="Ja"
              optionOneClick={() => {
                setUserDetails({
                  ...userDetails,
                  car: Car.OWN,
                });
              }}
              optionTwoSelected={userDetails.car === Car.NOTOWN}
              optionTwoText="Nei"
              optionTwoClick={() => {
                setUserDetails({
                  ...userDetails,
                  car: Car.NOTOWN,
                });
              }}
            />
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
