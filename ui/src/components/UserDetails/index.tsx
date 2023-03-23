import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { Card, Container, Grid, Icon, Input } from "semantic-ui-react";
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
import ModalPDFUpload from "../ModalPDFUpload";

export interface UserDetailsProps {
  familyMembers: Array<FamilyMember>;
  pets: Array<Pet>;
  userDetails: UserInformation;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
  addFamilyMember: (_: FamilyMember) => void;
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
  setPets: (_: Array<Pet>) => void;
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

  // const [addHelpTextGoalModalOpen, OpenHelpTextGoalModal] =
  //   useState<boolean>(false);
  const {
    setFamilyMembers,
    setLedger,
    setUserDetails,
    setPreviousData,
    setAdjustments,
    setPets,
    addFamilyMember,
    completeStep,
    goBack,
    goToStep,
    familyMembers,
    steps,
    userDetails,
    pets,

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
        navigate(firstStep);
      } catch (err) {
        console.error("Load PDF error", err);
        alert(
          "There was an issue loading the PDF. Did you load the correct file?"
        );
      }
    };
    fileReader.readAsArrayBuffer(acceptedFiles[0]);
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
          <StyledSpace {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <StyledDragParagraphActive>Slipp fil</StyledDragParagraphActive>
            ) : (
              <StyledDragParagraph>
                <Icon name="cloud upload" color="blue" /> Dra og slipp PDF eller
                klikk i feltet for å åpne fra maskin.
              </StyledDragParagraph>
            )}
          </StyledSpace>
          <ModalPDFUpload
            open={false}
            setOpen={function (_: boolean): void {
              throw new Error("Function not implemented.");
            }}
          ></ModalPDFUpload>

          <StyledHeadingDiv>
            <h1>Familiemedlemmer</h1>
            <h3>Hvem består familien av?</h3>
            <Card.Group>
              {familyMembers.map((fm) => {
                return (
                  <FamilyMemberCard
                    key={fm.id}
                    familyMember={fm}
                    deleteFamilyMember={deleteFamilyMember}
                  />
                );
              })}
              <AddFamilyMemberCard
                key="ADD_NEW_MEMBER"
                onClick={() => {
                  setAddFamilyModalOpen(true);
                }}
              />
            </Card.Group>
          </StyledHeadingDiv>

          <StyledHeadingDiv>
            <h1>Eier familien bil(er)?</h1>

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
            <h1>Hvordan bor familien?</h1>

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
            <h1>Har familien dyr?</h1>
            <Card.Group>
              {pets.map((p) => {
                return (
                  <PetMemberCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    onDelete={deletePet}
                  />
                );
              })}
              <StyledCard onClick={() => setAddPetModalOpen(true)}>
                <CenterTextDiv>+ Legg til</CenterTextDiv>
              </StyledCard>
            </Card.Group>

            <AddPetModal
              open={addPetModalOpen}
              setOpen={setAddPetModalOpen}
              pets={pets}
              setPets={setPets}
            />
          </StyledHeadingDiv>

          {/* <StyledHeadingDiv>
            <h1>Andre eiendeler?</h1>

            <Grid columns={1}>
              <Grid.Column>
                <Input
                  placeholder="Skriv inn eiendelen her (f.eks Hytte)"
                  value={userDetails.otherAssets}
                  onChange={(_, data) => {
                    props.setUserDetails({
                      ...userDetails,
                      otherAssets: data.value?.toString()
                    });
                  }}
                  style={{ width: "100%" }}
                />
              </Grid.Column>
            </Grid>
          </StyledHeadingDiv> */}

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

          {/* <StyledBControlsDiv> */}
          {/* <Button onClick={() => {
          setAddFamilyModalOpen(true);
        }}>Add Family Member</Button> */}

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

const DottedDiv = styled.div`
  border: 2px dashed #a5c8d7;
  height: 145px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const StyledSpace = styled.div`
  padding-bottom: 1em !important;
`;

const StyledDragParagraph = styled.p`
  background-color: #f1f8f8 !important;
  border: 1px dashed #3d8eb1;
  padding: 3em;
  border-radius: 3px;
`;
const StyledDragParagraphActive = styled.p`
  background-color: #f1f8f8 !important;
  border: 2px solid #3d8eb1;
  padding: 3em;
  border-radius: 3px;
`;
