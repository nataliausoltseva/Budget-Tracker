import { Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';

type Props = {
    isHidden: boolean
}

const SavingGoalsPage = ({ isHidden = false }: Props) => (
    <View style={{ display: isHidden ? "none" : "flex" }}>
        <Text>Saving Goals Page</Text>
    </View>
);

export default SavingGoalsPage;