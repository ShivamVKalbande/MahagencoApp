import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '@/components/color';
import styles from '../css/style';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const MaterialCard = ({ title, value, circle1, current, unit, purchase, circle2, circle3, plant }) => {
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

  const navigation = useNavigation();
  const materialNavigation = selectPlant => {
    if(purchase === "Order"){
      console.log("plant name: ", selectPlant);
      navigation.navigate('screen/materialPo', { plantName: selectPlant });
      // console.log("after naviogation plant name: ", plant);
    } else {
      navigation.navigate('screen/materialPr', { plantName: selectPlant });
    }
  }
  return (
    <View style={[styles.cardContainer, { height: 250, width: width * 0.9 }]}>
      <View>
        <View style={styles.textContainer}>
          <Text>{title}</Text>
          <Text style={styles.purchase}>
            Purchase {purchase}
          </Text>
          <View style={{ flexDirection: 'row', padding: 5 }}>
            <View style={{ marginHorizontal: 5 }}>
              <View style={{ height: 20, width: 40, borderRadius: 10, backgroundColor: colors.red }}>
              <Text style={[styles.smallLabel, styles.progressiveText]}>{circle2}</Text>
              </View>
              <Text style={styles.smallLabel}>Active</Text>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <View style={{ height: 20, width: 40, borderRadius: 10, backgroundColor: colors.skyblue }}>
              <Text style={[styles.smallLabel, styles.progressiveText]}>{circle3}</Text>
              </View>
              <Text style={styles.smallLabel}>In Release</Text>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <View style={{ height: 20, width: 40, borderRadius: 10, backgroundColor: colors.green }}>
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

      <View style={[styles.circleContainer, { marginHorizontal: 20, justifyContent: 'center' }]}>
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

        <View style={[styles.circleText, { top: 75 }]}>
          <Text style={[styles.smallLabel, { fontWeight: 'bold' }]}>{value}</Text>
          <Text style={styles.smallLabel}>{unit}</Text>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={() => materialNavigation(plant)}>
          <Text style={styles.buttonText}>VIEW DETAILS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MaterialCard;
