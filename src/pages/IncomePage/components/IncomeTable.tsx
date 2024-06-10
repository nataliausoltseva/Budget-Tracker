import React from 'react';
import { View } from 'react-native';
import { HEADERS } from '../hooks/useTable';
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
                    {index === 0 ? (
                        HEADERS.map((header: string) => (
                            <ListItem title={header} style={{ flexGrow: 1 }} key={header || 'header-0'} />
                        ))
                    ) : (
                        !rows[index - 1].isHidden && (
                            <>
                                <View style={{ position: "absolute", left: 5, top: "45%", width: 5, height: 5, backgroundColor: COLORS[index - 1], zIndex: 1, borderRadius: 50 }} />
                                <ListItem title={rows[index - 1].label} style={{ flexGrow: 1 }} key={rows[index - 1].label} />
                                {rows[index - 1].values.map((value: number, valuIndex: number) => (
                                    <ListItem title={value || "0"} style={{ flexGrow: 1 }} key={`${rows[index - 1].label}-${valuIndex}`} />
                                ))}

                            </>
                        )
                    )}
                </View>
            ))}
        </View>
    )
}

export default IncomeTable;