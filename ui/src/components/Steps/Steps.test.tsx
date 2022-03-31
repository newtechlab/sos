import { render } from '@testing-library/react';
import Steps, { StepDefinition, StepsState } from '.';

test('renders learn react link', () => {
  const stepState: StepsState = {
    activeStepId: 0,
    steps: [{
      id: 0,
      completed: false,
      title: "step title",
      description: "description 0",
      path: "foo 0"
    }]
  }
  const {container, getByText} = render( <Steps steps={stepState} />  )
  expect(getByText('step title')).toBeInTheDocument()
});
