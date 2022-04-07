import styled from "styled-components";
import { StyledCard } from "../StyledFamilyCard";

interface AddFamilyMemberCardProps {
    onClick: () => void;
}

export default function AddFamilyMemberCard(props: AddFamilyMemberCardProps) {
    const { onClick } = props;

    return <StyledCard onClick={() => onClick()}>
        <CenterTextDiv>+ Legg til</CenterTextDiv>
    </StyledCard>
}

const CenterTextDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
