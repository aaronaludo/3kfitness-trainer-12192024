import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const GenderSelectionScreen = () => {

    const navigation=useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`genderSelectionScreen:${key}`)
    }

    const [selectedGender, setSelectedGender] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    {getInformationText()}
                    {genderSelection()}
                    {nextButton()}
                </ScrollView>
            </View>
        </View>
    )

    function nextButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push('levelSelection/levelSelectionScreen')}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('next')}
                </Text>
            </TouchableOpacity>
        )
    }

    function genderSelection() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {genderSelectionShort({ icon: require('../../assets/images/icons/male.png'), gender: 'Male' })}
                {genderSelectionShort({ icon: require('../../assets/images/icons/female.png'), gender: 'Female' })}
            </View>
        )
    }

    function genderSelectionShort({ icon, gender }) {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedGender(gender)}
                style={{
                    backgroundColor: selectedGender == gender ? Colors.grayColor : Colors.whiteColor,
                    borderColor: selectedGender == gender ? Colors.grayColor : Colors.lightGrayColor,
                    ...styles.genderWrapStyle,
                }}>
                <Image
                    source={icon}
                    style={{ width: 95.0, height: 95.0, top: 5.0 }}
                />
            </TouchableOpacity>
        )
    }

    function getInformationText() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 7.0, textAlign: 'center', ...Fonts.blackColor22SemiBold }}>
                    {tr('getInfoHeader')}
                </Text>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                    {tr('getInfoDescription')}
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <MaterialIcons
                name={isRtl ? 'arrow-forward' : "arrow-back"}
                size={24}
                color={Colors.blackColor}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: isRtl ? 'flex-end' : 'flex-start' }}
            />
        )
    }
}

export default GenderSelectionScreen;

const styles = StyleSheet.create({
    genderWrapStyle: {
        width: 100.0,
        height: 100.0,
        borderRadius: 50.0,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
        marginVertical: Sizes.fixPadding + 5.0,
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
})