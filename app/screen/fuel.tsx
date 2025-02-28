import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Dropdown from '../components/Dropdown'
import { colors } from '@/constant/color';
import styles from '../css/style';
import Slider from '@react-native-community/slider';
import FuelSlider from '../components/fuelSlider';
import { useNavigation } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { getPlant, getUnit } from '../api/operation';
import { getFuel } from '../api/fuel';

const { width } = Dimensions.get('window');
const Fuel = () => {
   const navigation = useNavigation();
  const [plant, setPlant] = useState([{ label: "BTPS", value: "btps" }]);
  const duration = useMemo(() => [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Day", value: "day" },
  ], []);
  const [selectedItem, setSelectedItem] = useState(plant[0]);
  const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);
  const tariff = [
    { label: "select Tariff", value: "" },
    { label: "Tariff 1", value: "tariff1" },
    { label: "Tariff 2", value: "tariff2" },
  ]
  const [unit, setUnit] = useState([{ label: "UNIT03", value: "UNIT03" }]);
  const [selectedTariff, setSelectedTariff] = useState(tariff[0]);
  const [selectedUnit, setSelectedUnit] = useState(unit[0]);


  // slider data start
  const [sliderValues, setSliderValues] = useState({
    gross: 0,
    apc: 0,
    apcPercent: 0,
    netGeneration:0,
    soc: 0,
    socKwh:0,
    coalFactor:0,
    domestic: 0,
    wash: 0,
    import: 0,
    ldo: 0,
    fo: 0,
    domesticKcal: 0,
    washKcal: 0,
    importKcal: 0,
    ldoKcal: 0,
    foKcal: 0,
    domesticMt: 0,
    washMt: 0,
    importMt: 0,
    ldoKl: 0,
    foKl: 0,
    other: 0,
    heatRateKcal:0,
    ldoHeatContentMKcal:0,
    foHeatContentMKCal:0,
    coalMKCal:0,
    TotalMKCal:0,
    coalMt:0,
    totalCost:0,
    genCost:0,
    energyKwh:0,
  });
  //get plant data from api
  const getPlatMutation = useMutation({
    mutationFn: () => getPlant(),
    onSuccess: (data) => {
      if (!data || !Array.isArray(data)) {
        console.error("Invalid plant API response");
        return;
      }

      const plantList = data.map((item) => ({
        label: item.plant,
        value: item.plant,
      }));
      setPlant(plantList);
    },
  });

  // get unit data from api
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
    getPlatMutation.mutate(); // Initial fetch for plants
  }, []);

  useEffect(() => {
    if (selectedItem?.value) {
      getUnitMutation.mutate(); // Fetch units when plant changes
    }
  }, [selectedItem?.value]);

  //get fuel data from api
  const operationMutation = useMutation({
      mutationFn: () => getFuel(selectedItem?.value, selectedUnit?.value, selectedTariff?.value),
      onSuccess: (data) => {
        if (!data) {
          console.error("API response is null or undefined");
          return;
        }
        setSliderValues(prev => ({ ...prev, gross: data.Gross_Generation_MU }));
        setSliderValues(prev => ({ ...prev, apc: data.APC_MU}));
        setSliderValues(prev => ( {  ...prev, apcPercent: data.Apc_Percent} ));
        setSliderValues(prev => ( {  ...prev, netGeneration: data.Net_Generation_MU} ));
        setSliderValues(prev => ( {  ...prev, soc: data.SOC_KL} ));
        setSliderValues(prev => ( {  ...prev, socKwh: data.SOC_ml_Kwh} ));
        setSliderValues(prev => ( {  ...prev, coalFactor: data.Coal_Factor_Kg_Kwh} ));
        setSliderValues(prev => ( {  ...prev, domestic: data.Domestic_Rs_MT} ));
        setSliderValues(prev => ( {  ...prev, wash: data.Wash_Coal_Rs_MT} ));
        setSliderValues(prev => ( {  ...prev, import: data.Import_Rs_MT} ));
        setSliderValues(prev => ( {  ...prev, ldo: data.LDO_Rs_KL} ));
        setSliderValues(prev => ( {  ...prev, fo: data.FO_Rs_KL} ));
        setSliderValues(prev => ( {  ...prev, domesticKcal: data.Domestic_Kcal_Kg} ));
        setSliderValues(prev => ( {  ...prev, washKcal: data.Wash_Coal_Kcal_Kg} ));
        setSliderValues(prev => ( {  ...prev, importKcal: data.Imported_Coal_CV} ));
        setSliderValues(prev => ( {  ...prev, ldoKcal: data.LDO_Kcal_Kg} ));
        setSliderValues(prev => ( {  ...prev, foKcal: data.FO_Kcal_Kg} ));
        setSliderValues(prev => ( {  ...prev, domesticMt: data.Domestic_MT} ));
        setSliderValues(prev => ( {  ...prev, washMt: data.Wash_Coal_MT} ));
        setSliderValues(prev => ( {  ...prev, importMt: data.Import_MT} ));
        setSliderValues(prev => ( {  ...prev, ldoKl: data.LDO_KL} ));
        setSliderValues(prev => ( {  ...prev, foKl: data.FO_KL} ));
        setSliderValues(prev => ( {  ...prev, heatRateKcal: data.Heat_Rate_Kcal_Kwh} ));
        setSliderValues(prev => ( {  ...prev, ldoHeatContentMKcal: data.LDO_Heat_Content_MKCal} ));
        setSliderValues(prev => ( {  ...prev, foHeatContentMKCal: data.FO_Heat_Content_MKCal} ));
        setSliderValues(prev => ( {  ...prev, coalMKCal: data.Coal_Heat_Content_MKCal} ));
        setSliderValues(prev => ( {  ...prev, TotalMKCal: data.Total_Heat_Content_MKCal} ));
        setSliderValues(prev => ( {  ...prev, coalMt: data.Coal_Consumption_MT} ));
        setSliderValues(prev => ( {  ...prev, totalCost: data.Total_Fuel_Cost_Rs_Crore} ));
        setSliderValues(prev => ( {  ...prev, genCost: data.GenCostat_Gen_Terminal_Rs} ));
        setSliderValues(prev => ( {  ...prev, other: data.Other_Charges_Adjustment_Rs} ));
        setSliderValues(prev => ( {  ...prev, energyKwh: data.Energy_Charges_Rs_Kwh} ));
      },
      onError: (error) => {
        console.error("Error: ", error);
      },
    });
  
    useEffect(() => {
      operationMutation.mutate();
    }, [ selectedItem?.value, selectedTariff?.value, selectedUnit?.value]);

