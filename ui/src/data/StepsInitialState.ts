import { StepDefinition, StepGroup, StepGroupType, StepsState } from "../components/Steps";

const StepsInitialState: Array<StepDefinition> = [
    {
        id: 0,
        group: StepGroupType.FAMILY,
        completed: false,
        path: "/"
    },
    {
        id: 1,
        group: StepGroupType.MONEY_IN,
        completed: false,
        path: "penger-inn"
    },
    {
        id: 2,
        group: StepGroupType.MONEY_OUT,
        completed: false,
        path: "penger-ut"
    },
    {
        id: 3,
        group: StepGroupType.RESULTS,
        completed: false,
        path: "resultat"
    },
    {
        id: 4,
        group: StepGroupType.RESULTS,
        completed: false,
        path: "resultat"
    },
];



const StepGroups = (): Map<StepGroupType, StepGroup> => {
    const stepGroups: Map<StepGroupType, StepGroup> = new Map<StepGroupType, StepGroup>();
    stepGroups.set(StepGroupType.FAMILY, {
        title: "Familie",
        description: "Oversikt over familen",
    })
    stepGroups.set(StepGroupType.MONEY_IN, {
        title: "Penger inn",
        description: "Lønn og andre støtteordninger",
    })
    stepGroups.set(StepGroupType.MONEY_OUT, {
        title: "Penger ut",
        description: "Oversikt over familen",
    })
    stepGroups.set(StepGroupType.RESULTS, {
        title: "Resultat 1",
        description: "Tiltak og råd ",
    })
    return stepGroups;
}

export const InitialSteps: StepsState = {
    activeStepId: 0,
    steps: StepsInitialState,
    stepGroups: StepGroups(),
    completedGroups: new Set<StepGroupType>()
}

