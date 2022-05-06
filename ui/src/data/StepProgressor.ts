import _ from "lodash";
import { StepGroupType, StepDefinition, StepsState } from "../components/Steps";
import { InitialSteps } from "./StepsInitialState";

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
      stepGroups: InitialSteps.stepGroups,
      completedGroups: _.reduce(newSteps, reducerF, new Set<StepGroupType>(Array.from(state.stepGroups.keys())))
    }
  }