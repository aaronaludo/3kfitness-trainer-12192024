import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler,  StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

export default function TabLayout() {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == 'rtl';

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000)
  }

  function tr(key) {
    return t(`bottomTabsScreen:${key}`)
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.grayColor,
          tabBarLabelStyle: { fontSize: 14.0, fontFamily: 'Montserrat_SemiBold', },
          tabBarStyle: { height: 65.0, ...CommonStyles.shadow },
          tabBarItemStyle: { height: 55.0, }
        }}
        initialRouteName={'home/homeScreen'}
      >
        <Tabs.Screen
          name={isRtl ? 'profile/profileScreen' : 'home/homeScreen'}
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name={isRtl ? 'person-outline' : "home"} size={24} color={color} />,
            tabBarLabel: ({ focused }) => tabBarLabel({ label: isRtl ? tr('profile') : tr('home'), focused })
          }}
        />
        <Tabs.Screen
          name={isRtl ? 'home/homeScreen' : 'profile/profileScreen'}
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name={isRtl ? "home" : "person-outline"} size={24} color={color} />,
            tabBarLabel: ({ focused }) => tabBarLabel({ label: isRtl ? tr('home') : tr('profile'), focused }),
          }}
        />
      </Tabs>
      {exitInfo()}
    </View>
  );

  function tabBarLabel({ label, focused }) {
    return (
      <Text numberOfLines={1} style={focused ? { ...Fonts.primaryColor14Bold } : { ...Fonts.grayColor14SemiBold }}>
        {label}
      </Text>
    )
  }

  function exitInfo() {
    return (
      backClickCount == 1
        ?
        <View style={styles.animatedView}>
          <Text style={{ ...Fonts.whiteColor14Medium }}>
            {tr('exitText')}
          </Text>
        </View>
        :
        null
    )
  }
}

const styles = StyleSheet.create({
  animatedView: {
    backgroundColor: Colors.lightBlackColor,
    position: "absolute",
    bottom: 40,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
})