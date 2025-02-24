import { View, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Dropdown from '../components/Dropdown'
import MaterialCard from '../components/MaterialCard';
import { useMutation } from '@tanstack/react-query';
import { getPlant } from '../api/operation';
import { getPo, getPr } from '../api/materials';
import styles from '../css/style';


const { height } = Dimensions.get('window');
const Material = () => {
  const [plant, setPlant] = useState([{ label: "MAHAGENCO", value: "mahagenco" }]);
    // const [duration, setDuration] = useState([{ label: "Year", value: "year" }]);
    const duration = [
      { label: "Year", value: "year" },
      { label: "Month", value: "month" },
      { label: "Day", value: "day" },
    ]
  const [selectedItem, setSelectedItem] = useState(plant[0]);
  const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);

  const [active, setActive]= useState(0);
  const [release, setRelease]= useState(0);
  const [complete, setComplete]= useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState("0");
  const [prActive, setPrActive]= useState(0);
  const [prRelease, setPrRelease]= useState(0);
  const [prComplete, setPrComplete]= useState(0);
  const [prCount, setPrCount] = useState(0);
  const [prTotal, setPrTotal] = useState("0");
 
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

    const getPoMutation = useMutation({
      mutationFn: () => getPo(selectedItem?.value),
      onSuccess:(data) => {
        if (!data || typeof data !== "object") {
          console.error("Invalid Po API response");
          return;
        }
        setActive(Number(data.Active) || 0);
        setRelease(Number(data.InRelease) || 0);
        setComplete(Number(data.Completed) || 0);
        setCount(Number(data.Count) || 0);
        setTotal(data.Total || "0");
      },
      onError: (error) => {
        console.error("Error fetching Po data:", error);
      },
    });

    // if (getPoMutation.isPending) {
    //   return <ActivityIndicator />;
    // }

    const getPrMutation = useMutation({
      mutationFn: () => getPr(selectedItem?.value),
      onSuccess:(data) => {
        if (!data || typeof data !== "object") {
          console.error("Invalid Pr API response");
          return;
        }
        setPrActive(Number(data.Active) || 0);
        setPrRelease(Number(data.InRelease) || 0);
        setPrComplete(Number(data.Completed) || 0);
        setPrCount(Number(data.Count) || 0);
        setPrTotal(data.Total || "0");
      },
      onError: (error) => {
        console.error("Error fetching Po data:", error);
      },
    });
    // if (getPrMutation.isPending) {
    //   return <ActivityIndicator />;
    // }
   
    useEffect(() => {
      if (selectedItem?.value) {
        getPoMutation.mutate();
        getPrMutation.mutate();
      }
    }, [selectedItem]);

  return (
    <View style={styles.container}
    >
      {/* main content start */}
      <View style={[styles.mainContainer, {height:height*0.95}]}>
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
        {/* dropdown end */}
        {/* card start */}
        <MaterialCard
          title="Year 2024-25"
          value={count}
          circle1={complete}
          circle2={active}
          circle3={release}
          current={total}
          unit="Total PO"
          purchase="Order"
          plant= {selectedItem.value}
        />
        {/* card end */}
         {/* card start */}
        <MaterialCard
          title="Year 2024-25"
          value={prCount}
          circle1={prComplete}
          circle2={prActive}
          circle3={prRelease}
          current={prTotal}
          unit="Total PO"
          purchase="Request"
          plant= {selectedItem.value}
        />
        {/* card end */}
      </View>
      {/* main content end */}
    </View>
  )
}

export default Material;