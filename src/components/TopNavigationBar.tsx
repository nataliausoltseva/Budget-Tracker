import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppContext } from '../context/AppContext';
import CustomText from './CustomText';

type Props = {
    tabs: PanelTab[],
    onSelect: (index: number) => void,
    selectedIndex: number,
}

const TopNavigationBar = ({ tabs, onSelect, selectedIndex }: Props) => {
    const appState = useContext(AppContext);
    const underlineAnimation = React.useMemo(() => new Animated.Value(0), []);
    const [tabWidths, setTabWidths] = useState(tabs.map(() => 0));
    const [tabPositions, setTabPositions] = useState(tabs.map(() => 0));
    const hasRendered = useRef(false);

    const underlinePosition = underlineAnimation.interpolate({
        inputRange: tabPositions.map((_, index) => index),
        outputRange: tabPositions.map(position => position),
    });
    const underlineWidth = underlineAnimation.interpolate({
        inputRange: tabWidths.map((_, index) => index),
        outputRange: tabWidths.map(width => width),
    });

    useEffect(() => {
        if (hasRendered.current) {
            animateUnderline(selectedIndex);
        }
    }, [tabPositions, selectedIndex]);

    const animateUnderline = (index: number) => {
        Animated.timing(underlineAnimation, {
            toValue: index,
            duration: 100,
            useNativeDriver: false,
            easing: Easing.ease,
        }).start();
    };

    const handleTabPress = (index: number) => {
        animateUnderline(index);
        onSelect(index);
    };

    const onTabLayout = (event: LayoutChangeEvent, index: number) => {
        const { width } = event.nativeEvent.layout;
        const updatedTabWidths = tabWidths.map((tabWidth, anIndex) =>
            anIndex === index ? width : tabWidth,
        );
        setTabWidths(updatedTabWidths);
        const updatedTabPositions = updatedTabWidths.map((_, anIndex: number) =>
            updatedTabWidths.slice(0, anIndex + 1).reduce((acc, curr) => acc + curr),
        );
        updatedTabPositions.unshift(0);
        updatedTabPositions.pop();
        setTabPositions(updatedTabPositions);

        if (index === tabs.length - 1) {
            hasRendered.current = true;
        }
    };

    const styles = StyleSheet.create({
        tab: {
            height: 40,
            paddingTop: 10,
            textAlign: "center",
            flexGrow: 1,
            marginBottom: 10,
        },
        underline: {
            bottom: 0,
            height: 6,
            position: 'absolute',
            width: 100,
            backgroundColor: getTabColor(appState.isDarkMode, true),
            borderRadius: 30
        },
        container: {
            flexDirection: "row"
        },
        text: {
            height: 40,
            paddingTop: 10,
            textAlign: "center",
            flexGrow: 1
        }
    });

    return (
        <View style={styles.container}>
            {tabs.map((tab: PanelTab, index: number) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    style={styles.tab}
                    onLayout={event => onTabLayout(event, index)}
                    onPress={() => handleTabPress(index)}
                >
                    <CustomText
                        key={index}
                        style={styles.text}
                        color={getTabColor(appState.isDarkMode, selectedIndex === index)}
                    >
                        {tab.label}
                    </CustomText>
                </TouchableOpacity >
            ))}
            <Animated.View
                style={[
                    styles.underline,
                    { left: underlinePosition, width: underlineWidth },
                ]}
            />
        </View>
    )
};

export default TopNavigationBar;

const getTabColor = (isDarkMode: boolean, isSelected: boolean) => {
    if (isDarkMode) {
        return isSelected ? "#A78DFF" : "white";
    }

    return isSelected ? "#01B0E6" : "black"
}
