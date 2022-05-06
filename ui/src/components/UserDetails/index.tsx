import { useState } from "react";
import { Card, Container, Grid, Input } from "semantic-ui-react";
import styled from "styled-components";
import { getOriginalNode } from "typescript";
import { FamilyMember, Goal } from "../../App";
import AddFamilyMemberCard from "../AddFamilyMemberCard";
import AddFamilyMemberModal from "../AddFamilyMemberModal";
import FamilyMemberCard from "../FamilyMemberCard";
import NextButton from "../NextButton";

export interface UserDetailsProps {
  familyMembers: Array<FamilyMember>;
  addFamilyMember: (_: FamilyMember) => void;
  setGoal: (_: Goal) => void;
  goal: Goal | undefined;
  completeStep: () => void
}

interface JaNeiProps {
  optionOneText: string;
  optionOneClick: () => void;
  optionTwoText: string;
  optionTwoClick: () => void;
}

const JaNei = (props: JaNeiProps) => 
  <Grid columns={2}>
    <Grid.Column width={8}>
      <DottedDiv>{props.optionOneText}</DottedDiv>
    </Grid.Column>
    <Grid.Column width={8}>
      <DottedDiv>{props.optionTwoText}</DottedDiv>
    </Grid.Column>
  </Grid>

export default function UserDetails(props: UserDetailsProps) {
  const [addFamilyModalOpen, setAddFamilyModalOpen] = useState<boolean>(false);
  const {addFamilyMember, familyMembers, completeStep} = props
    return <Container>

    { addFamilyModalOpen && <AddFamilyMemberModal 
        addFamilyMember={addFamilyMember} 
        open={addFamilyModalOpen} 
        setOpen={setAddFamilyModalOpen} /> }

      <StyledHeadingDiv>
        <h1>Legg til familiemedlemmer</h1>
        <StyledTopRightLabel>Hvorfor?</StyledTopRightLabel>
        <Card.Group>
          { familyMembers.map((fm) => {
            return <FamilyMemberCard key={fm.id} familyMember={fm} />
          }) }
          <AddFamilyMemberCard key="ADD_NEW_MEMBER" onClick={() => {setAddFamilyModalOpen(true)}} />
        </Card.Group>
      </StyledHeadingDiv>

      <StyledHeadingDiv>
        <h1>Eier familien en bil?</h1>
        <StyledTopRightLabel>Leaser du bil?</StyledTopRightLabel>
        <JaNei 
          optionOneText="Ja" 
          optionOneClick={() => { console.log("todo") }}
          optionTwoText="Nei" 
          optionTwoClick={() => { console.log("todo") }}
        />
      </StyledHeadingDiv>  

      <StyledHeadingDiv>
        <h1>Boligsituasjon</h1>
        <StyledTopRightLabel>Hverken eier eller leier du?</StyledTopRightLabel>
        <JaNei 
            optionOneText="Eie" 
            optionOneClick={() => { console.log("todo") }}
            optionTwoText="Leie" 
            optionTwoClick={() => { console.log("todo") }}
        />
      </StyledHeadingDiv>  

      <StyledHeadingDiv>
        <h1>Eier du noen dyr?</h1>
        <StyledTopRightLabel>Hvorfor spør vi om dette?</StyledTopRightLabel>
        <Grid columns={1}>
          <Grid.Column width={16}>
          <DottedDiv>+ Legg til</DottedDiv>
          </Grid.Column>
        </Grid>
      </StyledHeadingDiv>

      <StyledHeadingDiv>
        <h1>Andre eiendeler?</h1>
        <StyledTopRightLabel>Hva mener vi med annen formue?</StyledTopRightLabel>
        <StyledInput />
      </StyledHeadingDiv>

      <StyledHeadingDiv>
        <h1>Do you have any goals?</h1>
        <StyledTopRightLabel>Hva mener vi med goals?</StyledTopRightLabel>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Input 
              placeholder="Type any goal you might have"
              value={props.goal?.name}
              onChange={ (_, data) => { props.setGoal({ 
                name: data.value?.toString(),
                amount: props.goal?.amount || 0 })
              }} 
              style={{ width: "100%" }}
            />
          </Grid.Column>
          <Grid.Column width={6}>
          <Input 
              placeholder="Amount"
              value={props.goal?.amount || ""}
              onChange={ (_, data) => { props.setGoal({ 
                name: props.goal?.name || "",
                amount: parseInt(data.value) })
              }} 
              label="KR."
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

    </Container>
}

const StyledBControlsDiv = styled.div`
    text-align: right;
    padding-top: 40px;
    padding-bottom: 40px;
`

const DottedDiv = styled.div`
    border: 2px dashed #A5C8D7;
    height: 145px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledHeadingDiv = styled.div`
    position: relative;
    margin-bottom: 20px;
`

const StyledTopRightLabel = styled.div`
    position: absolute;
    top: 0px;
    right:0px;
`

const StyledInput = styled(Input)`
    width: 100%;
`
