import { View, Text, ScrollView, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Dropdown from '../components/Dropdown'
import styles from '../css/style';
import ScreenCard from '../components/ScreenCard';
import { colors } from '@/constant/color';
import SmallDropdown from '../components/SmallDropdown';
import { useMutation } from '@tanstack/react-query';
import { getPlant, getUnit } from '../api/operation';
import { bunkerTableData } from '../api/bunker';

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
    { label: "January", value: "jan" },
    { label: "February", value: "feb" },
    { label: "March", value: "mar" },
    { label: "April", value: "apr" },
    { label: "May", value: "may" },
    { label: "June", value: "jun" },
    { label: "July", value: "jul" },
    { label: "August", value: "aug" },
    { label: "September", value: "sep" },
    { label: "October", value: "oct" },
    { label: "November", value: "nov" },
    { label: "December", value: "dec" },
  ];
  const [selectedItemMonth, setSelectedItemMonth] = useState(month[0]);

  const [unit, setUnit] = useState([{ label: "Unit", value: "" }]);
  const [selectedItemUnit, setSelectedItemUnit] = useState(unit[0]);
  const [bunkarTable, setBunkarTable] = useState([]);

  // get plant list
  const getPlatMutation = useMutation({
    mutationFn: () => getPlant(),
    onSuccess: (data) => {
      if (!data || !Array.isArray(data)) {
        console.error("Invalid plant API response");
        return;
      }

      const plantList = data.map((item) => ({
        label: item.plant,
        value: item.plant.toLowerCase(),
      }));
      setPlant(plantList);
    },
  });

  useEffect(() => {
    getPlatMutation.mutate(); 
  }, []);

  // get unit list 
    const getUnitMutation = useMutation({
      mutationFn: () => getUnit(selectedItem?.value),
      onSuccess: (data) => {
        if (!data || !Array.isArray(data)) {
          console.error("Invalid unit API response");
          return;
        }
  
        const unitList = data.map((item) => ({
          label: item.Unit,
          value: item.Unit.toLowerCase(),
        }));
  
        setUnit(unitList);
      }
    });

    useEffect(() => {
       if (selectedItem?.value) {
         getUnitMutation.mutate(); // Fetch units when plant changes
       }
     }, [selectedItem?.value]);

     //get table data 
          const postTableMutation = useMutation({
             mutationFn: () => bunkerTableData(selectedItem.value, selectedItemUnit.value, selectedItemMonth.value),
             onSuccess: (data) => {
               setTableResult(data.result);
               setFundTable(data.data);
             },
           })
           
           useEffect(() => {
             postTableMutation.mutate();
           }, [selectedItem, selectedItemCenter]);

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