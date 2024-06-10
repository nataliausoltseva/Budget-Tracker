import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = {
    style?: StyleProp<ViewStyle> | undefined,
    onPress?: () => void,
}

const FilterIcon = ({ style, onPress }: Props) => (
    <TouchableOpacity style={style} onPress={onPress}>
        <Svg width="51.067" height="43.089" viewBox="0 0 51.067 43.089">
            <Path d="M3,49.089H20.022V41.907H3ZM3,6v7.181H54.067V6ZM3,31.135H37.044V23.954H3Z" />
        </Svg>
    </TouchableOpacity>
);

export default FilterIcon;