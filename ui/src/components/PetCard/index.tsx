import { Icon, Image } from "semantic-ui-react";
import styled from "styled-components";
import pets from "./shilouette-pets.png";

interface PetMemberCardProps {
  id: string;
  name: string;
  deletePet: (id: string) => void;
}

export default function PetMemberCard(props: PetMemberCardProps) {
  const { id, name, deletePet } = props;

  return (
    <StyledPetCard>
      <StyledImage src={pets} wrapped ui={false} />
      <StyledNameDiv>
        {name}
        <Icon
          onClick={() => {
            deletePet(id);
          }}
          name="trash alternate outline"
          color="blue"
        />
      </StyledNameDiv>
    </StyledPetCard>
  );
}

export const StyledPetCard = styled.div`
  border: 2px dashed #a5c8d7;
  border-radius: 0.25em;
  position: relative;
  margin: 10px;
  background: #a5c8d7 !important;
  width: 216px;
  height: 206px;
  position: relative;
`;

const StyledNameDiv = styled.div`
  position: absolute;
  bottom: 0px;
  height: 40px;
  width: 212px;
  background-color: #fff;
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const StyledImage = styled(Image)`
  img {
    width: 212px !important;
    height: 167px !important;
  }
`;
