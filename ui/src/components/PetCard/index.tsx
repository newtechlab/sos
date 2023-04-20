import { Icon, Image } from "semantic-ui-react";
import styled from "styled-components";
import TrashIcon from "../TrashIcon";
import pets from "./shilouette-pets.png";

interface GenericFamilyMemberCardProps {
  id: string;
  name: string;
  image: string;
  onDelete: (id: string) => void;
}

export function GenericFamilyMemberCard(props: GenericFamilyMemberCardProps) {
  const { id, name, onDelete, image } = props;

  return (
    <StyledPetCard>
      <StyledImage src={image} wrapped ui={false} />
      <StyledNameDiv>
        {name}
        <IconDiv>
          <TrashIcon onClick={onDelete} color="blue" itemId={id} />
        </IconDiv>
      </StyledNameDiv>
    </StyledPetCard>
  );
}

interface PetMemberCardProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
}

export default function PetMemberCard(props: PetMemberCardProps) {
  const { id, name, onDelete } = props;

  return (
    <GenericFamilyMemberCard
      id={id}
      name={name}
      onDelete={onDelete}
      image={pets}
    />
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

const IconDiv = styled.div`
  float: right;
  position: relative;
  padding-right: 5px;
`;

const StyledImage = styled(Image)`
  img {
    width: 212px !important;
    height: 167px !important;
  }
`;
