import { View, Text } from 'react-native'
import React, { useCallback, useRef } from 'react'
import styles from '../css/style';
import { colors } from '@/constant/color';
import Slider from '@react-native-community/slider';

interface SliderBarProp {
    sliderValue: number;
    setSliderValue:(value: number) => void;
}

const SliderBar: React.FC<SliderBarProp> = ({ sliderValue, setSliderValue }) => {

    const sliderRef = useRef(sliderValue);

    const handleValueChange = useCallback((value: number) => {
        sliderRef.current = value; // Store the live value
    }, []);

    const handleSlidingComplete = useCallback((value: number) => {
        setSliderValue(value); // Update state only when user stops dragging
    }, []);

    const steps = Array.from({ length: 6 }, (_, i) => i * 20);


    return (
        <View style={styles.sliderBox}>
            <Slider
                style={styles.slider}
                value={sliderValue}
                onValueChange={handleValueChange} 
                onSlidingComplete={handleSlidingComplete} 
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor={colors.skyblue}
                maximumTrackTintColor={colors.gray}
                thumbTintColor={colors.skyblue}
            />
            {/* Labels below the slider */}
            <View style={styles.labelContainer}>
                {steps.map((value, index) => (
                    <View key={index} style={styles.label}>
                    <Text >
                        |
                    </Text>
                    <Text>
                        {value}
                    </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default SliderBar