import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import styles from '../css/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constant/color';

interface CustomSimulationProps {
    name: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

const { width, height } = Dimensions.get('window');
const CustomSimulation: React.FC<CustomSimulationProps> = ({ name, value, setValue }) => {
    const [isModalVisible, setModalVisible] = useState(false);



    return (
        <View style={[styles.dropeDownContainer, { borderBottomWidth: 0, }]}>
            <View style={styles.dropdownBox}>
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(true);
                    }}
                    style={styles.pencilContainer}
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
                                    style={[styles.TextInput]}
                                    placeholder='Enter value'
                                    placeholderTextColor={colors.secondary}
                                    keyboardType="numeric"
                                    value={value.toString()}
                                    onChangeText={text => setValue(Number(text) || 0)}
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

export default CustomSimulation;
