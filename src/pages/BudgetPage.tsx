import { Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';

type Props = {
    isHidden: boolean
}

const BudgetPage = ({ isHidden = false }: Props) => (
    <View style={{ display: isHidden ? "none" : "flex" }}>
        <Text>Budget Page</Text>
    </View>
);

export default BudgetPage;