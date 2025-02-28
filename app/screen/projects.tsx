import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import styles from '../css/style';
import { colors } from '@/constant/color';
import ProjectsCard from '../components/ProjectsCard';


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
        {/* Project Card start */}
        <View style={styles.plantHeaderContainer}>
          <Text style={styles.departmentHeading}>Projects :</Text>
        </View>
        {/* ongoing project card */}
        <ProjectsCard
          projectNumber="08"
          projectName="Ongoing Project"
          capacity="1124.6"
          cost="862.70"
          bgColor={colors.green}
        />
        {/*  Projects Under Building Stage card */}
        <ProjectsCard
          projectNumber="11"
          projectName="Projects Under Building Stage"
          capacity="1527.6"
          cost="8291.72"
          bgColor={colors.skyblue}
        />
        {/*  A. Under BFeasibility & Land Acquisition card */}
        <ProjectsCard
          projectNumber="08"
          projectName="A. Under Feasibility & Land Acquisition"
          capacity="2600"
          cost="-----"
          bgColor={colors.red}
        />
         {/*  B. Under Feasibility & Land Acquisition card */}
         <ProjectsCard
          projectNumber="03"
          projectName="B. Under Feasibility & Land Acquisition"
          capacity="1672"
          cost="-----"
          bgColor={colors.darkYellow}
        />
        {/*   Future Planned card */}
        <ProjectsCard
          projectNumber="01"
          projectName="Future Planned"
          capacity="900"
          cost="-----"
          bgColor={colors.yellow}
        />
        {/* Project Card end */}
        <View style={{marginBottom:20}}></View>
      </View>
      {/* main content end */}
    </ScrollView>
  )
}

export default Projects