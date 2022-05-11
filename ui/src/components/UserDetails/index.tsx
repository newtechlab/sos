import { setCharacterSpacing } from "pdf-lib";
import { useState } from "react";
import { Card, Container, Grid, Input } from "semantic-ui-react";
import styled from "styled-components";
import { getOriginalNode } from "typescript";
import { Car, FamilyMember, Goal, HouseSituation } from "../../App";
import { progressStep } from "../../data/StepProgressor";
import AddFamilyMemberCard from "../AddFamilyMemberCard";
import AddFamilyMemberModal from "../AddFamilyMemberModal";
import FamilyMemberCard from "../FamilyMemberCard";
import { JaNei } from "../JaNei";
import NextButton from "../NextButton";
import StepHeader from "../StepHeader";
import { StepDefinition, StepsState } from "../Steps";

export interface UserDetailsProps {
  familyMembers: Array<FamilyMember>;
  addFamilyMember: (_: FamilyMember) => void;
  setGoal: (_: Goal) => void;
  goal: Goal | undefined;
  setCar: (_: Car) => void;
  car: Car | undefined;
  house: HouseSituation;
  setHouse: (_: HouseSituation) => void;
  completeStep: () => void;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
  otherAssets: string;
  setOtherAssets: (_: string) => void
}

export default function UserDetails(props: UserDetailsProps) {
  const [addFamilyModalOpen, setAddFamilyModalOpen] = useState<boolean>(false);
  const {
    addFamilyMember,
    familyMembers,
    completeStep,
    activeStep,
    steps,
    car,
    house,
    setHouse
  } = props;
  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader activeStep={activeStep} steps={steps} />
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

          <StyledHeadingDiv>
            <h1>Familiemedlemmer</h1>
            <h3>Hvem består familien av?</h3>
            <Card.Group>
              {familyMembers.map((fm) => {
                return <FamilyMemberCard key={fm.id} familyMember={fm} />;
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
            <StyledTopRightLabel>Leaser du bil?</StyledTopRightLabel>
            <JaNei
              optionOneSelected={car?.own === true}
              optionOneText="Ja"
              optionOneClick={() => {
                props.setCar({ own: true });
                console.log({ car });
              }}
              optionTwoSelected={car?.own !== true}
              optionTwoText="Nei"
              optionTwoClick={() => {
                props.setCar({ own: false });
                console.log({ car });
              }}
            />
          </StyledHeadingDiv>

          <StyledHeadingDiv>
            <h1>Hvordan bor familien?</h1>
            <StyledTopRightLabel>
              Verken eier eller leier du?
            </StyledTopRightLabel>
            <JaNei
              optionOneSelected={house === HouseSituation.OWN}
              optionOneText="Eie"
              optionOneClick={() => {
                setHouse(HouseSituation.OWN)
              }}
              optionTwoSelected={house === HouseSituation.RENT}
              optionTwoText="Leie"
              optionTwoClick={() => {
                setHouse(HouseSituation.RENT)
              }}
            />
          </StyledHeadingDiv>

          <StyledHeadingDiv>
            <h1>Har familien dyr?</h1>
            <StyledTopRightLabel>Hvorfor spør vi om dette?</StyledTopRightLabel>
            <Grid columns={1}>
              <Grid.Column width={16}>
                <DottedDiv>+ Legg til</DottedDiv>
              </Grid.Column>
            </Grid>
          </StyledHeadingDiv>

          <StyledHeadingDiv>
            <h1>Andre eiendeler?</h1>
            <StyledTopRightLabel>
              Hva mener vi med andre eiendeler?
            </StyledTopRightLabel>
            <Grid columns={1}>
              <Grid.Column>
                <Input
                  placeholder="Skriv inn eiendelen her (f.eks Hytte)"
                  value={props.goal?.name}
                  onChange={(_, data) => {
                    props.setGoal({
                      name: data.value?.toString(),
                      amount: props.goal?.amount || 0,
                    });
                  }}
                  style={{ width: "100%" }}
                />
              </Grid.Column>
            </Grid>
          </StyledHeadingDiv>

          <StyledHeadingDiv>
            <h1>Har familien et sparemål?</h1>
            <StyledTopRightLabel>
              Hva mener vi med sparemål?
            </StyledTopRightLabel>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Input
                  placeholder="Skriv inn målet her (f.eks Tur til Kreta)"
                  value={props.otherAssets}
                  onChange={(_, data) => {
                    props.setOtherAssets(data.value?.toString());
                  }}
                  style={{ width: "100%" }}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Input
                  placeholder="ca beløp (f.eks. 40 000)"
                  value={props.goal?.amount || ""}
                  onChange={(_, data) => {
                    props.setGoal({
                      name: props.goal?.name || "",
                      amount: parseInt(data.value),
                    });
                  }}
                  label="Kr"
                  labelPosition="right"
                  style={{ width: "100%" }}
                />
              </Grid.Column>
            </Grid>
          </StyledHeadingDiv>

          <StyledBControlsDiv>
            {/* <Button onClick={() => {
          setAddFamilyModalOpen(true);
        }}>Add Family Member</Button> */}

            <NextButton completeStep={() => completeStep()} />
          </StyledBControlsDiv>
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

const StyledBControlsDiv = styled.div`
  text-align: right;
  padding-top: 40px;
  padding-bottom: 40px;
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

const StyledTopRightLabel = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;
