import { View, Text, ScrollView, Dimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import ScreenCard from '../components/ScreenCard'
import { colors } from '@/constant/color';
import SmallDropdown from '../components/SmallDropdown';
import styles from '../css/style'
import HrDropdown from '../components/hrDropdown';
const { width, height } = Dimensions.get('window');
const Hr = () => {
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
  const [selectedItemMonth, setSelectedItemMonth] = useState({ label: "Month", value: "" });

  const type = [
    // { label: "All", value: "all" },
    { label: "Vacancy", value: "vacancy" },
    { label: "Separation", value: "separation" },
    { label: "Retire", value: "retire" },
    { label: "New Join", value: "new" },
  ];
  const [selectedItemType, setSelectedItemType] = useState({ label: "Type", value: "" });
  const designation = [
    { label: "All", value: "all" },
  ];
  const [selectedItemdesignation, setSelectedItemDesignation] = useState({ label: "Select Designation", value: "" })

  const hrTable = [
    { designation: "Dy Gen Manager- F&A", sanctioned: "0", working: "1", vacancy: "0" },
    { designation: "Gen Manager- F&A", sanctioned: "0", working: "1", vacancy: "0" },
    { designation: "Executive Director", sanctioned: "0", working: "1", vacancy: "0" },
    { designation: "Exe Director- IT", sanctioned: "0", working: "1", vacancy: "0" },
    { designation: "Exe Director- civil", sanctioned: "0", working: "1", vacancy: "0" },
    { designation: "Exe Director- Mechanical", sanctioned: "0", working: "1", vacancy: "0" },
    { designation: "Exe Director- civil", sanctioned: "0", working: "1", vacancy: "0" },
    { designation: "Exe Director- civil", sanctioned: "0", working: "1", vacancy: "0" },
    { designation: "Exe Director- civil", sanctioned: "0", working: "1", vacancy: "0" },
    { designation: "Exe Director- civil", sanctioned: "0", working: "1", vacancy: "0" },
    { designation: "Exe Director- civil", sanctioned: "0", working: "1", vacancy: "0" },
  ];
  return (
    <View style={styles.container}>
      {/* main content start */}
      <View style={styles.mainContainer}>
        {/* card start */}
        <ScreenCard
          title="Year 2024-2025"
          subTitle="Working"
          value={totalGeneration}
          progress={0.6}
          current={totalGainLoss}
          unit=""
          meter=""
          secondTitle="Total No. of Post"
          innerStroke={colors.red}
          circleHeading="AVG"
        />
        {/* card end */}

        {/* small dropdown start */}
        <View style={[styles.mainDropeDown, { width: width * 0.93, justifyContent: 'space-between' }]}>
          <View style={styles.smallDropdownContainer}>
            <HrDropdown
              name="Type"
              data={Array.isArray(type) ? type : []}
              selectedItem={selectedItemType.label}
              setSelectedItem={setSelectedItemType}
            />
          </View>
          <View>
            <Text>For Feb 2025</Text>
          </View>
        </View>
        {/* small dropdown End */}
        {/* small dropdown start */}
        <View style={[styles.mainDropeDown, { width: width * 0.93, justifyContent: 'space-between' }]}>
          <View style={styles.smallDropdownContainer}>
            <HrDropdown
              name="Month"
              data={Array.isArray(month) ? month : []}
              selectedItem={selectedItemMonth.label}
              setSelectedItem={setSelectedItemMonth}
            />
          </View>
          <View style={styles.smallDropdownContainer}>
            <HrDropdown
              name="Month"
              data={Array.isArray(designation) ? designation : []}
              selectedItem={selectedItemdesignation.label}
              setSelectedItem={setSelectedItemDesignation}
            />
          </View>
        </View>
        {/* small dropdown End */}
        {/* Table start */}
        <View style={styles.tableContainer}>
          {/* table Headeing start */}
          <View style={styles.tableHeader}>
            <View style={{ width: width * 0.3 }}><Text style={styles.tableHeadText}>Destignation</Text></View>
            <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText} >Sanctioned</Text></View>
            <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>Working</Text></View>
            <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>Vacancy</Text></View>
          </View>
          {/* table Headeing end */}
          {/* Table Data start */}

          {hrTable.length === 0 ? (
            <Text style={{ textAlign: 'center', padding: 10 }}>No Data Available</Text>
          ) : (
            <FlatList
              data={hrTable}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableData}>
                  <View style={{ width: width * 0.3 }}>
                    <Text style={styles.tableText}>{item.designation}</Text>
                  </View>
                  <View style={{ width: width * 0.2 }}>
                    <Text style={styles.tableText}>{item.sanctioned}</Text>
                  </View>
                  <View style={{ width: width * 0.2 }}>
                    <Text style={styles.tableText}>{item.working}</Text>
                  </View>
                  <View style={{ width: width * 0.2 }}>
                    <Text style={styles.tableText}>{item.vacancy}</Text>
                  </View>
                </View>
              )}
            />
          )}

          {/* Table Data end */}
        </View>
        {/* Table End */}
      </View>
      {/* main content end */}
    </View>
  )
}

export default Hr