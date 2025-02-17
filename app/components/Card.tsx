import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '@/components/color';
import styles from '../css/style'

const Card = ({ title, subTitle, value, progress, current, unit, meter, secondTitle, innerStroke }) => {
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
          <Text style={[styles.mediumLabel, { fontWeight: 'bold' }]}>{current}</Text>
          <Text style={[styles.mediumLabel, { color: colors.red }]}>{ meter }</Text>
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
          <Text style={styles.smallLabel}>Current</Text>
          <Text style={styles.smallLabel}>{unit}</Text>
          <Text style={[styles.smallLabel, { fontWeight: 'bold' }]}>{current}</Text>
          <Text style={styles.smallLabel}>{unit}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
