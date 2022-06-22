import { Icon, SemanticCOLORS, SemanticICONS } from "semantic-ui-react";

interface IconProps {
    onClick: (_: string) => void;
    name: SemanticICONS;
    color: SemanticCOLORS;
    itemId: string;
}

export default function TrashIcon(props: IconProps) {
  const { onClick, name, color, itemId } = props;

  return (
    <Icon
      name={name}
      color={color}
      onClick={() => {
        onClick(itemId);
      }}
    />
  );
}
