import { stepReducer } from './StepReducer';
import { StepDefinition } from '../components/Steps';

test('step reducer to work with one step', () => {
  const current: StepDefinition = {
    id: 0,
    active: false,
    completed: false,
    title: "title",
    description: "description",
    path: "foo"
  }
  const accumulation: Array<StepDefinition> = [];
  const foo = stepReducer(accumulation, current)
  expect(foo).toMatchSnapshot();
});

test('step reducer to mark next step as complete', () => {
  const first: StepDefinition = {
    id: 0,
    active: true,
    completed: false,
    title: "title 0",
    description: "description 0",
    path: "foo 0"
  }
  const second: StepDefinition = {
    id: 1,
    active: false,
    completed: false,
    title: "title 1",
    description: "description 1",
    path: "foo 1"
  };
  const stepOne = stepReducer([], first)
  const foo = stepReducer(stepOne, second)
  expect(foo).toMatchSnapshot();
});
