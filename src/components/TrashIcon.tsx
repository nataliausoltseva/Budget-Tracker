import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = {
    style?: StyleProp<ViewStyle> | undefined,
    onPress?: () => void,
    color?: string,
}

const TrashIcon = ({ style, onPress, color = "#E97E7E" }: Props) => (
    <TouchableOpacity style={style} onPress={onPress}>
        <Svg width="40.672" height="20" viewBox="0 0 19.444 25">
            <Path id="ic_delete_24px" d="M6.389,25.222A2.786,2.786,0,0,0,9.167,28H20.278a2.786,2.786,0,0,0,2.778-2.778V8.556H6.389ZM24.444,4.389H19.583L18.194,3H11.25L9.861,4.389H5V7.167H24.444Z" transform="translate(-5 -3)" fill={color} />
        </Svg>
    </TouchableOpacity>
);

export default TrashIcon;
