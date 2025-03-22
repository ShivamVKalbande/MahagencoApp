import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import styles from '../css/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constant/color';

interface CustomFuelSimulationProps {
    name: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

const { width, height } = Dimensions.get('window');
const CustomFuelSimulation: React.FC<CustomFuelSimulationProps> = ({ name, value, setValue }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const [keyboardvalue, setKeyboardValue] = useState(value);

    const handleChange = (text: string) => {
        const numericValue = parseFloat(text) || 0.0;
        setKeyboardValue(numericValue); // Update the local state for TextInput
        setValue(numericValue); // Pass the new value to the parent
    };

    return (
        <View style={[styles.dropeDownContainer, { borderBottomWidth: 0, }]}>
            <View style={styles.dropdownBox}>
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(true);
                    }}
                    style={[{ left: width * 0.01, top: width * 0.02, }]}
                >
                    <MaterialCommunityIcons
                        name={'pencil'}
                        size={25}
                        color={colors.gray}
                    />
                </TouchableOpacity>
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    backdropOpacity={0.3}
                    style={styles.modal}
                >
                    <View style={[styles.modalContent, { height: '22%', }]}>
                        <View style={styles.dropdownTitle}>
                            <Text style={styles.dropdownTitleText}>{name}</Text>
                        </View>
                        <View style={[styles.itemContainer, { flex: 1 }]}>
                            <View style={[styles.inputContainer, { width: width * 0.9 }]}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder='Enter value'
                                    placeholderTextColor={colors.secondary}
                                    keyboardType="decimal-pad"
                                    value={keyboardvalue}
                                    onChangeText={handleChange} // Update the state on text change
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={[styles.plantButton, { left: width * 0, paddingHorizontal: 15, backgroundColor: colors.lightblue, height: width * 0.1, }]}
                            >
                                <Text style={[
                                    { color: colors.white }]}
                                >Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default CustomFuelSimulation;
