import { Button } from "semantic-ui-react";

interface NextButtonProps {
    completeStep: () => void
}

export default function NextButton(props: NextButtonProps) {
    const { completeStep } = props;

 return <Button circular color="teal" onClick={() => {
          completeStep();
        }}>Neste</Button>
}