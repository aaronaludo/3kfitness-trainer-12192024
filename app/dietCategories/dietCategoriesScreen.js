import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, ImageBackground, } from 'react-native'
import React, { useState } from 'react'
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const { height } = Dimensions.get('window');

const DietCategoriesScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    function tr(key) {
        return t(`dietCategoriesScreen:${key}`)
    }

    const isRtl = i18n.dir() == 'rtl';

    var { dietCategories } = useLocalSearchParams();
    dietCategories = JSON.parse(dietCategories);

    const [dietCategoriesData, setDietCategoriesData] = useState(dietCategories);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {dietCategoriesInfo()}
            </View>
            {snackBar()}
        </View>
    )

    function snackBar() {
        return (
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                elevation={0}
            >
                <Text style={{ ...Fonts.whiteColor14Medium, textAlign: isRtl ? 'right' : 'left' }}>
                    {snackBarMsg}
                </Text>
            </Snackbar>
        )
    }

    function updateDietCategories({ id }) {
        const copyData = dietCategoriesData;
        const updatedData = copyData.map((item) => {
            if (item.id == id) {
                setSnackBarMsg(item.inFavorite ? tr('removeFromFav') : tr('addInFav'))
                return { ...item, inFavorite: !item.inFavorite }
            }
            else {
                return { ...item }
            }
        })
        setShowSnackBar(true);
        setDietCategoriesData(updatedData);
    }

    function dietCategoriesInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push('dietCategoryDetail/dietCategoryDetailScreen')}
                style={styles.dietCategoriesInfoWrapStyle}
            >
                <ImageBackground
                    source={item.foodImage}
                    style={{ height: height / 6.0 }}
                    borderTopLeftRadius={Sizes.fixPadding - 2.0}
                    borderTopRightRadius={Sizes.fixPadding - 2.0}
                >
                    <MaterialIcons
                        name={item.inFavorite ? "favorite" : "favorite-outline"}
                        size={22}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'flex-end', margin: Sizes.fixPadding - 5.0, }}
                        onPress={() => updateDietCategories({ id: item.id })}
                    />
                </ImageBackground>
                <View style={{ alignItems: 'center', padding: Sizes.fixPadding - 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                        {item.dietCategory}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor12Medium }}>
                        {item.planOfDays} day plan
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={dietCategoriesData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name={isRtl ? 'arrow-forward' : "arrow-back"}
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

export default DietCategoriesScreen;

const styles = StyleSheet.create({
    dietCategoriesInfoWrapStyle: {
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        ...CommonStyles.shadow,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    },
})