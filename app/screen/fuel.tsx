import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import Dropdown from '../components/Dropdown'
import { colors } from '@/constant/color';
import styles from '../css/style';
import Slider from '@react-native-community/slider';
import FuelSlider from '../components/fuelSlider';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');
const Fuel = () => {
   const navigation = useNavigation();
  const [plant, setPlant] = useState([{ label: "MAHAGENCO", value: "mahagenco" }]);
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
  const [unit, setUnit] = useState([{ label: "Unit", value: "" }]);
  const [selectedTariff, setSelectedTariff] = useState(tariff[0]);
  const [selectedUnit, setSelectedUnit] = useState(unit[0]);


  // slider data start
  const [sliderValues, setSliderValues] = useState({
    gross: 0,
    apc: 0,
    soc: 0,
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
  });



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
            <Text style={styles.sliderBottomText}>0.0</Text>
          </View>
          <View>
            <Text style={styles.sliderBottomText}>Net Generation MU</Text>
            <Text style={styles.sliderBottomText}>0.0</Text>
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
          <Text style={styles.sliderBottomText}>0.0</Text>
        </View>
        {/* slider Buttom Container start */}
        <View style={styles.sliderBottomContainer}>
          <View>
            <Text style={styles.sliderBottomText}>Coal Factor Kg/Kwh</Text>
          </View>
          <View>
            <Text style={styles.sliderBottomText}>0.707</Text>
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
          <Text style={styles.sliderBottomText}>0.00</Text>
        </View>
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>FO Heat Content MKCal</Text>
          <Text style={styles.sliderBottomText}>0.00</Text>
        </View>
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>Coal Heat Content MKCal</Text>
          <Text style={styles.sliderBottomText}>0.00</Text>
        </View>
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>Total Heat Content MKCal</Text>
          <Text style={styles.sliderBottomText}>0.00</Text>
        </View>
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>Coal Consumption MT</Text>
          <Text style={styles.sliderBottomText}>0.00</Text>
        </View>
        <View style={styles.smallSliderBottomContainer}>
          <Text style={styles.sliderBottomText}>Gen Cost at Gen. Terminal Rs./Kwh</Text>
          <Text style={styles.sliderBottomText}>0.00</Text>
        </View>
        {/* slider End */}
      </View>
      {/* main content end */}
    </ScrollView>
  )
}

export default Fuel;