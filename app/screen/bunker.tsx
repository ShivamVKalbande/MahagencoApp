import { View, Text, ScrollView, Dimensions, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'
import Dropdown from '../components/Dropdown'
import styles from '../css/style';
import ScreenCard from '../components/ScreenCard';
import { colors } from '@/constant/color';
import SmallDropdown from '../components/SmallDropdown';

const { width, height } = Dimensions.get('window');
const Bunker = () => {
  const [plant, setPlant] = useState([{ label: "MAHAGENCO", value: "mahagenco" }]);
  const duration = useMemo(() => [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Day", value: "day" },
  ], []);
  const [selectedItem, setSelectedItem] = useState(plant[0]);
  const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);
  const [totalGeneration, setTotalGeneration] = useState(901776516540);
  const [totalGainLoss, setTotalGainLoss] = useState(1031314674980);

  const month = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];
  const [selectedItemMonth, setSelectedItemMonth] = useState(month[0]);

  const unit = [
    { label: "Unit 1", value: "unit1" },
    { label: "Unit 2", value: "unit2" },
    { label: "Unit 3", value: "unit3" },
  ];
  const [selectedItemUnit, setSelectedItemUnit] = useState(unit[0]);

  const bunkarTable = [
    { week: 1, consumption: 32154.00, afb: 3214.11 },
    { week: 2, consumption: 32154.00, afb: 3214.11 },
    { week: 3, consumption: 32154.00, afb: 3214.11 },
    { week: 4, consumption: 32154.00, afb: 3214.11 },
  ];
  return (
    <View style={styles.container}>
      {/* main content start */}
      <View style={styles.mainContainer}>
        {/* dropdown start */}
        <View style={styles.mainDropeDown}>
          <Dropdown
            name="Mahagenco"
            data={plant}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <Dropdown
            name="Time"
            data={duration}
            selectedItem={selectedItemTime}
            setSelectedItem={setSelectedItemTime}
          />
        </View>
        {/* Dropdown end */}
        {/* card start */}
        <ScreenCard
          title="Year 224-2025"
          subTitle="Coal Consumption"
          value={totalGeneration}
          progress={0.6}
          current={totalGainLoss}
          unit=""
          meter=""
          secondTitle="AFB CV by BOMB"
          innerStroke={colors.red}
          circleHeading="AVG"
        />
        {/* card end */}
        {/* small dropdown start */}
        <View style={styles.mainDropeDown}>
          <View style={{ width: width * 0.3, margin: 5, justifyContent: 'center', }}>
            <SmallDropdown
              name="Month"
              data={Array.isArray(month) ? month : []}
              selectedItem={selectedItemMonth}
              setSelectedItem={setSelectedItemMonth}
            />
          </View>
          <View style={{ width: width * 0.3, margin: 5, justifyContent: 'center', }}>
            <SmallDropdown
              name="Unit"
              data={Array.isArray(unit) ? unit : []}
              selectedItem={selectedItemUnit}
              setSelectedItem={setSelectedItemUnit}
            />
          </View>
          <View style={{ width: width * 0.2, margin: 5, justifyContent: 'center' }}>

          </View>
        </View>
        {/* small dropdown End */}
        {/* Table start */}
        <View style={styles.tableContainer}>
          {/* table Headeing start */}
          <View style={styles.tableHeader}>
            <View style={{ width: width * 0.3 }}><Text style={styles.tableHeadText}>Week</Text></View>
            <View style={{ width: width * 0.3 }}><Text style={styles.tableHeadText} >Coal Consumption</Text></View>
            <View style={{ width: width * 0.3 }}><Text style={styles.tableHeadText}>AFB CV by BOMB</Text></View>
          </View>
          {/* table Headeing end */}
          {/* Table Data start */}

          {bunkarTable.length === 0 ? (
            <Text style={{ textAlign: 'center', padding: 10 }}>No Bunker Data Available</Text>
          ) : (
            <FlatList
              data={bunkarTable}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableData}>
                  <View style={{ width: width * 0.3 }}>
                    <Text style={[styles.tableText, { fontWeight: 'bold' }]}>{item.week}</Text>
                  </View>
                  <View style={{ width: width * 0.3 }}>
                    <Text style={styles.tableText}>{item.consumption}</Text>
                  </View>
                  <View style={{ width: width * 0.3 }}>
                    <Text style={styles.tableText}>{item.afb}</Text>
                  </View>
                </View>
              )}
            />
          )}

          {/* Table Data end */}
        </View>
        {/* Table End */}
        <View style={{ height: height * 0.4, backgroundColor: colors.white }}></View>
      </View>
      {/* main content end */}
    </View>
  )
}

export default Bunker