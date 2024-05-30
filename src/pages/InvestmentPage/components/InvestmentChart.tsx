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
        <View style={{ flexGrow: 1, height: "100%" }}>
            <BarChart
                width={340}
                noOfSections={5}
                stackData={data}
                spacing={50}
                initialSpacing={5}
                xAxisLabelsHeight={30}
                rotateLabel
            />
        </View>
    )
}

export default InvestmentChart;