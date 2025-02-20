import { View, Text, Dimensions, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { getPlant } from '../api/operation';
import Dropdown from '../components/Dropdown';
import styles from '../css/style';
import MaterialCardPurchase from '../components/MaterialCardPurchase';
import SmallDropdown from '../components/SmallDropdown';
import { colors } from '@/constant/color';
import { getPo, getPoDocType, postPoMaterials } from '../api/materials';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
const { width } = Dimensions.get('window');
const MaterialPo = () => {
  const route = useRoute();
  const { plantName } = route.params || {};
  const [plant, setPlant] = useState([{ label: plantName, value: plantName }]);
  const [selectedItem, setSelectedItem] = useState(plant[0]);
  const duration = [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Day", value: "day" },
  ];
  const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);

  const poType = [
    { label: "Completed", value: "completed" },
    { label: "Active", value: "active" },
    { label: "In Release", value: "inRelease" },
  ];
  const [selectedItemPo, setSelectedItemPo] = useState({ label: "Po Type", value: "" });
  const [docType, setDocType] = useState([{ label: "MAHAGENCO", value: "" }]);
  const [selectedItemDoc, setSelectedItemDoc] = useState({ label: "Doc Type", value: "" });
  const [poTable, setPoTable] = useState([]);
  const [poTableTotal, setPoTableTotal] = useState(0);

  const [active, setActive] = useState(0);
  const [release, setRelease] = useState(0);
  const [complete, setComplete] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState("");

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
    mutationFn: () => getPoDocType(),
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


  const getPoMutation = useMutation({
    mutationFn: () => getPo(selectedItem?.value),
    onSuccess: (data) => {
      if (!data || typeof data !== "object") {
        console.error("Invalid Po API response");
        return;
      }
      setActive(isNaN(parseFloat(data.Active)) ? 0 : parseFloat(data.Active));
      setRelease(isNaN(parseFloat(data.InRelease)) ? 0 : parseFloat(data.InRelease));
      setComplete(isNaN(parseFloat(data.Completed)) ? 0 : parseFloat(data.Completed));
      setCount(isNaN(parseFloat(data.Count)) ? 0 : parseFloat(data.Count));
      setTotal(data.Total || 0);
    },
    onError: (error) => {
      console.error("Error fetching Po data:", error);
    },
  });

  useEffect(() => {
    if (selectedItem?.value) {
      getPoMutation.mutate();
    }
  }, [selectedItem]);

  const postPoMutation = useMutation({
    mutationFn: () => postPoMaterials(selectedItem.value, selectedItemPo.value, selectedItemDoc.value),
    onSuccess: (data) => {
      // if (!Array.isArray(data)) {
      //   console.error("Invalid post po API response");
      // }
      setPoTable(data.result);
      setPoTableTotal(data.total);
    },
  })

  useEffect(() => {
    postPoMutation.mutate();
  }, []);

  return (
    <View
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      {/* main container start */}
      <View style={styles.mainContainer}>
        {postPoMutation.isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
        ) : (
          <>
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
              <View style={{ width: width * 0.3, margin: 5, justifyContent: 'center', }}>
                <SmallDropdown
                  name="PO Type"
                  data={Array.isArray(poType) ? poType : []}
                  selectedItem={selectedItemPo}
                  setSelectedItem={setSelectedItemPo}
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
              <View style={{ width: width * 0.25, margin: 5, justifyContent: 'center' }}>
                <Text style={styles.smallLabel}>Total Value</Text>
                <Text style={[styles.smallLabel, { fontWeight: 'bold' }]}>{poTableTotal}</Text>
                <Text style={styles.smallLabel}>of completed pr</Text>
              </View>
            </View>
            {/* small dropdown End */}
            {/* Table start */}
            {/* PO Table */}
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <View style={{ width: width * 0.3 }}><Text style={styles.tableHeadText}>Vendor Name</Text></View>
                <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>Date</Text></View>
                <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>Value</Text></View>
                <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>Doc.Type</Text></View>
              </View>

              {poTable.length === 0 ? (
                <Text style={{ textAlign: 'center', padding: 10 }}>No PO Data Available</Text>
              ) : (
                poTable.map((item, index) => (
                  <View key={index} style={styles.tableData}>
                    <View style={{ width: width * 0.3 }}><Text style={styles.tableText}>{item.VendorName}</Text></View>
                    <View style={{ width: width * 0.2 }}><Text style={styles.tableText}>
                      {/* {moment(item.POCrDate).format("DD MMM YYYY") } */}
                      {item.POCrDate ? moment(item.POCrDate).format("DD MMM YYYY") : "N/A"}
                      </Text></View>
                    <View style={{ width: width * 0.2 }}><Text style={styles.tableText}>
                      {/* {item.POValueWithTax} */}
                      {isNaN(parseFloat(item.POValueWithTax)) ? "0.00" : parseFloat(item.POValueWithTax).toFixed(2)}
                      </Text>
                      </View>
                    <View style={{ width: width * 0.2 }}><Text style={styles.tableText}>{item.PODocType}</Text></View>
                  </View>
                ))
              )}


              {/* Table Data end */}
            </View>
            {/* Table End */}
          </>
        )}
      </View>
    </View>
  )
}

export default MaterialPo