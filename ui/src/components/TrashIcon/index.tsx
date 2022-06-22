import { Icon, SemanticCOLORS, SemanticICONS } from "semantic-ui-react";
import styled from "styled-components";

interface IconProps {
    onClick: (_: string) => void;
    color: SemanticCOLORS;
    itemId: string;
}

export default function TrashIcon(props: IconProps) {
  const { onClick, color, itemId } = props;

  return (
    <StyledIcon
      name="trash alternate outline"
      color={color}
      onClick={() => {
        onClick(itemId);
      }}
    />
  );
}


export const StyledIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
`;
