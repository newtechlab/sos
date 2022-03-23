import { Icon, Step } from "semantic-ui-react";

export interface StepDefinition {
    id: number;
    active: boolean;
    completed: boolean;
    title: string;
    description: string;
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
            return <Step key={step.id} active={step.active} completed={step.completed}>
                {  step.active && <Icon name={ActiveIcon} color="green" /> }
                {  step.completed && <Icon name={CompleteIcon} color="green" /> } 
                <Step.Content>
                <Step.Title>{ step.title }</Step.Title>
                <Step.Description> { step.description }</Step.Description>
                </Step.Content>
            </Step>
        })}
  </Step.Group>
}

