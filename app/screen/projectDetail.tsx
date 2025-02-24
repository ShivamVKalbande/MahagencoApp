import { View, Text, ScrollView, Dimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import styles from '../css/style';
import Dropdown from '../components/Dropdown';
import ScreenCard from '../components/ScreenCard';
import { colors } from '@/constant/color';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ProjectDetail = () => {

    const route = useRoute();
    const { projectNumber } = route.params || {};
    const { projectName } = route.params || {};

    const [plant, setPlant] = useState([{ label: "MAHAGENCO", value: "" }]);
    const [selectedItem, setSelectedItem] = useState(plant[0]);
    const duration = [
        { label: "Year", value: "year" },
        { label: "Month", value: "month" },
        { label: "Day", value: "day" },
    ]
    const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);
    const [totalGeneration, setTotalGeneration] = useState(projectNumber);
    const [totalGainLoss, setTotalGainLoss] = useState(1031314674980);


    const ProjectTable = [
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
        { project: "T1010HOU05", capacity: 0.0, cost: 0.0, compilations: 0.0 },
    ];
    return (
        <View style={styles.container}
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
                    title="Year 2025"
                    subTitle="Total Cost"
                    value={totalGeneration}
                    progress={0.6}
                    current={totalGainLoss}
                    unit=""
                    meter=""
                    secondTitle="Total Capacity"
                    innerStroke={colors.green}
                    circleHeading="No. of Projects"
                />
                {/* card end */}
                {/* Plants header text start */}
                <View style={styles.plantHeaderContainer}>
                    <Text style={styles.departmentHeading}>{projectName} :</Text>
                </View>
                {/* Plants header text End */}
                {/* Table start */}
                <View style={styles.tableContainer}>
                    {/* table Headeing start */}
                    <View style={styles.tableHeader}>
                        <View style={{ width: width * 0.225 }}><Text style={styles.tableHeadText}>PROJECT</Text></View>
                        <View style={{ width: width * 0.225 }}><Text style={styles.tableHeadText} >CAPACITY</Text></View>
                        <View style={{ width: width * 0.225 }}><Text style={styles.tableHeadText}>COST</Text></View>
                        <View style={{ width: width * 0.225 }}><Text style={styles.tableHeadText}>COMPILATIONS</Text></View>
                    </View>
                    {/* table Headeing end */}
                    {/* Table Data Start */}
                    {
                        <FlatList
                            data={ProjectTable}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.tableData}>
                                    <View style={{ width: width * 0.225 }}>
                                        <Text style={[styles.tableText, { fontWeight: 'bold', color: colors.skyblue }]}>{item.project}</Text>
                                    </View>
                                    <View style={{ width: width * 0.225 }}>
                                        <Text style={styles.tableText}>{item.capacity}</Text>
                                    </View>
                                    <View style={{ width: width * 0.225 }}>
                                        <Text style={styles.tableText}>{item.cost}</Text>
                                    </View>
                                    <View style={{ width: width * 0.225 }}>
                                        <Text style={styles.tableText}>{item.compilations}</Text>
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

export default ProjectDetail; 