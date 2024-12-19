import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { Calendar } from "react-native-calendars";
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const workouts = [
    {
        id: '1',
        workoutType: 'Warm Up',
        workouts: [
            {
                id: '1',
                workoutImage: require('../../assets/images/exercises/exercise8.png'),
                workoutName: "High Knee",
                workoutTime: '0:30',
            },
            {
                id: '2',
                workoutImage: require('../../assets/images/exercises/exercise9.png'),
                workoutName: "Jog in place",
                workoutTime: '0:30',
            },
            {
                id: '3',
                workoutImage: require('../../assets/images/exercises/exercise10.png'),
                workoutName: "Hip lifts",
                workoutTime: '0:30',
            },
        ],
    },
    {
        id: '2',
        workoutType: "Muscle",
        workouts: [
            {
                id: '1',
                workoutImage: require('../../assets/images/exercises/exercise11.png'),
                workoutName: "Push up",
                workoutTime: '0:30',
            },
            {
                id: '2',
                workoutImage: require('../../assets/images/exercises/exercise12.png'),
                workoutName: "Plank up",
                workoutTime: '0:30',
            },
        ],
    },
];

const diets = [
    {
        id: '1',
        foodImage: require('../../assets/images/food/food2.png'),
        mealsCategory: 'Breakfast',
        foodName: 'Poteto pancakes',
        eatTime: '8.00 AM',
    },
    {
        id: '2',
        foodImage: require('../../assets/images/food/food4.png'),
        mealsCategory: 'Lunch',
        foodName: 'Vegan Gravy',
        eatTime: '12.00 PM',
    },
    {
        id: '3',
        foodImage: require('../../assets/images/food/food5.png'),
        mealsCategory: 'Snake',
        foodName: 'Rosted vegan pasta',
        eatTime: '5.00 PM',
    },
    {
        id: '4',
        foodImage: require('../../assets/images/food/food6.png'),
        mealsCategory: 'Dinner',
        foodName: 'Vegan tacos',
        eatTime: '8.00 PM',
    },
    {
        id: '5',
        foodImage: require('../../assets/images/food/food7.png'),
        mealsCategory: 'Dinner side',
        foodName: 'Salad',
        eatTime: '8.00 PM',
    },
];

const ScheduleWorkoutAndDietScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`scheduleWorkoutAndDiet:${key}`)
    }

    const monthsList = [t('calender:jan'), t('calender:feb'), t('calender:mar'), t('calender:apr'), t('calender:may'), t('calender:jun'), t('calender:jul'), t('calender:aug'), t('calender:sep'), t('calender:oct'), t('calender:nov'), t('calender:dec')];

    const [state, setState] = useState({
        defaultDate: new Date().getDate(),
        defaultMonth: new Date().getMonth(),
        defaultYear: new Date().getFullYear(),
        showFullCalender: false,
        selectedIndex: 1,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { defaultDate, defaultMonth, defaultYear, showFullCalender, selectedIndex } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {calendarInfo()}
                {workoutAndDietTab()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {selectedDayAndWorkoutsInfo()}
                            {
                                selectedIndex == 1
                                    ?
                                    workoutInfo()
                                    :
                                    dietInfo()
                            }
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )

    function dietInfo() {
        const renderItem = ({ item }) => {
            return (
                <View style={{ ...styles.dietInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <Image
                        source={item.foodImage}
                        style={{ width: width / 3.0, height: width / 3.0, borderRadius: Sizes.fixPadding - 2.0 }}
                    />
                    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding * 2.0, alignItems: isRtl ? 'flex-end' : 'flex-start' }}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.mealsCategory}
                        </Text>
                        <Text style={{ marginVertical: Sizes.fixPadding - 7.0, ...Fonts.blackColor16Regular }}>
                            {item.foodName}
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>
                            {item.eatTime}
                        </Text>
                    </View>
                </View>
            )
        }
        return (
            <FlatList
                data={diets}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        )
    }

    function workoutInfo() {
        const renderItem = ({ item }) => {
            return (
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <Text
                        style={{
                            marginBottom: Sizes.fixPadding,
                            textAlign: isRtl ? 'right' : 'left',
                            ...Fonts.blackColor16SemiBold
                        }}
                    >
                        {item.workoutType}
                    </Text>
                    {
                        item.workouts.map((item) => (
                            <View
                                key={`${item.id}`}
                                style={styles.workoutInfoWrapStyle}
                            >
                                <Image
                                    source={item.workoutImage}
                                    style={styles.workoutImageStyle}
                                />
                                <View style={{
                                    ...styles.workoutDetailWrapStyle,
                                    flexDirection: isRtl ? 'row-reverse' : 'row',
                                }}>
                                    <Text style={{ flex: 1, ...Fonts.blackColor14Regular }}>
                                        {item.workoutName}
                                    </Text>
                                    <Text style={{ ...Fonts.blackColor14Regular }}>
                                        {item.workoutTime}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            )
        }
        return (
            <FlatList
                data={workouts}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        )
    }

    function selectedDayAndWorkoutsInfo() {
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    alignItems: isRtl ? 'flex-end' : 'flex-start',
                    marginBottom: Sizes.fixPadding * 2.0
                }}
            >
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {defaultDate} {monthsList[defaultMonth]}
                </Text>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    {selectedIndex == 1 ? tr('totalWorkouts') : tr('totalMealPlans')}
                </Text>
            </View>
        )
    }

    function workoutAndDietTab() {
        return (
            <View style={{ ...styles.workoutAndDietTabWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                {tabShort({ tab: tr('workout'), index: 1 })}
                {tabShort({ tab: tr('diet'), index: 2 })}
            </View>
        )
    }

    function tabShort({ tab, index, }) {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => updateState({ selectedIndex: index })}
                style={{
                    backgroundColor: selectedIndex == index ? Colors.primaryColor : Colors.whiteColor,
                    borderTopLeftRadius: isRtl ? index == 2 ? Sizes.fixPadding - 2.0 : 0.0 : index == 1 ? Sizes.fixPadding - 2.0 : 0.0,
                    borderBottomLeftRadius: isRtl ? index == 2 ? Sizes.fixPadding - 2.0 : 0.0 : index == 1 ? Sizes.fixPadding - 2.0 : 0.0,
                    borderTopRightRadius: isRtl ? index == 1 ? Sizes.fixPadding - 2.0 : 0.0 : index == 2 ? Sizes.fixPadding - 2.0 : 0.0,
                    borderBottomRightRadius: isRtl ? index == 1 ? Sizes.fixPadding - 2.0 : 0.0 : index == 2 ? Sizes.fixPadding - 2.0 : 0.0,
                    ...styles.workoutAndDietTabStyle,
                }}
            >
                <Text style={selectedIndex == index ? { ...Fonts.whiteColor16SemiBold } : { ...Fonts.grayColor16SemiBold }}>
                    {tab}
                </Text>
            </TouchableOpacity>
        )
    }

    function calendarInfo() {
        return (
            <View style={{ flex: showFullCalender ? 1 : 0, zIndex: showFullCalender ? 1 : 0, }}>
                <View style={{
                    ...styles.calendarWrapStyle,
                    height: showFullCalender ? 380 : 150.0,
                }}>
                    <Calendar
                        monthFormat={`${defaultDate} MMMM  yyyy`}
                        hideExtraDays={true}
                        disableMonthChange={true}
                        firstDay={0}
                        renderArrow={direction => direction == 'left'
                            ?
                            <MaterialIcons name="arrow-back-ios" color={Colors.blackColor} size={20} style={{ marginLeft: -Sizes.fixPadding, bottom: 40.0, }} />
                            :
                            <MaterialIcons name="arrow-forward-ios" color={defaultMonth == new Date().getMonth() ? Colors.grayColor : Colors.blackColor} size={20} style={{ right: 20.0, bottom: 40.0, }} />
                        }
                        renderHeader={date => {
                            return (
                                <Text numberOfLines={1} style={{ ...styles.calenderSelectedDateStyle, maxWidth: width / 2.0, }}>
                                    {defaultDate} {monthsList[defaultMonth]} {defaultYear}
                                </Text>
                            )
                        }}
                        dayComponent={({ date, state }) => { return dayComponent({ date, state }) }}
                        theme={{
                            calendarBackground: 'transparent',
                            textSectionTitleColor: Colors.blackColor,
                            textMonthFontFamily: 'Montserrat_Regular',
                            textDayHeaderFontFamily: 'Montserrat_Medium',
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16,
                        }}
                        hideDayNames={true}
                        onPressArrowLeft={subtractMonth => {
                            subtractMonth()
                            updateState({ defaultMonth: defaultMonth - 1 })
                        }}
                        onPressArrowRight={addMonth => {
                            if (defaultMonth !== new Date().getMonth()) {
                                addMonth()
                                updateState({ defaultMonth: defaultMonth + 1 })
                            }
                        }}
                        enableSwipeMonths={true}
                        style={{ borderRadius: Sizes.fixPadding + 5.0, paddingTop: Sizes.fixPadding * 4.0, }}
                    />
                    {upDownCalenderIcon()}
                    {calendarDays()}
                </View>
            </View>
        )
    }

    function dayComponent({ date, state }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({
                        selectedDate: `${monthsList[date.month - 1]} ${date.year}`,
                        defaultDate: date.day,
                        defaultMonth: date.month - 1
                    })
                }}
                style={{
                    ...styles.dayWrapStyle,
                    backgroundColor: date.day == defaultDate ? Colors.primaryColor : Colors.whiteColor
                }}
            >
                <Text style={date.day == defaultDate ? { ...Fonts.whiteColor18SemiBold } : { ...Fonts.grayColor18SemiBold }}>
                    {date.day}
                </Text>
            </TouchableOpacity>
        )
    }

    function upDownCalenderIcon() {
        return (
            <MaterialIcons
                name={showFullCalender ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
                color="black"
                style={{ position: 'absolute', right: 15.0, top: 15.0, }}
                onPress={() => updateState({ showFullCalender: !showFullCalender })}
            />
        )
    }

    function calendarDays() {
        return (
            <View style={{ ...styles.dayNameWrapStyle }}>
                {dayNames.map((item, index) => (
                    <Text
                        key={`${index}`}
                        style={{ width: 25.0, ...Fonts.blackColor18Bold, textAlign: 'center' }}
                    >
                        {item}
                    </Text>
                ))}
            </View>
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name={isRtl ? "arrow-forward" : "arrow-back"}
                    size={24} color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    {tr('header')}
                </Text>
            </View>
        )
    }
}

export default ScheduleWorkoutAndDietScreen

const styles = StyleSheet.create({
    dietInfoWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
    },
    calenderSelectedDateStyle: {
        flex: 1,
        ...Fonts.blackColor18Bold,
        bottom: 30.0,
        left: -100.0,
        position: 'absolute'
    },
    dayWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35.0,
        height: 35.0,
    },
    dayNameWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        left: 15.0,
        right: 15.0,
        top: 50.0,
    },
    calendarWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding + 5.0,
        overflow: 'hidden'
    },
    workoutAndDietTabStyle: {
        paddingVertical: Sizes.fixPadding - 3.0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    workoutAndDietTabWrapStyle: {
        marginVertical: Sizes.fixPadding * 2.5,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        ...CommonStyles.shadow,
    },
    workoutImageStyle: {
        width: '100%',
        height: 126.0,
        borderTopLeftRadius: Sizes.fixPadding - 2.0,
        borderTopRightRadius: Sizes.fixPadding - 2.0,
        resizeMode: 'stretch'
    },
    workoutDetailWrapStyle: {
        padding: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    workoutInfoWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 2.0,
        elevation: 2.0,
        ...CommonStyles.shadow
    }
})