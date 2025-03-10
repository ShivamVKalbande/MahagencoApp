import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '../css/style';

const { height, width } = Dimensions.get('window');

interface hrProp {
  name: string;
  data:{label: string; value: any}[];
  selectedItem: string;
  setSelectedItem: (item: {label: string; value: any}) => void;
}

const HrDropdown: React.FC<hrProp> = ({ name, data, selectedItem, setSelectedItem }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);


  return (
    <View style={[styles.dropeDownContainer, { width: width * 0.25, margin: 1,  borderBottomWidth: 0, }]}>
      <View style={[styles.dropdownBox, { width: width * 0.25, top: 0, }]}>
        <TouchableOpacity
          style={[styles.dropdown, { width: width * 0.25 }]}
          onPress={() => {
            setSearchQuery('');
            setModalVisible(true);
          }}
        >
          <Text style={[styles.selectedText, {
            fontSize: 12,
            textAlign: "center",
            justifyContent: 'center'
          }]}>{selectedItem}</Text>
          <AntDesign name="down" size={15} color="black" />
        </TouchableOpacity>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          backdropOpacity={0.3}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={styles.dropdownTitle}>
              <Text style={styles.dropdownTitleText}>{name}</Text>
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View style={styles.itemContainer}>
              <FlatList
                data={filteredData}
                // keyExtractor={item => item.value}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      setSelectedItem(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default HrDropdown;
