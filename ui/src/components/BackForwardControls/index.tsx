import { Grid } from "semantic-ui-react";
import BackButton from "../BackButton";
import NextButton from "../NextButton";

interface BackForwardControlsProps {
  text?: string;
  noBack?: boolean;
  completeStep: () => void;
  goBack: () => void;
}

interface LastPageBackForwardControlsProps {
  goBack: () => void;
}

export default function BackForwardControls(props: BackForwardControlsProps) {
  const { completeStep, goBack, noBack } = props;

  return (
    <Grid columns={2}>
      <Grid.Column>
        {noBack ? null : <BackButton goBack={() => goBack()} />}
      </Grid.Column>

      <Grid.Column textAlign="right">
        <NextButton
          text={props.text ? props.text : null}
          completeStep={() => completeStep()}
        />
      </Grid.Column>
    </Grid>
  );
}

export function LastPageBackForwardControls(
  props: LastPageBackForwardControlsProps
) {
  const { goBack } = props;

  return <BackButton goBack={() => goBack()} />;
}
