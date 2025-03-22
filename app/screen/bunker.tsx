import { View, Text, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Dropdown from '../components/Dropdown'
import styles from '../css/style';
import { colors } from '@/constant/color';
import SmallDropdown from '../components/SmallDropdown';
import { useMutation } from '@tanstack/react-query';
import { getPlant, getUnit } from '../api/operation';
import { bunkerTableData } from '../api/bunker';
import FinanceCard from '../components/financeCard';

const { width, height } = Dimensions.get('window');
const Bunker = () => {
  const [plant, setPlant] = useState<{ label: string; value: string }[]>([{ label: "BTPS", value: "btps" }]);
  const duration = useMemo(() => [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Day", value: "day" },
  ], []);
  const [selectedItem, setSelectedItem] = useState<{ label: string; value: string }>(plant[0]);
  const [selectedItemTime, setSelectedItemTime] = useState<{ label: string; value: string }>(duration[0]);

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

  const [unit, setUnit] = useState([{ label: "UNIT03", value: "UNIT03" }]);
  const [selectedItemUnit, setSelectedItemUnit] = useState(unit[0]);
  const [bunkarTable, setBunkarTable] = useState<{ Period: string; CoalConsumption: string; AFB_CV: string }[]>([]);
  const [totalAFBCV, setTotalAFBCV] = useState("");
  const [totalCoalConsumption, setTotalCoalConsumption] = useState("");
  const [avgAFBCV, setAvgAFBCV] = useState("");
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
        value: item.Unit,
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
  // const postTableMutation = useMutation({
  //   mutationFn: () => bunkerTableData(selectedItem.value, selectedItemUnit.value, selectedItemMonth.value),
  //   onSuccess: (data) => {
  //     setTotalAFBCV(data.total_for_month.TotalAFBCV);
  //     setTotalCoalConsumption(data.total_for_month.TotalCoalConsumption);
  //     setBunkarTable(data.data);
  //   },
  // })

  const postTableMutation = useMutation({
    mutationFn: () =>
      bunkerTableData(selectedItem.value, selectedItemUnit.value, selectedItemMonth.value),
    onSuccess: (data) => {
      if (!data || !data.data) {
        console.error("Invalid response from bunker API");
        return;
      }

      const tableData = data.data;

      // Calculate average AFB CV
      const afbValues = tableData.map((item) => {
        const num = parseFloat(item.AFB_CV);
        return Number.isNaN(num) ? 0 : num;
      });
      const totalAFB = afbValues.reduce((sum, value) => sum + value, 0);
      const avgAFB = afbValues.length > 0 ? totalAFB / afbValues.length : 0;

      setAvgAFBCV(avgAFB.toFixed(2)); // Store average AFB CV
      setTotalAFBCV(data.total_for_month.TotalAFBCV);
      setTotalCoalConsumption(data.total_for_month.TotalCoalConsumption);
      setBunkarTable(tableData);
    },
  });

  useEffect(() => {
    postTableMutation.mutate();
  }, [selectedItem, selectedItemUnit, selectedItemMonth]);

  // useEffect(() => {
  //   console.log("Updated Bunker Table Data:", bunkarTable);
  //   console.log("Bunker Table Length:", bunkarTable.length);

  // }, [bunkarTable]);
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
        <FinanceCard
          title="FY 2024-2025"
          subTitle="Coal Consumption"
          value={totalCoalConsumption}
          progress={0.6}
          current={totalAFBCV}
          circleValue={avgAFBCV}
          unit="AVG"
          meter=""
          secondTitle="AFB CV by BOMB"
          innerStroke={colors.red}
          circleHeading=""
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

          {postTableMutation.isPending ? (
            <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
          ) : bunkarTable.length === 0 ? (
            <Text style={{ textAlign: 'center', padding: 10 }}>No Bunker Data Available</Text>
          ) : (
            <FlatList
              data={bunkarTable}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled= {false}
              renderItem={({ item }) => (
                <View style={styles.tableData}>
                  <View style={{ width: width * 0.3 }}>
                    <Text style={styles.tableText}>{item.Period}</Text>
                  </View>
                  <View style={{ width: width * 0.3 }}>
                    <Text style={styles.tableText}>{item.CoalConsumption}</Text>
                  </View>
                  <View style={{ width: width * 0.3 }}>
                    <Text style={styles.tableText}>{item.AFB_CV}</Text>
                  </View>
                </View>
              )}
            />
          )}
          <View style={[styles.tableData,
            //  { borderTopWidth: 0.2, }
            ]}>
            <View style={{ width: width * 0.3 }}>
            </View>
            <View style={{ width: width * 0.3 }}>
              <Text style={[styles.tableText, { color: colors.skyblue }]}>{totalCoalConsumption}</Text>
            </View>
            <View style={{ width: width * 0.3 }}>
              <Text style={[styles.tableText, { color: colors.skyblue }]}>{avgAFBCV}</Text>
            </View>
          </View>
          {/* Table Data end */}
        </View>
        {/* Table End */}
        <View style={{ height: height*0.32, backgroundColor: colors.white }}></View>
      </View>
      {/* main content end */}
    </View>
  )
}

export default Bunker