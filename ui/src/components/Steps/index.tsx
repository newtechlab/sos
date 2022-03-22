import { useState } from "react";
import { Step } from "semantic-ui-react";

interface StepsProps {
  currentStep: number;
}


export default function Steps({ currentStep }: StepsProps) {

    return <Step.Group ordered>
    <Step completed>
      <Step.Content>
        <Step.Title>Income</Step.Title>
        <Step.Description>Choose your shipping options</Step.Description>
      </Step.Content>
    </Step>

    <Step completed>
      <Step.Content>
        <Step.Title>Billing</Step.Title>
        <Step.Description>Enter billing information</Step.Description>
      </Step.Content>
    </Step>

    <Step active={currentStep===2}>
      <Step.Content>
        <Step.Title>Confirm Order</Step.Title>
      </Step.Content>
    </Step>

    <Step>
      <Step.Content>
        <Step.Title>Fourth one</Step.Title>
      </Step.Content>
    </Step>
  </Step.Group>
}

