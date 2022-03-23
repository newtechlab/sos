import { StepDefinition } from "../components/Steps";

export const StepsInitialState: Array<StepDefinition> = [
    {
        id: 0,
        active: true,
        completed: false,
        title: "Familie",
        description: "Oversikt over familen"
    },
    {
        id: 1,
        active: false,
        completed: false,
        title: "Penger inn",
        description: "Lønn og andre støtteordninger"
    },
    {
        id: 2,
        active: false,
        completed: false,
        title: "Penger ut",
        description: "Utgifter og gjeld"
    },
    {
        id: 3,
        active: false,
        completed: false,
        title: "Resultat",
        description: "Tiltak og råd "
    },
];