import React from 'react';
import { View } from 'react-native';
import useChart from '../hooks/useChart';
import { BarChart } from 'react-native-gifted-charts';

type Props = {
    item: InvestmentItem
}

const InvestmentChart = ({ item }: Props) => {
    const { data } = useChart({ item });
    return (
        <View>
            <BarChart
                width={340}
                noOfSections={5}
                stackData={data}
                spacing={100}
            />
        </View>
    )
}

export default InvestmentChart;