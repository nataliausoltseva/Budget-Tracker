import React, { useContext } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppContext } from '../context/AppContext';

type Props = {
    style?: StyleProp<ViewStyle> | undefined,
    onPress?: () => void,
    color?: string,
}

const PenIcon = ({ style, onPress, color = "" }: Props) => {
    const appState = useContext(AppContext);
    color = color || (appState.isDarkMode ? "#6771F9" : "#2A33B2")
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Svg width="40.125" height="20" viewBox="0 0 40.125 40.125">
                <Path d="M3,34.764v8.358h8.358L36.01,18.471l-8.358-8.358ZM42.473,12.008a2.22,2.22,0,0,0,0-3.143L37.258,3.649a2.22,2.22,0,0,0-3.143,0L30.036,7.728l8.358,8.358,4.079-4.079Z" transform="translate(-3 -2.998)" fill={color} />
            </Svg>
        </TouchableOpacity>
    );
};

export default PenIcon;