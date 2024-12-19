import { StyleSheet, Text, View, BackHandler, Image, Dimensions, FlatList } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`onboardingScreen:${key}`)
    }

    const onboardingScreenList = [
        {
            id: '1',
            onboardingImage: require('../../assets/images/onboarding/onboarding1.png'),
            onboardingTitle: tr('title1'),
        },
        {
            id: '2',
            onboardingImage: require('../../assets/images/onboarding/onboarding2.png'),
            onboardingTitle: tr('title2'),
        },
        {
            id: '3',
            onboardingImage: require('../../assets/images/onboarding/onboarding3.png'),
            onboardingTitle: tr('title3'),
        },
    ];

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

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000)
    }

    const listRef = useRef();
    const [backClickCount, setBackClickCount] = useState(0);
    const [currentScreen, setCurrentScreen] = useState(0);

    const scrollToIndex = ({ index }) => {
        listRef.current.scrollToIndex({ animated: true, index: index });
        setCurrentScreen(index);
    }

    const renderItem = ({ item }) => (
        <View style={{ flex: 1, width: width, height: '100%', overflow: 'hidden' }}>
            <View style={{
                flex: 1.0,
                height: '60%',
                transform: [{ rotate: '-20deg' }],
            }}>
                <Image
                    source={item.onboardingImage}
                    style={styles.onboardingImageStyle}
                />
            </View>
            <View style={{ marginTop: '20%', }}>
                <Text numberOfLines={2} style={{ textAlign: 'center', ...Fonts.blackColor24SemiBold }}>
                    {item.onboardingTitle}
                </Text>
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            {onboardingImageWithText()}
            <View style={{ flex: 0.5, justifyContent: 'space-between' }}>
                {indicators()}
                {skipNextAndLoginText()}
            </View>
            {exitInfo()}
        </View>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={styles.animatedView}>
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        {tr('exitText')}
                    </Text>
                </View>
                :
                null
        )
    }

    function onboardingImageWithText() {
        return (
            <FlatList
                ref={listRef}
                data={onboardingScreenList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                horizontal
                scrollEventThrottle={32}
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                showsHorizontalScrollIndicator={false}
            />
        )
    }

    function indicators() {
        return (
            <View style={{ ...styles.indicatorWrapStyle, }}>
                {
                    onboardingScreenList.map((item, index) => {
                        return (
                            <View
                                key={`${item.id}`}
                                style={{
                                    ...currentScreen == index ? styles.selectedIndicatorStyle : styles.indicatorStyle,
                                    backgroundColor: currentScreen == index ? Colors.primaryColor : Colors.lightGrayColor,
                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }

    function skipNextAndLoginText() {
        return (
            <View style={{ ...styles.skipNextAndLogoinWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Text
                    onPress={() => { navigation.push('auth/signinScreen') }}
                    style={{ ...Fonts.blackColor16SemiBold }}
                >
                    {currentScreen == 2 ? '' : tr('skip')}
                </Text>
                <Text
                    onPress={() => currentScreen == 2 ? navigation.push('auth/signinScreen') : scrollToIndex({ index: currentScreen + 1 })}
                    style={{ ...Fonts.primaryColor16SemiBold }}
                >
                    {currentScreen == 2 ? tr('signin') : tr('next')}
                </Text>
            </View>
        )
    }

    function onScrollEnd(e) {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setCurrentScreen(pageNum);
    }
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: Colors.lightBlackColor,
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedIndicatorStyle: {
        marginHorizontal: Sizes.fixPadding - 7.0,
        width: 15.0,
        height: 15.0,
        borderRadius: 7.5,
    },
    indicatorStyle: {
        marginHorizontal: Sizes.fixPadding - 7.0,
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
    },
    skipNextAndLogoinWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    indicatorWrapStyle: {
        marginTop: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    onboardingImageStyle: {
        marginTop: -Sizes.fixPadding * 6,
        height: '100%',
        width: '150%',
        alignSelf: 'center',
    }
})