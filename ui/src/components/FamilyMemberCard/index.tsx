import { Card, Icon, Image } from "semantic-ui-react";
import styled from "styled-components";
import { FamilyMember } from "../../App";
import { StyledCard } from "../StyledFamilyCard";
import childImage from './child.png';

interface FamilyMemberCardProps {
    familyMember: FamilyMember;
}

export default function FamilyMemberCard(props: FamilyMemberCardProps) {
    const { familyMember } = props;

    return <StyledCard>
        <StyledImage src={childImage} wrapped ui={false} />
        <StyledNameDiv>{familyMember.name} : {familyMember.age}</StyledNameDiv>
    </StyledCard>
}

const StyledNameDiv = styled.div`
    position: absolute;
    bottom: 0px;
    height: 40px;
    width: 100%;
    background-color: #FFF;
    text-align: center;
    line-height: 40px;
`

const StyledImage = styled(Image)`
    img {
        width: 286px !important;
        height: 286px !important;
    }
`

