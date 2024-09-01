import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../hooks/useIncome';
import CustomText from '../../../components/CustomText';

type Props = {
    rows: RowIndicator[]
}

const IncomeTable = ({ rows }: Props) => {

    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            width: "100%"
        },
        row: {
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: 50
        },
        indicator: {
            width: 15,
            height: 15, marginLeft: 5,
            zIndex: 1,
            transform: [{ rotate: "45deg" }]
        },
        label: {
            marginLeft: 15
        },
        value: {
            flexGrow: 1,
            textAlign: "right",
            marginRight: 10
        },
        divider: {
            height: 1,
            backgroundColor: '#707070'
        }
    })

    return (
        <View style={styles.container}>
            {rows.filter((row: RowIndicator) => !row.isHidden).map((row, index) => (
                <React.Fragment key={index}>
                    <View style={styles.row}>
                        <View style={[styles.indicator, { backgroundColor: COLORS[index] }]} />
                        <CustomText style={styles.label}>{row.label}</CustomText>
                        <CustomText style={styles.value}>{row.value.toString()}</CustomText>
                    </View>
                    <View style={styles.divider} />
                </React.Fragment>
            ))}
        </View>
    )
}

export default IncomeTable;