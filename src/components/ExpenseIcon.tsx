import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = {
    style?: StyleProp<ViewStyle> | undefined,
    onPress?: () => void,
    color?: string,
}

const ExpenseIcon = ({ style, color = "white" }: Props) => {
    return (
        <Svg width="46.313" height="37.05" viewBox="0 0 46.313 37.05" style={style}>
            <Path id="ic_local_atm_24px" d="M22.841,34.1h4.631V31.788h2.316A2.322,2.322,0,0,0,32.1,29.472V22.525a2.322,2.322,0,0,0-2.316-2.316H22.841V17.894H32.1V13.263H27.472V10.947H22.841v2.316H20.525a2.322,2.322,0,0,0-2.316,2.316v6.947a2.322,2.322,0,0,0,2.316,2.316h6.947v2.316H18.209v4.631h4.631ZM43.681,4H6.631A4.6,4.6,0,0,0,2.023,8.631L2,36.419A4.615,4.615,0,0,0,6.631,41.05h37.05a4.615,4.615,0,0,0,4.631-4.631V8.631A4.615,4.615,0,0,0,43.681,4Zm0,32.419H6.631V8.631h37.05Z" transform="translate(-2 -4)" fill={color} />
        </Svg>
    );
}

export default ExpenseIcon;