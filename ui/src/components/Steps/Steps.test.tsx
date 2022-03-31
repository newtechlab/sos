import { render } from '@testing-library/react';
import Steps, { StepDefinition } from '.';

test('renders learn react link', () => {
  const steps: Array<StepDefinition> = [{
    id: 0,
    active: true,
    completed: false,
    title: "step title",
    description: "description 0",
    path: "foo 0"
  }]
  const {container, getByText} = render( <Steps steps={steps} />  )
  expect(getByText('step title')).toBeInTheDocument()
});
