import _ from "lodash";
import { StepGroupType, StepDefinition, StepsState } from "../components/Steps";
import { InitialStepsWithoutPath, StateSummary } from "./StepsInitialState";

const reducerF = (s: Set<StepGroupType>, stepDefinition: StepDefinition): Set<StepGroupType> => {
    if (!stepDefinition.completed)
      s.delete(stepDefinition.group)

    return s;
  }

export const progressStep = (state: StepsState, stateSummary: StateSummary): StepsState => {
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
      stepGroups: InitialStepsWithoutPath(stateSummary).stepGroups,
      completedGroups: _.reduce(newSteps, reducerF, new Set<StepGroupType>(Array.from(state.stepGroups.keys())))
    }
}

export const goBackStep = (state: StepsState, stateSummary: StateSummary): StepsState => {
  return {
    activeStepId: state.activeStepId - 1,
    steps: state.steps,
    stepGroups: InitialStepsWithoutPath(stateSummary).stepGroups,
    completedGroups: state.completedGroups
  }
}

export const goToSpecificStep = (step: StepDefinition, state: StepsState, stateSummary: StateSummary): StepsState => {
  return {
    activeStepId: step.id,
    steps: state.steps,
    stepGroups: InitialStepsWithoutPath(stateSummary).stepGroups,
    completedGroups: state.completedGroups
  }
}

export const updateSteps = (state: StepsState, stateSummary: StateSummary): StepsState => {
  return {
    ... state,
    stepGroups: InitialStepsWithoutPath(stateSummary).stepGroups,
  }
}