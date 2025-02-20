// SliderComponent.tsx
import React, { useState, useRef, useCallback } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '@/constant/color';
import styles from '../css/style';

const SliderComponent = ({ sliderValue, setSliderValue }: any) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const sliderRef = useRef(sliderValue);

  const handleValueChange = useCallback((value) => {
    sliderRef.current = value; // Store the live value
    setPopoverVisible(true); // Show popover when sliding
  }, [setSliderValue]);

  const handleSlidingComplete = useCallback(() => {
    setPopoverVisible(false); // Hide popover on completion
  }, []);

  const steps = Array.from({ length: 11 }, (_, i) => i * 10);

  return (
    <View style={styles.sliderContainer}>
      {popoverVisible && (
        <View style={[styles.popover, { left: sliderRef.current * 2 }]}>
          <Text style={styles.popoverText}>{sliderRef.current.toFixed(0)}</Text>
        </View>
      )}
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
      <View style={styles.labelContainer}>
        {steps.map((value, index) => (
          <Text key={index} style={styles.label}>
            {value}
          </Text>
        ))}
      </View>
    </View>
  );
};
export default SliderComponent;
