import { useState } from "react";
import { Card, Container, Grid, Input } from "semantic-ui-react";
import styled from "styled-components";
import { FamilyMember, HouseSituation, UserInformation } from "../../App";
import AddFamilyMemberCard from "../AddFamilyMemberCard";
import AddFamilyMemberModal from "../AddFamilyMemberModal";
import FamilyMemberCard from "../FamilyMemberCard";
import HelpTextModalGoal from "../HelpTextModalGoal";
import { JaNei } from "../JaNei";
import NextButton from "../NextButton";
import StepHeader from "../StepHeader";
import { StepDefinition, StepsState } from "../Steps";

export interface UserDetailsProps {
  familyMembers: Array<FamilyMember>;
  addFamilyMember: (_: FamilyMember) => void;
  setUserDetails: (_: UserInformation) => void;
  userDetails: UserInformation;
  completeStep: () => void;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
}

export default function UserDetails(props: UserDetailsProps) {
  const [addFamilyModalOpen, setAddFamilyModalOpen] = useState<boolean>(false);
  const [addHelpTextGoalModalOpen, OpenHelpTextGoalModal] =
    useState<boolean>(false);
  const {
    addFamilyMember,
    familyMembers,
    completeStep,
    activeStep,
    steps,
    userDetails,
    setUserDetails
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

            <JaNei
              optionOneSelected={userDetails.car?.own === true}
              optionOneText="Ja"
              optionOneClick={() => {
                setUserDetails({
                  ...userDetails,
                  car: { own: true }
                });
              }}
              optionTwoSelected={userDetails.car?.own !== true}
              optionTwoText="Nei"
              optionTwoClick={() => {
                setUserDetails({
                  ...userDetails,
                  car: { own: false }
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
                  house: HouseSituation.OWN
                });
              }}
              optionTwoSelected={userDetails.house === HouseSituation.RENT}
              optionTwoText="Leie"
              optionTwoClick={() => {
                setUserDetails({
                  ...userDetails,
                  house: HouseSituation.RENT
                });
              }}
            />
          </StyledHeadingDiv>

          <StyledHeadingDiv>
            <h1>Har familien dyr?</h1>

            <Grid columns={1}>
              <Grid.Column width={16}>
                <DottedDiv>+ Legg til</DottedDiv>
              </Grid.Column>
            </Grid>
          </StyledHeadingDiv>

          <StyledHeadingDiv>
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
                  placeholder="Skriv inn målet her (f.eks Tur til Kreta)"
                  value={props.userDetails.goal?.name}
                  onChange={(_, data) => {
                    props.setUserDetails({
                      ... props.userDetails,
                      goal: {
                        name: data.value?.toString(),
                        amount: props.userDetails.goal?.amount || 0,
                      }
                  });
                  }}
                  style={{ width: "100%" }}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Input
                  placeholder="ca beløp (f.eks. 40 000)"
                  value={props.userDetails.goal?.amount || ""}
                  onChange={(_, data) => {
                    props.setUserDetails({
                      ... props.userDetails,
                      goal: {
                        name: props.userDetails.goal?.name || "",
                        amount: parseInt(data.value),
                      }
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
