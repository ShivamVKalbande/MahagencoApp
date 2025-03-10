import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '../css/style';

interface DropdownProps {
  name: string;
  data: { label: string; value: any }[];
  selectedItem: { label: string; value: any };
  setSelectedItem: (item: { label: string; value: any }) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ name, data, selectedItem, setSelectedItem }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);


  return (
    <View style={styles.dropeDownContainer}>
      <View style={styles.dropdownBox}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setSearchQuery('');
            setModalVisible(true);
          }}
        >
          <Text style={styles.selectedText}>{selectedItem.label}</Text>
          <AntDesign name="down" size={20} color="black" />
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

export default Dropdown;
