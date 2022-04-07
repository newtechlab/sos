import { Icon, Step } from "semantic-ui-react";

export interface StepsState {
    activeStepId:  number;
    steps: Array<StepDefinition>;
}

export interface StepDefinition {
    id: number;
    completed: boolean;
    title: string;
    description: string;
    path: string;
}

export interface StepsProps {
  steps: StepsState
}

export default function Steps(props: StepsProps) {
    const { steps } = props
    const ActiveIcon = "arrow alternate circle down";
    const CompleteIcon = "check circle";
    return <Step.Group>
            { steps.steps.map((step) => {
                const isActive = steps.activeStepId === step.id;
                return <Step key={step.id} active={isActive}>
                    {  isActive && <Icon name={ActiveIcon} color="teal" /> }
                    {  step.completed && <Icon name={CompleteIcon} color="teal" /> } 
                    <Step.Content>
                    <Step.Title>{ step.title }</Step.Title>
                    <Step.Description> { step.description }</Step.Description>
                    </Step.Content>
                </Step>
            })}
        </Step.Group>
}