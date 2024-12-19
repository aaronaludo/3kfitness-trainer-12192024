import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, BackHandler, Dimensions, Platform } from 'react-native'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import Slider from '@react-native-community/slider';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const formatTime = (time) => {
    if (!time) return "00:00";
    const minutes = Math.floor(time / 1000 / 60);
    const seconds = Math.floor(time / 1000) % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const recipes = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, euismod pellentesque sagittis, turpis quam neque diam massa dolor. Quis nascetur arcu, amet felis purus at senectus pulvinar blandit. Sit habitant dignissim orci at mattis ante. onsectetur adipiscing elit. Diam, euismod pellentesque sagittis, turpis onsectetur adipiscing elit.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, euismod pellentesque sagittis, turpis quam neque diam massa dolor. Diam, euismod pellentesque sagittis, turpis onsectetur adipiscing elit.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, euismod pellentesque sagittis, turpis quam neque diam massa dolor. Quis nascetur arcu, amet felis purus at senectus pulvinar blandit. Sit habitant dignissim orci at mattis ante. onsectetur adipiscing elit. Diam, euismod pellentesque sagittis, turpis onsectetur adipiscing elit.',
];

const ingredients = [
    "1.5 cup levelled whole",
    "1.5 pinch salt",
    "1.5 pinch levelled banking powder",
    "1 table spoon vanila sirap",
    "1 cup chocolate",
    "1 spoon browun sugar",
    "3 spoon peanut butter",
];

const MealCategoryVideoScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`mealCategoryVideoScreen:${key}`)
    }

    const handlePlayPause = () => {
        if (status.durationMillis == status.positionMillis) {
            videoRef.current.replayAsync();
        }
        else {
            status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync();
        }
    };

    const handleSeek = async (value) => {
        videoRef.current.setPositionAsync(value, {
            toleranceMillisBefore: 0,
            toleranceMillisAfter: 0
        })
    };

    const videoRef = useRef(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setisPlayVideo(true)
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setisPlayVideo(false);
            changeScreenToPotrait();
        });
        return unsubscribe;
    }, [navigation]);

    const [inFullscreen2, setInFullsreen2] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [inFavorite, setInFavorite] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [status, setStatus] = useState({});
    const [isPlayVideo, setisPlayVideo] = useState(true);

    const backAction = () => {
        if (Platform.OS !== "ios") {
            if (inFullscreen2) {
                changeScreenToPotrait()
                setInFullsreen2(false)
            }
            else {
                navigation.pop()
            }
            return true;
        }
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            };
        }, [backAction])
    );

    async function changeScreenToPotrait() {
        await ScreenOrientation.lockAsync(
            Platform.OS == 'ios'
                ?
                ScreenOrientation.OrientationLock.PORTRAIT_UP
                :
                ScreenOrientation.OrientationLock.PORTRAIT
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar hidden={inFullscreen2 ? true : false} translucent={true} backgroundColor={'transparent'} />
            <View style={{ flex: 1, }}>
                {videoDisplay()}
                {
                    !inFullscreen2 && <ScrollView showsVerticalScrollIndicator={false}>
                        {mealCategoryInfo()}
                        {proteinFatAndCaloriesInfo()}
                        {ingredientsInfo()}
                        {recipeInfo()}
                    </ScrollView>
                }
            </View>
            {snackBar()}
        </View>
    )

    function recipeInfo() {
        const showRecipe = showMore ? recipes : recipes.slice(0, 1);
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text
                    style={{
                        textAlign: isRtl ? 'right' : 'left',
                        ...Fonts.blackColor16SemiBold
                    }}
                >
                    {tr('recipe')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    {
                        showRecipe.map((item, index) => (
                            <Text
                                key={`${index}`}
                                style={{
                                    textAlign: isRtl ? 'right' : 'left',
                                    ...Fonts.grayColor14Medium,
                                    marginBottom: Sizes.fixPadding
                                }}
                            >
                                {item}
                            </Text>
                        ))
                    }
                    <Text
                        onPress={() => setShowMore(!showMore)}
                        style={{
                            ...styles.showLessMoreTextStyle,
                            textAlign: isRtl ? 'left' : 'right',
                        }}
                    >
                        {showMore ? tr('readLess') : tr('readMore')}
                    </Text>
                </View>
            </View>
        )
    }

    function ingredientsInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding,
                        textAlign: isRtl ? 'right' : 'left',
                        ...Fonts.blackColor16SemiBold
                    }}
                >
                    {tr('ingrediants')}
                </Text>
                {
                    ingredients.map((item, index) => (
                        <View
                            key={`${index}`}
                            style={{ marginBottom: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row' }}
                        >
                            <Text style={{
                                marginRight: isRtl ? 0.0 : Sizes.fixPadding - 2.0,
                                marginLeft: isRtl ? Sizes.fixPadding - 2.0 : 0.0,
                                ...Fonts.blackColor16Regular
                            }}>
                                •
                            </Text>
                            <Text style={{ ...Fonts.blackColor16Regular }}>
                                {item}
                            </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    function proteinFatAndCaloriesInfo() {
        return (
            <View style={{ ...styles.proteinFatAndCaloriesInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                {proteinFatCaloriesShort({ value: '500', type: tr('protein') })}
                <View style={{ backgroundColor: Colors.lightGrayColor, width: 1.0, }} />
                {proteinFatCaloriesShort({ value: '250', type: tr('fat') })}
                <View style={{ backgroundColor: Colors.lightGrayColor, width: 1.0, }} />
                {proteinFatCaloriesShort({ value: '1500', type: tr('calories') })}
            </View>
        )
    }

    function proteinFatCaloriesShort({ value, type }) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ ...Fonts.primaryColor16SemiBold }}>
                    {value}
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium }}>
                    {type}
                </Text>
            </View>
        )
    }

    function snackBar() {
        return (
            <Snackbar
                style={{ backgroundColor: Colors.lightBlackColor }}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                duration={800}
                elevation={0}
            >
                <Text style={{ textAlign: isRtl ? 'right' : 'left', ...Fonts.whiteColor14Medium }}>
                    {inFavorite ? tr('addInFav') : tr('removeFromFav')}
                </Text>
            </Snackbar>
        )
    }

    function mealCategoryInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, alignItems: isRtl ? 'flex-end' : 'flex-start' }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor18SemiBold }}>
                        Breakfast
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor14SemiBold,
                            textAlign: isRtl ? 'right' : 'left'
                        }}
                    >
                        Chocolate & Peanut Butter
                    </Text>
                </View>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <MaterialIcons
                        name={inFavorite ? "favorite" : "favorite-outline"}
                        size={24}
                        color={Colors.primaryColor}
                        style={{
                            marginRight: isRtl ? 0.0 : Sizes.fixPadding + 5.0,
                            marginLeft: isRtl ? Sizes.fixPadding + 5.0 : 0.0
                        }}
                        onPress={() => {
                            setShowSnackBar(true)
                            setInFavorite(!inFavorite)
                        }}
                    />
                    <MaterialCommunityIcons name="arrow-collapse-down" size={25} color={Colors.primaryColor} />
                </View>
            </View>
        )
    }

    function videoDisplay() {
        return (
            <View>
                <View>
                    <Video
                        ref={videoRef}
                        source={require('../../assets/video/sampleVideo.mp4')}
                        shouldPlay={isPlayVideo}
                        useNativeControls={false}
                        onPlaybackStatusUpdate={setStatus}
                        resizeMode={ResizeMode.STRETCH}
                        style={{ height: inFullscreen2 ? width : 230.0 }}
                    />
                    <View
                        style={{
                            bottom: 15 + (inFullscreen2 ? StatusBar.currentHeight : 0),
                            ...styles.videoTimeAndFullScreenButton,
                            flexDirection: isRtl ? 'row-reverse' : 'row',
                        }}
                    >
                        <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                            {formatTime(status.positionMillis)}
                        </Text>
                        <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                            <Text style={{ ...Fonts.whiteColor14SemiBold, marginHorizontal: Sizes.fixPadding - 5.0 }}>
                                {formatTime(status.durationMillis)}
                            </Text>
                            <MaterialIcons
                                name={inFullscreen2 ? 'fullscreen-exit' : "fullscreen"}
                                size={24}
                                color={Colors.whiteColor}
                                style={{ marginLeft: Sizes.fixPadding - 5.0, zIndex: 100 }}
                                onPress={async () => {
                                    if (!inFullscreen2) {
                                        setInFullsreen2(true)
                                        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
                                    }
                                    else {
                                        setInFullsreen2(false)
                                        await ScreenOrientation.lockAsync(Platform.OS == 'ios' ? ScreenOrientation.OrientationLock.PORTRAIT_UP : ScreenOrientation.OrientationLock.PORTRAIT)
                                    }
                                }}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handlePlayPause}
                        style={styles.videoOverlay}
                    >
                        {
                            !status.isPlaying
                                ?
                                <MaterialIcons
                                    name={"play-arrow"}
                                    color={Colors.whiteColor}
                                    size={50}
                                    style={{ alignSelf: 'center', }}
                                />
                                :
                                null
                        }
                    </TouchableOpacity>
                    <View style={styles.videoCustomControlsWrapper}>
                        <Slider
                            minimumValue={0}
                            maximumValue={status.durationMillis}
                            minimumTrackTintColor={Colors.primaryColor}
                            maximumTrackTintColor={Colors.whiteColor}
                            thumbTintColor={Colors.primaryColor}
                            value={status.positionMillis}
                            onValueChange={handleSeek}
                            style={{ marginBottom: inFullscreen2 ? StatusBar.currentHeight : 0 }}
                        />
                    </View>
                </View>
                {header()}
            </View>
        )
    }

    function header() {
        return (
            <View
                style={{
                    ...styles.headerWrapStyle,
                    left: isRtl ? null : 20.0,
                    right: isRtl ? 20.0 : null,
                    marginTop: !inFullscreen2 ? StatusBar.currentHeight : 0
                }}
            >
                <SafeAreaView />
                <MaterialIcons
                    name={isRtl ? "arrow-forward" : "arrow-back"}
                    size={24}
                    color={Colors.whiteColor}
                    onPress={() => {
                        if (inFullscreen2) {
                            changeScreenToPotrait()
                            setInFullsreen2(false)
                        }
                        else {
                            navigation.pop()
                        }
                    }}
                />
            </View>
        )
    }
}

export default MealCategoryVideoScreen;

const styles = StyleSheet.create({
    headerWrapStyle: {
        position: 'absolute',
        top: 20.0,
        zIndex: 100,
    },
    videoThumbImageCoverStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 2.0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    proteinFatAndCaloriesInfoWrapStyle: {
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        elevation: 1.5,
        ...CommonStyles.shadow,
        borderRadius: Sizes.fixPadding - 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
    },
    showLessMoreTextStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        marginTop: -Sizes.fixPadding,
        ...Fonts.primaryColor14Medium
    },
    videoCustomControlsWrapper: {
        position: 'absolute',
        left: Platform.OS == 'ios' ? 0 : -10,
        right: Platform.OS == 'ios' ? 0 : -10,
        bottom: Platform.OS == 'ios' ? -18 : -10,
    },
    videoOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 20,
        bottom: 0,
        justifyContent: 'center'
    },
    videoTimeAndFullScreenButton: {
        position: 'absolute',
        left: 10,
        right: 10,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})