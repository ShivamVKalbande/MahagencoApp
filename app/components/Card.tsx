import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '@/constant/color';
import styles from '../css/style'

interface CardProp {
  title: string;
  subTitle: string;
  value: string;
  progress: number;
  current: string;
  meter: string;
  secondTitle: string;
  innerStroke: string;
  belowText: string;
  aboveText: string;
  unit:string;
}

const Card: React.FC<CardProp> = ({ title, subTitle, value, progress, current, meter, secondTitle, innerStroke, belowText, aboveText, unit }) => {
  const size = 100; // Size of the circle
  const strokeWidth = 5; // Thickness of the stroke
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.textContainer}>
          <Text>{title}</Text>
          <Text style={styles.smallLabel}>{subTitle}</Text>
          <Text style={styles.smallLabel}>{value}</Text>
        </View>
        <Text style={{color:colors.green}}>{ secondTitle }</Text>
        <View style={[styles.textContainer, { borderColor: colors.lightGray, flexDirection: 'row' }]}>
          <Text style={[styles.mediumLabel, { fontWeight: 'bold' }]}>{current} <Text style={[styles.mediumLabel, { fontWeight:'normal' }]}>{ meter }</Text></Text>
          
        </View>
      </View>

      <View style={styles.circleContainer}>
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
        <View style={[styles.circleText, { top: 20 }]}>
          <Text style={styles.smallLabel}>{aboveText}</Text>
          <Text style={styles.smallLabel}>{belowText}</Text>
          <Text style={[styles.smallLabel, { fontWeight: 'bold' }]}>{current}</Text>
          <Text style={styles.smallLabel}>{unit}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
