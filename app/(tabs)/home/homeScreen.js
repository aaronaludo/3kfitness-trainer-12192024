import { ScrollView, StyleSheet, Text, Modal, TouchableOpacity, View, ImageBackground, Image, Dimensions, FlatList, Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, CommonStyles, Fonts, Sizes } from '../../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from 'expo-router';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get('window');

const todaysPlans = [
    {
        id: '1',
        foodImage: require('../../../assets/images/food/food1.png'),
        mealsCategory: 'Breakfast',
        eatTime: '8:00AM - 8.30AM',
    },
    {
        id: '2',
        foodImage: require('../../../assets/images/food/food2.png'),
        mealsCategory: 'Lunch',
        eatTime: '12.30PM - 1.00PM',
    },
    {
        id: '3',
        foodImage: require('../../../assets/images/food/food3.png'),
        mealsCategory: 'Snacks',
        eatTime: '5.00PM - 6.00PM',
    },
    {
        id: '4',
        foodImage: require('../../../assets/images/food/food4.png'),
        mealsCategory: 'Dinner',
        eatTime: '8.00PM - 9.00PM',
    }
];

const trainers = [
    {
        id: '1',
        trainerImage: require('../../../assets/images/trainers/trainer1.png'),
        trainerName: 'Katin Man',
        specialist: 'Yoga',
        rating: 4.5,
    },
    {
        id: '2',
        trainerImage: require('../../../assets/images/trainers/trainer2.png'),
        trainerName: 'Mira shah',
        specialist: 'Dietitians',
        rating: 4.5,
    },
    {
        id: '3',
        trainerImage: require('../../../assets/images/trainers/trainer3.png'),
        trainerName: 'Dhruva roi',
        specialist: 'S & C',
        rating: 4.5,
    },
    {
        id: '4',
        trainerImage: require('../../../assets/images/trainers/trainer4.png'),
        trainerName: 'Dr. roi',
        specialist: 'hiits',
        rating: 4.5,
    },
    {
        id: '5',
        trainerImage: require('../../../assets/images/trainers/trainer5.png'),
        trainerName: 'Salman khan',
        specialist: 'S & C',
        rating: 4.5,
    },
];

const popularWorkouts = [
    {
        id: '1',
        workoutThumbImage: require('../../../assets/images/exercises/exercise2.png'),
    },
    {
        id: '2',
        workoutThumbImage: require('../../../assets/images/exercises/exercise3.png'),
    },
    {
        id: '3',
        workoutThumbImage: require('../../../assets/images/exercises/exercise4.png'),
    },
];

const motivationalVideos = [
    {
        id: '1',
        motivationalVideoThumbImage: require('../../../assets/images/exercises/exercise5.png')
    },
    {
        id: '2',
        motivationalVideoThumbImage: require('../../../assets/images/exercises/exercise6.png')
    },
    {
        id: '3',
        motivationalVideoThumbImage: require('../../../assets/images/exercises/exercise7.png')
    },
];

const HomeScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)
    const [popularWorkoutProgram, setPopularWorkoutProgram] = useState([]);
    const [fullName, setFullName] = useState('');

    function tr(key) {
        return t(`homeScreen:${key}`)
    }

    useEffect(() => {
        const fetchPopularWorkoutProgram = async () => {
            try {
                const response = await axios.get('https://3kfitness.web-create.online/api/workout-categories');
                const data = response.data.data;
    
                const formattedData = data.map((item) => ({
                    id: item.id.toString(),
                    workoutThumbImage: { uri: item.image_url },
                }));
    
                setPopularWorkoutProgram(formattedData);
            } catch (error) {
                Alert.alert('Error', error.response?.data?.message || error.message || 'Something went wrong');
            }
        };

        const fetchFullName = async () => {
            try {
              const user = await AsyncStorage.getItem("user");
      
              if (user) {
                setFullName(JSON.parse(user).first_name +' '+ JSON.parse(user).last_name);
              }
            } catch (error) {
              console.error("Error fetching user email:", error);
            }
          };
      
          fetchFullName();

        fetchPopularWorkoutProgram();
    }, []);
    

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                >
                    {banner()}
                    {todayInfo()}
                    {todaysPlan()}
                    {trainersInfo()}
                    {popularWorkoutInfo()}
                    {motivationalVideosInfo()}
                </ScrollView>
                {appointmentDialog()}
            </View>
        </View>
    )

    function appointmentDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showAppointmentDialog}
                onRequestClose={() => { setShowAppointmentDialog(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowAppointmentDialog(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{ width: width - 40.0, borderRadius: Sizes.fixPadding - 2.0, alignSelf: 'center', backgroundColor: Colors.whiteColor }}
                        >
                            <View style={{ marginVertical: Sizes.fixPadding * 2.5, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                                <Text style={{ textAlign: 'center', ...Fonts.blackColor16Medium }}>
                                    {tr('appointmentTitle')}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        setShowAppointmentDialog(false)
                                        navigation.push('trainers/trainersScreen')
                                    }}
                                    style={styles.buttonStyle}
                                >
                                    <Text style={{ ...Fonts.whiteColor16Bold }}>
                                        {tr('bookAppintment')}
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    onPress={() => setShowAppointmentDialog(false)}
                                    style={{ textAlign: 'center', ...Fonts.grayColor16SemiBold }}
                                >
                                    {tr('skip')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function motivationalVideosInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ borderRadius: Sizes.fixPadding - 2.0, marginHorizontal: Sizes.fixPadding }}
                    onPress={() => setShowAppointmentDialog(true)}
                >
                    <ImageBackground
                        source={item.motivationalVideoThumbImage}
                        style={styles.workoutThumbImageStyle}
                        borderRadius={Sizes.fixPadding - 2.0}
                    >
                        <MaterialIcons name="play-arrow" size={40} color={Colors.whiteColor} />
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
                <Text
                    style={{
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        textAlign: isRtl ? 'right' : 'left',
                        ...Fonts.blackColor16SemiBold
                    }}
                >
                    {tr('motivationalVideoTitle')}
                </Text>
                <FlatList
                    data={motivationalVideos}
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

    function popularWorkoutInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ borderRadius: Sizes.fixPadding - 2.0, marginHorizontal: Sizes.fixPadding }}
                    onPress={() => setShowAppointmentDialog(true)}
                >
                    <ImageBackground
                        source={item.workoutThumbImage}
                        style={styles.workoutThumbImageStyle}
                        borderRadius={Sizes.fixPadding - 2.0}
                    >
                        <MaterialIcons name="play-arrow" size={40} color={Colors.whiteColor} />
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
        return (
            <View>
                <Text
                    style={{
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        textAlign: isRtl ? 'right' : 'left',
                        ...Fonts.blackColor16SemiBold
                    }}
                >
                    {tr('popularWorkoutTitle')}
                </Text>
                <FlatList
                    data={popularWorkoutProgram}
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

    function trainersInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { navigation.push('trainerProfile/trainerProfileScreen') }}
                    style={styles.trainerInfoWrapStyle}
                >
                    <ImageBackground
                        source={item.trainerImage}
                        style={{ width: width / 2.5, height: (width / 2.5) - 30, }}
                        borderTopLeftRadius={Sizes.fixPadding - 2.0}
                        borderTopRightRadius={Sizes.fixPadding - 2.0}
                    >
                        <View style={styles.currencyWrapStyle}>
                            <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                                ₱
                            </Text>
                        </View>
                    </ImageBackground>
                    <View style={{ ...styles.trainerDetailWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                        <View style={{ flex: 1, alignItems: isRtl ? 'flex-end' : 'flex-start' }}>
                            <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                                {item.trainerName}
                            </Text>
                            <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                                {item.specialist}
                            </Text>
                        </View>
                        <View style={{ marginTop: Sizes.fixPadding - 7.0, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                            <MaterialIcons name="star" size={13} color={Colors.yellowColor} />
                            <Text style={{ ...Fonts.blackColor12Regular, marginLeft: Sizes.fixPadding - 7.0 }}>
                                {item.rating}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <Text
                    style={{
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        textAlign: isRtl ? 'right' : 'left',
                        ...Fonts.blackColor16SemiBold
                    }}
                >
                    {tr('personalTrainerTitle')}
                </Text>
                <FlatList
                    data={trainers}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding, }}
                    inverted={isRtl}
                />
            </View>
        )
    }

    function todaysPlan() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.push('mealCategoryVideo/mealCategoryVideoScreen')}
                    style={{ alignItems: 'center', marginHorizontal: Sizes.fixPadding }}
                >
                    <Image
                        source={item.foodImage}
                        style={styles.foodImageStyle}
                    />
                    <View style={styles.mealsCategoryWrapStyle}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.mealsCategory}
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {item.eatTime}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
                <Text
                    style={{
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        textAlign: isRtl ? 'right' : 'left',
                        ...Fonts.blackColor16SemiBold
                    }}
                >
                    {tr('todayPlanTitle')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    <FlatList
                        data={todaysPlans}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 4.0, paddingHorizontal: Sizes.fixPadding }}
                        showsHorizontalScrollIndicator={false}
                        inverted={isRtl}
                    />
                </View>
            </View>
        )
    }

    function todayInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text
                    style={{
                        ...Fonts.blackColor16SemiBold,
                        textAlign: isRtl ? 'right' : 'left',
                    }}
                >
                    {tr('today')}
                </Text>
                <View style={{ ...styles.todayInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <Image
                        source={require('../../../assets/images/icons/timer.png')}
                        style={{ width: 24.0, height: 24.0, resizeMode: "contain" }}
                    />
                    <View
                        style={{
                            alignItems: isRtl ? 'flex-end' : 'flex-start',
                            marginHorizontal: Sizes.fixPadding + 5.0,
                            flex: 1
                        }}
                    >
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                            {tr('sessionStart')}
                        </Text>
                        <View style={{ ...styles.sessionStartTimeWrapStyle, alignSelf: isRtl ? 'flex-end' : 'flex-start', }}>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                09:30:60
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function banner() {
        return (
            <View style={{ ...styles.bannerWrapStyle, flexDirection: 'row', }}>
                <View style={{ zIndex: 1.0, flex: 0.8, }}>
                    <Text style={{ ...Fonts.whiteColor22Bold }}>
                        {`Start Your\nPersonal Tranning\nToday`}
                    </Text>
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        3 day free trial
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.push('trainerProfile/trainerProfileScreen')}
                        style={{ ...styles.joinNowButtonStyle, alignSelf: 'flex-start', }}
                    >
                        <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                            {tr('joinNow')}
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ ...Fonts.whiteColor14SemiBold, }}>
                        {tr('premium1')}
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            @999
                        </Text>
                        {tr('premium3')}
                    </Text>
                </View>
                <View style={{ position: 'absolute', right: 0.0, bottom: 2.0 }}>
                    <Image
                        source={require('../../../assets/images/exercises/exercise1.png')}
                        style={{
                            height: width / 1.7,
                            resizeMode: 'stretch',
                            width: width / 1.7,
                        }}
                    />
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={{ ...styles.headerWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/images/user/user1.png')}
                        style={{ width: 45.0, height: 45.0, borderRadius: 22.5 }}
                    />
                    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 5.0, alignItems: isRtl ? 'flex-end' : "flex-start" }}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            Hello {fullName}
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            Welcome trainer
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.push('notification/notificationScreen')}
                    style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}
                >
                    <MaterialCommunityIcons
                        name="calendar-month-outline"
                        size={24}
                        color={Colors.blackColor}
                        onPress={() => navigation.push('scheduleWorkoutAndDiet/scheduleWorkoutAndDietScreen')}
                    />
                    <View style={{ marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0 }}>
                        <MaterialCommunityIcons name="bell-outline" size={24} color={Colors.blackColor} />
                        <View style={styles.newNotificationBellStyle} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        marginVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    newNotificationBellStyle: {
        position: 'absolute',
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
        backgroundColor: Colors.redColor,
        right: 2.5, top: 5.0,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0
    },
    joinNowButtonStyle: {
        backgroundColor: Colors.blackColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 5.0,
    },
    bannerWrapStyle: {
        paddingLeft: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightPrimaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        overflow: 'hidden'
    },
    todayInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 7.0,
        ...CommonStyles.shadow,
    },
    sessionStartTimeWrapStyle: {
        marginTop: Sizes.fixPadding - 7.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding - 8.0,
    },
    mealsCategoryWrapStyle: {
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        ...CommonStyles.shadow,
        position: 'absolute',
        bottom: -30.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 2.0
    },
    foodImageStyle: {
        width: width / 1.5,
        height: width / 2.5,
        resizeMode: 'stretch',
        borderRadius: Sizes.fixPadding - 2.0
    },
    trainerInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding,
        width: width / 2.5,
        elevation: 2.0,
        ...CommonStyles.shadow,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
    },
    currencyWrapStyle: {
        margin: Sizes.fixPadding - 3.0,
        alignSelf: 'flex-end',
        backgroundColor: Colors.primaryColor,
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    trainerDetailWrapStyle: {
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        justifyContent: 'space-between'
    },
    workoutThumbImageStyle: {
        width: width / 1.7,
        height: width / 2.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding,
    },
})