import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = {
    style?: StyleProp<ViewStyle> | undefined,
    onPress?: () => void,
}

const ChevronIcon = ({ style, onPress }: Props) => (
    <TouchableOpacity style={style} onPress={onPress}>
        <Svg width="25.589" height="10" viewBox="0 0 25.589 15.801">
            <Path id="ic_expand_more_24px" d="M28.582,8.59l-9.788,9.766L9.007,8.59,6,11.6,18.794,24.391,31.589,11.6Z" transform="translate(-6 -8.59)" />
        </Svg>
    </TouchableOpacity>
);

export default ChevronIcon;