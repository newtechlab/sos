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
    RESULTS,
    END
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
  steps: StepsState;
  goToStep: (step: StepDefinition) => void
}

const getPathOfStepGroup = (stepGroup: StepGroupType, stepDefinitions: StepDefinition[]): StepDefinition | undefined => {
    return stepDefinitions.find((i) => i.group === stepGroup)
}

export default function Steps(props: StepsProps) {

    console.log("completedGroups", props.steps.completedGroups);

    const { steps } = props
    const ActiveIcon = "arrow alternate circle down";
    const CompleteIcon = "check circle";
    const stepsArray = Array.from( steps.stepGroups )
    return <Step.Group widths={4}>
            { stepsArray.map(([stepGroupId, stepGroup]) => {
                const currentStepDefinition = steps.stepGroups.get(stepGroupId)
                const stepDefinition: StepDefinition | undefined = getPathOfStepGroup(stepGroupId, steps.steps);
                const step = steps.steps[steps.activeStepId];
                const isActive = stepGroupId === (step?.group || StepGroupType.FAMILY);
                return <Step key={stepGroupId} active={isActive} onClick={ () => { if (stepDefinition) { props.goToStep(stepDefinition) } }}>
                    {  isActive && <Icon name={ActiveIcon} color="teal" /> }
                    {  !isActive && steps.completedGroups.has(stepGroupId) && <Icon name={CompleteIcon} color="green" /> } 
                    <Step.Content>
                    <Step.Title>{ currentStepDefinition?.title }</Step.Title>
                    <Step.Description> { currentStepDefinition?.description }</Step.Description>
                    </Step.Content>
                </Step>
            })}
        </Step.Group>
}