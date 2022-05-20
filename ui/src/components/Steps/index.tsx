import _ from "lodash";
import { Icon, Step } from "semantic-ui-react";

export interface StepsState {
    activeStepId:  number;
    completedGroups: Set<StepGroupType>;
    stepGroups: Map<StepGroupType, StepGroup>;
    steps: Array<StepDefinition>;
}

export enum StepGroupType {
    FAMILY,
    MONEY_IN,
    MONEY_OUT,
    RESULTS
}

export interface StepGroup {
    title: string;
    description: string;
}

export interface StepDefinition {
    id: number;
    group: StepGroupType;
    completed: boolean;
    path: string;
    heading: string;
    description?: string;
}

export interface StepsProps {
  steps: StepsState
}

export default function Steps(props: StepsProps) {
    const { steps } = props
    const ActiveIcon = "arrow alternate circle down";
    const CompleteIcon = "check circle";
    const stepsArray = Array.from( steps.stepGroups )
    return <Step.Group widths={4}>
            { stepsArray.map(([stepGroupId, stepGroup]) => {
                const step = steps.steps[steps.activeStepId];
                const isActive = stepGroupId === step.group;
                return <Step key={stepGroupId} active={isActive}>
                    {  isActive && <Icon name={ActiveIcon} color="teal" /> }
                    {  !isActive && steps.completedGroups.has(stepGroupId) && <Icon name={CompleteIcon} color="green" /> } 
                    <Step.Content>
                    <Step.Title>{ steps.stepGroups.get(stepGroupId)?.title }</Step.Title>
                    <Step.Description> { steps.stepGroups.get(stepGroupId)?.description }</Step.Description>
                    </Step.Content>
                </Step>
            })}
        </Step.Group>
}