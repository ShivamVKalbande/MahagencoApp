import { View, Text, Modal, Pressable, Dimensions } from 'react-native';
import React from 'react';
import styles from '../css/style';
import { colors } from '@/constant/color';
import { useAuth } from '../store/authStore';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get("window");

interface logoutProp {
  modalVisible: boolean;
  setModalVisible: (param: boolean) => void;
}

const LogoutModal:React.FC<logoutProp> = ({ modalVisible, setModalVisible }) => {
  const logout = useAuth((state) => state.logout);
  const navigation = useNavigation<any>();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Are you sure you want to logout?</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
            
            {/* No Button */}
            <Pressable 
              onPress={() => setModalVisible(false)}
              style={[styles.plantButton, { paddingHorizontal: 15, marginHorizontal: 5 }]}
            >
              <Text style={[styles.smallLabel, { color: colors.white }]}>No</Text>
            </Pressable>

            {/* Yes Button */}
            <Pressable 
              onPress={async () => {
                setModalVisible(false);
                await logout(); 
                navigation.navigate('screen/home'); 
              }}
              style={[styles.plantButton, { paddingHorizontal: 15, marginHorizontal: 5 }]}
            >
              <Text style={[styles.smallLabel, { color: colors.white }]}>Yes</Text>
            </Pressable>

          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
