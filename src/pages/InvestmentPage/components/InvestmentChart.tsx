import React, { useContext } from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import useChart from '../hooks/useChart';
import { AppContext } from '../../../context/AppContext';

type Props = {
    item: InvestmentItem
}

const InvestmentChart = ({ item }: Props) => {
    const appState = useContext(AppContext);
    const { data } = useChart({ item });

    const graphColor = appState.isDarkMode ? "white" : "black";

    return (
        <View style={{ flexGrow: 1 }}>
            <BarChart
                width={340}
                noOfSections={5}
                stackData={data}
                spacing={item.termPeriod.name === "month" ? 100 : 50}
                initialSpacing={5}
                xAxisLabelsHeight={30}
                yAxisColor={graphColor}
                xAxisColor={graphColor}
                yAxisTextStyle={{
                    color: appState.isDarkMode ? "white" : "black"
                }}
                xAxisLabelTextStyle={{
                    color: appState.isDarkMode ? "white" : "black"
                }}
            />
        </View>
    )
}

export default InvestmentChart;