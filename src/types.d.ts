type IncomePeriod = {
    label: string,
    value: string,
}

type TaxThreshold = {
    min: string,
    max: string,
    rate: string
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
    transactions: TransactionItem[]
}

type TransactionItem = {
    amount: number,
    date: Date,
    totalSaved: number,
}

type InvestmentItem = {
    name: string,
    amount: number,
    rate: number,
    term: number,
    taxRate: number,
    startDate: Date,
    termPeriod: TermPeriod
}

type TermPeriod = {
    name: string,
    label: string,
}

type RowIndicator = {
    label: string,
    key: string,
    value: number,
    isHidden: boolean,
    isSimple: boolean,
    hideWhenEmpty: boolean,
};

type PieChartItem = {
    value: number,
    color: string,
    text: string,
}

type IncomeTableHeader = {
    label: string,
    calcToYear: number,
}

type IncomeHistoryItem = {
    amount: number,
    currency: string,
    date: string,
    frequency: IncomePeriod,
    id: number,
    label: string,
    superannuation?: number,
    secondaryIncome?: number,
    studentLoanRate?: number,
    studentLoanThreshold?: number
}

type BudgetHistoryItem = {
    id: number,
    date: string,
    label: string,
    expenses: ExpenseItem[]
}

type ExpenseItem = {
    key?: string,
    name: string,
    value: number,
    frequency: FrequencyItem,
    id?: number,
    color?: string,
}