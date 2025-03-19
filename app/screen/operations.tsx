import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import styles from '../css/style'
import Dropdown from '../components/Dropdown';
import { colors } from '@/constant/color';
import SliderBar from '../components/SliderBar';
import ScreenCard from '../components/ScreenCard';
import { getPlant, getUnit, postOperation, postSimulation } from '../api/operation'
import { useMutation } from "@tanstack/react-query";
import CustomSimulation from '../components/customSimulation';

const { width } = Dimensions.get('window');
const Operations = () => {
  const [level, setLevel] = useState("mahagenco");
  const [plant, setPlant] = useState([{ label: "MAHAGENCO", value: "" }]);
  const duration = [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Day", value: "day" },
  ]
  const tariff = [
    { label: "select Tariff", value: "" },
    { label: "Tariff 1", value: "tariff1" },
    { label: "Tariff 2", value: "tariff2" },
  ]
  const [unit, setUnit] = useState([{ label: "Unit", value: "" }]);
  const [selectedItem, setSelectedItem] = useState(plant[0]);
  const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);
  const [selectedTariff, setSelectedTariff] = useState(tariff[0]);
  const [selectedUnit, setSelectedUnit] = useState(unit[0]);

  const [shrValue, setShrValue] = useState<number>(0);
  const [cvValue, setCvValue] = useState<number>(0);
  const [tlValue, setTlValue] = useState<number>(0);

  const [totalGeneration, setTotalGeneration] = useState(0);
  const [loadability, setLoadability] = useState(0);
  const [plf, setPlf] = useState(0);
  const [totalGainLoss, setTotalGainLoss] = useState<number>(0);

  const [APC_gain_loss, setAPC_gain_loss] = useState(0);
  const [APC_current, setAPC_current] = useState(0);
  const [APC_target, setAPC_target] = useState(0);
  const [apcValue, setApcValue] = useState<number>(0);
  useEffect(() => {
    setApcValue(APC_current);
  }, [APC_current])


  const [SOC_gain_loss, setSOC_gain_loss] = useState(0);
  const [SOC_current, setSOC_current] = useState(0);
  const [SOC_target, setSOC_target] = useState(0);
  const [socValue, setSocValue] = useState<number>(0);
  useEffect(() => {
    setSocValue(SOC_current);
  }, [SOC_current]);

  const [AVF_gain_loss, setAVF_gain_loss] = useState(0);
  const [AVF_current, setAVF_current] = useState(0);
  const [AVF_target, setAVF_target] = useState(0);
  const [avfValue, setAvfValue] = useState<number>(0);
  useEffect(() => {
    setAvfValue(AVF_current);
  }, [AVF_current])

  // const [source, setSource] = useState('');
  // const [current, setCurrent] = useState(0);
  const sourceRef = useRef('');
  const currentRef = useRef(0);

  const getPlantMutation = useMutation({
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
    getPlantMutation.mutate(); // Initial fetch for plants
  }, []);

  useEffect(() => {
    if (selectedItem?.value) {
      getUnitMutation.mutate(); // Fetch units when plant changes
    }
  }, [selectedItem?.value]);


  const operationMutation = useMutation({
    mutationFn: () => postOperation(level, selectedItemTime?.value, selectedItem?.value, selectedTariff?.value, selectedUnit?.value),
    onSuccess: (data) => {
      // console.log("Fetched data:", data);
      if (!data) {
        console.error("API response is null or undefined");
        return;
      }

      setTotalGeneration(data.TotalGeneration || 0);
      setLoadability(data.loadability || 0);
      setPlf(data.PLF || 0);
      setTotalGainLoss(data.totalGainLoss || 0);
      setAPC_gain_loss(parseFloat(data.APC_gain_loss || 0));
      setAPC_current(parseFloat(data.APC_current || 0));
      setAPC_target(parseFloat(data.APC_target || 0));
      setSOC_gain_loss(parseFloat(data.SOC_gain_loss || 0));
      setSOC_current(parseFloat(data.SOC_current || 0));
      setSOC_target(parseFloat(data.SOC_target || 0));
      setAVF_gain_loss(parseFloat(data.AVF_gain_loss || 0));
      setAVF_current(parseFloat(data.AVF_current || 0));
      setAVF_target(parseFloat(data.AVF_target || 0));
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  useEffect(() => {
    operationMutation.mutate();
  }, [level, selectedItemTime?.value, selectedItem?.value, selectedTariff?.value, selectedUnit?.value]);

  //for tarrif 
  useEffect(() => {
    if (selectedTariff.value === "tariff1" || selectedTariff.value === "tariff2") {
      // setUnit([{ label: "All Unit", value: "" }]);
      setSelectedUnit({ label: "All Unit", value: "" });
      operationMutation.mutate();
    }
  }, [selectedTariff]);

  useEffect(() => {
    if (selectedUnit?.value !== "") {
      setSelectedTariff({ label: "Select Tariff", value: "" });
      operationMutation.mutate();
    }
  }, [selectedUnit]);

  // gain/loss handle according to the simulation 

// const simulationMutation = useMutation({
//   mutationFn: () =>
//     postSimulation(
//       selectedItemTime?.value,
//       selectedItem?.value,
//       selectedTariff?.value,
//       selectedUnit?.value,
//       source,
//       current
//     ),
//   onSuccess: (data) => {
//     if (!data) {
//       console.error("API response is null or undefined");
//       return;
//     }
//     setTotalGainLoss(parseFloat(data.TotalGeration_Gain_loss));
    
//     if (source === 'avf') setAVF_gain_loss(parseFloat(data.individual_Gain_loss));
//     if (source === 'soc') setSOC_gain_loss(parseFloat(data.individual_Gain_loss));
//     if (source === 'apc') setAPC_gain_loss(parseFloat(data.individual_Gain_loss));
//   },
//   onError: (error) => {
//     console.error("Error: ", error);
//   },
// });


const simulationMutation = useMutation({
  mutationFn: ({ source, current }) =>
    postSimulation(
      selectedItemTime?.value,
      selectedItem?.value,
      selectedTariff?.value,
      selectedUnit?.value,
      source,
      current
    ),
  onSuccess: (data) => {
    if (!data) {
      console.error("API response is null or undefined");
      return;
    }
    setTotalGainLoss(parseFloat(data.TotalGeration_Gain_loss));
    
    if (source === 'avf') setAVF_gain_loss(parseFloat(data.individual_Gain_loss));
    if (source === 'soc') setSOC_gain_loss(parseFloat(data.individual_Gain_loss));
    if (source === 'apc') setAPC_gain_loss(parseFloat(data.individual_Gain_loss));
  },
  onError: (error) => {
    console.error("Error: ", error);
    // console.log("Error details:", JSON.stringify(error, null, 2));
  },
});


useEffect(() => {
  let newSource = '';
  let newCurrent = 0;

  if (avfValue !== AVF_current) {
    newSource = 'avf';
    newCurrent = avfValue;
  } else if (socValue !== SOC_current) {
    newSource = 'soc';
    newCurrent = socValue;
  } else if (apcValue !== APC_current) {
    newSource = 'apc';
    newCurrent = apcValue;
  }

  if (newSource) {
    // setSource(newSource);
    // setCurrent(newCurrent);
    // simulationMutation.mutate();
    sourceRef.current = newSource;
    currentRef.current = newCurrent;
    simulationMutation.mutate({
      source: sourceRef.current,
      current: currentRef.current
    });
  }
}, [avfValue, socValue, apcValue]);


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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
        {/* dropdown end */}
        {/* card start */}
        <ScreenCard
          title="Year 2024-25"
          subTitle="Mahagenco Target"
          value={totalGeneration.toFixed(2)}
          progress={0.6}
          current={totalGainLoss}
          circleHeading="Current Generation"
          unit="MW"
          meter="Gain/Loss"
          secondTitle=""
          innerStroke={colors.green}
        />
        {/* card end */}

        {/* dropdown start */}
        <View style={styles.mainDropeDown}>
          <Dropdown name="Select Tariff" data={Array.isArray(tariff) ? tariff : []} selectedItem={selectedTariff} setSelectedItem={setSelectedTariff} />
          <Dropdown name="Unit" data={Array.isArray(unit) ? unit : []} selectedItem={selectedUnit} setSelectedItem={setSelectedUnit} />
        </View>
        {/* dropdown end */}
        {/* detail chart start */}
        <View style={styles.detailChartContainer}>
          <View style={styles.detailTextContainer}>
            <Text style={styles.departmentHeading}>Detail Chart:</Text>
          </View>
          {/* slider 1 start */}
          <View style={styles.sliderContainer}>
            {/* above Text start */}
            <View style={styles.aboveContainer}>
              <View style={[styles.aboveTextContainer, { width: width * 0.3, }]}>
                <Text style={{ color: colors.skyblue }}>Gen</Text>
              </View>
              <View style={[styles.aboveTextContainer, { width: width * 0.3, }]}>
                <Text style={{ color: colors.skyblue }}>PLF</Text>
              </View>
              <View style={[styles.aboveTextContainer, { width: width * 0.3, alignItems: 'flex-end' }]}>
                <Text style={{ color: colors.skyblue }}>Loadability</Text>
              </View>
            </View>
            {/* above Text end */}
            {/* belove text start */}
            <View style={styles.aboveContainer}>
              <View style={[styles.aboveTextContainer, { width: width * 0.3, }]}>
                <Text style={{ fontSize: 12 }}>Total: {totalGeneration.toFixed(2)}</Text>
              </View>
              <View style={[styles.aboveTextContainer, { width: width * 0.3, }]}>
                <Text style={{ fontSize: 12 }}>Total: {plf}</Text>
              </View>
              <View style={[styles.aboveTextContainer, { width: width * 0.3, alignItems: 'flex-end' }]}>
                <Text style={{ fontSize: 12 }}>Total: {loadability}</Text>
              </View>
            </View>
            {/* belove text end */}
          </View>
          {/* slider 1 end */}
          {/* slider 2 start */}
          <View style={styles.sliderContainer}>
            {/* above Text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ color: colors.skyblue }}>AVF</Text>
              </View>
              <View style={styles.aboveTextContainer2}>
                <Text style={{ fontSize: 12 }}>Target: {AVF_target} | Actual: {AVF_current} | simulation:{avfValue.toFixed(2)}</Text>
              </View>
            </View>
            {/* above Text end */}
            {/* belove text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ fontSize: 12 }}>Gain/Loss {AVF_gain_loss.toFixed(2)}</Text>
              </View>
              <View style={{ width: width * 0.16, }}>
                <SliderBar
                  sliderValue={avfValue} setSliderValue={setAvfValue}
                />
              </View>
              <CustomSimulation
                name='AVF'
                value={avfValue}
                setValue={setAvfValue}
              />
            </View>

            {/* belove text end */}
          </View>
          {/* slider 2 end */}
          {/* slider 3 start */}
          <View style={styles.sliderContainer}>
            {/* above Text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ color: colors.skyblue }}>SOC</Text>
              </View>
              <View style={styles.aboveTextContainer2}>
                <Text style={{ fontSize: 12 }}>Target: {SOC_target}| Actual: {SOC_current} | simulation:{socValue.toFixed(2)}</Text>
              </View>
            </View>
            {/* above Text end */}
            {/* belove text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ fontSize: 12 }}>Gain/Loss {SOC_gain_loss.toFixed(2)}</Text>
              </View>
              <View style={{ width: width * 0.16, }}>
                <SliderBar
                  sliderValue={socValue} setSliderValue={setSocValue}
                />
              </View>
              <CustomSimulation
                name='SOC'
                value={socValue}
                setValue={setSocValue}
              />
            </View>
            {/* belove text end */}
          </View>
          {/* slider 3 end */}
          {/* slider 4 start */}
          <View style={styles.sliderContainer}>
            {/* above Text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ color: colors.skyblue }}>APC</Text>
              </View>
              <View style={styles.aboveTextContainer2}>
                <Text style={{ fontSize: 12 }}>Target: {APC_target}| Actual: {APC_current} | simulation:{apcValue.toFixed(2)}</Text>
              </View>
            </View>
            {/* above Text end */}
            {/* belove text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ fontSize: 12 }}>Gain/Loss {APC_gain_loss.toFixed(2)}</Text>
              </View>
              <View style={{ width: width * 0.16, }}>
                <SliderBar
                  sliderValue={apcValue} setSliderValue={setApcValue}
                />
              </View>
              <CustomSimulation
                name='APC'
                value={apcValue}
                setValue={setApcValue}
              />
            </View>
            {/* belove text end */}
          </View>
          {/* slider 4 end */}
          {/* slider 5 start */}
          <View style={styles.sliderContainer}>
            {/* above Text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ color: colors.skyblue }}>SHR</Text>
              </View>
              <View style={styles.aboveTextContainer2}>
                <Text style={{ fontSize: 12 }}>Target: 45| Actual: 45 | simulation:{shrValue.toFixed(2)}</Text>
              </View>
            </View>
            {/* above Text end */}
            {/* belove text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ fontSize: 12 }}>Gain/Loss 225</Text>
              </View>
              <View style={{ width: width * 0.16, }}>
                <SliderBar
                  sliderValue={shrValue} setSliderValue={setShrValue}
                />
              </View>
              <CustomSimulation
                name='SHR'
                value={shrValue}
                setValue={setShrValue}
              />
            </View>
            {/* belove text end */}
          </View>
          {/* slider 5 end */}
          {/* slider 6 start */}
          <View style={styles.sliderContainer}>
            {/* above Text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ color: colors.skyblue }}>CV-Commercial</Text>
              </View>
              <View style={styles.aboveTextContainer2}>
                <Text style={{ fontSize: 12 }}>Target: 45| Actual: 45| simulation:{cvValue.toFixed(2)}</Text>
              </View>
            </View>
            {/* above Text end */}
            {/* belove text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ fontSize: 12 }}>Gain/Loss 225</Text>
              </View>
              <View style={{ width: width * 0.16, }}>
                <SliderBar
                  sliderValue={cvValue} setSliderValue={setCvValue}
                />
              </View>
              <CustomSimulation
                name='CV-Commercial'
                value={cvValue}
                setValue={setCvValue}
              />
            </View>
            {/* belove text end */}
          </View>
          {/* slider 6 end */}
          {/* slider 7 start */}
          <View style={styles.sliderContainer}>
            {/* above Text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ color: colors.skyblue }}>TL</Text>
              </View>
              <View style={styles.aboveTextContainer2}>
                <Text style={{ fontSize: 12 }}>Target: 45| Actual: 45| simulation:{tlValue.toFixed(2)}</Text>
              </View>
            </View>
            {/* above Text end */}
            {/* belove text start */}
            <View style={styles.aboveContainer}>
              <View style={styles.aboveTextContainer}>
                <Text style={{ fontSize: 12 }}>Gain/Loss 225</Text>
              </View>
              <View style={{ width: width * 0.16, }}>
                <SliderBar
                  sliderValue={tlValue} setSliderValue={setTlValue}
                />
              </View>
              <CustomSimulation
                name='TL'
                value={tlValue}
                setValue={setTlValue}
              />
            </View>
            {/* belove text end */}
          </View>
          {/* slider 7 end */}
        </View>
        {/* detail chart start */}
      </View>
      {/* main container end */}
    </ScrollView>
  );
};
export default Operations;