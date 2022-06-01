import { Icon, Image } from "semantic-ui-react";
import styled from "styled-components";
import { FamilyMember } from "../../App";
import userImage from './person.png'

interface FamilyMemberCardProps {
    familyMember: FamilyMember;
    deleteFamilyMember: (id: string) => void;
}

export default function FamilyMemberCard(props: FamilyMemberCardProps) {
    const { familyMember, deleteFamilyMember } = props;

    return <StyledFamilyMemberCard>
        <StyledAgeDiv>{familyMember.age}</StyledAgeDiv>
        <StyledImage src={userImage} wrapped ui={false} />
        <StyledNameDiv>
            {familyMember.name} 
            <IconDiv>
            <Icon
            onClick={() => {
                deleteFamilyMember(familyMember.id);
            }}
            name="trash alternate outline"
            color="blue"                    
            />       
            </IconDiv>  
        </StyledNameDiv>
    </StyledFamilyMemberCard>
}

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
    top: 105px;
    left: 92px;
`

const StyledNameDiv = styled.div`
    position: relative;
    bottom: 0px;
    height: 40px;
    width: 212px;
    background-color: #FFF;
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
`

const StyledImage = styled(Image)`
    img {
        width: 212px !important;
        height: 167px !important;
    }
`
const IconDiv = styled.div`
  float: right; 
`;
