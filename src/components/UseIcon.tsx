import React, { useContext } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppContext } from '../context/AppContext';

type Props = {
    style?: StyleProp<ViewStyle> | undefined,
    onPress?: () => void,
    colour?: string,
}

const UseIcon = ({ style, onPress, colour = "#04E2C7" }: Props) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Svg width="15" height="21" viewBox="0 0 15 21">
                <Path d="M9,11.24V7.5a2.5,2.5,0,0,1,5,0v3.74a4.5,4.5,0,1,0-5,0Zm9.84,4.63L14.3,13.61a1.408,1.408,0,0,0-.54-.11H13v-6a1.5,1.5,0,0,0-3,0V18.24l-3.43-.72a1.748,1.748,0,0,0-.24-.03,1.119,1.119,0,0,0-.79.33l-.79.8,4.94,4.94a1.505,1.505,0,0,0,1.06.44h6.79a1.457,1.457,0,0,0,1.44-1.28l.75-5.27a1.437,1.437,0,0,0-.89-1.58Z" transform="translate(-4.75 -3)" fill={colour} />
            </Svg>
        </TouchableOpacity>
    );
};

export default UseIcon;