import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import ScreenCard from '../components/ScreenCard';
import { colors } from '@/components/color';
import styles from '../css/style';
import { useNavigation } from 'expo-router';

const Finance = () => {
  const navigation = useNavigation();
  const [plant, setPlant] = useState([{ label: "MAHAGENCO", value: "" }]);
  const [selectedItem, setSelectedItem] = useState(plant[0]);
  const duration = [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Day", value: "day" },
  ]
  const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);
  const [totalGeneration, setTotalGeneration] = useState(901776516540);
  const [totalGainLoss, setTotalGainLoss] = useState(1031314674980);

  const plantData = [
    { name: "BTPS", Allocated: 23165478, Consumed: 32165478, available: 32165478 },
    { name: "CSTPS", Allocated: 23165478, Consumed: 32165478, available: 32165478 },
    { name: "KPKS", Allocated: 23165478, Consumed: 32165478, available: 32165478 },
    { name: "KTPS", Allocated: 23165478, Consumed: 32165478, available: 32165478 },
    { name: "NSK", Allocated: 23165478, Consumed: 32165478, available: 32165478 },
    { name: "Paras", Allocated: 23165478, Consumed: 32165478, available: 32165478 },
    { name: "Parali", Allocated: 23165478, Consumed: 32165478, available: 32165478 },
    { name: "Gas Turbine Power Station", Allocated: 23165478, Consumed: 32165478, available: 32165478 },
  ];

  const detailPlant = () => {
    navigation.navigate("screen/financePlant");
  };

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
        <ScreenCard
          title="FY 2024-2025"
          subTitle="Budget Allocate"
          value={totalGeneration}
          progress={0.6}
          current={totalGainLoss}
          unit="Rs"
          meter="Rs"
          secondTitle="Budget Allocate"
          innerStroke={colors.red}
          circleHeading="Budget Consumed"
        />
        {/* card end */}
        {/* Plants header text start */}
        <View style={styles.plantHeaderContainer}>
          <Text style={styles.departmentHeading}>Plants:</Text>
          <Text>Budget For Year 2024-2025</Text>
        </View>
        {/* Plants header text End */}
        {/* plants cards start */}
        {
          plantData.map((item, index) => (

            <View
              key={index}
              style={styles.plantCardContainer}>
              {/* plant Card Header start */}
              <View style={styles.plantCard}>
                <Text style={styles.plantHeaderText}>{item.name}</Text>
                <TouchableOpacity 
                  onPress={detailPlant}
                style={styles.plantButton}
                >
                  <Text style={[styles.smallLabel, { color: colors.white }]}>View Details</Text>
                </TouchableOpacity>
              </View>
              {/* plant Card Header End */}
              {/* plant Card Body start */}
              <View style={styles.plantCard}>
                <View style={styles.plantBodycontainer}>
                  <Text>Allocated</Text>
                  <Text style={{ fontWeight: 'bold' }}>{item.Allocated}</Text>
                </View>
                <View style={styles.plantBodycontainer}>
                  <Text> Consumed</Text>
                  <Text style={{ fontWeight: 'bold' }}> {item.Consumed}</Text>
                </View>
                <View style={[styles.plantBodycontainer, { borderRightWidth: 0 }]}>
                  <Text> Available</Text>
                  <Text style={{ fontWeight: 'bold' }}> {item.available}</Text>
                </View>
              </View>
              {/* plant Card Body end */}
            </View>

          ))
        }
        {/* plants cards end */}
      </View>
      {/* main content end */}
    </ScrollView>
  )
}

export default Finance