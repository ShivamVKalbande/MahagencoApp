import { View, Text, Dimensions, ScrollView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { getPlant } from '../api/operation';
import Dropdown from '../components/Dropdown';
import styles from '../css/style';
import MaterialCardPurchase from '../components/MaterialCardPurchase';
import SmallDropdown from '../components/SmallDropdown';
import { colors } from '@/constant/color';
import { useRoute } from '@react-navigation/native';
import { getPr, getPrDocType, postMaterialprNumber, postPrMaterials } from '../api/materials';
// import moment from 'moment';
import dateFunction from '../components/dateFunction';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');
const MaterialPr = () => {
  const route = useRoute();
  const { plantName } = route.params || {};
  const [plant, setPlant] = useState([{ label: plantName, value: plantName }]);
  const [selectedItem, setSelectedItem] = useState(plant[0]);

  const duration = [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Day", value: "day" },
  ]

  const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);

  const prType = [
    { label: "Completed", value: "pr completed" },
    { label: "Active", value: "pr active" },
    { label: "In Release", value: "pr inRelease" },
  ];
  const [selectedItemPr, setSelectedItemPr] = useState({ label: "Pr Type", value: "" });
  const [docType, setDocType] = useState([{ label: "MAHAGENCO", value: "" }]);
  const [selectedItemDoc, setSelectedItemDoc] = useState({ label: "Doc Type", value: "" });

  const [prTable, setPrTable] = useState([]);
  const [prTableTotal, setPrTableTotal] = useState(0);

  const [active, setActive] = useState(0);
  const [release, setRelease] = useState(0);
  const [complete, setComplete] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState("");

  const [prNumber, setPrNumber] = useState([]);

  const [selectedItemPrNumber, setSelectedItemPrNumber] = useState({ label: "Pr Number", value: "" });

  const [date, setDate] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [from, setFrom] = useState(false);
  const [to, setTo] = useState(false);

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

  const getDocTypeMutation = useMutation({
    mutationFn: () => getPrDocType(),
    onSuccess: (data) => {
      if (!data || !Array.isArray(data)) {
        console.error("Invalid doc type API response");
        return;
      }

      const docTypeList = data.map((item) => ({
        label: item.Doc_Type_Descript,
        value: item.Doc_Type_Descript,
      }));
      setDocType(docTypeList);
    },
  });

  useEffect(() => {
    getDocTypeMutation.mutate();
  }, []);

  const postPrNumberMutation = useMutation({
    mutationFn: () => postMaterialprNumber(selectedItem.value),
    onSuccess: (data) => {
      if (data?.result && Array.isArray(data.result)) {
        const prNumber = data.result.map((item) => ({
          label: item.prnumber, // FIX: Corrected property name
          value: item.prnumber,
        }));
        setPrNumber(prNumber);
      } else {
        console.error("Invalid API response:", data);
      }
    },
    onError: (error) => {
      console.error("Error fetching vendor list:", error);
    },
  })


  useEffect(() => {
    postPrNumberMutation.mutate();
  }, []);

  const getPrMutation = useMutation({
    mutationFn: () => getPr(selectedItem?.value),
    onSuccess: (data) => {
      if (!data || typeof data !== "object") {
        console.error("Invalid Pr API response");
        return;
      }
      setActive(isNaN(parseFloat(data.Active)) ? 0 : parseFloat(data.Active));
      setRelease(isNaN(parseFloat(data.InRelease)) ? 0 : parseFloat(data.InRelease));
      setComplete(isNaN(parseFloat(data.Completed)) ? 0 : parseFloat(data.Completed));
      setCount(isNaN(parseFloat(data.Count)) ? 0 : parseFloat(data.Count));
      setTotal(data.Total || 0);
      //    setTotal(isNaN(parseFloat(data.Total)) ? 0 : parseFloat(data.Total));
    },
    onError: (error) => {
      console.error("Error fetching Po data:", error);
    },
  });


  useEffect(() => {
    if (selectedItem?.value) {
      getPrMutation.mutate();
    }
  }, [selectedItem]);




  const [selectedItemFromDate, setSelectedItemFromDate] = useState("");
  const onChangeFromDate = (event, selectedDate) => {
    setShowFrom(false);
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedItemFromDate(selectedDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
      setFrom(true);
    }
  }
  // console.log("from date ", selectedItemFromDate);

  const [selectedItemToDate, setSelectedItemToDate] = useState("")
  const onChangeToDate = (event, selectedDate) => {
    setShowTo(false);
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedItemToDate(selectedDate.toISOString().split('T')[0]);
      setTo(true);
    }
  }

  const postPrMutation = useMutation({
    mutationFn: () => postPrMaterials(selectedItem.value, selectedItemPr.value, selectedItemDoc.value, selectedItemPrNumber.value, selectedItemFromDate, selectedItemToDate),
    onSuccess: (data) => {
      setPrTable(data.result);
      setPrTableTotal(data.total);
    },
  })
  
  useEffect(() => {
    postPrMutation.mutate();
  }, [selectedItem, selectedItemPr, selectedItemDoc, selectedItemPrNumber, selectedItemFromDate, selectedItemToDate]);

  // if (postPrMutation.isPending) {
  //     return <ActivityIndicator />;
  // }
  return (
    <View
      // showsVerticalScrollIndicator={false}
      style={styles.container}>
      {/* main container start */}
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
        {/* Dropdown end */}
        {/* card start */}
        <MaterialCardPurchase
          title="Year 2024-25"
          value={count}
          circle1={complete}
          circle2={active}
          circle3={release}
          current={total}
          unit="Total PO"
          purchase="Order"
          plant={selectedItem.value}
        />
        {/* card end */}
        {/* small dropdown start */}
        <View style={styles.mainDropeDown}>
          <View style={{ width: width * 0.25, margin: 5, justifyContent: 'center', }}>
            <SmallDropdown
              name="Pr Number"
              data={Array.isArray(prNumber) ? prNumber : []}
              selectedItem={selectedItemPrNumber}
              setSelectedItem={setSelectedItemPrNumber}
            />
          </View>
          <View style={{ width: width * 0.25, margin: 5, justifyContent: 'center', }}>
            <SmallDropdown
              name="PO Type"
              data={Array.isArray(prType) ? prType : []}
              selectedItem={selectedItemPr}
              setSelectedItem={setSelectedItemPr}
            />
          </View>
          <View style={{ width: width * 0.25, margin: 5, justifyContent: 'center', }}>
            <SmallDropdown
              name="Doc Type"
              data={Array.isArray(docType) ? docType : []}
              selectedItem={selectedItemDoc}
              setSelectedItem={setSelectedItemDoc}
            />
          </View>

        </View>
        {/* small dropdown End */}
        {/* small dropdown start */}
        <View style={styles.mainDropeDown}>
          <View style={{ width: width * 0.25, margin: 5, justifyContent: 'center', }}>
            <View style={[styles.dropeDownContainer, { width: width * 0.25, margin: 1, }]}>
              <View style={[styles.dropdownBox, { width: width * 0.25, top: 0, }]}>
                <TouchableOpacity
                  style={[styles.dropdown, { width: width * 0.25 }]}
                  onPress={() => setShowFrom(true)}>
                  <Text>From Date</Text>
                </TouchableOpacity>
                {/* {from && (
                  <Text style={{ top: -25 }}>{"\n"} {selectedItemFromDate}</Text>
                )} */}
                 {selectedItemFromDate ? <Text style={{ top: -25 }}>{"\n"} {selectedItemFromDate}</Text> : null}
              </View>
            </View>
            {showFrom && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeFromDate}
              />
            )}
           
          </View>
          <View style={{ width: width * 0.25, margin: 5, justifyContent: 'center', }}>
            <View style={[styles.dropeDownContainer, { width: width * 0.25, margin: 1, }]}>
              <View style={[styles.dropdownBox, { width: width * 0.25, top: 0, }]}>
                <TouchableOpacity
                  style={[styles.dropdown, { width: width * 0.25 }]}
                  onPress={() => setShowTo(true)}>
                  <Text>To Date</Text>
                </TouchableOpacity>
                {/* {to && (
                  <Text style={{ top: -25 }}>{"\n"} {selectedItemToDate}</Text>
                )} */}
                {selectedItemToDate ? <Text style={{ top: -25 }}>{"\n"} {selectedItemToDate}</Text> : null}
              </View>
            </View>
            {showTo && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeToDate}
              />
            )}
            
          </View>
          <View style={{ width: width * 0.25, margin: 5, justifyContent: 'center' }}>
            <Text style={styles.smallLabel}>Total Value</Text>
            <Text style={[styles.smallLabel, { fontWeight: 'bold' }]}>{prTableTotal}</Text>
            <Text style={styles.smallLabel}>of completed pr</Text>
          </View>
        </View>
        {/* small dropdown End */}
        {/* Table start */}
        <View style={styles.tableContainer}>
          {/* table Headeing start */}
          <View style={styles.tableHeader}>
            <View style={{ width: width * 0.3 }}><Text style={styles.tableHeadText}>PR No.</Text></View>
            <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText} >Date</Text></View>
            <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>Value</Text></View>
            <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>Doc.Type</Text></View>
          </View>
          {/* table Headeing end */}
          {/* Table Data start */}
          {postPrMutation.isPending ? (
            <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
          ) : prTable.length === 0 ? (
            <Text style={{ textAlign: 'center', padding: 10 }}>No PO Data Available</Text>
          ) : (
            <FlatList
              data={prTable}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={styles.tableData}>
                  <View style={{ width: width * 0.3 }}>
                    <Text style={[styles.tableText, { fontWeight: 'bold' }]}>{item.Purchase}</Text>
                  </View>
                  <View style={{ width: width * 0.2 }}>
                    <Text style={styles.tableText}>
                      {/* {moment(item.PrCrDate).format("DD MMM YYYY")} */}
                      {item.PrCrDate ? dateFunction(item.PrCrDate) : "N/A"}
                    </Text>
                  </View>
                  <View style={{ width: width * 0.2 }}>
                    <Text style={styles.tableText}>
                      {/* {item.PrValueWithTax} */}
                      {isNaN(parseFloat(item.PrValueWithTax)) ? "0.00" : parseFloat(item.PrValueWithTax).toFixed(2)}
                    </Text>
                  </View>
                  <View style={{ width: width * 0.2 }}>
                    <Text style={styles.tableText}>{item.PODocType}</Text>
                  </View>
                </View>
              )}
            />
          )}

          {/* Table Data end */}
        </View>
        {/* Table End */}
      </View>
    </View >
  )
}

export default MaterialPr