import { StyleSheet, Text, View, BackHandler,  ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useCallback } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const SuccessPaymentScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`successPaymentScreen:${key}`)
    }

    const backAction = () => {
        navigation.push('(tabs)');
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

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                {welcomeText()}
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: Sizes.fixPadding, justifyContent: 'center' }}>
                    {paymentInfo()}
                </ScrollView>
                {backToHameButton()}
            </View>
        </View>
    )

    function backToHameButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push('(tabs)')}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('backToHome')}
                </Text>
            </TouchableOpacity>
        )
    }

    function paymentInfo() {
        return (
            <View style={{ alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Image
                    source={require('../../assets/images/icons/success.png')}
                    style={{ width: width / 3.0, height: width / 3.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginVertical: Sizes.fixPadding, ...Fonts.blackColor20SemiBold }}>
                    {tr('confirmation')}
                </Text>
                <Text style={{ textAlign: 'center', ...Fonts.grayColor14SemiBold }}>
                    {tr('confirmationDetail')}
                </Text>
                {scheduleAndSubscriptionInfo()}
            </View>
        )
    }

    function scheduleAndSubscriptionInfo() {
        return (
            <View style={{
                ...styles.scheduleAndSubscriptionInfoWrapStyle,
                borderLeftWidth: isRtl ? 1.0 : 0.0,
                borderRightWidth: isRtl ? 0.0 : 1.0,
                flexDirection: isRtl ? 'row-reverse' : 'row',
            }}>
                <View style={styles.scheduleAndSubscriptionDividerStyle} />
                <View style={{ flex: 1, margin: Sizes.fixPadding, alignItems: isRtl ? "flex-end" : 'flex-start' }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Train with jems
                    </Text>
                    {dateAndTimeInfo()}
                    {subscriptionInfo()}
                </View>
            </View>
        )
    }

    function subscriptionInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    {tr('subscription')}
                </Text>
                <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                    24session
                </Text>
            </View>
        )
    }

    function dateAndTimeInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 5.0 }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', ...Fonts.blackColor14SemiBold }}>
                    {tr('dateAndTimeTitle')}
                </Text>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', ...Fonts.primaryColor14SemiBold }}>
                    9.00 to 10.00 AM Thursday, 15 july 2021
                </Text>
            </View>
        )
    }

    function welcomeText() {
        return (
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                {tr('welcomeText')}
            </Text>
        )
    }
}

export default SuccessPaymentScreen;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        margin: Sizes.fixPadding * 2.0
    },
    scheduleAndSubscriptionInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 0.50,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        marginTop: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        overflow: 'hidden'
    },
    scheduleAndSubscriptionDividerStyle: {
        top: -1.0,
        backgroundColor: Colors.primaryColor,
        width: 10.0,
        height: '102%'
    }
})