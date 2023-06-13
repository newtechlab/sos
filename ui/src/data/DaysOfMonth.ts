import _ from "lodash"

const DAYS_OF_MONTH = 28;

export const getDaysOfMonthDropdown = () => {
    return _.range(DAYS_OF_MONTH).map((n) => {
        const k = (n+1).toString()
        return {
            key: k,
            text: k,
            value: k,
          }
    }) 
}

export const getDaysOfMonthNumbers = () => {
    return _.range(DAYS_OF_MONTH).map((n) => { return (n+1)})
}