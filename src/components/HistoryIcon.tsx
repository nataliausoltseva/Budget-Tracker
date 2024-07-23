import React, { useContext } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppContext } from '../context/AppContext';

type Props = {
    style?: StyleProp<ViewStyle> | undefined,
    onPress?: () => void,
}

const HistoryIcon = ({ style, onPress }: Props) => {
    const appState = useContext(AppContext);
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Svg width="21" height="18" viewBox="0 0 21 18">
                <Path d="M13,3a9,9,0,0,0-9,9H1l3.89,3.89.07.14L9,12H6a7.034,7.034,0,1,1,2.06,4.94L6.64,18.36A9,9,0,1,0,13,3ZM12,8v5l4.28,2.54L17,14.33l-3.5-2.08V8Z" transform="translate(-1 -3)" fill={appState.isDarkMode ? "white" : "black"} />
            </Svg>
        </TouchableOpacity>
    );
};

export default HistoryIcon;