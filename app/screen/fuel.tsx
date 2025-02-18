import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Dropdown from '../components/Dropdown'
import { colors } from '@/components/color';
import styles from '../css/style';
import Slider from '@react-native-community/slider';
import FuelSlider from '../components/fuelSlider';

const { width } = Dimensions.get('window');
const Fuel = () => {
  const [plant, setPlant] = useState([{ label: "MAHAGENCO", value: "mahagenco" }]);
  const duration = [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Day", value: "day" },
  ]
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
  const [grossSliderValue, setGrossSliderValue] = useState("0");
  const [apcSliderValue, setApcSliderValue] = useState("0");
  const [socSliderValue, setSocSliderValue] = useState("0");
  const [domesticSliderValue, setDomesticSliderValue] = useState("0");
  const [washSliderValue, setWashSliderValue] = useState("0");
  const [importSlidervalue, setImportSliderValue] = useState("0");
  const [ldoSliderValue, setLdoSliderValue] = useState("0");
  const [foSliderValue, setFoSliderValue] = useState("0");
  const [domesticKcalSliderValue, setDomesticKcalSliderValue] = useState("0");
  const [washKcalSliderValue, setWashKcalSliderValue] = useState("0");
  const [importKcalSliderValue, setImportKcalSliderValue] = useState("0");
  const [ldoKcalSliderValue, setLdoKcalSliderValue] = useState("0");
  const [foKcalSliderValue, setFoKcalSliderValue] = useState("0");
  const [domesticMtSliderValue, setDomesticMtSliderValue] = useState("0");
  const [washMtSliderValue, setWashMtSliderValue] = useState("0");
  const [importMtSliderValue, setImportMtSliderValue] = useState("0");
  const [ldoKlSliderValue, setLdoKlSliderValue] = useState("0");
  const [foKlSliderValue, setFoKlSliderValue] = useState("0");
  const [otherSliderValue, setOtherSliderValue] = useState("0");


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
          </View>
        </View>
        {/* heading end */}
        {/* slider Start */}
        <FuelSlider
          energyName="Gross Generation MU"
          sliderValue={grossSliderValue}
          setSliderValue={setGrossSliderValue}
        />
        <FuelSlider
          energyName="APC MU"
          sliderValue={apcSliderValue}
          setSliderValue={setApcSliderValue}
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
        <View style={styles.detailChartContainer}>
          <Text style={{ color: colors.skyblue, fontWeight: 'bold' }}>Land Coal Price</Text>
        </View>
        <FuelSlider
          energyName="SOC KL"
          sliderValue={socSliderValue}
          setSliderValue={setSocSliderValue}
        />

        {/* slider End */}
      </View>
      {/* main content end */}
    </ScrollView>
  )
}

export default Fuel;