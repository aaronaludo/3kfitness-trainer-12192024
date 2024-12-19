import { StyleSheet, Text, View, ScrollView, Image, Modal, TouchableOpacity, Dimensions, } from 'react-native'
import React, { useState } from 'react';
import { Fonts, Colors, Sizes, CommonStyles } from '../../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`profileScreen:${key}`)
    }

    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <View style={{ flex: 1, }}>
                {header()}
                <View style={styles.sheetStyle}>
                    {profilePic()}
                    {editProfileButton()}
                    {profileOptions()}
                </View>
            </View>
            {logoutDialog()}
        </View>
    )

    function logoutDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showLogoutDialog}
                onRequestClose={() => { setShowLogoutDialog(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowLogoutDialog(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{
                                backgroundColor: Colors.whiteColor,
                                width: width - 40.0,
                                borderRadius: Sizes.fixPadding - 2.0,
                                alignSelf: 'center'
                            }}
                        >
                            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                                <Text style={{ textAlign: 'center', ...Fonts.blackColor18Medium }}>
                                    {tr('logoutInfo')}
                                </Text>
                                <View style={styles.cancelAndLogoutButtonWrapStyle}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => setShowLogoutDialog(false)}
                                        style={{ ...styles.cancelButtonStyle, ...styles.cancelAndLogoutButtonStyle, }}
                                    >
                                        <Text numberOfLines={1} style={{ marginHorizontal: Sizes.fixPadding - 5.0, ...Fonts.grayColor18SemiBold }}>
                                            {tr('cancel')}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={async () => {
                                            try {
                                                await AsyncStorage.removeItem('token');
                                                await AsyncStorage.removeItem('user');
                                                setShowLogoutDialog(false);
                                                navigation.push('auth/signinScreen');
                                            } catch (error) {
                                                console.error('Error clearing storage:', error);
                                            }
                                        }}
                                        style={{
                                            ...styles.logoutButtonStyle,
                                            ...styles.cancelAndLogoutButtonStyle,
                                        }}
                                    >
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                marginHorizontal: Sizes.fixPadding - 5.0,
                                                ...Fonts.whiteColor18SemiBold,
                                            }}
                                        >
                                            {tr('logout')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function profileOptions() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
                    {profileOptionShort({ icon: require('../../../assets/images/settingIcons/help.png'), option: 'Qr Code', onPress: () => { navigation.push('qrcode/qrcodeScreen') } })}
                    {profileOptionShort({ icon: require('../../../assets/images/settingIcons/help.png'), option: 'Attendance History', onPress: () => { navigation.push('attendance/attendanceScreen') } })}
                    {profileOptionShort({ icon: require('../../../assets/images/settingIcons/favorite.png'), option: tr('favourite'), onPress: () => { navigation.push('favorite/favoriteScreen') } })}
                    {profileOptionShort({ icon: require('../../../assets/images/settingIcons/progress.png'), option: tr('progressReport'), onPress: () => { navigation.push('progressReport/progressReportScreen') } })}
                    {profileOptionShort({ icon: require('../../../assets/images/settingIcons/notification.png'), option: tr('notification'), onPress: () => { navigation.push('notification/notificationScreen') } })}
                    {profileOptionShort({ icon: require('../../../assets/images/settingIcons/privacyPolicy.png'), option: tr('privacyPolicy'), onPress: () => { navigation.push('privacyPolicy/privacyPolicyScreen') } })}
                    {profileOptionShort({ icon: require('../../../assets/images/settingIcons/download.png'), option: tr('downloadVideo'), onPress: () => { navigation.push('downloads/downloadsScreen') } })}
                    {profileOptionShort({ icon: require('../../../assets/images/settingIcons/subscription.png'), option: tr('subscriptionPlan'), onPress: () => { navigation.push('userSubscription/userSubscriptionScreen') } })}
                    {profileOptionShort({ icon: require('../../../assets/images/settingIcons/about.png'), option: tr('about'), onPress: () => { navigation.push('about/aboutScreen') } })}
                    {profileOptionShort({ icon: require('../../../assets/images/settingIcons/help.png'), option: tr('help'), onPress: () => { navigation.push('help/helpScreen') } })}
                    {/* {profileOptionShort({ icon: require('../../../assets/images/settingIcons/language.png'), option: tr('languages'), onPress: () => { navigation.push('languages/languagesScreen') } })} */}
                </View>
            </ScrollView>
        )
    }

    function profileOptionShort({ option, onPress, icon }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onPress}
                    style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                        <Image
                            source={icon}
                            style={{ width: 16.0, height: 16.0, resizeMode: 'contain' }}
                        />
                        <Text numberOfLines={1} style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding,
                            marginRight: isRtl ? Sizes.fixPadding : 0.0,
                            flex: 1,
                            ...Fonts.blackColor16SemiBold,
                            textAlign: isRtl ? 'right' : 'left'
                        }}>
                            {option}
                        </Text>
                    </View>
                    <MaterialIcons name={isRtl ? "arrow-back-ios" : "arrow-forward-ios"} size={18} color="black" />
                </TouchableOpacity>
                {
                    icon == require('../../../assets/images/settingIcons/language.png')
                        ?
                        <View style={{ marginVertical: Sizes.fixPadding * 2.0 }} />
                        :
                        <View
                            style={{ marginVertical: Sizes.fixPadding * 2.0, backgroundColor: Colors.lightGrayColor, height: 1.0, }}
                        />
                }
            </View>
        )
    }

    function editProfileButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push('editProfile/editProfileScreen')}
                style={styles.editProfileButtonStyle}
            >
                <Text style={{ ...Fonts.primaryColor16SemiBold }}>
                    {tr('editProfile')}
                </Text>
            </TouchableOpacity>
        )
    }

    function profilePic() {
        return (
            <Image
                source={require('../../../assets/images/user/user1.png')}
                style={styles.profilePicStyle}
            />
        )
    }

    function header() {
        return (
            <View style={{ padding: Sizes.fixPadding * 2.0, }}>
                <Text style={{ textAlign: 'center', ...Fonts.whiteColor18SemiBold }}>
                    {tr('header')}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShowLogoutDialog(true)}
                    style={{ ...styles.logoutIconWrapStyle, right: isRtl ? null : 20.0, left: isRtl ? 20.0 : null }}
                >
                    <MaterialCommunityIcons name="logout" size={17} color={Colors.redColor} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default ProfileScreen

const styles = StyleSheet.create({
    logoutIconWrapStyle: {
        width: 28.0,
        height: 28.0,
        borderRadius: 14.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        position: 'absolute',
        top: 20.0,
    },
    profilePicStyle: {
        width: width / 4.0,
        height: width / 4.0,
        borderRadius: (width / 4.0) / 2.0,
        marginTop: -40.0,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        alignSelf: 'center',
    },
    editProfileButtonStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 3.0,
        paddingHorizontal: Sizes.fixPadding * 4.0,
        marginVertical: Sizes.fixPadding,
        alignSelf: 'center',
    },
    sheetStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        marginTop: Sizes.fixPadding * 4.0,
    },
    cancelAndLogoutButtonStyle: {
        elevation: 2.0,
        ...CommonStyles.shadow,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        flex: 1,
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
    },
    cancelButtonStyle: {
        backgroundColor: Colors.whiteColor,
        marginRight: Sizes.fixPadding,
        borderColor: Colors.lightGrayColor,
    },
    logoutButtonStyle: {
        backgroundColor: Colors.primaryColor,
        marginLeft: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
    },
    cancelAndLogoutButtonWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    }
})