import { Grid } from "semantic-ui-react";
import BackButton from "../BackButton";
import NextButton from "../NextButton";

interface BackForwardControlsProps {
    completeStep: () => void
    goBack: () => void
}

export default function BackForwardControls(props: BackForwardControlsProps) {
    const { completeStep, goBack } = props;

 return <Grid columns={2}>
        <Grid.Column>
            <BackButton goBack={() => goBack()} />
        </Grid.Column>
        <Grid.Column textAlign="right">
            <NextButton completeStep={() => completeStep()} />
        </Grid.Column>
    </Grid>
}
