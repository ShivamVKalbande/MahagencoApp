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
import React, { useEffect, useState } from 'react';
import { colors } from '../../constant/color';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import image from '@/constant/image';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/login';
import { useAuth } from '../store/authStore';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const setId = useAuth((s) => s.setId);
  const status = useAuth((s) => s.status);
  const setStatus = useAuth((s) => s.setStatus);

  const postLoginMutation = useMutation({
    mutationFn: () => login(email.trim(), password.trim(), status),
    onSuccess: (data) => {
      if (data) {
        const success = data.success;
        const actualOtp = data.otp;
        if (success) {
          setId(data.id);
          setStatus('no');
          if (actualOtp) {
            navigation.navigate('screen/otp', { actualOtp: actualOtp });
          } else {
            navigation.navigate('index');
          }
          
        } else {
          setErrorMessage('Invalid User ID or Password');
        }
      } else {
        setErrorMessage('Invalid User ID or Password');
      }
    },
  });

  const handleLogin = () => {
    postLoginMutation.mutate();
  };

  // const date = Date();
  // console.log("current date",date);

  // const [sample, setsample] = useState(2008-09-22 15:24:13.790);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.formContainer}>
        <Image
          source={image.logo}
          style={styles.bannerImage}
        />
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={'user'} size={25} color={colors.secondary} />
          <TextInput
            style={styles.TextInput}
            placeholder="Enter User ID"
            placeholderTextColor={colors.secondary}
            keyboardType="number-pad"
            value={email}
            onChangeText={text => {
              setEmail(text);
              // console.log('Email:', text); // Log the email input
            }}
          />
          {/* <Text>{ finalDate }</Text> */}
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={'lock'} size={29} color={colors.secondary} />
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={text => {
              setPassword(text);
              // console.log('Password:', text); // Log the password input
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry(prev => !prev);
            }}>
            <Ionicons
              name={secureEntry ? 'eye-off' : 'eye'}
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
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
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgetPasswordText}>Forget User ID/Password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
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
    borderWidth: 1,
    borderColor: colors.skyblue,
    alignItems: 'center',
    width: '80%',
    padding: 10,
    borderRadius: 10,
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