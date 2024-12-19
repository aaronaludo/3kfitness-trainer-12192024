import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {

    const navigation = useNavigation();

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        showPassword: false,
        showPasswordConfirmation: false,
    })

    const { firstName, lastName, address, phoneNumber, email, password, passwordConfirmation, showPassword, showPasswordConfirmation } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please Enter All Fields');
            return;
        }

        try {
            const response = await axios.post('https://3kfitness.web-create.online/api/trainers/register', {
                first_name: firstName,
                last_name: lastName,
                address: address,
                phone_number: phoneNumber,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            });

            const { token, user } = response.data.response;
            
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            Alert.alert('Success', 'Register successful');

            navigation.push('(tabs)');
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Register failed');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {header()}
                    {firstNameTextField()}
                    {lastNameTextField()}
                    {addressTextField()}
                    {phoneNumberTextField()}
                    {emailIdTextField()}
                    {passwordTextField()}
                    {passwordConfirmationTextField()}
                    {signupButton()}
                    {/* {connectWithInfo()} */}
                </ScrollView>
            </View>
            {alreadyAccountInfo()}
        </View>
    )

    function alreadyAccountInfo() {
        return (
            <Text style={styles.alreadyAccountTextStyle}>
                Already have an account? { }
                <Text onPress={() => navigation.push('auth/signinScreen')} style={{ ...Fonts.primaryColor16SemiBold }}>
                    Sign In
                </Text>
            </Text>
        )
    }

    function connectWithInfo() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Connect with
                </Text>
                <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                    {socialMediaOptionShort({ bgColor: '#4267B2', icon: require('../../assets/images/icons/facebook.png') })}
                    {socialMediaOptionShort({ bgColor: Colors.whiteColor, icon: require('../../assets/images/icons/google.png') })}
                </View>
            </View>
        )
    }

    function socialMediaOptionShort({ bgColor, icon }) {
        return (
            <View style={{
                ...styles.socialMediaIconWrapStyle,
                backgroundColor: bgColor,
            }}>
                <Image
                    source={icon}
                    style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                />
            </View>
        )
    }

    function signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                // onPress={() => navigation.push('auth/otpVerification', { from: 'signup' })}
                onPress={handleLogin}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        )
    }

    function passwordTextField() {
        return (
            <View style={{
                ...styles.textFieldWrapStyle,
                ...styles.passwordFieldStyle,
                flexDirection: 'row',
            }}>
                <TextInput
                    value={password}
                    onChangeText={(text) => updateState({ password: text })}
                    placeholder="Password"
                    style={{ ...Fonts.blackColor14Regular, flex: 1 }}
                    selectionColor={Colors.primaryColor}
                    placeholderTextColor={'#8D8D8D'}
                    secureTextEntry={!showPassword}
                />
                <MaterialCommunityIcons
                    name={showPassword ? "eye" : "eye-off"}
                    size={18}
                    color={Colors.grayColor}
                    onPress={() => updateState({ showPassword: !showPassword })}
                />
            </View>
        )
    }

    function passwordConfirmationTextField() {
        return (
            <View style={{
                ...styles.textFieldWrapStyle,
                ...styles.passwordFieldStyle,
                marginTop: 20,
                flexDirection: 'row',
            }}>
                <TextInput
                    value={passwordConfirmation}
                    onChangeText={(text) => updateState({ passwordConfirmation: text })}
                    placeholder="Confirm Password"
                    style={{ ...Fonts.blackColor14Regular, flex: 1 }}
                    selectionColor={Colors.primaryColor}
                    placeholderTextColor={'#8D8D8D'}
                    secureTextEntry={!showPasswordConfirmation}
                />
                <MaterialCommunityIcons
                    name={showPasswordConfirmation ? "eye" : "eye-off"}
                    size={18}
                    color={Colors.grayColor}
                    onPress={() => updateState({ showPasswordConfirmation: !showPasswordConfirmation })}
                />
            </View>
        )
    }

    function phoneNumberTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={phoneNumber}
                    onChangeText={(text) => updateState({ phoneNumber: text })}
                    placeholder="Phone Number"
                    style={{ ...Fonts.blackColor14Regular, textAlign: 'left' }}
                    selectionColor={Colors.primaryColor}
                    keyboardType="phone-pad"
                    placeholderTextColor={'#8D8D8D'}
                />
            </View>
        )
    }

    function emailIdTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={email}
                    onChangeText={(text) => updateState({ email: text })}
                    placeholder="Email"
                    style={{ ...Fonts.blackColor14Regular, textAlign: 'left' }}
                    selectionColor={Colors.primaryColor}
                    keyboardType="email-address"
                    placeholderTextColor={'#8D8D8D'}
                />
            </View>
        )
    }

    function addressTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={address}
                    onChangeText={(text) => updateState({ address: text })}
                    placeholder="Address"
                    style={{ ...Fonts.blackColor14Regular, textAlign: 'left' }}
                    selectionColor={Colors.primaryColor}
                    placeholderTextColor={'#8D8D8D'}
                />
            </View>
        )
    }

    function lastNameTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={lastName}
                    onChangeText={(text) => updateState({ lastName: text })}
                    placeholder="Last Name"
                    style={{ ...Fonts.blackColor14Regular, textAlign: 'left' }}
                    selectionColor={Colors.primaryColor}
                    placeholderTextColor={'#8D8D8D'}
                />
            </View>
        )
    }

    function firstNameTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={firstName}
                    onChangeText={(text) => updateState({ firstName: text })}
                    placeholder="First Name"
                    style={{ ...Fonts.blackColor14Regular, textAlign: 'left' }}
                    selectionColor={Colors.primaryColor}
                    placeholderTextColor={'#8D8D8D'}
                />
            </View>
        )
    }

    function header() {
        return (
            <Text style={styles.headerWrapStyle}>
                Create an Account (Trainer)
            </Text>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color={Colors.blackColor}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'flex-start' }}
                onPress={() => navigation.pop()}
            />
        )
    }
}

export default SignupScreen;

const styles = StyleSheet.create({
    headerWrapStyle: {
        marginBottom: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.blackColor24SemiBold
    },
    textFieldWrapStyle: {
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.5,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    passwordFieldStyle: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 0.0,
    },
    socialMediaIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 5.0,
        elevation: 3.0,
        ...CommonStyles.shadow
    },
    alreadyAccountTextStyle: {
        textAlign: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding + 5.0,
        ...Fonts.grayColor16Regular
    }
})
