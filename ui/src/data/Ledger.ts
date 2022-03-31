import _ from "lodash"
import { LedgerRow } from "../App"

export const pengerInn = (chartLabels: number[], ledger: Array<LedgerRow>) => {
    return chartLabels.map((l) => ledger.find((i) => i.dayOfMonth === l && i.accountTo === 'user')?.amount || 0)
}

export const pengerUt = (chartLabels: number[], ledger: Array<LedgerRow>) => {
    return chartLabels.map((l) => { 
        const amount = ledger.find((i) => i.dayOfMonth === l && i.accountTo !== 'user')?.amount || 0
        return amount * -1;
    })
}

export const sortLedger = (ledger: Array<LedgerRow>) => {
    return _.orderBy(ledger, ["dayOfMonth"], ["asc"]);
}