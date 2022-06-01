import _ from "lodash";
import { StepGroupType, StepDefinition, StepsState } from "../components/Steps";
import { InitialStepsWithoutPath } from "./StepsInitialState";

const reducerF = (s: Set<StepGroupType>, stepDefinition: StepDefinition): Set<StepGroupType> => {
    if (!stepDefinition.completed)
      s.delete(stepDefinition.group)

    return s;
  }

export const progressStep = (state: StepsState): StepsState => {
    const nextActiveId = state.activeStepId + 1;
    const newSteps = state.steps.map((s) => {
      const completed = s.id === state.activeStepId || s.completed
      return {
        ...s,
        completed: completed
      }
    })
    return {
      activeStepId: nextActiveId,
      steps: newSteps,
      stepGroups: InitialStepsWithoutPath.stepGroups,
      completedGroups: _.reduce(newSteps, reducerF, new Set<StepGroupType>(Array.from(state.stepGroups.keys())))
    }
}

export const goBackStep = (state: StepsState): StepsState => {
  return {
    activeStepId: state.activeStepId - 1,
    steps: state.steps,
    stepGroups: InitialStepsWithoutPath.stepGroups,
    completedGroups: state.completedGroups
  }
}