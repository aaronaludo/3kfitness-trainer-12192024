import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from 'react-native'
import React, { useState } from 'react'
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { OtpInput } from 'react-native-otp-entry';
import MyStatusBar from '../../components/myStatusBar';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const OtpVerificationScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`otpVerificationScreen:${key}`)
    }

    const { from } = useLocalSearchParams();

    const [otpInput, setotpInput] = useState('');
    const [isLoading, setisLoading] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {header()}
                    {description()}
                    {codeInfo()}
                    {verifyButton()}
                    {resendText()}
                </ScrollView>
            </View>
            {loadingDialog()}
        </View>
    )

    function loadingDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isLoading}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                        >
                            <View style={styles.dialogStyle}>
                                <ActivityIndicator
                                    size={40}
                                    color={Colors.primaryColor}
                                    style={{ transform: [{ scale: Platform.OS == 'ios' ? 1.5 : 1 }] }}
                                />
                                <Text style={{ textAlign: 'center', ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding + 5.0 }}>
                                    {tr('wait')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function resendText() {
        return (
            <Text style={{ textAlign: 'center', ...Fonts.primaryColor16SemiBold }}>
                {tr('resend')}
            </Text>
        )
    }

    function codeInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 3.0 }}>
                <OtpInput
                    numberOfDigits={4}
                    focusColor={Colors.primaryColor}
                    onTextChange={text => {
                        if (text.length == 4) {
                            setotpInput(text);
                            setisLoading(true)
                            setTimeout(() => {
                                setisLoading(false)
                                if (from == 'forgotPassword') {
                                    navigation.push('auth/newPasswordScreen')
                                }
                                else {
                                    navigation.push('genderSelection/genderSelectionScreen')
                                }
                            }, 2000);
                        }
                    }}
                    theme={{
                        inputsContainerStyle: { justifyContent: 'center' },
                        pinCodeContainerStyle: { ...styles.textFieldStyle },
                        pinCodeTextStyle: { ...Fonts.primaryColor18SemiBold },
                    }}
                />
            </View>
        )
    }

    function verifyButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    setisLoading(true)
                    setTimeout(() => {
                        setisLoading(false)
                        if (from == 'forgotPassword') {
                            navigation.push('auth/newPasswordScreen')
                        }
                        else {
                            navigation.push('genderSelection/genderSelectionScreen')
                        }
                    }, 2000);
                }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('verify')}
                </Text>
            </TouchableOpacity>
        )
    }

    function description() {
        return (
            <Text style={styles.descriptionTextStyle}>
                {from == 'forgotPassword'
                    ?
                    tr('description1')
                    :
                    `${tr('description2')} +9188******10`
                }
            </Text>
        )
    }

    function header() {
        return (
            <Text style={{ textAlign: 'center', ...Fonts.blackColor24SemiBold }}>
                {tr('header')}
            </Text>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name={isRtl ? "arrow-forward" : "arrow-back"}
                size={24}
                color={Colors.blackColor}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: isRtl ? 'flex-end' : 'flex-start' }}
            />
        )
    }
}

export default OtpVerificationScreen;

const styles = StyleSheet.create({
    textFieldStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        ...CommonStyles.shadow,
        marginHorizontal: Sizes.fixPadding - 3.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    descriptionTextStyle: {
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 4.0,
        textAlign: 'center',
        ...Fonts.grayColor14Regular
    },
    dialogStyle: {
        alignSelf: 'center',
        width: '80%',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding * 2.0,
    }
})