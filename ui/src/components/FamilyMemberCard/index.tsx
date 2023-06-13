import styled from "styled-components";
import { FamilyMember } from "../../App";
import { GenericFamilyMemberCard } from "../PetCard";
import userImage from './person.png'

interface FamilyMemberCardProps {
    familyMember: FamilyMember;
    deleteFamilyMember: (id: string) => void;
}

export default function FamilyMemberCard(props: FamilyMemberCardProps) {
    const { familyMember, deleteFamilyMember } = props;

    return <FamilyMemberCardWrapper>
            <GenericFamilyMemberCard 
                id={familyMember.id} 
                name={familyMember.name} 
                onDelete={deleteFamilyMember} 
                image={userImage} />
            <StyledAgeDiv>{familyMember.age}</StyledAgeDiv>    
        </FamilyMemberCardWrapper>
}

export const FamilyMemberCardWrapper = styled.div`
    position: relative;
`

export const StyledFamilyMemberCard = styled.div`
    position: relative;
    margin: 10px;
    background: unset !important;
    width: 216px;
    height: 206px;
    position: relative;
`

const StyledAgeDiv = styled.div`
    position: absolute;
    top: 115px;
    left: 104px;
`
