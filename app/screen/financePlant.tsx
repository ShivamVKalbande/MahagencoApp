import { View, Text, ScrollView, Dimensions, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../css/style';
import Dropdown from '../components/Dropdown';
import { colors } from '@/constant/color';
import { useRoute } from '@react-navigation/native';
import FinanceCard from '../components/financeCard';
import { useMutation } from '@tanstack/react-query';
import { financeCard, fundTableData } from '../api/finance';

const { width } = Dimensions.get('window');
const FinancePlant = () => {
    const route = useRoute();
    const { plantName } = route.params || {};
    const [plant, setPlant] = useState([{ label: plantName, value: plantName }]);
    const [selectedItem, setSelectedItem] = useState(plant[0]);
    const duration = [
        { label: "Year", value: "year" },
        { label: "Month", value: "month" },
        { label: "Day", value: "day" },
    ]
    const [selectedItemTime, setSelectedItemTime] = useState(duration[0]);
    const [budget, setBudget] = useState("");
    const [consumable, setConsumable] = useState("");
    const [available, setAvailable] = useState("");
    const [fundcenter, setFundcenter] = useState([{ label: "Filter Data", value: "" }]);
    const [selectedItemCenter, setSelectedItemCenter] = useState(fundcenter[0]);
    const [tableResult, setTableResult] = useState("");
    const [fundTable, setFundTable] = useState([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    // get card details 
    const getFinanceCardMutation = useMutation({
        mutationFn: () => financeCard(),
        onSuccess: (data) => {
            setAvailable(data.Available)
            setConsumable(data.Consumable)
            setBudget(data.budget)
        },
    });

    useEffect(() => {
        getFinanceCardMutation.mutate();
    }, []);

    //get table data 
    const postTableMutation = useMutation({
        mutationFn: () => fundTableData(selectedItem.value, selectedItemCenter.value),
        onSuccess: (data) => {
            setTableResult(data.result);
            setFundTable(data.data);
        },
    })

    useEffect(() => {
        postTableMutation.mutate();
    }, [selectedItem, selectedItemCenter]);
    return (
        <View style={styles.container}
        // showsVerticalScrollIndicator={false}
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
                <FinanceCard
                    title="FY 2024-2025"
                    subTitle="Budget Allocate"
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
                    {postTableMutation.isPending ? (
                        <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
                    ) : fundTable.length === 0 ? (
                        <Text style={{ textAlign: 'center', padding: 10 }}>No Bunker Data Available</Text>
                    ) : (
                        <FlatList
                            data={fundTable}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index  }) => (
                                // <TouchableOpacity
                                //     onPress={() => setSelectedRowIndex(index)}
                                //     style={[
                                //         styles.tableData,
                                //         selectedRowIndex === index && { backgroundColor: colors.lightGray } // Change color when selected
                                //     ]}
                                // >
                                    <View style={styles.tableData}>
                                        <View style={{ width: width * 0.3 }}>
                                            <Text style={[styles.tableText, { fontWeight: 'bold' }]}>{item.fund_center}</Text>
                                        </View>
                                        <View style={{ width: width * 0.2 }}>
                                            <Text style={styles.tableText}>{item.Consumable}</Text>
                                        </View>
                                        <View style={{ width: width * 0.2 }}>
                                            <Text style={styles.tableText}>{item.consumed_budget}</Text>
                                        </View>
                                        <View style={{ width: width * 0.2 }}>
                                            <Text style={styles.tableText}>{item.available_amount}</Text>
                                        </View>
                                    </View>
                                // </TouchableOpacity>
                            )}
                        />
                    )}
                    {/* Table Data End */}
                </View>
                {/* Table end */}
            </View>
        </View>
    )
}

export default FinancePlant 