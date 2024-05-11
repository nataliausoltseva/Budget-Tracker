type IncomePeriod = {
    label: string,
    value: string,
}

type TaxThreshold = {
    min: number,
    max: number,
    rate: number
}

type PanelTab = {
    label: string,
    key: string,
}

type FrequencyItem = {
    name: string,
    key: string,
    calcToYear: number
}

type PieChartitem = {
    label: string,
    calcFromYear: number
}

type SavingGoalItem = {
    name: string,
    amount: number,
    savedAmount: number,
    date: Date,
    isReached: boolean,
}