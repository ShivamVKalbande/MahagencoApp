import { View, Text, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenCard from '../components/ScreenCard'
import { colors } from '@/constant/color';
import styles from '../css/style'
import HrDropdown from '../components/hrDropdown';
import { useMutation } from '@tanstack/react-query';
import { hrTableData } from '../api/hr';
const { width, height } = Dimensions.get('window');
const Hr = () => {
  const [totalGeneration, setTotalGeneration] = useState(901776516540);
  const [totalGainLoss, setTotalGainLoss] = useState(1031314674980);

  const month = [
    { label: "January", value: "1", short: "jan" },
    { label: "February", value: "2", short: "feb" },
    { label: "March", value: "3", short: "mar" },
    { label: "April", value: "4", short: "apr" },
    { label: "May", value: "5", short: "may" },
    { label: "June", value: "6", short: "jun" },
    { label: "July", value: "7", short: "jul" },
    { label: "August", value: "8", short: "aug" },
    { label: "September", value: "9", short: "sep" },
    { label: "October", value: "10", short: "oct" },
    { label: "November", value: "11", short: "nov" },
    { label: "December", value: "12", short: "dec" },
  ];
  const currentMonth = new Date();
  // console.log('current date is ', currentMonth);
  const checkMonth = currentMonth.getMonth();
  // console.log('month is ', checkMonth);
  // filter month show only latest 3 months 
  const filteredMonths = month.slice(checkMonth, checkMonth + 3);


  const [selectedItemMonth, setSelectedItemMonth] = useState({ label: "Month", value: "", short: "" });

  const type = [
    // { label: "All", value: "all" },
    { label: "Vacancy", value: "vacancy" },
    { label: "Sepration", value: "sepration" },
    { label: "Retire", value: "retire" },
    // { label: "New Join", value: "new" },
  ];
  const [selectedItemType, setSelectedItemType] = useState(type[0]);
  const designation = [
    { label: "All", value: "" },
  ];
  const [selectedItemdesignation, setSelectedItemDesignation] = useState({ label: "Select Designation", value: "" })

  const [vacancyTable, setVacancyTable] = useState([]);
  const [separationTable, setSeparationTable] = useState([]);
  const [retireTable, setRetireTable] = useState([]);
  const [newJoinTable, setNewJoinTable] = useState([]);
  const [error, setError] = useState('');
  //get table data 
  const postTableMutation = useMutation({
    mutationFn: () => hrTableData(selectedItemType.value, selectedItemdesignation.value, selectedItemMonth.short),
    onSuccess: (data) => {
      setVacancyTable([]);
      setSeparationTable([]);
      setRetireTable([]);
      setNewJoinTable([]);
    
      if (selectedItemType.value === "vacancy") {
        setVacancyTable(data.data);
      } else if (selectedItemType.value === "sepration") {
        // console.log("Setting Separation Table:", data.data);
        setSeparationTable(data.data);
      } else if (selectedItemType.value === "retire") {
        setRetireTable(data.data);
      }
    },
    onError: (error) => {
      setError(error?.message || "An unexpected error occurred.");
    }
  })

  useEffect(() => {
    postTableMutation.mutate();
  }, [selectedItemType, selectedItemdesignation, selectedItemMonth]);

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
              data={filteredMonths}
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
        {/* vacancy table start */}
        {selectedItemType.value === "vacancy" && vacancyTable.length > 0 && (
          <View style={styles.tableContainer}>
            {/* Table start */}
            {/* Table Heading start */}
            <View style={styles.tableHeader}>
              <View style={{ width: width * 0.3 }}>
                <Text style={styles.tableHeadText}>Designation</Text>
              </View>
              <View style={{ width: width * 0.2 }}>
                <Text style={styles.tableHeadText}>Sanctioned</Text>
              </View>
              <View style={{ width: width * 0.2 }}>
                <Text style={styles.tableHeadText}>Working</Text>
              </View>
              <View style={{ width: width * 0.2 }}>
                <Text style={styles.tableHeadText}>Vacancy</Text>
              </View>
            </View>
            {/* Table Heading end */}

            {/* Table Data start */}
            {postTableMutation.isPending ? (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
            ) : vacancyTable.length === 0 ? (
              <Text style={{ textAlign: 'center', padding: 10 }}>No Data Available</Text>
            ) : error ? (
              <Text style={{ textAlign: 'center', padding: 10 }}>{error}</Text>
            ) : (
                <FlatList
                  data={vacancyTable}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.tableData}>
                      <View style={{ width: width * 0.3 }}>
                        <Text style={styles.tableText}>{item.Designation}</Text>
                      </View>
                      <View style={{ width: width * 0.2 }}>
                        <Text style={styles.tableText}>{item.sanctioned}</Text>
                      </View>
                      <View style={{ width: width * 0.2 }}>
                        <Text style={styles.tableText}>{item.working}</Text>
                      </View>
                      <View style={{ width: width * 0.2 }}>
                        <Text style={styles.tableText}>{item.vaccancy}</Text>
                      </View>
                    </View>
                  )}
                />
              )}
            {/* Table Data end */}
          </View>
        )}
        {/* vacancy table end */}
        {/* separation table start */}
        {selectedItemType.value === "sepration" && separationTable.length > 0 && (
          <View style={styles.tableContainer}>
            {/* Table start */}
            {/* Table Heading start */}
            <View style={styles.tableHeader}>
              <View style={{ width: width * 0.3 }}>
                <Text style={styles.tableHeadText}>Designation</Text>
              </View>
              <View style={{ width: width * 0.2 }}>
                <Text style={styles.tableHeadText}>Location</Text>
              </View>
              <View style={{ width: width * 0.2 }}>
                <Text style={styles.tableHeadText}>Reason for Action</Text>
              </View>
              <View style={{ width: width * 0.2 }}>
                <Text style={styles.tableHeadText}>Count</Text>
              </View>
            </View>
            {/* Table Heading end */}

            {/* Table Data start */}
            {postTableMutation.isPending ? (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
            ) : separationTable.length === 0 ? (
              <Text style={{ textAlign: 'center', padding: 10 }}>No Data Available</Text>
            ) : error ? (
              <Text style={{ textAlign: 'center', padding: 10 }}>{error}</Text>
            ) : (
              <FlatList
                data={separationTable}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.tableData}>
                    <View style={{ width: width * 0.3 }}>
                      <Text style={styles.tableText}>{item.Designation}</Text>
                    </View>
                    <View style={{ width: width * 0.2 }}>
                      <Text style={styles.tableText}>{item.Location}</Text>
                    </View>
                    <View style={{ width: width * 0.2 }}>
                      <Text style={styles.tableText}>{item.Reason}</Text>
                    </View>
                    <View style={{ width: width * 0.2 }}>
                      <Text style={styles.tableText}>{item.Count}</Text>
                    </View>
                  </View>
                )}
              />
            )}
            {/* Table Data end */}
          </View>
        )}
        {/* separation table end */}
        {/* retire table start */}
        {selectedItemType.value === "retire" && retireTable.length > 0 && (
          <View style={styles.tableContainer}>
            {/* Table start */}
            {/* Table Heading start */}
            <View style={styles.tableHeader}>
              <View style={{ width: width * 0.3 }}>
                <Text style={styles.tableHeadText}>Designation</Text>
              </View>
              <View style={{ width: width * 0.3 }}>
                <Text style={styles.tableHeadText}>Location</Text>
              </View>
              <View style={{ width: width * 0.3 }}>
                <Text style={styles.tableHeadText}>Count</Text>
              </View>
            </View>
            {/* Table Heading end */}

            {/* Table Data start */}
            {postTableMutation.isPending ? (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
            ) : retireTable.length === 0 ? (
              <Text style={{ textAlign: 'center', padding: 10 }}>No Data Available</Text>
            ) : error ? (
              <Text style={{ textAlign: 'center', padding: 10 }}>{error}</Text>
            ) : (
              <FlatList
                data={retireTable}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.tableData}>
                    <View style={{ width: width * 0.3 }}>
                      <Text style={styles.tableText}>{item.Designation}</Text>
                    </View>
                    <View style={{ width: width * 0.3 }}>
                      <Text style={styles.tableText}>{item.Location}</Text>
                    </View>
                    <View style={{ width: width * 0.3 }}>
                      <Text style={styles.tableText}>{item.Count}</Text>
                    </View>
                  </View>
                )}
              />
            )}
            {/* Table Data end */}
          </View>
        )}
        {/* Retire table end */}
        {/* New Join table start */}
        {newJoinTable.length > 0 && (
          <View style={styles.tableContainer}>
            {/* Table start */}
            {/* Table Heading start */}
            <View style={styles.tableHeader}>
              <View style={{ width: width * 0.3 }}>
                <Text style={styles.tableHeadText}>Designation</Text>
              </View>
              <View style={{ width: width * 0.3 }}>
                <Text style={styles.tableHeadText}>Location</Text>
              </View>
              <View style={{ width: width * 0.3 }}>
                <Text style={styles.tableHeadText}>Count</Text>
              </View>
            </View>
            {/* Table Heading end */}

            {/* Table Data start */}
            {postTableMutation.isPending ? (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
            ) : newJoinTable.length === 0 ? (
              <Text style={{ textAlign: 'center', padding: 10 }}>No Data Available</Text>
            ) : error ? (
              <Text style={{ textAlign: 'center', padding: 10 }}>{error}</Text>
            ) : (
              <FlatList
                data={newJoinTable}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.tableData}>
                    <View style={{ width: width * 0.3 }}>
                      <Text style={styles.tableText}>{item.designation}</Text>
                    </View>
                    <View style={{ width: width * 0.3 }}>
                      <Text style={styles.tableText}>{item.sanctioned}</Text>
                    </View>
                    <View style={{ width: width * 0.3 }}>
                      <Text style={styles.tableText}>{item.working}</Text>
                    </View>
                  </View>
                )}
              />
            )}
            {/* Table Data end */}
          </View>
        )}
        {/* newJoin table end */}
      </View>
      {/* main content end */}
    </View >
  )
}

export default Hr