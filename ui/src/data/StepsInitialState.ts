import { StepDefinition, StepsState } from "../components/Steps";

const StepsInitialState: Array<StepDefinition> = [
    {
        id: 0,
        completed: false,
        title: "Familie",
        description: "Oversikt over familen",
        path: "/"
    },
    {
        id: 1,
        completed: false,
        title: "Penger inn",
        description: "Lønn og andre støtteordninger",
        path: "penger-inn"
    },
    {
        id: 2,
        completed: false,
        title: "Penger ut",
        description: "Utgifter og gjeld",
        path: "penger-ut"
    },
    {
        id: 3,
        completed: false,
        title: "Resultat",
        description: "Tiltak og råd ",
        path: "resultat"
    },
];

export const InitialSteps: StepsState = {
    activeStepId: 0,
    steps: StepsInitialState
}

