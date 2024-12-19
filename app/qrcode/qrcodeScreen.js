import { Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const qrCodeScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const user = await AsyncStorage.getItem("user");

        if (user) {
          setUserEmail(JSON.parse(user).email);
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, []);

  function tr(key) {
    return t(`aboutScreen:${key}`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: Sizes.fixPadding * 4.0,
            }}
          >
            <Text style={{ ...Fonts.blackColor16Bold, marginBottom: 20}}>
              Your Qr Code
            </Text>
            <View
              style={{
                padding: Sizes.fixPadding * 2.0,
                backgroundColor: Colors.whiteColor,
                borderRadius: 15,
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                marginBottom: 60
              }}
            >
              {userEmail ? (
                <QRCode value={userEmail} size={200} />
              ) : (
                <Text style={{ ...Fonts.grayColor16Regular }}>
                  {tr("loadingQRCode")}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );

  function header() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name={isRtl ? "arrow-forward" : "arrow-back"}
          size={24}
          color={Colors.blackColor}
          onPress={() => navigation.pop()}
        />
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding,
            ...Fonts.blackColor18SemiBold,
          }}
        >
          {tr("header")}
        </Text>
      </View>
    );
  }
};

export default qrCodeScreen;
