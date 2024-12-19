import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const progressesList = [
    {
        id: '1',
        progress: 65,
        progressType: "Lose weight",
    },
    {
        id: '2',
        progress: 25,
        progressType: "Drinking Water",
    },
    {
        id: '3',
        progress: 50,
        progressType: "Calories Gain",
    },
    {
        id: '4',
        progress: 65,
        progressType: "Calories Burn"
    },
];

const ProgressReportScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`progressReportScreen:${key}`)
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {progressInfo()}
                    {progresses()}
                </ScrollView>
            </View>
        </View>
    )

    function progresses() {
        return (
            progressesList.map((item) => (
                <View
                    key={`${item.id}`}
                    style={{ ...styles.progressInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Progress.Circle
                            progress={item.progress / 100}
                            size={48}
                            unfilledColor={Colors.lightGrayColor}
                            borderWidth={0.0}
                            color={Colors.primaryColor}
                            thickness={2}
                        />
                        <Text style={{ ...styles.progressPercentageStyle, ...Fonts.primaryColor16SemiBold }}>
                            {item.progress}%
                        </Text>
                    </View>
                    <Text
                        numberOfLines={1}
                        style={{
                            textAlign: isRtl ? 'right' : 'left',
                            flex: 1,
                            marginRight: isRtl ? Sizes.fixPadding * 2.0 : 0.0,
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding * 2.0,
                            ...Fonts.blackColor16SemiBold
                        }}>
                        {item.progressType}
                    </Text>
                </View>
            ))
        )
    }

    function progressInfo() {
        return (
            <View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Progress.Circle
                        progress={0.65}
                        size={width / 2.8}
                        unfilledColor={Colors.lightGrayColor}
                        borderWidth={0.0}
                        color={Colors.primaryColor}
                        thickness={8}
                    />
                    <Text style={{ ...styles.progressPercentageStyle }}>
                        65%
                    </Text>
                </View>
                <Text style={{ textAlign: 'center', ...Fonts.grayColor16SemiBold, margin: Sizes.fixPadding + 5.0, }}>
                    65% {tr('completedGoal')}
                </Text>
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

export default ProgressReportScreen;

const styles = StyleSheet.create({
    progressPercentageStyle: {
        position: 'absolute',
        textAlign: 'center',
        marginTop: Sizes.fixPadding,
        ...Fonts.primaryColor24SemiBold
    },
    progressInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 1.5,
        ...CommonStyles.shadow,
        borderColor: Colors.lightGrayColor,
        borderWidth: 0.50,
        borderBottomWidth: 0.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
    }
})