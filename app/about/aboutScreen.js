import { Text, View, ScrollView } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const termsAndConditions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas proin nec, turpis iaculis viverra massa malesuada lacus.'
];

const dataPoliciesList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas proin nec, turpis iaculis viverra massa malesuada lacus.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas proin nec, turpis iaculis viverra massa malesuada lacus.',
];

const AboutScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`aboutScreen:${key}`)
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {termsAndConditionsInfo()}
                    {dataPolicyInfo()}
                </ScrollView>
            </View>
        </View>
    )

    function dataPolicyInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding - 5.0,
                        textAlign: isRtl ? 'right' : 'left',
                        ...Fonts.blackColor16SemiBold
                    }}
                >
                    {tr('dataPolicy')}
                </Text>
                {
                    dataPoliciesList.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{
                                ...Fonts.blackColor14Regular,
                                textAlign: isRtl ? 'right' : 'left',
                                marginBottom: Sizes.fixPadding - 5.0
                            }}
                        >
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function termsAndConditionsInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding - 5.0,
                        ...Fonts.blackColor16SemiBold,
                        textAlign: isRtl ? 'right' : 'left',
                    }}
                >
                    {tr('terms')}
                </Text>
                {
                    termsAndConditions.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{
                                textAlign: isRtl ? 'right' : 'left',
                                ...Fonts.blackColor14Regular,
                                marginBottom: Sizes.fixPadding - 5.0
                            }}
                        >
                            {item}
                        </Text>
                    ))
                }
            </View>
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

export default AboutScreen;
