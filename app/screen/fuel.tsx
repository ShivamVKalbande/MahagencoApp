import { View, Text, ScrollView, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Dropdown from '../components/Dropdown'
import { colors } from '@/constant/color';
import styles from '../css/style';
import FuelSlider from '../components/fuelSlider';
import { useNavigation } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { getPlant, getUnit } from '../api/operation';
import { getFuel, getFuelSimulation } from '../api/fuel';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const Fuel = () => {

  const route = useRoute();
  const { bestQuantity: initialBestQuantity = '', bestRate: initialBestRate = '', bestGCV: initialBestGCV = '', simulationMode : initialSimulationMode = false, buttonColor : initialButtonColor = colors.lightblue } = route.params || {};

  const [bestRate, setBestRate] = useState(initialBestRate || '');
  const [bestQuantity, setBestQuantity] = useState(initialBestQuantity || '');
  const [bestGCV, setBestGCV] = useState(initialBestGCV || '');
  const [simulationMode, setSimulationMode] = useState(initialSimulationMode || false);
  const [SimulationButtonColor, setSimulationButtonColor] = useState(initialButtonColor || colors.lightblue);
  const navigation = useNavigation<any>();
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
  const [simulationButton, setSimulationButton] = useState(simulationMode);
  const [buttonColor, setButtonColor] = useState(SimulationButtonColor);
  // slider data start
  const [sliderValues, setSliderValues] = useState({
    gross: 0,
    minGross: 0,
    maxGross: 100,
    apc: 0,
    minApc: 0,
    maxApc: 100,
    apcPercent: 0,
    netGeneration: 0,
    soc: 0,
    minSoc: 0,
    maxSoc: 100,
    socKwh: 0,
    coalFactor: 0,
    domestic: 0,
    minDomestic: 0,
    maxDomestic: 100,
    wash: 0,
    minWash: 0,
    maxWash: 100,
    import: 0,
    minImport: 0,
    maxImport: 100,
    ldo: 0,
    minLdo: 0,
    maxLdo: 100,
    fo: 0,
    minFo: 0,
    maxFo: 100,
    domesticKcal: 0,
    minDomesticKcal: 0,
    maxDomesticKcal: 100,
    washKcal: 0,
    minWashKcal: 0,
    maxWashKcal: 100,
    importKcal: 0,
    minImportKcal: 0,
    maxImportKcal: 100,
    ldoKcal: 0,
    minLdoKcal: 0,
    maxLdoKcal: 100,
    foKcal: 0,
    minFoKcal: 0,
    maxFoKcal: 100,
    domesticMt: 0,
    minDomesticMt: 0,
    maxDomesticMt: 100,
    washMt: 0,
    minWashMt: 0,
    maxWashMt: 100,
    importMt: 0,
    minImportMt: 0,
    maxImportMt: 100,
    ldoKl: 0,
    minLdoKl: 0,
    maxLdoKl: 100,
    foKl: 0,
    minFoKl: 0,
    maxFoKl: 100,
    other: 0,
    minOther: 0,
    maxOther: 100,
    heatRateKcal: 0,
    ldoHeatContentMKcal: 0,
    foHeatContentMKCal: 0,
    coalMKCal: 0,
    TotalMKCal: 0,
    coalMt: 0,
    totalCost: 0,
    genCost: 0,
    energyKwh: 0,
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
      setSliderValues(prev => ({ ...prev, maxGross: data.Gross_Generation_MU * 2 }));
      setSliderValues(prev => ({ ...prev, minGross: data.Gross_Generation_MU / 2 }));

      setSliderValues(prev => ({ ...prev, apc: data.APC_MU }));
      setSliderValues(prev => ({ ...prev, maxApc: data.APC_MU * 2 }));
      setSliderValues(prev => ({ ...prev, minApc: data.APC_MU / 2 }));

      setSliderValues(prev => ({ ...prev, apcPercent: data.Apc_Percent }));
      setSliderValues(prev => ({ ...prev, netGeneration: data.Net_Generation_MU }));

      setSliderValues(prev => ({ ...prev, soc: data.SOC_KL }));
      setSliderValues(prev => ({ ...prev, maxSoc: data.SOC_KL * 2 }));
      setSliderValues(prev => ({ ...prev, minSoc: data.SOC_KL / 2 }));

      setSliderValues(prev => ({ ...prev, socKwh: data.SOC_ml_Kwh }));
      setSliderValues(prev => ({ ...prev, coalFactor: data.Coal_Factor_Kg_Kwh }));

      setSliderValues(prev => ({ ...prev, domestic: data.Domestic_Rs_MT }));
      setSliderValues(prev => ({ ...prev, maxDomestic: data.Domestic_Rs_MT * 2 }));
      setSliderValues(prev => ({ ...prev, minDomestic: data.Domestic_Rs_MT / 2 }));

      setSliderValues(prev => ({ ...prev, wash: data.Wash_Coal_Rs_MT }));
      setSliderValues(prev => ({ ...prev, maxWash: data.Wash_Coal_Rs_MT * 2 }));
      setSliderValues(prev => ({ ...prev, minWash: data.Wash_Coal_Rs_MT / 2 }));

      setSliderValues(prev => ({ ...prev, import: data.Import_Rs_MT }));
      setSliderValues(prev => ({ ...prev, maxImport: data.Import_Rs_MT * 2 }));
      setSliderValues(prev => ({ ...prev, minImport: data.Import_Rs_MT / 2 }));

      setSliderValues(prev => ({ ...prev, ldo: data.LDO_Rs_KL }));
      setSliderValues(prev => ({ ...prev, maxLdo: data.LDO_Rs_KL * 2 }));
      setSliderValues(prev => ({ ...prev, minLdo: data.LDO_Rs_KL / 2 }));

      setSliderValues(prev => ({ ...prev, fo: data.FO_Rs_KL }));
      setSliderValues(prev => ({ ...prev, maxFo: data.FO_Rs_KL * 2 }));
      setSliderValues(prev => ({ ...prev, minFo: data.FO_Rs_KL / 2 }));

      setSliderValues(prev => ({ ...prev, domesticKcal: data.Domestic_Kcal_Kg }));
      setSliderValues(prev => ({ ...prev, maxDomesticKcal: data.Domestic_Kcal_Kg * 2 }));
      setSliderValues(prev => ({ ...prev, minDomesticKcal: data.Domestic_Kcal_Kg / 2 }));

      setSliderValues(prev => ({ ...prev, washKcal: data.Wash_Coal_Kcal_Kg }));
      setSliderValues(prev => ({ ...prev, maxWashKcal: data.Wash_Coal_Kcal_Kg * 2 }));
      setSliderValues(prev => ({ ...prev, minWashKcal: data.Wash_Coal_Kcal_Kg / 2 }));

      setSliderValues(prev => ({ ...prev, importKcal: data.Imported_Coal_CV }));
      setSliderValues(prev => ({ ...prev, maxImportKcal: data.Imported_Coal_CV * 2 }));
      setSliderValues(prev => ({ ...prev, minImportKcal: data.Imported_Coal_CV / 2 }));

      setSliderValues(prev => ({ ...prev, ldoKcal: data.LDO_Kcal_Kg }));
      setSliderValues(prev => ({ ...prev, maxLdoKcal: data.LDO_Kcal_Kg * 2 }));
      setSliderValues(prev => ({ ...prev, minLdoKcal: data.LDO_Kcal_Kg / 2 }));

      setSliderValues(prev => ({ ...prev, foKcal: data.FO_Kcal_Kg }));
      setSliderValues(prev => ({ ...prev, maxFoKcal: data.FO_Kcal_Kg * 2 }));
      setSliderValues(prev => ({ ...prev, minFoKcal: data.FO_Kcal_Kg / 2 }));

      setSliderValues(prev => ({ ...prev, domesticMt: data.Domestic_MT }));
      setSliderValues(prev => ({ ...prev, maxDomesticMt: data.Domestic_MT * 2 }));
      setSliderValues(prev => ({ ...prev, minDomesticMt: data.Domestic_MT / 2 }));

      setSliderValues(prev => ({ ...prev, washMt: data.Wash_Coal_MT }));
      setSliderValues(prev => ({ ...prev, maxWashMt: data.Wash_Coal_MT * 2 }));
      setSliderValues(prev => ({ ...prev, minWashMt: data.Wash_Coal_MT / 2 }));

      setSliderValues(prev => ({ ...prev, importMt: data.Import_MT }));
      setSliderValues(prev => ({ ...prev, maxImportMt: data.Import_MT * 2 }));
      setSliderValues(prev => ({ ...prev, minImportMt: data.Import_MT / 2 }));

      setSliderValues(prev => ({ ...prev, ldoKl: data.LDO_KL }));
      setSliderValues(prev => ({ ...prev, maxLdoKl: data.LDO_KL * 2 }));
      setSliderValues(prev => ({ ...prev, minLdoKl: data.LDO_KL / 2 }));

      setSliderValues(prev => ({ ...prev, foKl: data.FO_KL }));
      setSliderValues(prev => ({ ...prev, maxFoKl: data.FO_KL * 2 }));
      setSliderValues(prev => ({ ...prev, minFoKl: data.FO_KL / 2 }));

      setSliderValues(prev => ({ ...prev, heatRateKcal: data.Heat_Rate_Kcal_Kwh }));
      setSliderValues(prev => ({ ...prev, ldoHeatContentMKcal: data.LDO_Heat_Content_MKCal }));
      setSliderValues(prev => ({ ...prev, foHeatContentMKCal: data.FO_Heat_Content_MKCal }));
      setSliderValues(prev => ({ ...prev, coalMKCal: data.Coal_Heat_Content_MKCal }));
      setSliderValues(prev => ({ ...prev, TotalMKCal: data.Total_Heat_Content_MKCal }));
      setSliderValues(prev => ({ ...prev, coalMt: data.Coal_Consumption_MT }));
      setSliderValues(prev => ({ ...prev, totalCost: data.Total_Fuel_Cost_Rs_Crore }));
      setSliderValues(prev => ({ ...prev, genCost: data.GenCostat_Gen_Terminal_Rs }));
      setSliderValues(prev => ({ ...prev, other: data.Other_Charges_Adjustment_Rs }));
      setSliderValues(prev => ({ ...prev, maxOther: data.Other_Charges_Adjustment_Rs * 2 }));
      setSliderValues(prev => ({ ...prev, minOther: data.Other_Charges_Adjustment_Rs / 2 }));

      setSliderValues(prev => ({ ...prev, energyKwh: data.Energy_Charges_Rs_Kwh }));
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  useEffect(() => {
    operationMutation.mutate();
  }, [selectedItem?.value, selectedTariff?.value, selectedUnit?.value]);

  // FOR SIMULATION FUEL 
  //get fuel data from api
  const fuelSimulationMutation = useMutation({
    mutationFn: () => getFuelSimulation(
      sliderValues.gross,
      sliderValues.apc,
      sliderValues.ldoKl,
      sliderValues.ldoKcal,
      sliderValues.foKcal,
      sliderValues.foKl,
      // sliderValues.domestic,
      bestRate !== "" ? bestRate : sliderValues.domestic,
      // sliderValues.domesticKcal,
      bestGCV !== "" ? bestGCV : sliderValues.domesticKcal,
      sliderValues.wash, sliderValues.import,
      // sliderValues.domesticMt, 
      bestQuantity !== "" ? bestQuantity : sliderValues.domesticMt,
      sliderValues.washMt, sliderValues.importMt, sliderValues.ldoKl, sliderValues.foKl, selectedUnit?.value, selectedItem?.value, sliderValues.other, sliderValues.soc, sliderValues.importKcal, sliderValues.washKcal),
    onSuccess: (data) => {
      if (!data) {
        console.error("API response is null or undefined");
        return;
      }
      setSliderValues(prev => ({ ...prev, apcPercent: data.APC }));
      setSliderValues(prev => ({ ...prev, netGeneration: data.Net_Generation_MU }));
      setSliderValues(prev => ({ ...prev, ldoHeatContentMKcal: data.LDO_Heat_Content_MKCal }));
      setSliderValues(prev => ({ ...prev, foHeatContentMKCal: data.FO_Heat_Content_MKCal }));
      setSliderValues(prev => ({ ...prev, coalMKCal: data.Coal_Heat_Content_MKCal }));
      setSliderValues(prev => ({ ...prev, TotalMKCal: data.Total_Heat_Content_MKCal }));
      setSliderValues(prev => ({ ...prev, coalMt: data.Coal_Consumption_MT }));
      setSliderValues(prev => ({ ...prev, totalCost: data.Total_Fuel_Cost_Rs_Crore }));
      setSliderValues(prev => ({ ...prev, energyKwh: data.Energy_Charges_Rs_Kwh }));
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  useEffect(() => {
    fuelSimulationMutation.mutate();
  }, [simulationButton]);



  //for tarrif 
  useEffect(() => {
    if (selectedTariff.value === "tariff1" || selectedTariff.value === "tariff2") {
      // setUnit([{ label: "All Unit", value: "" }]);
      setSelectedUnit({ label: "All Unit", value: "" });
      // operationMutation.mutate();
    }
  }, [selectedTariff]);

  useEffect(() => {
    if (selectedUnit?.value !== "") {
      setSelectedTariff({ label: "Select Tariff", value: "" });
      // operationMutation.mutate();
    }
  }, [selectedUnit]);

  const simulationFunction = () => {
    setSimulationButton(true);
    setButtonColor(colors.skyblue)
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      {/* main content start */}
      <View style={styles.mainContainer}>
        {/* Optimization Button Start */}
        <View style={{flexDirection:'row'}}>
        <View style={{padding:10}}>
            <Pressable
              onPress={simulationFunction}
              style={[styles.plantButton, { paddingHorizontal: 15, backgroundColor: buttonColor,}]}
            >
              <Text style={[
                styles.smallLabel,
                { color: colors.white, textAlign: 'center' }]}
              >Simulation</Text>
            </Pressable>
            </View>
          <View 
          pointerEvents={simulationButton ? 'auto' : 'none'}
          style={{ padding:10 }} 
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("screen/fuelCombination", { coalQuantity: sliderValues.domesticMt, coalRate: sliderValues.domestic, coalGcv: sliderValues.domesticKcal })}
              style={[styles.plantButton, { paddingHorizontal: 15, backgroundColor: buttonColor, }]}
            >
              <Text style={[
                styles.smallLabel,
                { color: colors.white, textAlign: 'center' }]}
              >Fuel Optimization</Text>
            </TouchableOpacity>
            </View>
          </View>
        {/* Optimization Button End */}
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
          <View style={{ width: width * 0.24 }}>
            <Text style={{ fontWeight: 'bold' }}>Enery Charges:</Text>
            </View>
            <View style={{ width: width * 0.4 }}>
              <Text style={{ color: colors.skyblue, fontWeight: 'bold', }}>{sliderValues.energyKwh} Rs./Kwh</Text>
            </View>
          </View>

        </View>
        {/* heading end */}
        {/* slider Start */}
        <View style={styles.fuelBoxBorder}>
          <FuelSlider
            energyName="Gross Generation MU"
            sliderValue={sliderValues.gross}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, gross: newValue }))}
            maximumValue={sliderValues.maxGross}
            minimumValue={sliderValues.minGross}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="APC MU"
            sliderValue={sliderValues.apc}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, apc: newValue }))}
            maximumValue={sliderValues.maxApc}
            minimumValue={sliderValues.minApc}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
        </View>
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
        <View style={styles.fuelBoxBorder}>
          <FuelSlider
            energyName="SOC KL"
            sliderValue={sliderValues.soc}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, soc: newValue }))}
            maximumValue={sliderValues.maxSoc}
            minimumValue={sliderValues.minSoc}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          <View style={styles.smallSliderBottomContainer}>
            <Text style={styles.sliderBottomText}>SOC ml/Kwh</Text>
            <Text style={styles.sliderBottomText}>{sliderValues.socKwh}</Text>
          </View>
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
        <View style={styles.fuelBoxBorder}>
          <FuelSlider
            energyName="Domestic Rs/MT"
            sliderValue={sliderValues.domestic}
            // sliderValue={bestRate !== "" ? bestRate : sliderValues.domestic}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, domestic: newValue }))}
            // setSliderValue={bestRate !== "" ? setBestRate : (newValue) => setSliderValues(prev => ({ ...prev, domestic: newValue }))}
            bestCombination={bestRate}
            maximumValue={sliderValues.maxDomestic}
            minimumValue={sliderValues.minDomestic}
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="Wash Coal Rs/MT"
            sliderValue={sliderValues.wash}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, wash: newValue }))}
            maximumValue={sliderValues.maxWash}
            minimumValue={sliderValues.minWash}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="Import Rs/MT"
            sliderValue={sliderValues.import}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, import: newValue }))}
            maximumValue={sliderValues.maxImport}
            minimumValue={sliderValues.minImport}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
        </View>
          {/* blue text start */}
          <View style={[styles.detailChartContainer, { width: width * 0.9 }]}>
            <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>Land Oil Price</Text>
          </View>
          {/* blue text end */}
          <View style={styles.fuelBoxBorder}>
          <FuelSlider
            energyName="LDO Rs/KL"
            sliderValue={sliderValues.ldo}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, ldo: newValue }))}
            maximumValue={sliderValues.maxLdo}
            minimumValue={sliderValues.minLdo}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="FO Rs/KL"
            sliderValue={sliderValues.fo}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, fo: newValue }))}
            maximumValue={sliderValues.maxFo}
            minimumValue={sliderValues.minFo}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          </View>
          {/* blue text start */}
          <View style={[styles.detailChartContainer, { width: width * 0.9 }]}>
            <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>GCV Coal</Text>
          </View>
          {/* blue text end */}
          <View style={styles.fuelBoxBorder}>
          <FuelSlider
            energyName="Domestic Kcal/Kg"
            sliderValue={sliderValues.domesticKcal}
            // sliderValue={bestGCV !== "" ? bestGCV : sliderValues.domesticKcal}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, domesticKcal: newValue }))}
            // setSliderValue={bestGCV !== "" ? setBestGCV : (newValue) => setSliderValues(prev => ({ ...prev, domesticKcal: newValue }))}
            maximumValue={sliderValues.maxDomesticKcal}
            minimumValue={sliderValues.minDomesticKcal}
            bestCombination={bestGCV}
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="Wash Coal Kcal/Kg"
            sliderValue={sliderValues.washKcal}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, washKcal: newValue }))}
            maximumValue={sliderValues.maxWashKcal}
            minimumValue={sliderValues.minWashKcal}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="Import Kcal/Kg"
            sliderValue={sliderValues.importKcal}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, importKcal: newValue }))}
            maximumValue={sliderValues.maxImportKcal}
            minimumValue={sliderValues.minImportKcal}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          </View>
          {/* blue text start */}
          <View style={[styles.detailChartContainer, { width: width * 0.9 }]}>
            <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>GCV - Oil</Text>
          </View>
          {/* blue text end */}
          <View style={styles.fuelBoxBorder}>
          <FuelSlider
            energyName="LDO Kcal/Kg"
            sliderValue={sliderValues.ldoKcal}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, ldoKcal: newValue }))}
            maximumValue={sliderValues.maxLdoKcal}
            minimumValue={sliderValues.minLdoKcal}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="FO Kcal/Kg"
            sliderValue={sliderValues.foKcal}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, foKcal: newValue }))}
            maximumValue={sliderValues.maxFoKcal}
            minimumValue={sliderValues.minFoKcal}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          <View style={styles.smallSliderBottomContainer}>
            <Text style={styles.sliderBottomText}>heat Rate Kcal/Kwh</Text>
            <Text style={styles.sliderBottomText}>0.0</Text>
          </View>
        </View>
          {/* blue text start */}
          <View style={[styles.detailChartContainer, { width: width * 0.9 }]}>
            <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>Consumption</Text>
          </View>
          {/* blue text end */}
          <View style={styles.fuelBoxBorder}>
          <FuelSlider
            energyName="Domestic MT"
            sliderValue={sliderValues.domesticMt}
            // sliderValue={bestQuantity !== "" ? bestQuantity : sliderValues.domesticMt}
            // setSliderValue={bestQuantity !== "" ? setBestQuantity : (newValue) => setSliderValues(prev => ({ ...prev, domesticMt: newValue }))}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, domesticMt: newValue }))}
            maximumValue={sliderValues.maxDomesticMt}
            minimumValue={sliderValues.minDomesticMt}
            bestCombination={bestQuantity}
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="Wash Coal MT"
            sliderValue={sliderValues.washMt}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, washMt: newValue }))}
            maximumValue={sliderValues.maxWashMt}
            minimumValue={sliderValues.minWashMt}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="Import MT"
            sliderValue={sliderValues.importMt}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, importMt: newValue }))}
            maximumValue={sliderValues.maxImportMt}
            minimumValue={sliderValues.minImportMt}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="LDO KL"
            sliderValue={sliderValues.ldoKl}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, ldoKl: newValue }))}
            maximumValue={sliderValues.maxLdoKl}
            minimumValue={sliderValues.minLdoKl}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="FO KL"
            sliderValue={sliderValues.foKl}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, foKl: newValue }))}
            maximumValue={sliderValues.maxFoKl}
            minimumValue={sliderValues.minFoKl}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
          <FuelSlider
            energyName="Other Charges/Adjustment Rs. Cr."
            sliderValue={sliderValues.other}
            setSliderValue={(newValue) => setSliderValues(prev => ({ ...prev, other: newValue }))}
            maximumValue={sliderValues.maxOther}
            minimumValue={sliderValues.minOther}
            bestCombination=''
            fuelSimulation={simulationButton}
          />
        </View>
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