import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const LanguagesScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    const [selectedLanguage, setSelectedLanguage] = useState(i18n.resolvedLanguage);

    function tr(key) {
        return t(`languagesScreen:${key}`)
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {languages()}
            </View>
        </View>
    )

    function languages() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0 }}>
                {languageShort({ language: `${tr('english')}`, lang: 'en' })}
                {languageShort({ language: `${tr('hindi')}`, lang: 'hi' })}
                {languageShort({ language: `${tr('indonesian')}`, lang: 'id' })}
                {languageShort({ language: `${tr('chienese')}`, lang: 'ch' })}
                {languageShort({ language: `${tr('arabic')}`, lang: 'ar' })}
            </ScrollView>
        )
    }

    async function onChangeLang(lang) {
        i18n.changeLanguage(lang);
        try {
            await AsyncStorage.setItem('@APP:languageCode', lang);
        } catch (error) {
            alert('something goes wrong')
        }
    }

    function languageShort({ language, lang }) {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={async () => {
                    if (selectedLanguage !== lang) {
                        onChangeLang(lang)
                        setSelectedLanguage(lang)
                    }
                }}
                style={{ ...styles.languageWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}
            >
                <View style={{
                    ...styles.radioButtonStyle,
                    borderColor: selectedLanguage == lang ? Colors.primaryColor : Colors.whiteColor,
                    backgroundColor: selectedLanguage == lang ? Colors.primaryColor : Colors.grayColor,
                }}>
                    <View style={{ backgroundColor: Colors.whiteColor, width: 8.0, height: 8.0, borderRadius: 4.0 }} />
                </View>
                <Text style={{ marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0, ...Fonts.blackColor16Medium }}>
                    {language}
                </Text>
            </TouchableOpacity>
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

export default LanguagesScreen;

const styles = StyleSheet.create({
    languageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 0.5,
        ...CommonStyles.shadow,
        shadowOpacity: 0.1,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    radioButtonStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0,
    }
})