import { Icon, Step } from "semantic-ui-react";

export interface StepDefinition {
    id: number;
    active: boolean;
    completed: boolean;
    title: string;
    description: string;
    path: string;
}


export interface StepsProps {
  steps: Array<StepDefinition>;
}

export default function Steps(props: StepsProps) {
    const { steps } = props
    const ActiveIcon = "arrow alternate circle down";
    const CompleteIcon = "check circle";
    return <Step.Group>
        { steps.map((step) => {
            return <Step key={step.id} active={step.active}>
                {  step.active && <Icon name={ActiveIcon} color="teal" /> }
                {  step.completed && <Icon name={CompleteIcon} color="teal" /> } 
                <Step.Content>
                <Step.Title>{ step.title }</Step.Title>
                <Step.Description> { step.description }</Step.Description>
                </Step.Content>
            </Step>
        })}
  </Step.Group>
}

