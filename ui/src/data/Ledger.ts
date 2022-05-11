import _ from "lodash"
import { LedgerRow } from "../App"

export const pengerInn = (chartLabels: number[], ledger: Array<LedgerRow>): Array<number> => {
    return chartLabels.map((l) => ledger.find((i) => i.dayOfMonth === l && i.accountTo === 'user')?.amount || 0)
}

export const pengerInnTotal = (chartLabels: number[], ledger: Array<LedgerRow>): number => {
    return pengerInn(chartLabels, ledger).reduce((total, amount) => total + amount)
}

export const pengerUt = (chartLabels: number[], ledger: Array<LedgerRow>): Array<number> => {
    return chartLabels.map((l) => { 
        const amount = ledger.find((i) => i.dayOfMonth === l && i.accountTo !== 'user')?.amount || 0
        return amount //* -1;
    })
}

export const pengerUtTotal = (chartLabels: number[], ledger: Array<LedgerRow>): number => {
    return pengerUt(chartLabels, ledger).reduce((total, amount) => total + amount) // * -1
}

export const sortLedger = (ledger: Array<LedgerRow>) => {
    return _.orderBy(ledger, ["dayOfMonth"], ["asc"]);
}

export const calculateMoneyOut = (ledger: Array<LedgerRow>): number => {
    return ledger
      .map((r) => r.accountFrom === 'user' ? r.amount : 0 )
      .reduce((total, amount) => total + amount, 0) 
}

export const calculateMoneyIn = (ledger: Array<LedgerRow>): number => {
    return ledger
      .map((r) => r.accountFrom !== 'user' ? r.amount : 0 )
      .reduce((total, amount) => total + amount, 0) 
}