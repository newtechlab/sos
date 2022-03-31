import { StepDefinition } from "../components/Steps";

export const stepReducer = (accumulation: Array<StepDefinition>, current: StepDefinition): Array<StepDefinition> => {
    const prevItem: StepDefinition | undefined = (accumulation && accumulation.length > 0) ? accumulation[accumulation.length-1] : undefined
    const prevItemCompleted = prevItem ? prevItem.completed : false;
    const thisIsCompleted = current.active || current.completed;
    const newStep: StepDefinition = {
      ...current,
      completed: thisIsCompleted,
      active: prevItemCompleted && !thisIsCompleted
    } 
    return accumulation.concat(newStep);
}