import React from 'react';
import { View } from 'react-native';
import { ListItem } from '@ui-kitten/components';
import { COLORS } from '../hooks/useIncome';

type Props = {
    rows: RowIndicator[]
}

const IncomeTable = ({ rows }: Props) => {
    return (
        <View style={{ flexGrow: 1, width: "100%" }}>
            {new Array(rows.length + 1).fill(0).map((_, index) => (
                <View key={index} style={{ position: "relative", display: "flex", flexDirection: "row" }}>
                    {!rows[index]?.isHidden && (
                        <>
                            <View style={{ position: "absolute", left: 5, top: "45%", width: 5, height: 5, backgroundColor: COLORS[index], zIndex: 1, borderRadius: 50 }} />
                            <ListItem title={rows[index].label} style={{ flexGrow: 1 }} key={rows[index].label} />
                            {rows[index].values.map((value: number, valuIndex: number) => (
                                <ListItem title={value || "0"} style={{ flexGrow: 1 }} key={`${rows[index].label}-${valuIndex}`} />
                            ))}
                        </>
                    )}
                </View>
            ))}
        </View>
    )
}

export default IncomeTable;