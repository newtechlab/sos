import { Icon, Image } from "semantic-ui-react";
import styled from "styled-components";

// interface PetMember {
//     id: string;
//     name: string;
//   }

interface PetMemberCardProps {
    id: string;
    name: string;
    deletePet: (id: string) => void;
}

export default function PetMemberCard(props: PetMemberCardProps) {
    const { id, name, deletePet } = props;

    return <StyledPetCard>
        <CenterTextDiv>{name}</CenterTextDiv>
        <Icon
            onClick={() => {
            deletePet(id);
            }}
            name="trash alternate outline"
            color="blue"
        />
    </StyledPetCard>
}

export const StyledPetCard = styled.div`
    border: 2px dashed #a5c8d7;
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
    // position: absolute;
    // bottom: 0px;
    // height: 40px;
    // width: 212px;
    // background-color: #FFF;
    // text-align: center;
    // line-height: 40px;
    // border-bottom-right-radius: 5px;
    // border-bottom-left-radius: 5px;
`

const CenterTextDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const StyledImage = styled(Image)`
    img {
        width: 212px !important;
        height: 167px !important;
    }
`

