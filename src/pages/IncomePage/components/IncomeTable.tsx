import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from '@ui-kitten/components';
import { COLORS } from '../hooks/useIncome';
import CustomText from '../../../components/CustomText';

type Props = {
    rows: RowIndicator[]
}

const IncomeTable = ({ rows }: Props) => {
    return (
        <View style={{ flexGrow: 1, width: "100%" }}>
            {rows.filter((row: RowIndicator) => !row.isHidden).map((row, index) => (
                <React.Fragment key={index}>
                    <View style={{ position: "relative", display: "flex", flexDirection: "row", alignItems: "center", height: 50 }}>
                        <View style={{ width: 15, height: 15, marginLeft: 5, backgroundColor: COLORS[index], zIndex: 1, transform: [{ rotate: "45deg" }] }} />
                        <CustomText style={{ marginLeft: 15 }}>{row.label}</CustomText>
                        <CustomText style={{ flexGrow: 1, textAlign: "right" }}>{row.value.toString()}</CustomText>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#707070' }} />
                </React.Fragment>
            ))}
        </View>
    )
}

export default IncomeTable;