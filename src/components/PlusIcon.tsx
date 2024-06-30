import React, { useContext } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppContext } from '../context/AppContext';

type Props = {
    style?: StyleProp<ViewStyle> | undefined,
    onPress?: () => void,
    color?: string,
}

const PlusIcon = ({ style, onPress, color = "" }: Props) => {
    const appState = useContext(AppContext);
    color = color || (appState.isDarkMode ? "#A78DFF" : "#01B0E6")
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Svg width="15" height="15" viewBox="0 0 33.349 33.349">
                <Path id="ic_add_24px" d="M38.349,24.057H24.057V38.349H19.293V24.057H5V19.293H19.293V5h4.764V19.293H38.349Z" transform="translate(-5 -5)" fill={color} />
            </Svg>
        </TouchableOpacity>
    );
};

export default PlusIcon;