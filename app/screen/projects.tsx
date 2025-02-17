import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import styles from '../css/style';
import { colors } from '@/components/color';

const { width } = Dimensions.get('window');
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
          <Text style={[styles.departmentHeading, { fontWeight: '400', paddingBottom: 10 }]}>Year 2025</Text>
          <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
            <View style={styles.ongoing}></View>
            <Text style={{ paddingHorizontal: 10, top: -2 }}>Ongoing Project</Text>
          </View>
          <View style={styles.onGoingContainer}>
            <View style={[styles.ongoing, { backgroundColor: colors.skyblue }]}></View>
            <Text style={{ paddingHorizontal: 10, top: -2 }}>Projects Under Building Stage</Text>
          </View>
          <View style={styles.onGoingContainer}>
            <View style={[styles.ongoing, { backgroundColor: colors.red }]}></View>
            <Text style={{ paddingHorizontal: 10, top: -2 }}>A. Under Feasibility & Land Acquisition</Text>
          </View>
          <View style={styles.onGoingContainer}>
            <View style={[styles.ongoing, { backgroundColor: colors.darkYellow }]}></View>
            <Text style={{ paddingHorizontal: 10, top: -2 }}>B. Under Feasibility & Land Acquisition</Text>
          </View>
          <View style={styles.onGoingContainer}>
            <View style={[styles.ongoing, { backgroundColor: colors.yellow }]}></View>
            <Text style={{ paddingHorizontal: 10, top: -2 }}>Future Planned</Text>
          </View>
        </View>
        {/* card end */}
        {/* Ongoing Project Card start */}
        <View style={styles.plantHeaderContainer}>
          <Text style={styles.departmentHeading}>Projects :</Text>
        </View>
        <View
          style={styles.plantCardContainer}
        >
          {/* plant Card Header start */}
          <View style={styles.plantHeaderContainer}>
            <Text style={{ fontWeight: 'bold' }}>Ongoing Projects</Text>
            <TouchableOpacity
              // onPress={detailPlant}
              style={[styles.plantButton, { left: -width * 0.04, backgroundColor:colors.green,}]}
            >
              <Text style={[styles.smallLabel, { color: colors.white }]}>View Projects</Text>
            </TouchableOpacity>
          </View>
          {/* plant Card Header End */}
          {/* plant Card Body start */}
          <View style={styles.plantCard}>
          <View style={[styles.plantBodycontainer, {width:width*0.2, height:60,}]}>
              <Text style={{ fontWeight: 'bold', color:colors.green, fontSize:22, justifyContent: 'center' }}>08</Text>
            </View>
            <View style={[styles.plantBodycontainer, {width:width*0.2, height:60,}]}>
              <Text> No. of</Text>
              <Text >Projects</Text>
            </View>
            <View style={[styles.plantBodycontainer, {width:width*0.2, height:60,}]}>
              <Text> Total Capacity</Text>
              <Text style={{ fontWeight: 'bold' }}>1124.6</Text>
            </View>
            <View style={[styles.plantBodycontainer, { borderRightWidth: 0, width:width*0.2, }]}>
              <Text> Tentative Total Cost</Text>
              <Text style={{ fontWeight: 'bold' }}> 862.70 Cr.</Text>
            </View>
          </View>
          {/* plant Card Body end */}
        </View>
        {/* Ongoing Project Card end */}
      </View>
      {/* main content end */}
    </ScrollView>
  )
}

export default Projects