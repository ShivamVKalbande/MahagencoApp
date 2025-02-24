import { View, Text, ScrollView, Dimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import styles from '../css/style';
import Dropdown from '../components/Dropdown';
import ScreenCard from '../components/ScreenCard';
import { colors } from '@/constant/color';

const { width } = Dimensions.get('window');
const FinancePlant = () => {
    const [plant, setPlant] = useState([{ label: "MAHAGENCO", value: "" }]);
    const [selectedItem, setSelectedItem] = useState(plant[0]);
    const duration = [
        { label: "Year", value: "year" },
        { label: "Month", value: "month" },
        { label: "Day", value: "day" },
    ]
    const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);
    const [totalGeneration, setTotalGeneration] = useState(901776516540);
    const [totalGainLoss, setTotalGainLoss] = useState(1031314674980);


    const fundTable = [
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
        { center: "T1010HOU05", allocated: 0.0, consumed: 0.0, available: 0.0 },
    ];
    return (
        <View style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* main content start */}
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
                    title="FY 2024-2025"
                    subTitle="Budget Allocate"
                    value={totalGeneration}
                    progress={0.6}
                    current={totalGainLoss}
                    unit="Rs"
                    meter="Rs"
                    secondTitle="Budget Allocate"
                    innerStroke={colors.red}
                    circleHeading="Budget Consumed"
                />
                {/* card end */}
                {/* Plants header text start */}
                <View style={styles.plantHeaderContainer}>
                    <Text style={styles.departmentHeading}>Fund Center :</Text>
                    <Text>Budget For Year 2024-2025</Text>
                </View>
                {/* Plants header text End */}
                {/* Table start */}
                <View style={styles.tableContainer}>
                    {/* table Headeing start */}
                    <View style={styles.tableHeader}>
                        <View style={{ width: width * 0.3 }}><Text style={styles.tableHeadText}>CENTER</Text></View>
                        <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText} >ALLOCATED</Text></View>
                        <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>CONSUMED</Text></View>
                        <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>AVAILABLE</Text></View>
                    </View>
                    {/* table Headeing end */}
                    {/* Table Data Start */}
                    {
                        <FlatList
                            data={fundTable}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.tableData}>
                                    <View style={{ width: width * 0.3 }}>
                                        <Text style={[styles.tableText, { fontWeight: 'bold' }]}>{item.center}</Text>
                                    </View>
                                    <View style={{ width: width * 0.2 }}>
                                        <Text style={styles.tableText}>{item.allocated}</Text>
                                    </View>
                                    <View style={{ width: width * 0.2 }}>
                                        <Text style={styles.tableText}>{item.consumed}</Text>
                                    </View>
                                    <View style={{ width: width * 0.2 }}>
                                        <Text style={styles.tableText}>{item.available}</Text>
                                    </View>
                                </View>
                            )}
                            />
                    }
                    {/* Table Data End */}
                </View>
                {/* Table end */}
            </View>
        </View>
    )
}

export default FinancePlant 