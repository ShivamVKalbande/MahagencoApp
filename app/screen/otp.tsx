import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    StyleSheet,
    SafeAreaView,
    StatusBar,
  } from 'react-native';
  import React, { useState } from 'react';
  import { colors } from '../../constant/color';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import image from '@/constant/image';
  
  const OtpScreen = () => {
    const route = useRoute();
    const { actualOtp } = route.params || {};
    
    const navigation = useNavigation();
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleLogin = () => {
        if(actualOtp == otp){
          navigation.navigate('index');
        } else {
            setErrorMessage('Invalid OTP');
        }
      };
    return (
      <SafeAreaView  style={styles.container}>   
      <StatusBar barStyle="dark-content" />
        <View style={styles.formContainer}>
        <Image
          source={image.logo}
          style={styles.bannerImage}
        />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter OTP"
              placeholderTextColor={colors.secondary}
              // keyboardType="email-address"
              value={otp}
              onChangeText={text => {
                setOtp(text);
              }}
            />
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
  
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.loginButtonWrapper,
                { backgroundColor: colors.skyblue },
              ]}
              onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default OtpScreen;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bannerImage: {
      height: 90,
      width: 150,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 20,
      width: '80%',
      height: 60,
      borderRadius: 100,
    },
    loginButtonWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderRadius: 98,
      borderColor: colors.white,
    },
    loginButtonText: {
      color: colors.white,
      fontSize: 18,
    },
    formContainer: {
      marginTop: 20,
      borderWidth:1,
      borderColor: colors.skyblue,
      alignItems:'center',
      width:'80%',
      padding:10,
      borderRadius:10,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: colors.secondary,
      borderRadius: 100,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 2,
      marginVertical: 10,
    },
    TextInput: {
      flex: 1,
      paddingHorizontal: 10,
    },
    forgetPasswordText: {
      textAlign: 'right',
      color: colors.primary,
      marginVertical: 10,
    },
    errorText: {
      color: 'red',
    },
  });