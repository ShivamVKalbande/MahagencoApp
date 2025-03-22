import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Dropdown from '../components/Dropdown'
import ScreenCard from '../components/ScreenCard';
import { colors } from '@/constant/color';
import styles from '../css/style';
import { useNavigation } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { financeCard, financePlant } from '../api/finance';
import FinanceCard from '../components/financeCard';

const Finance = () => {
  const navigation = useNavigation<any>();
  const [result, setResult] = useState(""); 
  const [budget, setBudget] = useState("");
  const [consumable, setConsumable] = useState("");              
  const [available, setAvailable] = useState("");              
  const [plant, setPlant] = useState<{ label: string; value: string }[]>([{ label: "MAHAGENCO", value: "" }]);
  const [selectedItem, setSelectedItem] = useState<{ label: string; value: string }>(plant[0]);
  const duration = [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Day", value: "day" },
  ]
  const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);

  const [plantData, setPlantData] = useState<{ name: string; totalConsumableBudget: number; totalConsumedBudget: number; totalAvailableAmount: number }[]>([]);

  // get card details 
  const getFinanceCardMutation = useMutation({
    mutationFn: () => financeCard(),
    onSuccess: (data) => {
     setAvailable(data.Available)
     setConsumable(data.Consumable)
     setBudget(data.budget)
     setResult(data.result)
    },
  });

  useEffect(() => {
    getFinanceCardMutation.mutate(); 
  }, []);

  // get plant details 
  const getFinancePlant = useMutation({
    mutationFn: () => financePlant(),
    onSuccess: (data) => {
      setPlantData(data.details);
    },
  });
  useEffect(() => {
    getFinancePlant.mutate(); 
  }, []);

  if (getFinancePlant.isPending) {
      return <ActivityIndicator />;
    }
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
            data={Array.isArray(plant) ? plant : []}
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
        <FinanceCard
          title="FY 2024-2025"
          subTitle="Budget Available"
          value={available}
          progress={0.6}
          current={budget}
          circleValue={consumable}
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
                 onPress={() => navigation.navigate("screen/financePlant", { plantName: item.name })}
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
                  <Text style={{ fontWeight: 'bold' }}> {item.totalConsumableBudget}</Text>
                </View>
                <View style={styles.plantBodycontainer}>
                  <Text> Consumed</Text>                  
                  <Text style={{ fontWeight: 'bold' }}>{item.totalConsumedBudget}</Text>
                </View>
                <View style={[styles.plantBodycontainer, { borderRightWidth: 0 }]}>
                  <Text> Available</Text>
                  <Text style={{ fontWeight: 'bold' }}> {item.totalAvailableAmount}</Text>
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

export default Finance;