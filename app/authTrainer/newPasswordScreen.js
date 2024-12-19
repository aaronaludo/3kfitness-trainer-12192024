import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const NewPasswordScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`newPasswordScreen:${key}`)
    }

    const [state, setState] = useState({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
    })

    const { password, showPassword, confirmPassword, showConfirmPassword } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {header()}
                    {passwordTextField()}
                    {confirmPasswordTextField()}
                    {submitButton()}
                </ScrollView>
            </View>
        </View>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push('auth/signinScreen')}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('submit')}
                </Text>
            </TouchableOpacity>
        )
    }

    function confirmPasswordTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <TextInput
                    value={confirmPassword}
                    onChangeText={(text) => updateState({ confirmPassword: text })}
                    placeholder={tr('confirmPwd')}
                    style={{
                        ...Fonts.blackColor14Regular,
                        textAlign: isRtl ? 'right' : 'left',
                        flex: 1,
                        marginLeft: isRtl ? Sizes.fixPadding : 0.0
                    }}
                    selectionColor={Colors.primaryColor}
                    placeholderTextColor={'#8D8D8D'}
                    secureTextEntry={!showConfirmPassword}
                    textContentType='oneTimeCode'
                />
                <MaterialCommunityIcons
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={18}
                    color={Colors.grayColor}
                    onPress={() => updateState({ showConfirmPassword: !showConfirmPassword })}
                />
            </View>
        )
    }

    function passwordTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <TextInput
                    value={password}
                    onChangeText={(text) => updateState({ password: text })}
                    placeholder={tr('newPwd')}
                    style={{
                        ...Fonts.blackColor14Regular,
                        textAlign: isRtl ? 'right' : 'left',
                        flex: 1,
                        marginLeft: isRtl ? Sizes.fixPadding : 0.0
                    }}
                    selectionColor={Colors.primaryColor}
                    placeholderTextColor={'#8D8D8D'}
                    secureTextEntry={!showPassword}
                    textContentType='oneTimeCode'
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

    function header() {
        return (
            <Text style={{ textAlign: 'center', ...Fonts.blackColor24SemiBold, marginBottom: Sizes.fixPadding * 5.0 }}>
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

export default NewPasswordScreen;

const styles = StyleSheet.create({
    textFieldWrapStyle: {
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
})