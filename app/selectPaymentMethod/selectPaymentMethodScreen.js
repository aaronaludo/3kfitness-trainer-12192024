import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const SelectPaymentMethodScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`selectPaymentMethodScreen:${key}`)
    }

    const [state, setState] = useState({
        selectedPaymentIndex: 2,
        cardHolderName: 'Jemin patel',
        cardNumber: '1234 5678 9810 1123',
        expireDate: '02/05/2022',
        cvv: '***',
    });

    const { selectedPaymentIndex, cardHolderName, cardNumber, expireDate, cvv } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0 }}
                >
                    {methods()}
                    {cardHolderNameInfo()}
                    {cardNumberInfo()}
                    {dateAndCvvInfo()}
                </ScrollView>
            </View>
            {payNowButton()}
        </View>
    )

    function payNowButton() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.push('successPayment/successPaymentScreen')}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor16Bold }}>
                        {tr('payNow')} ₱999
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }

    function dateAndCvvInfo() {
        return (
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', margin: Sizes.fixPadding * 2.0, }}>
                {expireDateInfo()}
                {cvvInfo()}
            </View>
        )
    }

    function cvvInfo() {
        return (
            <View style={{ flex: 1, marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 3.0, marginRight: isRtl ? Sizes.fixPadding - 3.0 : 0.0 }}>
                <Text numberOfLines={1} style={{ textAlign: isRtl ? 'right' : 'left', ...Fonts.grayColor14Regular }}>
                    {tr('cvvTitle')}
                </Text>
                <TextInput
                    value={cvv}
                    onChangeText={text => updateState({ cvv: text })}
                    style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left' }}
                    activeUnderlineColor={Colors.primaryColor}
                    underlineColor={Colors.grayColor}
                    keyboardType="numeric"
                    maxLength={3}
                />
            </View>
        )
    }

    function expireDateInfo() {
        return (
            <View style={{
                flex: 1,
                marginRight: isRtl ? 0.0 : Sizes.fixPadding - 3.0,
                marginLeft: isRtl ? Sizes.fixPadding - 3.0 : 0.0
            }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', ...Fonts.grayColor14Regular }}>
                    {tr('dateFormate')}
                </Text>
                <TextInput
                    value={expireDate}
                    onChangeText={text => updateState({ expireDate: text })}
                    style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left', }}
                    activeUnderlineColor={Colors.primaryColor}
                    underlineColor={Colors.grayColor}
                    keyboardType="numeric"
                />
            </View>
        )
    }

    function cardNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Regular, textAlign: isRtl ? 'right' : 'left', }}>
                    {tr('cardNumberTitle')}
                </Text>
                <TextInput
                    value={cardNumber}
                    onChangeText={text => updateState({ cardNumber: text })}
                    style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left', }}
                    activeUnderlineColor={Colors.primaryColor}
                    underlineColor={Colors.grayColor}
                    keyboardType="numeric"
                />
            </View>
        )
    }

    function cardHolderNameInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Regular, textAlign: isRtl ? 'right' : 'left', }}>
                    {tr('cardHolderNameTitle')}
                </Text>
                <TextInput
                    value={cardHolderName}
                    onChangeText={text => updateState({ cardHolderName: text })}
                    style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left', }}
                    activeUnderlineColor={Colors.primaryColor}
                    underlineColor={Colors.grayColor}
                />
            </View>
        )
    }

    function methods() {
        return (
            <View style={styles.paymentMethodsWrapStyle}>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    {paymentMethodShort({ icon: require('../../assets/images/icons/card.png'), index: 1, })}
                    {paymentMethodShort({ icon: require('../../assets/images/icons/visa.png'), index: 2 })}
                    {paymentMethodShort({ icon: require('../../assets/images/icons/paytm.png'), index: 3 })}
                    {paymentMethodShort({ icon: require('../../assets/images/icons/paypal.png'), index: 4 })}
                </View>
            </View>
        )
    }

    function paymentMethodShort({ icon, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { updateState({ selectedPaymentIndex: index }) }}
                style={{ flex: 1, alignItems: 'center' }}
            >
                <Image
                    source={icon}
                    style={{ height: 40.0, resizeMode: 'contain' }}
                />
                <View style={styles.paymentMethodDividerStyle} />
                <View style={{ ...styles.checkBoxStyle, borderColor: index == selectedPaymentIndex ? Colors.primaryColor : Colors.grayColor, }}>
                    {
                        index == selectedPaymentIndex
                            ?
                            <View style={styles.selectedCheckBoxStyle} />
                            :
                            null
                    }
                </View>
            </TouchableOpacity >
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name={isRtl ? "arrow-forward" : "arrow-back"}
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    {tr('header')}
                </Text>
            </View>
        )
    }
}

export default SelectPaymentMethodScreen;

const styles = StyleSheet.create({
    checkBoxStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paymentMethodDividerStyle: {
        backgroundColor: Colors.lightGrayColor,
        height: 1.0,
        width: '100%',
        marginVertical: Sizes.fixPadding
    },
    selectedCheckBoxStyle: {
        width: 10.0,
        height: 10.0,
        borderRadius: 5.0,
        backgroundColor: Colors.primaryColor
    },
    paymentMethodsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        ...CommonStyles.shadow,
        borderRadius: Sizes.fixPadding - 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding - 5.0
    },
    textFieldStyle: {
        paddingHorizontal: 0,
        paddingBottom: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        ...Fonts.blackColor16Regular,
        height: 30.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        margin: Sizes.fixPadding * 2.0
    },
})