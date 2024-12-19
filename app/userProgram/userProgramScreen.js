import { StyleSheet, Text, View, TouchableOpacity, Platform, SafeAreaView, StatusBar, ScrollView, FlatList, ImageBackground, Image, BackHandler, Dimensions } from 'react-native';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

const sessionParts = [
    {
        id: '1',
        indicatorColor: '#A13A24',
        minute: 8,
        session: 'warm up'
    },
    {
        id: '2',
        indicatorColor: '#6B8662',
        minute: 7,
        session: 'workout introduction'
    },
    {
        id: '3',
        indicatorColor: '#294181',
        minute: 20,
        session: 'workout 1'
    },
    {
        id: '4',
        indicatorColor: '#C97AA0',
        minute: 8,
        session: 'workout 2'
    },
    {
        id: '5',
        indicatorColor: '#BD8083',
        minute: 7,
        session: 'Cool down'
    },
];

const upcomingVideos = [
    {
        id: '1',
        videoThumbImage: require('../../assets/images/exercises/exercise5.png'),
        videoTitle: "Basic of yoga",
    },
    {
        id: '2',
        videoThumbImage: require('../../assets/images/exercises/exercise6.png'),
        videoTitle: "Drill essentials",
    },
];

const benifits = ['Strengts', 'Stamina', 'Endurance', 'Mobility'];

const UserProgramScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`userProgramScreen:${key}`)
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
    const [status, setStatus] = useState({});
    const [isPlayVideo, setisPlayVideo] = useState(true);

    const totalSessionMinute = sessionParts.reduce((s, { minute }) => s + minute, 0);

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
                {!inFullscreen2 && <ScrollView showsVerticalScrollIndicator={false}>
                    {trainerInfo()}
                    {caloriesEquipmentAndDurationInfo()}
                    {benifitsInfo()}
                    {sessionDetail()}
                    {upcomingVideosInfo()}
                </ScrollView>}
            </View>
            {snackBar()}
        </View>
    )

    function upcomingVideosInfo() {
        const renderItem = ({ item }) => (
            <ImageBackground
                source={item.videoThumbImage}
                style={{
                    width: width / 1.7,
                    height: width / 2.8,
                    marginHorizontal: Sizes.fixPadding,
                }}
                borderRadius={Sizes.fixPadding - 2.0}
                resizeMode="stretch"
            >
                <View style={styles.videoThumbImageCoverStyle}>
                    <Text style={{ textAlign: 'center', ...Fonts.whiteColor16Bold }}>
                        {item.videoTitle}
                    </Text>
                </View>
            </ImageBackground>
        )
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('upcomingVideo')}
                </Text>
                <FlatList
                    data={upcomingVideos}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding, paddingTop: Sizes.fixPadding }}
                    inverted={isRtl}
                />
            </View>
        )
    }

    function sessionDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', ...Fonts.blackColor16SemiBold }}>
                    {tr('sessionDetails')}
                </Text>
                {beginWithTotalMinuteInfo()}
                {sessionDetailWithSession()}
            </View>
        )
    }

    function sessionDetailWithSession() {
        return (
            <View>
                {sessionParts.map((item) => (
                    <View
                        key={`${item.id}`}
                        style={{ marginBottom: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}
                    >
                        <View style={{ width: 20.0, height: 4.0, backgroundColor: item.indicatorColor }} />
                        <Text style={{ marginRight: Sizes.fixPadding + 10.0, marginLeft: Sizes.fixPadding, ...Fonts.grayColor14Regular }}>
                            {item.minute.toString().length == 1 ? `0${item.minute}` : item.minute} min
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            {item.session}
                        </Text>
                    </View>
                ))}
            </View>
        )
    }

    function beginWithTotalMinuteInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <Text style={{ ...Fonts.grayColor14SemiBold, }}>
                    {tr('begin')}
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', flex: 1, }}>
                    {sessionParts.map((item) => (
                        <View
                            key={`${item.id}`}
                            style={{
                                backgroundColor: item.indicatorColor,
                                flex: item.minute / totalSessionMinute,
                                height: 4.0,
                                marginHorizontal: Sizes.fixPadding - 9.0
                            }} />
                    ))}
                </View>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    {totalSessionMinute} {tr('min')}
                </Text>
            </View>
        )
    }

    function benifitsInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('benefits')}
                </Text>
                {
                    benifits.map((item, index) => (
                        <View
                            key={`${index}`}
                            style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                •
                            </Text>
                            <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                                {item}
                            </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    function caloriesEquipmentAndDurationInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                {caloriesInfo()}
                <View style={{ width: 1.0, backgroundColor: Colors.grayColor, height: '100%', marginHorizontal: Sizes.fixPadding * 2.0, }} />
                {equipmentInfo()}
                <View style={{ width: 1.0, backgroundColor: Colors.grayColor, height: '100%', marginHorizontal: Sizes.fixPadding * 2.0, }} />
                {durationInfo()}
            </View>
        )
    }

    function caloriesInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('calories')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icons/calories.png')}
                        style={{ width: 15.0, height: 15.0, resizeMode: 'contain' }}
                    />
                    <Text numberOfLines={1}
                        style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 5.0,
                            marginRight: isRtl ? Sizes.fixPadding - 5.0 : 0.0,
                            ...Fonts.primaryColor14Medium
                        }}
                    >
                        400
                    </Text>
                </View>
            </View>
        )
    }

    function durationInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('netDuration')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="clock-time-four" size={18} color={Colors.primaryColor} />
                    <Text numberOfLines={1}
                        style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 5.0,
                            marginRight: isRtl ? Sizes.fixPadding - 5.0 : 0.0,
                            ...Fonts.primaryColor14Medium
                        }}
                    >
                        50 min.
                    </Text>
                </View>
            </View>
        )
    }

    function equipmentInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('equpiment')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialIcons name="fitness-center" size={18} color={Colors.primaryColor} />
                    <Text numberOfLines={1}
                        style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 5.0,
                            marginRight: isRtl ? Sizes.fixPadding - 5.0 : 0.0,
                            ...Fonts.primaryColor14Medium
                        }}
                    >
                        None
                    </Text>
                </View>
            </View>
        )
    }

    function snackBar() {
        return (
            <Snackbar
                style={{ backgroundColor: Colors.lightBlackColor, elevation: 0.0 }}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                <Text style={{ textAlign: isRtl ? 'right' : 'left', ...Fonts.whiteColor14Medium }}>
                    {inFavorite ? tr('addInFav') : tr('removeFromFav')}
                </Text>
            </Snackbar>
        )
    }

    function trainerInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ ...Fonts.blackColor18SemiBold }}>
                        Full body tranning
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor14SemiBold }}>
                        Kirti shah{`\n`}Yoga specialist
                    </Text>
                </View>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <MaterialIcons
                        name={inFavorite ? "favorite" : "favorite-outline"}
                        size={24}
                        color={Colors.primaryColor}
                        style={{ marginRight: isRtl ? 0.0 : Sizes.fixPadding + 5.0, marginLeft: isRtl ? Sizes.fixPadding + 5.0 : 0.0 }}
                        onPress={() => {
                            setShowSnackBar(true)
                            setInFavorite(!inFavorite)
                        }}
                    />
                    <Octicons name="download" size={25} color={Colors.primaryColor} />
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
            <View style={{ ...styles.headerWrapStyle, zIndex: 100, marginTop: !inFullscreen2 ? StatusBar.currentHeight : 0 }}>
                <SafeAreaView />
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
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
                    <MaterialIcons name="share" size={24} color={Colors.whiteColor} />
                </View>
            </View>
        )
    }
}

export default UserProgramScreen;

const styles = StyleSheet.create({
    headerWrapStyle: {
        position: 'absolute',
        left: 20.0,
        right: 20.0,
        top: 20.0,
    },
    videoThumbImageCoverStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 2.0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)'
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