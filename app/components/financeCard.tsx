import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '@/constant/color';
import styles from '../css/style'

const { width } = Dimensions.get('window');

interface CardProp {
  title: string;
  subTitle: string;
  value: string;
  progress: number;
  current: string;
  circleHeading: string;
  meter: string;
  secondTitle: string;
  innerStroke: string;
  unit:string;
  circleValue:string;
}

const FinanceCard: React.FC<CardProp> = ({ title, subTitle, value, progress, circleValue, current, circleHeading, unit, meter, secondTitle, innerStroke }) => {
  const size = width*0.3; // Size of the circle
  const strokeWidth = 5; // Thickness of the stroke
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  

  return (
    <View style={[styles.cardContainer, {width: width * 0.9,}]}>
      <View style={styles.cardLeft}>
        <View style={styles.textContainer}>
          <Text>{title}</Text>
          <Text style={styles.smallLabel}>{subTitle}</Text>
          <Text style={styles.smallLabel}>{value}</Text>
        </View>
        <Text 
        style={{color:colors.green}}
        >
          { secondTitle }
          </Text>
        <View style={[styles.textContainer, { borderColor: colors.lightGray, flexDirection: 'row' }]}>
          <Text style={[styles.mediumLabel, { fontWeight: 'bold' }]}>{current} <Text style={[styles.mediumLabel, { color: colors.red, }]}>{ meter }</Text></Text>
          
        </View>
      </View>

      <View style={[styles.circleContainer, { justifyContent: 'center',}]}>
        <Svg width={size} height={size}>
          {/* Grey Background Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.gray}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Red Progress Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={ innerStroke }
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <View style={[styles.circleText, { justifyContent:'center' }]}>
          <View style={{width:width*0.2}}>
          <Text style={[styles.smallLabel, {textAlign:'center'}]}>{circleHeading}</Text>
          </View>
          {/* <Text style={styles.smallLabel}>{unit}</Text> */}
          <Text style={[styles.smallLabel, { fontWeight: 'bold' }]}>{circleValue}</Text>
          <Text style={styles.smallLabel}>{unit}</Text>
        </View>
      </View>
    </View>
  );
};

export default FinanceCard;
