import { StepDefinition, StepGroup, StepGroupType, StepsState } from "../components/Steps";

const StepsInitialState: Array<StepDefinition> = [
    {
        id: 0,
        group: StepGroupType.FAMILY,
        completed: false,
        path: "/",
        heading: "Familieoversikt",
        description: "Før vi starter ønsker vi å få en oversikt over familiesituasjonen din og litt grunnlegende innsikt."
    },
    {
        id: 1,
        group: StepGroupType.MONEY_IN,
        completed: false,
        path: "penger-inn",
        heading: "Penger inn",
        description: "I dette punktet ønsker vi å få en oversikt over dine inntektskilder og hvor mye penger inn du får i løpet av en måned."
    },
    {
        id: 2,
        group: StepGroupType.MONEY_OUT,
        completed: false,
        path: "penger-ut",
        heading: "Penger ut",
        description: "I dette punktet ønsker vi å kartlegge både faste og løpende utgifter, samt din gjeldssituasjon"
    },
    {
        id: 3,
        group: StepGroupType.RESULTS,
        completed: false,
        path: "resultat1",
        heading: "Resultat"
    },
    {
        id: 4,
        group: StepGroupType.RESULTS,
        completed: false,
        path: "resultat2",
        heading: "Resultat"
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

