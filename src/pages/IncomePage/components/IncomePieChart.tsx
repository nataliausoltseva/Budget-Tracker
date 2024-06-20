import React, { useContext } from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import CustomText from '../../../components/CustomText';
import { AppContext } from '../../../context/AppContext';

type Props = {
    pieData: PieChartItem[],
    yearGrossPay: number,
}

const IncomePieChart = ({ pieData, yearGrossPay }: Props) => {
    const appState = useContext(AppContext);

    return (
        <View style={{ alignItems: 'center', marginTop: 80 }}>
            <PieChart
                data={pieData}
                textColor={appState.isDarkMode ? "white" : "black"}
                fontWeight='bold'
                innerRadius={60}
                innerCircleColor={appState.isDarkMode ? "#443472" : 'white'}
                centerLabelComponent={() => (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <CustomText
                            style={{ fontSize: 16, color: appState.isDarkMode ? 'white' : "black", fontWeight: 'bold' }}>
                            ${Number(yearGrossPay).toFixed(2)}
                        </CustomText>
                        <CustomText style={{ fontSize: 14, color: appState.isDarkMode ? 'white' : "black" }}>Gross Pay</CustomText>
                    </View>
                )}
            />
        </View>
    )
}

export default IncomePieChart;