import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextInputChangeEventData, View } from 'react-native';
import { Button, CheckBox, IndexPath, Input, Layout, List, ListItem, Select, SelectItem, Toggle } from '@ui-kitten/components';

import { incomePeriods } from '../../constants';
import KiwiSaverForm from './components/KiwiSaverForm';
import StudentLoanForm from './components/StudentLoanForm';
import SecondaryIncomeForm from './components/SecondaryIncomeForm';
import useIncome from './hooks/useIncome';
import useTable, { HEADERS, RowIndicator } from './hooks/useTable';

type Props = {
    isHidden: boolean
}

const IncomePage = ({ isHidden = false }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));

    // The list (table) only updates if we pass something new to the extraData prop.
    const [random, setRandom] = useState(Math.random());

    const primaryIncomeHolder = useRef("");

    const {
        primaryIncome,
        incomePeriod,
        hasKiwiSaver,
        hasSecondaryIncome,
        hasStudentLoan,
        kiwiSaverOption,
        isKiwiSaverCustom,
        studentLoanRate,
        studentLoanThreshold,
        secondaryIncome,
        onPrimaryIncomeChange,
        onIncomePeriodChange,
        onKiwiSaverChange,
        onStudentLoanChange,
        setHasSecondaryIncome,
        setHasStudentLoan,
        setHasKiwiSaver,
        setIsKiwiSaverCustom,
        setSecondaryIncome,
        calculateYearlyValues,
    } = useIncome();

    const {
        populateTableRows,
        rows,
        setRows,
        isSimpleTable,
        setIsSimpleTable,
    } = useTable();

    const onIncomeAmountChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        primaryIncomeHolder.current = e.nativeEvent.text || "";

        if (primaryIncomeHolder.current) {
            onPrimaryIncomeChange(parseFloat(primaryIncomeHolder.current));
        } else if (!e.nativeEvent.text) {
            onPrimaryIncomeChange(0);
        }
    }

    const onPreiodSelect = (index: IndexPath | IndexPath[]) => {
        setSelectedIndex(index);

        if (index instanceof IndexPath) {
            onIncomePeriodChange(incomePeriods[index.row]);
        }
    }

    const onCalculate = () => {
        const {
            yearGrossPay,
            yearPaye,
            yearAcc,
            yearKiwiSaver,
            yearStudentLoan,
            yearSecGrossPay,
            yearSecPaye,
        } = calculateYearlyValues();

        populateTableRows({
            yearGrossPay,
            yearPaye,
            yearAcc,
            yearKiwiSaver: hasKiwiSaver ? yearKiwiSaver : 0,
            yearStudentLoan: hasStudentLoan ? yearStudentLoan : 0,
            yearSecGrossPay,
            yearSecPaye
        })
        setRandom(Math.random());
    }

    const updateTableRows = (isChecked: boolean) => {
        const newRows = [...rows];
        newRows.forEach((row: RowIndicator) => {
            if (!row.isSimple) {
                // Only hide all other rows if simple toggle is selectec OR the rows are empty and should be hidden by default.
                row.isHidden = isChecked || (row.hideWhenEmpty && row.values.every(v => v === 0));
            }
        })

        setRows(rows);
        setRandom(Math.random());
        setIsSimpleTable(isChecked);
    }

    return (
        <View style={{ display: isHidden ? "none" : "flex" }}>
            <Text>Your Income</Text>
            <View style={styles.incomeView}>
                <Input
                    placeholder={"Income amount"}
                    value={primaryIncomeHolder.current}
                    onChange={onIncomeAmountChange}
                    style={styles.input}
                    {...{
                        keyboardType: "numeric"
                    }}
                />
                <Text style={styles.dollarSign}>$</Text>
                <Layout style={styles.container} level='1'>
                    <Select
                        selectedIndex={selectedIndex}
                        onSelect={onPreiodSelect}
                        value={incomePeriod.label}
                    >
                        {incomePeriods.map((period: IncomePeriod) => (
                            <SelectItem title={period.label} key={period.value} />
                        ))}
                    </Select>
                </Layout>
            </View>
            <CheckBox
                checked={hasKiwiSaver}
                onChange={nextChecked => setHasKiwiSaver(nextChecked)}
            >
                KiwiSaver
            </CheckBox>
            {hasKiwiSaver && (
                <KiwiSaverForm
                    option={kiwiSaverOption}
                    setKiwiSaverOption={onKiwiSaverChange}
                    isCustom={isKiwiSaverCustom}
                    setIsCustom={setIsKiwiSaverCustom}
                />
            )}
            <CheckBox
                checked={hasStudentLoan}
                onChange={nextChecked => setHasStudentLoan(nextChecked)}
            >
                Student Loan
            </CheckBox>
            {hasStudentLoan && (
                <StudentLoanForm
                    rate={studentLoanRate}
                    threshold={studentLoanThreshold}
                    setRate={(rate: number) => onStudentLoanChange(rate, null)}
                    setThreshold={(threshold: number) => onStudentLoanChange(null, threshold)}
                />
            )}
            <CheckBox
                checked={hasSecondaryIncome}
                onChange={nextChecked => setHasSecondaryIncome(nextChecked)}
            >
                Secondary Income
            </CheckBox>
            {hasSecondaryIncome && (
                <SecondaryIncomeForm
                    income={secondaryIncome}
                    setIncome={setSecondaryIncome}
                />
            )}
            <Button onPress={onCalculate} disabled={primaryIncome === 0}>
                Calculate
            </Button>
            <List
                style={styles.container}
                data={Array.from(Array(rows.length + 1))}
                renderItem={({ index }: { index: number }): React.ReactElement => (
                    <View key={index} style={{ display: "flex", flexDirection: "row" }}>
                        {index === 0 ? (
                            HEADERS.map((header: string) => (
                                <ListItem title={header} style={{ flexGrow: 1 }} key={header || 'header-0'} />
                            ))
                        ) : (
                            <>
                                {!rows[index - 1].isHidden && (
                                    <>
                                        <ListItem title={rows[index - 1].label} style={{ flexGrow: 1 }} key={rows[index - 1].label} />
                                        {rows[index - 1].values.map((value: number, valuIndex: number) => (
                                            <ListItem title={value || "0"} style={{ flexGrow: 1 }} key={`${rows[index - 1].label}-${valuIndex}`} />
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </View>
                )}
                extraData={random}
            />
            <Toggle
                checked={isSimpleTable}
                onChange={updateTableRows}
            >
                Simple table
            </Toggle>

        </View>
    )
};

const styles = StyleSheet.create({
    incomeView: {
        display: "flex",
        flexDirection: 'row',
        position: "relative"
    },
    container: {
        minWidth: 150
    },
    input: {
        flexGrow: 1
    },
    dollarSign: {
        position: "absolute",
        zIndex: 5,
        color: "red",
        top: "28%",
        left: "2%",
    },
    row: {
        color: "red",
    }
});

export default IncomePage;