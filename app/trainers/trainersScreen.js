import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Image, } from 'react-native'
import React, { useState } from 'react'
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const trainers = [
    {
        id: '1',
        trainerImage: require('../../assets/images/trainers/trainer7.png'),
        trainerName: "Jems joy",
        speciality: "Yoga specialist",
        yearOfExperience: 6,
        rating: 4.5,
    },
    {
        id: '2',
        trainerImage: require('../../assets/images/trainers/trainer8.png'),
        trainerName: "Katin Markin",
        speciality: "S & C",
        yearOfExperience: 5,
        rating: 4.5,
    },
    {
        id: '3',
        trainerImage: require('../../assets/images/trainers/trainer9.png'),
        trainerName: "Devid Scot",
        speciality: "Food dietitians",
        yearOfExperience: 6,
        rating: 4.5,
    },
    {
        id: '4',
        trainerImage: require('../../assets/images/trainers/trainer10.png'),
        trainerName: "Ket Patel",
        speciality: "Hiit",
        yearOfExperience: 6,
        rating: 4.5,
    },
    {
        id: '5',
        trainerImage: require('../../assets/images/trainers/trainer11.png'),
        trainerName: "Rohit joy",
        speciality: "Yoga specialist",
        yearOfExperience: 6,
        rating: 4.5,
    },
    {
        id: '6',
        trainerImage: require('../../assets/images/trainers/trainer12.png'),
        trainerName: "Jems joy",
        speciality: "S & C",
        yearOfExperience: 6,
        rating: 4.5,
    },
    {
        id: '7',
        trainerImage: require('../../assets/images/trainers/trainer13.png'),
        trainerName: "Priti joy",
        speciality: "S & C",
        yearOfExperience: 6,
        rating: 4.5,
    },
    {
        id: '8',
        trainerImage: require('../../assets/images/trainers/trainer14.png'),
        trainerName: "Madhuri patel",
        speciality: "S & C",
        yearOfExperience: 6,
        rating: 4.5,
    },
    {
        id: '9',
        trainerImage: require('../../assets/images/trainers/trainer7.png'),
        trainerName: "Jems joy",
        speciality: "Yoga specialist",
        yearOfExperience: 6,
        rating: 4.5,
    },
];

const TrainersScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`trainersScreen:${key}`)
    }

    const [search, setSearch] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {searchField()}
                {trainersData()}
            </View>
        </View>
    )

    function trainersData() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push('trainerProfile/trainerProfileScreen')}
                style={{ ...styles.trainerInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}
            >
                <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', }}>
                    <Image
                        source={item.trainerImage}
                        style={{ width: 70.0, height: 70.0, borderRadius: 35.0, }}
                    />
                    <View style={{ alignItems: isRtl ? 'flex-end' : 'flex-start', flex: 1, marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0 }}>
                        <View style={{ alignItems: isRtl ? 'flex-end' : 'flex-start', marginBottom: Sizes.fixPadding - 6.0 }}>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.trainerName}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                {item.speciality}
                            </Text>
                        </View>
                        <View style={{ marginTop: Sizes.fixPadding - 6.0, }}>
                            <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                                {item.yearOfExperience} {tr('years')}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                {tr('experiance')}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialIcons name="star" size={16} color={Colors.yellowColor} />
                    <Text style={{
                        marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 7.0,
                        marginRight: isRtl ? Sizes.fixPadding - 7.0 : 0.0,
                        ...Fonts.blackColor14SemiBold
                    }}>
                        {item.rating}
                    </Text>
                </View>
            </TouchableOpacity >
        )
        return (
            <FlatList
                data={trainers}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0, }}
                automaticallyAdjustKeyboardInsets={true}
            />
        )
    }

    function searchField() {
        return (
            <View style={{ ...styles.searchFieldWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <MaterialIcons name="search" size={22} color={Colors.grayColor} />
                <TextInput
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    selectionColor={Colors.primaryColor}
                    style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left' }}
                    placeholder='Search here...'
                    placeholderTextColor={Colors.grayColor}
                />
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

export default TrainersScreen;

const styles = StyleSheet.create({
    searchFieldWrapStyle: {
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: '#F0F0F0',
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        height: 20.0,
        flex: 1,
        marginHorizontal: Sizes.fixPadding,
    },
    trainerInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 1.5,
        ...CommonStyles.shadow,
        shadowOpacity: 0.1,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
    }
})