import { Button } from "semantic-ui-react";

interface NextButtonProps {
  text?: string | null;
  completeStep: () => void;
}

export default function NextButton(props: NextButtonProps) {
  const { completeStep } = props;

  return (
    <Button
      circular
      color="blue"
      onClick={() => {
        completeStep();
      }}
    >
      {props.text ? props.text : "Neste"}
    </Button>
  );
}
