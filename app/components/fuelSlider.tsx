import { View, Text, Dimensions } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Slider from '@react-native-community/slider'
import { colors } from '@/constant/color'
import styles from '../css/style';

const { width } = Dimensions.get('window');
const FuelSlider = ({energyName, sliderValue, setSliderValue }) => {
     const sliderRef = useRef(sliderValue);

  const handleValueChange = useCallback((value) => {
    sliderRef.current = value; // Store the live value
  }, []);

  const handleSlidingComplete = useCallback((value) => {
    setSliderValue(value); // Update state only when user stops dragging
  }, []);
  return (
    <View style={styles.fuelSliderBox}>
              <Text>{energyName}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Slider
                  style={styles.FuelSlider}
                  value={sliderValue}
                  onValueChange={handleValueChange}
                  onSlidingComplete={handleSlidingComplete}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={colors.skyblue}
                  maximumTrackTintColor={colors.gray}
                  thumbTintColor={colors.skyblue}
                />
                <Text style={{ fontWeight: 'bold' }} >{sliderValue.toFixed(2)}</Text>
              </View>
              {/* Labels below the slider */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',  width: width*0.72, left:15}}>
                <View>
                  <Text >|</Text>
                  <Text >0</Text>
                </View>
                <View>
                  <Text style={{textAlign:'right'}}>|</Text>
                  <Text >100</Text>
                </View>
              </View>
            </View>
  )
}

export default FuelSlider