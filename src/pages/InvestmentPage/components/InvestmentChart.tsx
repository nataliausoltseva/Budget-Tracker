import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
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

    const styles = StyleSheet.create({
        container: {
            flexGrow: 1
        },
        color: {
            color: graphColor
        }

    })

    return (
        <View style={styles.container}>
            <BarChart
                width={340}
                noOfSections={5}
                stackData={data}
                spacing={item.termPeriod.name === "month" ? 100 : 50}
                initialSpacing={5}
                xAxisLabelsHeight={30}
                yAxisColor={graphColor}
                xAxisColor={graphColor}
                yAxisTextStyle={styles.color}
                xAxisLabelTextStyle={styles.color}
            />
        </View>
    )
}

export default InvestmentChart;