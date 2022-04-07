import { StepGroup, StepGroupType, StepsState } from '../components/Steps';
import { progressStep } from './StepProgressor';

test('Progresses a step', () => {
  const stepGroups: Map<StepGroupType, StepGroup> = new Map<StepGroupType, StepGroup>();
    stepGroups.set(StepGroupType.FAMILY, {
        title: "Familie",
        description: "Oversikt over familen",
    })
  const startState: StepsState = {
    activeStepId: 0,
    completedGroups: new Set(),
    stepGroups: stepGroups,
    steps: [{
      id: 0,
      group: StepGroupType.FAMILY,
      completed: false,
      path: "foo 0"
    }]
  }
  const newState = progressStep(startState);
  expect(newState).toMatchSnapshot();
});

test('Progresses a step when there are two items in the same group', () => {
  const stepGroups: Map<StepGroupType, StepGroup> = new Map<StepGroupType, StepGroup>();
    stepGroups.set(StepGroupType.FAMILY, {
        title: "Familie",
        description: "Oversikt over familen",
    })
  const startState: StepsState = {
    activeStepId: 0,
    completedGroups: new Set(),
    stepGroups: stepGroups,
    steps: [{
      id: 0,
      group: StepGroupType.FAMILY,
      completed: false,
      path: "foo 0"
    },
    {
      id: 1,
      group: StepGroupType.FAMILY,
      completed: false,
      path: "foo 1"
    }]
  }
  const newState = progressStep(startState);
  expect(newState).toMatchSnapshot();
});
