import { StyleSheet, Text, View, ScrollView, BackHandler, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SigninScreen = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`signinScreen:${key}`)
    }

    
    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            };
        }, [backAction])
    );

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');

            if (token && user) {
                navigation.push('(tabs)');
            }
        };

        checkAuth();
    }, []);

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);

    const [state, setState] = useState({
        email: '',
        password: '',
        showPassword: false,
    })

    const { email, password, showPassword } = state;
    console.log(email);

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        try {
            const response = await axios.post('https://3kfitness.web-create.online/api/trainers/login', {
                email,
                password,
            });

            const { token, user } = response.data.response;
            
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            Alert.alert('Success', 'Login successful');

            navigation.push('(tabs)');
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Login failed');
        }
    };

return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {emailIdTextField()}
                    {passwordTextField()}
                    {/* {forgotPasswordText()} */}
                    {signinButton()}
                    {/* {connectWithInfo()} */}
                </ScrollView>
            </View>
            {dontAccountInfo()}
            {exitInfo()}
        </View>
    );

    function exitInfo() {
        return backClickCount === 1 ? (
            <View style={styles.animatedView}>
                <Text style={{ ...Fonts.whiteColor14Medium }}>{tr('exitText')}</Text>
            </View>
        ) : null;
    }

    function dontAccountInfo() {
        return (
            <Text style={styles.dontAccountTextStyle}>
                {tr('dontAccount')} { }
                <Text onPress={() => navigation.push('auth/signupScreen')} style={{ ...Fonts.primaryColor16SemiBold }}>
                    {tr('signup')}
                </Text>
            </Text>
        );
    }

    function connectWithInfo() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.grayColor16Medium }}>{tr('connect')}</Text>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', margin: Sizes.fixPadding * 2.0 }}>
                    {socialMediaOptionShort({ bgColor: '#4267B2', icon: require('../../assets/images/icons/facebook.png') })}
                    {socialMediaOptionShort({ bgColor: Colors.whiteColor, icon: require('../../assets/images/icons/google.png') })}
                </View>
            </View>
        );
    }

    function socialMediaOptionShort({ bgColor, icon }) {
        return (
            <View style={{ ...styles.socialMediaIconWrapStyle, backgroundColor: bgColor }}>
                <Image source={icon} style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }} />
            </View>
        );
    }

    function signinButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleLogin}
                style={{ ...styles.buttonStyle, marginTop: 0}}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>{tr('signin')}</Text>
            </TouchableOpacity>
        );
    }

    function forgotPasswordText() {
        return (
            <Text
                onPress={() => navigation.push('auth/forgotPasswordScreen')}
                style={{
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    ...Fonts.primaryColor14Regular,
                    alignSelf: isRtl ? 'flex-start' : 'flex-end',
                }}
            >
                {tr('forgetPwd')}
            </Text>
        );
    }

    function passwordTextField() {
        return (
            <View style={{
                ...styles.textFieldWrapStyle,
                flexDirection: isRtl ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TextInput
                    value={password}
                    onChangeText={(text) => updateState({ password: text })}
                    placeholder={tr('password')}
                    secureTextEntry={!showPassword}
                    style={{ ...Fonts.blackColor14Regular, flex: 1, textAlign: isRtl ? 'right' : 'left' }}
                />
                <MaterialCommunityIcons
                    name={showPassword ? "eye" : "eye-off"}
                    size={18}
                    color={Colors.grayColor}
                    onPress={() => updateState({ showPassword: !showPassword })}
                />
            </View>
        );
    }

    function emailIdTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={email}
                    onChangeText={(text) => updateState({ email: text })}
                    placeholder={tr('email')}
                    style={{ ...Fonts.blackColor14Regular, textAlign: isRtl ? 'right' : 'left' }}
                    keyboardType="email-address"
                />
            </View>
        );
    }

    function header() {
        return <Text style={styles.headerWrapStyle}>Sign in (Trainer)</Text>;
    }
}

export default SigninScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        marginBottom: Sizes.fixPadding * 3.0,
        marginTop: Sizes.fixPadding * 6.0,
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
        marginBottom: Sizes.fixPadding - 5.0,
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
    dontAccountTextStyle: {
        textAlign: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding+5.0,
        ...Fonts.grayColor16Regular
    },
    animatedView: {
        backgroundColor: Colors.lightBlackColor,
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})