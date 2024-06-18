import React from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import CustomText from '../../../components/CustomText';

type Props = {
    pieData: PieChartItem[],
    yearGrossPay: number,
}

const IncomePieChart = ({ pieData, yearGrossPay }: Props) => {
    return (
        <View style={{ alignItems: 'center', marginTop: 80 }}>
            <PieChart
                data={pieData}
                labelsPosition='outward'
                textColor='white'
                fontWeight='bold'
                innerRadius={60}
                innerCircleColor={'#232B5D'}
                showText
                centerLabelComponent={() => (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <CustomText
                            style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                            ${Number(yearGrossPay).toFixed(2)}
                        </CustomText>
                        <CustomText style={{ fontSize: 14, color: 'white' }}>Gross Pay</CustomText>
                    </View>
                )}
            />
        </View>
    )
}

export default IncomePieChart;