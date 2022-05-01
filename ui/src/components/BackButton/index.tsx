import { Button } from "semantic-ui-react";

interface BackButtonProps {
    goBack: () => void
}

export default function BackButton(props: BackButtonProps) {
    const { goBack } = props;

 return <Button basic circular color="teal" onClick={() => {
    goBack();
        }}>Tilbake</Button>
}


