import { List, ListItem } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import useTable from "../hooks/useTable";

const HEADERS = ["Year", "Contribution", "Returns", "Total"];

type Props = {
    item: InvestmentItem
}

const InvestmentList = ({ item }: Props) => {
    const [random, setRandom] = useState(Math.random());

    const { data } = useTable({ item });
    return (
        new Array(data.length + 1).fill(0).map((_, index) => (
            <View key={index} style={{ display: "flex", flexDirection: "row" }}>
                {index === 0 ? (
                    HEADERS.map((header: string) => (
                        <ListItem title={header} style={{ flexGrow: 1 }} key={header || 'header-0'} />
                    ))
                ) : (
                    data[index - 1].map((value: number, valuIndex: number) => (
                        <ListItem title={value} style={{ flexGrow: 1 }} key={valuIndex} />
                    ))
                )}
            </View>
        ))
    )
}

export default InvestmentList;

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