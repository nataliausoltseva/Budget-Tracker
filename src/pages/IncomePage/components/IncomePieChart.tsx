import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import CustomText from '../../../components/CustomText';
import { AppContext } from '../../../context/AppContext';

type Props = {
    pieData: PieChartItem[],
    yearGrossPay: number,
}

const IncomePieChart = ({ pieData, yearGrossPay }: Props) => {
    const appState = useContext(AppContext);

    const styles = StyleSheet.create({
        contianer: {
            alignItems: 'center',
            marginTop: 80
        },
        label: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontSize: 16,
            color: appState.isDarkMode ? 'white' : "black",
            fontWeight: 'bold'
        },
        subLabel: {
            fontSize: 14,
            color: appState.isDarkMode ? 'white' : "black"
        }
    })
    return (
        <View style={styles.contianer}>
            <PieChart
                data={pieData}
                textColor={appState.isDarkMode ? "white" : "black"}
                fontWeight='bold'
                innerRadius={60}
                innerCircleColor={appState.isDarkMode ? "#443472" : 'white'}
                centerLabelComponent={() => (
                    <View style={styles.label}>
                        <CustomText
                            style={styles.text}>
                            ${Number(yearGrossPay).toFixed(2)}
                        </CustomText>
                        <CustomText style={styles.subLabel}>Gross Pay</CustomText>
                    </View>
                )}
            />
        </View>
    )
}

export default IncomePieChart;