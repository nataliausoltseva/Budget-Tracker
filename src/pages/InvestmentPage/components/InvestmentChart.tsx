import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import useChart from '../hooks/useChart';

type Props = {
    item: InvestmentItem
}

const InvestmentChart = ({ item }: Props) => {
    const { data } = useChart({ item });
    return (
        <View style={{ flexGrow: 1 }}>
            <BarChart
                width={340}
                noOfSections={5}
                stackData={data}
                spacing={item.termPeriod.name === "month" ? 100 : 50}
                initialSpacing={5}
                xAxisLabelsHeight={30}
            />
        </View>
    )
}

export default InvestmentChart;