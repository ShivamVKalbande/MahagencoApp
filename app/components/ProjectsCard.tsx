import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '@/constant/color';
import styles from '../css/style';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const ProjectsCard = ({projectNumber, projectName, capacity, cost, bgColor }) => {
    const navigation = useNavigation();
    const projectNavigation = ()=>{
        navigation.navigate('screen/projectDetail',{ projectNumber: projectNumber, projectName: projectName });
    }
  return (
    <View style={styles.plantCardContainer}>
      {/* Card Header */}
      <View style={styles.plantHeaderContainer}>
        <Text style={{ fontWeight: 'bold' }}>{projectName}</Text>
        <TouchableOpacity
        onPress={() => {projectNavigation()}}
          style={[styles.plantButton, { left: -width * 0.04, backgroundColor: bgColor }]}
        >
          <Text style={[styles.smallLabel, { color: colors.white }]}>View Projects</Text>
        </TouchableOpacity>
      </View>
      {/* Card Body */}
      <View style={styles.plantCard}>
        <View style={[styles.plantBodycontainer, { width: width * 0.11, height: 50 }]}>
          <Text style={{ fontWeight: 'bold', color: bgColor, fontSize: 26, textAlign: 'center' }}>{projectNumber}</Text>
        </View>
        <View style={[styles.plantBodycontainer, { width: width * 0.15, height: 50 }]}>
          <Text>No. of</Text>
          <Text>Projects</Text>
        </View>
        <View style={[styles.plantBodycontainer, { width: width * 0.26, height: 50 }]}>
          <Text>Total Capacity</Text>
          <Text style={{ fontWeight: 'bold' }}>{capacity}</Text>
        </View>
        <View style={[styles.plantBodycontainer, { borderRightWidth: 0, width: width * 0.28 }]}>
          <Text>Tentative Total Cost <Text style={{ fontWeight: 'bold' }}> {cost} Cr.</Text></Text>
        </View>
      </View>      
    </View>
  );
};

export default ProjectsCard;
