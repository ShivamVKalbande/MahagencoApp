import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import styles from '../css/style';
import { colors } from '@/components/color';

const Projects = () => {
  const [plant, setPlant] = useState([{ label: "MAHAGENCO", value: "" }]);
  const [selectedItem, setSelectedItem] = useState(plant[0]);
  const duration = [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Day", value: "day" },
  ]
  const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);
  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* main content start */}
      <View style={styles.mainContainer}>
        {/* dropdown start */}
        <View style={styles.mainDropeDown}>
          <Dropdown
            name="Mahagenco"
            data={Array.isArray(plant) ? plant : []}  // Ensure it's an array
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <Dropdown
            name="Duration"
            data={Array.isArray(duration) ? duration : []}
            selectedItem={selectedItemTime}
            setSelectedItem={setSelectedItemTime} />
        </View>
        {/* dropdown end */}
        {/* card start */}
        <View
          style={styles.plantCardContainer}
        >
          <Text style={[styles.departmentHeading, { fontWeight: '400', paddingBottom:10}]}>Year 2025</Text>
          <View style={{flexDirection:'row', paddingBottom:5}}>
            <View style={styles.ongoing}></View>
            <Text style={{paddingHorizontal:10, top:-2}}>Ongoing Project</Text>
          </View>
          <View style={styles.onGoingContainer}>
            <View style={[styles.ongoing, {backgroundColor:colors.skyblue}]}></View>
            <Text style={{paddingHorizontal:10, top:-2}}>Projects Under Building Stage</Text>
          </View>
          <View style={styles.onGoingContainer}>
            <View style={[styles.ongoing, {backgroundColor:colors.red}]}></View>
            <Text style={{paddingHorizontal:10, top:-2}}>A. Under Feasibility & Land Acquisition</Text>
          </View>
          <View style={styles.onGoingContainer}>
            <View style={[styles.ongoing, {backgroundColor:colors.darkYellow}]}></View>
            <Text style={{paddingHorizontal:10, top:-2}}>B. Under Feasibility & Land Acquisition</Text>
          </View>
          <View style={styles.onGoingContainer}>
            <View style={[styles.ongoing, {backgroundColor:colors.yellow}]}></View>
            <Text style={{paddingHorizontal:10, top:-2}}>Future Planned</Text>
          </View>
        </View>
        {/* card end */}

      </View>
      {/* main content end */}
    </ScrollView>
  )
}

export default Projects