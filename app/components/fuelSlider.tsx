import { View, Text, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Slider from '@react-native-community/slider'
import { colors } from '@/constant/color'
import styles from '../css/style';
import CustomFuelSimulation from './customFuelSimulation';

const { width } = Dimensions.get('window');
interface FuelSliderProp {
  energyName: string;
  sliderValue: number;
  minimumValue: number;
  maximumValue: number;
  bestCombination: string;
  fuelSimulation: boolean
  setSliderValue: (value: number) => void;
}
const FuelSlider: React.FC<FuelSliderProp> = ({ energyName, sliderValue, setSliderValue, maximumValue, minimumValue, bestCombination, fuelSimulation }) => {
  const sliderRef = useRef(sliderValue);
  const [trackColor, setTrackColor] = useState(colors.lightblue);
  const [trackCircle, setTrackCircle] = useState(colors.lightblue);

  // for disable 
  const [isSliderEnabled, setIsSliderEnabled] = useState(false);

  const difference = bestCombination !== '' ? Math.abs(sliderValue - bestCombination) : null;

  const handleValueChange = useCallback((value: number) => {
    sliderRef.current = value; // Store the live value
  }, []);

  const handleSlidingComplete = useCallback((value: number) => {
    setSliderValue(value); // Update state only when user stops dragging
  }, []);

  useEffect(() => {
    if (fuelSimulation) {
      setIsSliderEnabled(true)
      setTrackColor(colors.skyblue);
      setTrackCircle(colors.skyblue);
    }
  }, [fuelSimulation])
  return (
    <View style={styles.fuelSliderBox}>
      <Text>{energyName}</Text>
      <View style={{ flexDirection: 'row' }} pointerEvents={isSliderEnabled ? "auto" : "none"}>
        <View style={[{ width: width * 0.1 }]}>
          <CustomFuelSimulation
            name={energyName}
            value={sliderValue}
            setValue={setSliderValue}
          />

        </View>

        <Slider
          style={styles.FuelSlider}
          value={sliderValue}
          onValueChange={handleValueChange}
          onSlidingComplete={handleSlidingComplete}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          minimumTrackTintColor={trackColor}
          maximumTrackTintColor={colors.gray}
          thumbTintColor={trackCircle}
        // disabled={true}
        />

        <Text style={styles.fuelSliderText} >{sliderValue.toFixed(2)}</Text>
      </View>
      {/* Labels below the slider */}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: width * 0.14 }}>
          {difference !== null &&
            <Text style={{ color: colors.red }}>({difference.toFixed(2)})</Text>
          }
        </View>
        <View style={styles.fuelSliderLower}>
          <View>
            <Text >|</Text>
            <Text style={{ fontSize: 12 }} >{minimumValue}</Text>
          </View>
          <View>
            <Text style={{ textAlign: 'right' }}>|</Text>
            <Text style={{ fontSize: 12 }} >{maximumValue}</Text>
          </View>
        </View>
        {bestCombination !== '' &&
          <Text style={[styles.fuelSliderText, { color: colors.gradientBlue, left: width * 0.04, top: -width * 0.0 }]} >{bestCombination}</Text>
        }
      </View>
    </View>
  )
}

export default FuelSlider