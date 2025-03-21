import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '@/constant/color';
import styles from '../css/style';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

interface CardProp {
  title: string;
  value: number; 
  circle1: number; 
  current: number;
  unit: string;
  purchase: string;
  circle2: number;
  circle3: number;
}

const MaterialCardPurchase: React.FC<CardProp> = ({ title, value, circle1, current, unit, purchase, circle2, circle3 }) => {
  const size = width * 0.28; // Size of the circle
  const strokeWidth = 20; // Thickness of the stroke
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const greenDashoffset = circumference * (1 - circle1 / value);
  const redDashoffset = circumference * (1 - circle2 / value);
  const blueDashoffset = circumference * (1 - circle3 / value);

  // Dynamic transformations based on progress
  const greenRotation = -90; // Always starts at the top
  const redRotation = greenRotation + (360 * (circle1 / value));
  const blueRotation = redRotation + (360 * (circle2 / value));

  const navigation = useNavigation<any>();
  const materialNavigation = () => {
    if(purchase === "Order"){
      navigation.navigate('screen/materialPo')
    } else {
      navigation.navigate('screen/materialPr')
    }
  }
  return (
    <View style={[styles.cardContainer, { height: 200, width: width * 0.9 }]}>
      <View style={{width: width * 0.54}}>
        <View style={styles.textContainer}>
          <Text>{title}</Text>
          <Text style={styles.purchase}>
            Purchase {purchase}
          </Text>
          <View style={{ flexDirection: 'row', padding: 5 }}>
            <View style={{ marginHorizontal: 5 }}>
              <View style={{ height: 20, width: 40, borderRadius: 10, backgroundColor: colors.red, justifyContent:'center' }}>
              <Text style={[styles.smallLabel, styles.progressiveText]}>{circle2}</Text>
              </View>
              <Text style={styles.smallLabel}>Active</Text>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <View style={{ height: 20, width: 40, borderRadius: 10, backgroundColor: colors.skyblue, justifyContent:'center' }}>
              <Text style={[styles.smallLabel, styles.progressiveText]}>{circle3}</Text>
              </View>
              <Text style={styles.smallLabel}>In Release</Text>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <View style={{ height: 20, width: 40, borderRadius: 10, backgroundColor: colors.green, justifyContent:'center' }}>
                <Text style={[styles.smallLabel, styles.progressiveText]}>{circle1}</Text>
              </View>
              <Text style={styles.smallLabel}>Completed</Text>
            </View>
          </View>
        </View>
        <Text>Total Value</Text>
        <View style={[styles.textContainer, { borderColor: colors.lightGray, flexDirection: 'row' }]}>
          <Text style={[styles.mediumLabel, { fontWeight: 'bold' }]}>{current}</Text>
        </View>
      </View>

      <View style={[styles.circleContainer, { justifyContent: 'center', width: width * 0.26 }]}>
        <Svg width={size} height={size}>
          {/* Green Progress Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.green}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={greenDashoffset}
            transform={`rotate(${greenRotation}, ${size / 2}, ${size / 2})`}
          />
         
          {/* Red Progress Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.red}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={redDashoffset}
            transform={`rotate(${redRotation}, ${size / 2}, ${size / 2})`}
          />
          
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.skyblue}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={blueDashoffset}
            transform={`rotate(${blueRotation}, ${size / 2}, ${size / 2})`}
          />
        </Svg>

        <View style={[styles.circleText, { justifyContent:'center' }]}>
          <Text style={[styles.smallLabel, { fontWeight: 'bold' }]}>{value}</Text>
          <Text style={styles.smallLabel}>{unit}</Text>
        </View>

        {/* Button */}
        {/* <TouchableOpacity style={styles.buttonContainer} onPress={materialNavigation}>
          <Text style={styles.buttonText}>VIEW DETAILS</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default MaterialCardPurchase;
