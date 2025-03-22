import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../css/style'
import { colors } from '@/constant/color'
import { useMutation } from '@tanstack/react-query'
import { fuelCombination } from '../api/fuel'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from 'expo-router'


const { width } = Dimensions.get('window');

const FuelCombination = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { coalQuantity = '', coalRate = '', coalGcv = '' } = route.params || {};
    // console.log('coal qauntity ', coalQuantity, coalRate, coalGcv);
    const [domestic, setDomestic] = useState(coalQuantity);
    const [rate, setRate] = useState(coalRate);
    const [gcv, setGcv] = useState(coalGcv);



    const [combinationButton, setCombinationButton] = useState(false);
    const [combination, setCombination] = useState([]);
    const [error, setError] = useState('');
    const [suggestion, setSuggestion] = useState('');


    // Get table data 
    const postTableMutation = useMutation({
        mutationFn: () => fuelCombination(domestic, rate, gcv),
        onSuccess: (data) => {
            if (data.bestCombinations && Array.isArray(data.bestCombinations)) {
                setCombination(data.bestCombinations);
                setError('');
                setSuggestion('');
            }
            if (data.message) {
                setSuggestion(data.message);
                setError('');
                setCombination([]);
            }
            if (data.error) {
                setError(data.error);
                setCombination([]);
                setSuggestion('');
            }
        }
    });

    useEffect(() => {
        setDomestic(coalQuantity.toString());
        setRate(coalRate.toString());
        setGcv(coalGcv.toString());
    }, [coalQuantity, coalRate, coalGcv]);

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
                    <View
                        style={styles.fuelTextHeading}
                    >
                        <Text style={[styles.smallLabel, { textAlign: 'center' }]}>DomesticMT</Text>
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
                    </View>
                    <View
                        style={styles.fuelTextHeading}
                    >
                        <Text style={{ textAlign: 'center' }}>Rate</Text>
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
                    </View>
                    <View
                        style={styles.fuelTextHeading}
                    >
                        <Text style={{ textAlign: 'center' }}>GCV</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.TextInput, { paddingHorizontal: 5, }]}
                                placeholder="GCV"
                                placeholderTextColor={colors.secondary}
                                keyboardType="numeric"
                                value={gcv}
                                onChangeText={text => setGcv(text)}
                            />
                        </View>
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
                    ) : error ? (
                        <Text style={{ textAlign: 'center', padding: 10 }}>{error}</Text>
                    ) : suggestion ? (
                        <Text style={{ textAlign: 'center', padding: 10 }}>{suggestion}</Text>
                    ) : (
                        <FlatList
                            data={combination}
                            initialNumToRender={5}
                            windowSize={10}
                            showsVerticalScrollIndicator={false}
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
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 5,
                                        paddingBottom: 5
                                    }}>
                                        <Text>Total Quantity : </Text>
                                        <Text style={{ color: colors.skyblue }}>{item.TotalQuantity.toFixed(2)}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 5,
                                        paddingBottom: 5
                                    }}>
                                        <Text >Weighted Avg Rate : </Text>
                                        <Text style={{ color: colors.skyblue }}>{item.WeightedAverageRate}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 5,
                                        paddingBottom: 5
                                    }}>
                                        <Text>Weighted Avg GCV : </Text>
                                        <Text style={{ color: colors.skyblue }}>{item.WeightedAverageGCV}</Text>
                                        {/* Button Start */}
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("screen/fuel", { bestQuantity: item.TotalQuantity, bestRate: item.WeightedAverageRate, bestGCV: item.WeightedAverageGCV, simulationMode: true, buttonColor: colors.skyblue })}
                                            style={[styles.plantButton, { paddingHorizontal: 15, left: width * 0.3, top: -20, }]}
                                        >
                                            <Text style={[styles.smallLabel, { color: colors.white }]}>Ok</Text>
                                        </TouchableOpacity>
                                        {/* Button End */}
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
