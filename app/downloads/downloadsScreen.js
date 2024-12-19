import { StyleSheet, Text, View, FlatList, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window')

const downloadsList = [
    {
        id: '1',
        isExercise: false,
        image: require('../../assets/images/food/food8.png'),
        title: "Vegan Diet",
        description: `15 day plan`,
    },
    {
        id: '2',
        isExercise: false,
        image: require('../../assets/images/food/food9.png'),
        title: "Keto Diet",
        description: `10 day plan`,
    },
    {
        id: '3',
        isExercise: true,
        image: require('../../assets/images/exercises/exercise15.png'),
        title: "Jog in place",
    },
    {
        id: '4',
        isExercise: true,
        image: require('../../assets/images/exercises/exercise16.png'),
        title: "Jog in place",
    },
    {
        id: '5',
        isExercise: false,
        image: require('../../assets/images/food/food12.png'),
        title: "Fruit Diet",
        description: `10 day plan`,
    },
];

const DownloadsScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`downloadsScreen:${key}`)
    }

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [downloadsData, setDownloadsData] = useState(downloadsList);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {
                    downloadsData.length == 0
                        ?
                        noDownloadsDataInfo()
                        :
                        favoriteItems()
                }
            </View>
            {snackBar()}
        </View>
    )

    function noDownloadsDataInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name="arrow-collapse-down" size={40} color={Colors.grayColor} />
                <Text style={{ ...Fonts.grayColor16Medium, marginTop: Sizes.fixPadding }}>
                    {tr('nothingInDown')}
                </Text>
            </View>
        )
    }

    function snackBar() {
        return (
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                style={{ backgroundColor: Colors.lightBlackColor }}
                elevation={0}
            >
                <Text style={{ ...Fonts.whiteColor14Medium, textAlign: isRtl ? 'right' : 'left' }}>
                    {tr('removeMessage')}
                </Text>
            </Snackbar>
        )
    }

    function updateDownloads({ id }) {
        const copyData = downloadsData;
        const updatedData = copyData.filter((item) => item.id != id)
        setShowSnackBar(true);
        setDownloadsData(updatedData);
    }

    function favoriteItems() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { navigation.push(item.isExercise ? 'userProgram/userProgramScreen' : 'mealCategoryVideo/mealCategoryVideoScreen') }}
                style={styles.downloadsInfoWrapStyle}
            >
                <ImageBackground
                    source={item.image}
                    style={{ height: height / 6.0, justifyContent: 'center', }}
                    borderTopLeftRadius={Sizes.fixPadding - 2.0}
                    borderTopRightRadius={Sizes.fixPadding - 2.0}
                >
                    <MaterialIcons
                        name={"close"}
                        size={18}
                        color={Colors.blackColor}
                        style={{ top: 5.0, right: isRtl ? null : 5.0, left: isRtl ? 5.0 : null, position: 'absolute', }}
                        onPress={() => { updateDownloads({ id: item.id }) }}
                    />
                    <MaterialIcons
                        name='play-arrow'
                        color={Colors.whiteColor}
                        size={30}
                        style={{ alignSelf: 'center', position: 'absolute' }}
                    />
                </ImageBackground>
                <View style={{ alignItems: 'center', paddingVertical: item.description ? Sizes.fixPadding - 5.0 : Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {item.title}
                    </Text>
                    {
                        item.description
                            ?
                            <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor12Medium }}>
                                {item.description}
                            </Text>
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={downloadsData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding, }}
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
                    {tr('header')}
                </Text>
            </View>
        )
    }
}

export default DownloadsScreen

const styles = StyleSheet.create({
    downloadsInfoWrapStyle: {
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        ...CommonStyles.shadow,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
        maxWidth: (width / 2.0) - 30,
    },

})