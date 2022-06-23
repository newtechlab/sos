import MoneyOut from "../components/MoneyOut";
import { StepDefinition, StepGroup, StepGroupType, StepsState } from "../components/Steps";
import { progressStep } from "./StepProgressor";

export const StepsInitialState: Array<StepDefinition> = [
    {
        id: 0,
        group: StepGroupType.FAMILY,
        completed: false,
        path: "/family",
        heading: "Familieoversikt",
        description: "Før vi starter ønsker vi å få en oversikt over familiesituasjonen din og litt grunnlegende innsikt."
    },
    {
        id: 1,
        group: StepGroupType.MONEY_IN,
        completed: false,
        path: "/penger-inn",
        heading: "Penger inn",
        description: "I dette punktet ønsker vi å få en oversikt over dine inntektskilder og hvor mye penger inn du får i løpet av en måned."
    },
    {
        id: 2,
        group: StepGroupType.MONEY_OUT,
        completed: false,
        path: "/gjeld",
        heading: "Gjeld",
        description: "I dette punktet ønsker vi å kartlegge både faste og løpende utgifter, samt din gjeldssituasjon"
    },
    {
        id: 3,
        group: StepGroupType.MONEY_OUT,
        completed: false,
        path: "/penger-ut",
        heading: "Penger ut",
        description: "I dette punktet ønsker vi å kartlegge både faste og løpende utgifter, samt din gjeldssituasjon"
    },
    {
        id: 4,
        group: StepGroupType.RESULTS,
        completed: false,
        path: "/resultat1",
        heading: "Oversikt"
    },
    {
        id: 5,
        group: StepGroupType.RESULTS,
        completed: false,
        path: "/resultat2",
        heading: "Gjeld"
    },
    {
        id: 6,
        group: StepGroupType.RESULTS,
        completed: false,
        path: "/resultat3",
        heading: "Utgifter"
    },
    {
        id: 7,
        group: StepGroupType.END,
        completed: false,
        path: "/end",
        heading: "Resultat"
    },
];

export interface StateSummary {
    familyMemberCount: number | undefined;
    moneyIn: string | undefined;
    moneyOut: string | undefined;
}

export const DefaultStateSummary: StateSummary = {
    familyMemberCount: undefined,
    moneyIn: undefined,
    moneyOut: undefined,
}

const familyTxt = (familyMemberCount: number | undefined): string => {
    if (familyMemberCount === undefined || familyMemberCount === 0) {
        return "Oversikt over familen"
    }

    if (familyMemberCount === 1) return `${familyMemberCount} person`

    return `${familyMemberCount} people`
} 

export const StepGroups = (stateSummary: StateSummary): Map<StepGroupType, StepGroup> => {
    const { familyMemberCount } = stateSummary
    const stepGroups: Map<StepGroupType, StepGroup> = new Map<StepGroupType, StepGroup>();
    stepGroups.set(StepGroupType.FAMILY, {
        title: "Familie",
        description: familyTxt(familyMemberCount),
    })
    stepGroups.set(StepGroupType.MONEY_IN, {
        title: "Penger inn",
        description: stateSummary.moneyIn ? `${stateSummary.moneyIn} kr` : "Lønn og støtteordninger",
    })
    stepGroups.set(StepGroupType.MONEY_OUT, {
        title: "Penger ut",
        description: stateSummary.moneyOut ? `${stateSummary.moneyOut} kr` : "Gjeld og utgifter",
    })
    stepGroups.set(StepGroupType.RESULTS, {
        title: "Resultat",
        description: "Tiltak og råd ",
    })
    return stepGroups;
}

export const InitialStepsWithoutPath = (stateSummary: StateSummary): StepsState => {
    return {
        activeStepId: 0,
        steps: StepsInitialState,
        stepGroups: StepGroups(stateSummary),
        completedGroups: new Set<StepGroupType>()
    }  
}

export const InitialStepsWithPath = (path: string, stateSummary: StateSummary, completedGroups: Set<StepGroupType>): StepsState => {
    const steps = InitialStepsWithoutPath(stateSummary);
    const current = StepsInitialState.find((s) => s.path === path)

    return {
        ... steps, 
        activeStepId: current?.id || 0,
        completedGroups: completedGroups
    }
}

