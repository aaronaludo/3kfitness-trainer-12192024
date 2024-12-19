import { StyleSheet, Text, View, FlatList, Animated, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width } = Dimensions.get('window');

const rowTranslateAnimatedValues = {};

const newNotificationsList = [
    {
        key: '1',
        title: "Congratulation",
        description: "50% of your daiy task is completed.",
        notificationTime: "2 min",
    },
    {
        key: '2',
        title: "Attention",
        description: "Your plan is expire very soon. subscribe now",
        notificationTime: "2 min",
    },
];

const oldNotificationsList = [
    {
        key: '1',
        title: "Daily Task",
        description: "It’s time to drink a water.",
        notificationTime: "3:00 PM",
    },
    {
        key: '2',
        title: "Drink more",
        description: "You drink only 200ml today. to reach your goal yo drink 500ml more.",
        notificationTime: "5:00 PM",
    },
    {
        key: '3',
        title: "Appointment",
        description: "You fix appointment yoga specialist mr joy.",
        notificationTime: "9:00 PM",
    },
];

const AttendanceScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`notificationScreen:${key}`)
    }

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState([]);
    const [oldListData, setOldListData] = useState(oldNotificationsList);
    const [attendanceData, setAttendanceData] = useState([]);
    
    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    Array(oldListData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        if ((value < -width || value > width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} ${tr('dismissed')}`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    useEffect(() => {
        const fetchAttendanceHistories = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
    
                if (!token) {
                    throw new Error('No token found');
                }
    
                const response = await axios.get('https://3kfitness.web-create.online/api/attendance-histories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
    
                // Check if data exists
                const attendanceData = response.data.data;
    
                // Transform data to match the required structure
                const formattedData = attendanceData.map((entry, index) => {
                    const clockInTime = new Date(entry.clockin_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const clockOutTime = entry.clockout_at ? new Date(entry.clockout_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
    
                    return {
                        key: String(entry.id), // Use the id as key
                        title: clockOutTime ? "Clocked Out" : "Clocked In",
                        description: clockOutTime 
                            ? `Clocked out at ${clockOutTime} on ${new Date(entry.clockout_at).toLocaleDateString()}`
                            : `Clocked in at ${clockInTime} on ${new Date(entry.clockin_at).toLocaleDateString()}`,
                        notificationTime: clockInTime, // Show clock-in time
                    };
                });
    
                // Update the state with the formatted data
                setListData(formattedData); // Assuming you're using `setListData` to update your state
                console.log(formattedData);
            } catch (error) {
                Alert.alert('Error', error.response?.data?.message || error.message || 'Something went wrong');
            }
        };
    
        fetchAttendanceHistories();
    }, []);

    const renderItem = data => (
        <Animated.View>
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={{ ...styles.notificationWrapStyle, }}>
                    <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, alignItems: isRtl ? 'flex-end' : 'flex-start' }}>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                {data.item.title}
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                {data.item.description}
                            </Text>
                        </View>
                        <Text style={{ ...Fonts.primaryColor16Medium }}>
                            {data.item.notificationTime}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    const oldOnSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        if ((value < -width || value > width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...oldListData];
                const prevIndex = oldListData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = oldListData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} ${tr('dismissed')}`);

                setOldListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const oldRenderItem = data => (
        <Animated.View>
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={{
                    ...styles.notificationWrapStyle,
                    borderWidth: 0.0,
                    elevation: 2.0,
                    ...CommonStyles.shadow
                }}>
                    <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, alignItems: isRtl ? 'flex-end' : 'flex-start' }}>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                {data.item.title}
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                {data.item.description}
                            </Text>
                        </View>
                        <Text style={{ ...Fonts.grayColor16Medium }}>
                            {data.item.notificationTime}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const oldRenderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

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
                    Attendance Histories
                </Text>
            </View>
        )
    }

    function newNotificationInfo() {
        return (
            <View>
                <SwipeListView
                    listKey='newList'
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-width}
                    leftOpenValue={width}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                />
            </View>
        )
    }

    function oldNotificationInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
                {
                    oldListData.length == 0
                        ?
                        null
                        :
                        <Text style={{
                            textAlign: isRtl ? 'right' : 'left',
                            marginBottom: Sizes.fixPadding,
                            marginHorizontal: Sizes.fixPadding * 2.0,
                            ...Fonts.grayColor16SemiBold
                        }}>
                            {tr('yesterday')}
                        </Text>
                }
                <SwipeListView
                    listKey='oldNotification'
                    data={oldListData}
                    renderItem={oldRenderItem}
                    renderHiddenItem={oldRenderHiddenItem}
                    rightOpenValue={-width}
                    leftOpenValue={width}
                    onSwipeValueChange={oldOnSwipeValueChange}
                    useNativeDriver={false}
                />
            </View>
        )
    }

    function noNotificationInfo() {
        return (
            <View style={styles.noNotificationWrapStyle}>
                <MaterialIcons name="notifications-off" size={40} color={Colors.grayColor} />
                <Text style={{ ...Fonts.grayColor16Medium, marginTop: Sizes.fixPadding }}>
                    {tr('noNotification')}
                </Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {listData.length == 0 && oldListData.length == 0 ?
                    noNotificationInfo()
                    :
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {newNotificationInfo()}
                                {/* {oldNotificationInfo()} */}
                            </>
                        }
                    />
                }
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={showSnackBar}
                    onDismiss={() => setShowSnackBar(false)}
                >
                    <Text
                        style={{ textAlign: isRtl ? 'right' : 'left', ...Fonts.whiteColor14Medium }}
                    >
                        {snackBarMsg}
                    </Text>
                </Snackbar>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    snackBarStyle: {
        backgroundColor: Colors.lightBlackColor,
        elevation: 0.0,
    },
    notificationWrapStyle: {
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        borderColor: Colors.primaryColor,
        backgroundColor: Colors.whiteColor
    },
    noNotificationWrapStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding * 3.0
    }
});

export default AttendanceScreen;