//for tarrif 
  useEffect(() => {
    if (selectedTariff.value === "tariff1" || selectedTariff.value === "tariff2") {      
      // setUnit([{ label: "All Unit", value: "" }]);
      setSelectedUnit({ label: "All Unit", value: "" });
      // operationMutation.mutate();
    }
   }, [selectedTariff]);

   useEffect(()=> {
    if(selectedUnit?.value !==""){
      setSelectedTariff({label: "Select Tariff", value: ""});
      // operationMutation.mutate();
    }
   },[selectedUnit]);
  return (
    <ScrollView style={styles.container}>
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
        <View style={styles.mainDropeDown}>
          <Dropdown
            name="Select Tariff"
            data={Array.isArray(tariff) ? tariff : []}
            selectedItem={selectedTariff}
            setSelectedItem={setSelectedTariff}
          />
          <Dropdown
            name="Unit"
            data={Array.isArray(unit) ? unit : []}
            selectedItem={selectedUnit}
            setSelectedItem={setSelectedUnit}
          />
        </View>
        {/* dropdown end */}
        {/* heading start */}
        <View style={styles.detailChartContainer}>
          <Text>Year 2025</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>Enery Charges:</Text>
            <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>0.00 Rs./Kwh</Text>
            <TouchableOpacity
               onPress={() => navigation.navigate("screen/fuelCombination")}
              style={[styles.plantButton, { left: width*0.15,  paddingHorizontal:15}]}
            >
              <Text style={[
                styles.smallLabel,
                { color: colors.white }]}
              >Fuel Combination</Text>
            </TouchableOpacity>
          </View>

        </View>
        {/* heading end */}
        {/* slider Start */}
        <FuelSlider
          energyName="Gross Generation MU"
          sliderValue={sliderValues.gross}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, gross: newValue }))}
        />
        <FuelSlider
          energyName="APC MU"
          sliderValue={sliderValues.apc}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, apc: newValue }))}
        />
        {/* slider Buttom Container start */}

        <View style={styles.sliderBottomContainer}>
          <View>
            <Text style={styles.sliderBottomText}>APC %</Text>
            <Text style={styles.sliderBottomText}>{sliderValues.apcPercent}</Text>
          </View>
          <View>
            <Text style={styles.sliderBottomText}>Net Generation MU</Text>
            <Text style={styles.sliderBottomText}>{sliderValues.netGeneration}</Text>
          </View>
        </View>

        {/* slider Buttom Container End */}

        <FuelSlider
          energyName="SOC KL"
          sliderValue={sliderValues.soc}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, soc: newValue }))}
        />
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>SOC ml/Kwh</Text>
          <Text style={styles.sliderBottomText}>{sliderValues.socKwh}</Text>
        </View>
        {/* slider Buttom Container start */}
        <View style={styles.sliderBottomContainer}>
          <View>
            <Text style={styles.sliderBottomText}>Coal Factor Kg/Kwh</Text>
          </View>
          <View>
            <Text style={styles.sliderBottomText}>{sliderValues.coalFactor}</Text>
          </View>
        </View>
        {/* slider Buttom Container End */}
        {/* blue text start */}
        <View style={[styles.detailChartContainer, { width: width * 0.9 }]}>
          <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>Land Coal Price</Text>
        </View>
        {/* blue text end */}
        <FuelSlider
          energyName="Domestic Rs/MT"
          sliderValue={sliderValues.domestic}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, domestic: newValue }))}
        />
        <FuelSlider
          energyName="Wash Coal Rs/MT"
          sliderValue={sliderValues.wash}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, wash: newValue }))}
        />
        <FuelSlider
          energyName="Import Rs/MT"
          sliderValue={sliderValues.import}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, import: newValue }))}
        />
        {/* blue text start */}
        <View style={[styles.detailChartContainer, { width: width * 0.9 }]}>
          <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>Land Oil Price</Text>
        </View>
        {/* blue text end */}
        <FuelSlider
          energyName="LDO Rs/KL"
          sliderValue={sliderValues.ldo}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, ldo: newValue }))}
        />
        <FuelSlider
          energyName="FO Rs/KL"
          sliderValue={sliderValues.fo}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, fo: newValue }))}
        />
        {/* blue text start */}
        <View style={[styles.detailChartContainer, { width: width * 0.9 }]}>
          <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>GCV Coal</Text>
        </View>
        {/* blue text end */}
        <FuelSlider
          energyName="Domestic Kcal/Kg"
          sliderValue={sliderValues.domesticKcal}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, domesticKcal: newValue }))}
        />
        <FuelSlider
          energyName="Wash Coal Kcal/Kg"
          sliderValue={sliderValues.washKcal}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, washKcal: newValue }))}
        />
        <FuelSlider
          energyName="Import Kcal/Kg"
          sliderValue={sliderValues.importKcal}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, importKcal: newValue }))}
        />
        {/* blue text start */}
        <View style={[styles.detailChartContainer, { width: width * 0.9 }]}>
          <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>GCV - Oil</Text>
        </View>
        {/* blue text end */}
        <FuelSlider
          energyName="LDO Kcal/Kg"
          sliderValue={sliderValues.ldoKcal}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, ldoKcal: newValue }))}
        />
        <FuelSlider
          energyName="FO Kcal/Kg"
          sliderValue={sliderValues.foKcal}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, foKcal: newValue }))}
        />
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>heat Rate Kcal/Kwh</Text>
          <Text style={styles.sliderBottomText}>0.0</Text>
        </View>

        {/* blue text start */}
        <View style={[styles.detailChartContainer, { width: width * 0.9 }]}>
          <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>Consumption</Text>
        </View>
        {/* blue text end */}
        <FuelSlider
          energyName="Domestic MT"
          sliderValue={sliderValues.domesticMt}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, domesticMt: newValue }))}
        />
        <FuelSlider
          energyName="Wash Coal MT"
          sliderValue={sliderValues.washMt}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, washMt: newValue }))}
        />
        <FuelSlider
          energyName="Import MT"
          sliderValue={sliderValues.importMt}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, importMt: newValue }))}
        />
        <FuelSlider
          energyName="LDO KL"
          sliderValue={sliderValues.ldoKl}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, ldoKl: newValue }))}
        />
        <FuelSlider
          energyName="FO KL"
          sliderValue={sliderValues.foKl}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, foKl: newValue }))}
        />
        <FuelSlider
          energyName="Other Charges/Adjustment Rs. Cr."
          sliderValue={sliderValues.other}
          setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, other: newValue }))}
        />
        {/* blue text start */}
        <View style={[styles.detailChartContainer, { width: width * 0.9 }]}>
          <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>Heat Content MKCal</Text>
        </View>
        {/* blue text end */}
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>LDO Heat Content MKCal</Text>
          <Text style={styles.sliderBottomText}>{sliderValues.ldoHeatContentMKcal}</Text>
        </View>
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>FO Heat Content MKCal</Text>
          <Text style={styles.sliderBottomText}>{sliderValues.foHeatContentMKCal}</Text>
        </View>
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>Coal Heat Content MKCal</Text>
          <Text style={styles.sliderBottomText}>{sliderValues.coalMKCal}</Text>
        </View>
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>Total Heat Content MKCal</Text>
          <Text style={styles.sliderBottomText}>{sliderValues.TotalMKCal}</Text>
        </View>
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>Coal Consumption MT</Text>
          <Text style={styles.sliderBottomText}>{sliderValues.coalMt}</Text>
        </View>
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>Gen Cost at Gen. Terminal Rs./Kwh</Text>
          <Text style={styles.sliderBottomText}>{sliderValues.genCost}</Text>
        </View>
        {/* slider End */}
      </View>
      {/* main content end */}
    </ScrollView>
  )
}

export default Fuel;