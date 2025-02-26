import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../css/style'
import { colors } from '@/constant/color'
import { useMutation } from '@tanstack/react-query'
import { fuelCombination } from '../api/fuel'

const { width } = Dimensions.get('window');

const FuelCombination = () => {
    const [domestic, setDomestic] = useState('');
    const [rate, setRate] = useState('');
    const [gcv, setGcv] = useState('');
    const [combinationButton, setCombinationButton] = useState(false);
    const [combination, setCombination] = useState([]);
    const [error, setError] = useState('');


    // Get table data 
    const postTableMutation = useMutation({
        mutationFn: () => fuelCombination(domestic, rate, gcv),
        onSuccess: (data) => {
            if (data.bestCombinations && Array.isArray(data.bestCombinations)) {
                setCombination(data.bestCombinations);
                setError(''); // Clear any previous errors
            } 
        },
        onError: (error) => {
            setError(error?.message || "An unexpected error occurred.");
        }
    });

    useEffect(() => {
        if (combinationButton) {
            postTableMutation.mutate();
            setCombinationButton(false);
        }
    }, [combinationButton]);

    return (
        <View style={styles.container}>
            {/* Main content start */}
            <View style={styles.mainContainer}>
                {/* INPUT CONTAINER START */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="DomesticMT"
                            placeholderTextColor={colors.secondary}
                            keyboardType="numeric"
                            value={domestic}
                            onChangeText={text => setDomestic(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Rate"
                            placeholderTextColor={colors.secondary}
                            keyboardType="numeric"
                            value={rate}
                            onChangeText={text => setRate(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="GCV"
                            placeholderTextColor={colors.secondary}
                            keyboardType="numeric"
                            value={gcv}
                            onChangeText={text => setGcv(text)}
                        />
                    </View>
                </View>
                {/* INPUT CONTAINER END */}

                {/* Button Start */}
                <TouchableOpacity
                    onPress={() => setCombinationButton(true)}
                    style={[styles.plantButton, { paddingHorizontal: 15, margin: 10 }]}
                >
                    <Text style={[styles.smallLabel, { color: colors.white }]}>Combination</Text>
                </TouchableOpacity>
                {/* Button End */}

                {/* Table start */}
                <View style={styles.tableContainer}>
                    {postTableMutation.isPending ? (
                        <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
                    ) : combination.length === 0 ? (
                        <Text style={{ textAlign: 'center', padding: 10 }}>No Combination Data Available</Text>
                    ) : error ? (
                        <Text style={{ textAlign: 'center', padding: 10 }}>{error}</Text>
                    ) : (
                        <FlatList
                            data={combination}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.combinationContainer}>
                                    <View style={styles.tableHeader}>
                                        <View style={{ width: width * 0.3 }}><Text style={styles.tableHeadText}>Colliery</Text></View>
                                        <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>Rate</Text></View>
                                        <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>Quantity</Text></View>
                                        <View style={{ width: width * 0.2 }}><Text style={styles.tableHeadText}>GCV</Text></View>
                                    </View>
                                    {/* Nested FlatList for Combination */}
                                    <FlatList
                                        data={item.Combination}
                                        keyExtractor={(subItem, subIndex) => subIndex.toString()}
                                        scrollEnabled={false} // Important to prevent nested scrolling issues
                                        renderItem={({ item: subItem }) => (
                                            <View style={styles.tableData}>
                                                <View style={{ width: width * 0.3 }}>
                                                    <Text style={styles.tableText}>{subItem.Colliery}</Text>
                                                </View>
                                                <View style={{ width: width * 0.2 }}>
                                                    <Text style={styles.tableText}>{subItem.Rate}</Text>
                                                </View>
                                                <View style={{ width: width * 0.2 }}>
                                                    <Text style={styles.tableText}>{subItem.Quantity}</Text>
                                                </View>
                                                <View style={{ width: width * 0.2 }}>
                                                    <Text style={styles.tableText}>{subItem.GCV}</Text>
                                                </View>
                                            </View>
                                        )}
                                    />
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Total Quantity : </Text>
                                        <Text style={{ color: colors.skyblue }}>{item.TotalQuantity}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text >Weighted Avg Rate : </Text>
                                        <Text style={{ color: colors.skyblue }}>{item.WeightedAverageRate}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Weighted Avg GCV : </Text>
                                        <Text style={{ color: colors.skyblue }}>{item.WeightedAverageGCV}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                </View>
                {/* Table End */}
            </View>
        </View>
    );
};

export default FuelCombination;
