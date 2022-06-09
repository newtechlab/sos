import { render } from '@testing-library/react';
import Steps, { StepGroup, StepGroupType, StepsState } from '.';

test('renders learn react link', () => {
  const stepGroups: Map<StepGroupType, StepGroup> = new Map<StepGroupType, StepGroup>();
    stepGroups.set(StepGroupType.FAMILY, {
        title: "Familie",
        description: "Oversikt over familen",
    })
  const stepState: StepsState = {
    activeStepId: 0,
    completedGroups: new Set(),
    stepGroups: stepGroups,
    steps: [{
      id: 0,
      group: StepGroupType.FAMILY,
      completed: false,
      path: "foo 0",
      heading: "erwfkjwefkjwer"
    }]
  }
  const {container, getByText} = render( <Steps steps={stepState} goToStep={(step) => undefined } />  )
  expect(getByText('Oversikt over familen')).toBeInTheDocument()
});
