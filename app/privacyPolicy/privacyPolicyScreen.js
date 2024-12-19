import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const PrivacyPolicyScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`privacyPolicyScreen:${key}`)
    }

    const [state, setState] = useState({
        notification: true,
        autoUpdate: true,
        theme: true,
    });

    const { notification, autoUpdate, theme } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {notificationSetting()}
                    {applicationUpdateInfo()}
                    {themeInfo()}
                </ScrollView>
            </View>
        </View>
    )

    function themeInfo() {
        return (
            <View>
                <View style={{ ...styles.settingWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            textAlign: isRtl ? 'right' : 'left',
                            flex: 1,
                            ...Fonts.blackColor16SemiBold
                        }}
                    >
                        {tr('themes')}
                    </Text>
                    <Switch
                        value={theme}
                        onValueChange={() => updateState({ theme: !theme })}
                        color={Colors.primaryColor}
                        style={{ transform: [{ scaleX: Platform.OS == 'ios' ? 0.55 : 0.9 }, { scaleY: Platform.OS == 'ios' ? 0.55 : 0.9 }], }}
                    />
                </View>
                <Text
                    style={{
                        textAlign: isRtl ? 'right' : 'left',
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        includeFontPadding: false,
                        ...Fonts.blackColor14Regular
                    }}
                >
                    {theme ? tr('darkMode') : tr('lightMode')}
                </Text>
            </View>
        )
    }

    function applicationUpdateInfo() {
        return (
            <View style={{ marginVertical: Platform.OS == 'ios' ? Sizes.fixPadding + 5.0 : Sizes.fixPadding - 5.0 }}>
                <View style={{ ...styles.settingWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            textAlign: isRtl ? 'right' : 'left',
                            includeFontPadding: false,
                            flex: 1,
                            ...Fonts.blackColor16SemiBold
                        }}
                    >
                        {tr('applicationUpdate')}
                    </Text>
                    <Switch
                        value={autoUpdate}
                        onValueChange={() => updateState({ autoUpdate: !autoUpdate })}
                        color={Colors.primaryColor}
                        style={{ transform: [{ scaleX: Platform.OS == 'ios' ? 0.55 : 0.9 }, { scaleY: Platform.OS == 'ios' ? 0.55 : 0.9 }], }}
                    />
                </View>
                <Text
                    style={{
                        includeFontPadding: false,
                        textAlign: isRtl ? 'right' : 'left',
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        ...Fonts.blackColor14Regular
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas proin nec, turpis iaculis viverra massa malesuada lacus.
                </Text>
            </View>
        )
    }

    function notificationSetting() {
        return (
            <View style={{ ...styles.settingWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Text
                    numberOfLines={1}
                    style={{
                        textAlign: isRtl ? 'right' : 'left',
                        flex: 1,
                        ...Fonts.blackColor16SemiBold
                    }}
                >
                    {tr('notification')}
                </Text>
                <Switch
                    value={notification}
                    onValueChange={() => updateState({ notification: !notification })}
                    color={Colors.primaryColor}
                    style={{ transform: [{ scaleX: Platform.OS == 'ios' ? 0.55 : 0.9 }, { scaleY: Platform.OS == 'ios' ? 0.55 : 0.9 }], }}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name={isRtl ? 'arrow-forward' : "arrow-back"}
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

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
    settingWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})