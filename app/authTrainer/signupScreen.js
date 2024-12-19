import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const SignupScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`signupScreen:${key}`);
  }

  const [state, setState] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    showPassword: false,
  });

  const { fullName, email, phoneNumber, password, showPassword } = state;

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {backArrow()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {header()}
          {fullNameTextField()}
          {emailIdTextField()}
          {phoneNumberTextField()}
          {passwordTextField()}
          {signupButton()}
          {/* {connectWithInfo()} */}
        </ScrollView>
      </View>
      {alreadyAccountInfo()}
    </View>
  );

  function alreadyAccountInfo() {
    return (
      <Text style={styles.alreadyAccountTextStyle}>
        {tr("alreadyAccount")} {}
        <Text
          onPress={() => navigation.push("auth/signinScreen")}
          style={{ ...Fonts.primaryColor16SemiBold }}
        >
          {tr("signin")}
        </Text>
      </Text>
    );
  }

  function connectWithInfo() {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ ...Fonts.grayColor16Medium }}>{tr("connect")}</Text>
        <View
          style={{
            margin: Sizes.fixPadding * 2.0,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          {socialMediaOptionShort({
            bgColor: "#4267B2",
            icon: require("../../assets/images/icons/facebook.png"),
          })}
          {socialMediaOptionShort({
            bgColor: Colors.whiteColor,
            icon: require("../../assets/images/icons/google.png"),
          })}
        </View>
      </View>
    );
  }

  function socialMediaOptionShort({ bgColor, icon }) {
    return (
      <View
        style={{
          ...styles.socialMediaIconWrapStyle,
          backgroundColor: bgColor,
        }}
      >
        <Image
          source={icon}
          style={{ width: 20.0, height: 20.0, resizeMode: "contain" }}
        />
      </View>
    );
  }

  function signupButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.push("auth/otpVerification", { from: "signup" })
        }
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor16Bold }}>{tr("signup")}</Text>
      </TouchableOpacity>
    );
  }

  function passwordTextField() {
    return (
      <View
        style={{
          ...styles.textFieldWrapStyle,
          ...styles.passwordFieldStyle,
          flexDirection: isRtl ? "row-reverse" : "row",
        }}
      >
        <TextInput
          value={password}
          onChangeText={(text) => updateState({ password: text })}
          placeholder={tr("password")}
          style={{
            ...Fonts.blackColor14Regular,
            textAlign: isRtl ? "right" : "left",
            flex: 1,
            marginLeft: isRtl ? Sizes.fixPadding : 0.0,
          }}
          selectionColor={Colors.primaryColor}
          placeholderTextColor={"#8D8D8D"}
          secureTextEntry={!showPassword}
        />
        <MaterialCommunityIcons
          name={showPassword ? "eye" : "eye-off"}
          size={18}
          color={Colors.grayColor}
          onPress={() => updateState({ showPassword: !showPassword })}
        />
      </View>
    );
  }

  function phoneNumberTextField() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <TextInput
          value={phoneNumber}
          onChangeText={(text) => updateState({ phoneNumber: text })}
          placeholder={tr("phone")}
          style={{
            ...Fonts.blackColor14Regular,
            textAlign: isRtl ? "right" : "left",
          }}
          selectionColor={Colors.primaryColor}
          keyboardType="phone-pad"
          placeholderTextColor={"#8D8D8D"}
        />
      </View>
    );
  }

  function emailIdTextField() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <TextInput
          value={email}
          onChangeText={(text) => updateState({ email: text })}
          placeholder={tr("email")}
          style={{
            ...Fonts.blackColor14Regular,
            textAlign: isRtl ? "right" : "left",
          }}
          selectionColor={Colors.primaryColor}
          keyboardType="email-address"
          placeholderTextColor={"#8D8D8D"}
        />
      </View>
    );
  }

  function fullNameTextField() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <TextInput
          value={fullName}
          onChangeText={(text) => updateState({ fullName: text })}
          placeholder={tr("name")}
          style={{
            ...Fonts.blackColor14Regular,
            textAlign: isRtl ? "right" : "left",
          }}
          selectionColor={Colors.primaryColor}
          placeholderTextColor={"#8D8D8D"}
        />
      </View>
    );
  }

  function header() {
    return <Text style={styles.headerWrapStyle}>Sign Up (Trainer)</Text>;
  }

  function backArrow() {
    return (
      <MaterialIcons
        name={isRtl ? "arrow-forward" : "arrow-back"}
        size={24}
        color={Colors.blackColor}
        style={{
          margin: Sizes.fixPadding * 2.0,
          alignSelf: isRtl ? "flex-end" : "flex-start",
        }}
        onPress={() => navigation.pop()}
      />
    );
  }
};

export default SignupScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    marginBottom: Sizes.fixPadding * 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    textAlign: "center",
    ...Fonts.blackColor24SemiBold,
  },
  textFieldWrapStyle: {
    borderColor: Colors.grayColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 2.0,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 3.5,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  passwordFieldStyle: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0.0,
  },
  socialMediaIconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding - 5.0,
    elevation: 3.0,
    ...CommonStyles.shadow,
  },
  alreadyAccountTextStyle: {
    textAlign: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding + 5.0,
    ...Fonts.grayColor16Regular,
  },
});
