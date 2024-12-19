import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Modal, FlatList, Dimensions, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');

const WorkoutCategoryDetailScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`workoutCategoryDetailScreen:${key}`)
    }

    var {item} = useLocalSearchParams();
    const workouts = JSON.parse(item);

    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {workoutsInfo()}
            </View>
            {appointentDialog()}
        </View>
    )

    function appointentDialog() {
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

    function workoutsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { setShowAppointmentDialog(true) }}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0, borderRadius: Sizes.fixPadding - 2.0 }}
            >
                <ImageBackground
                    source={item.workoutImage}
                    style={styles.imageStyle}
                    borderRadius={Sizes.fixPadding - 2.0}
                    resizeMode="stretch"
                >
                    <Text style={{ textAlign: isRtl ? 'right' : 'left', margin: Sizes.fixPadding + 5.0, ...Fonts.whiteColor16SemiBold }}>
                        {item.workoutDescription}{`\n`}{item.totalWorkouts} workout
                    </Text>
                    <View style={{ ...styles.currencyWrapStyle, right: isRtl ? null : 5.0, left: isRtl ? 5.0 : null }}>
                        <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                            ₱
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={workouts.workouts}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
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
                    {workouts.category}
                </Text>
            </View>
        )
    }
}

export default WorkoutCategoryDetailScreen;

const styles = StyleSheet.create({
    currencyWrapStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        top: 5.0,
        position: 'absolute',
    },
    imageStyle: {
        height: height / 4.0,
        justifyContent: 'flex-end'
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