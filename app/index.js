import { Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { Fonts } from '../constants/styles';
import MyStatusBar from '../components/myStatusBar';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const SplashScreen = () => {

    const navigation = useNavigation();

    setTimeout(() => {
        navigation.push('onboarding/onboardingScreen');
    }, 2000);

    return (
        <View style={{ flex: 1, backgroundColor: '#F8FEFF' }}>
            <MyStatusBar />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {appIcon()}
                {appName()}
            </View>
        </View>
    )

    function appName() {
        return (
            <Text style={{ ...Fonts.primaryColor48SemiBold }}>
                Fitness
            </Text>
        )
    }

    function appIcon() {
        return (
            <Image
                source={require('../assets/images/icons/appIcon.png')}
                style={{ width: width / 5.0, height: width / 5.0, resizeMode: 'contain' }}
            />
        )
    }
}

export default SplashScreen;
