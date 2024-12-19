import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackHandler,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const SigninScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`signinScreen:${key}`);
  }

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  const [state, setState] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const { email, password, showPassword } = state;

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {emailIdTextField()}
          {passwordTextField()}
          {forgotPasswordText()}
          {signinButton()}
          {/* {selectRoleButton()} */}
          {/* {connectWithInfo()} */}
        </ScrollView>
      </View>
      {dontAccountInfo()}
      {exitInfo()}
      {selectRoleDialog()}
    </View>
  );

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={styles.animatedView}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>{tr("exitText")}</Text>
      </View>
    ) : null;
  }

  function dontAccountInfo() {
    return (
      <Text style={styles.dontAccountTextStyle}>
        {tr("dontAccount")} {}
        <Text
          onPress={() => navigation.push("auth/signupScreen")}
          style={{ ...Fonts.primaryColor16SemiBold }}
        >
          {tr("signup")}
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

  function signinButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        // onPress={() => navigation.push("auth/signupScreen")}
        onPress={() => setShowLogoutDialog(true)}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor16Bold }}>{tr("signin")}</Text>
      </TouchableOpacity>
    );
  }

  function selectRoleButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowLogoutDialog(true)}
        style={[styles.buttonStyle, { marginTop: 0 }]}
      >
        <Text style={{ ...Fonts.whiteColor16Bold }}>Select Role</Text>
      </TouchableOpacity>
    );
  }

  function selectRoleDialog() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLogoutDialog}
        onRequestClose={() => {
          setShowLogoutDialog(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShowLogoutDialog(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{
                backgroundColor: Colors.whiteColor,
                width: width - 40.0,
                borderRadius: Sizes.fixPadding - 2.0,
                alignSelf: "center",
              }}
            >
              <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text
                  style={{ textAlign: "center", ...Fonts.blackColor18Medium }}
                >
                  Select Role
                </Text>
                <View style={styles.cancelAndLogoutButtonWrapStyle}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShowLogoutDialog(false)}
                    style={{
                      ...styles.logoutButtonStyle,
                      ...styles.cancelAndLogoutButtonStyle,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        marginHorizontal: Sizes.fixPadding - 5.0,
                        ...Fonts.grayColor18SemiBold,
                      }}
                    >
                      Member
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setShowLogoutDialog(false);
                      //   navigation.push("auth/signinScreen");
                    }}
                    style={{
                      ...styles.logoutButtonStyle,
                      ...styles.cancelAndLogoutButtonStyle,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        marginHorizontal: Sizes.fixPadding - 5.0,
                        ...Fonts.whiteColor18SemiBold,
                      }}
                    >
                      Trainer
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
  function forgotPasswordText() {
    return (
      <Text
        onPress={() => navigation.push("auth/forgotPasswordScreen")}
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          ...Fonts.primaryColor14Regular,
          alignSelf: isRtl ? "flex-start" : "flex-end",
        }}
      >
        {tr("forgetPwd")}
      </Text>
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

  function header() {
    return <Text style={styles.headerWrapStyle}>{tr("header")}</Text>;
  }
};

export default SigninScreen;

const styles = StyleSheet.create({
  cancelAndLogoutButtonStyle: {
    elevation: 2.0,
    ...CommonStyles.shadow,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 2.0,
    paddingVertical: Sizes.fixPadding + 2.0,
    flex: 1,
    borderWidth: 1.0,
    borderBottomWidth: 0.0,
  },
  cancelButtonStyle: {
    backgroundColor: Colors.whiteColor,
    marginRight: Sizes.fixPadding,
    borderColor: Colors.lightGrayColor,
  },
  logoutButtonStyle: {
    backgroundColor: Colors.primaryColor,
    marginLeft: Sizes.fixPadding,
    borderColor: Colors.primaryColor,
  },
  cancelAndLogoutButtonWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  headerWrapStyle: {
    marginBottom: Sizes.fixPadding * 3.0,
    marginTop: Sizes.fixPadding * 6.0,
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
    marginBottom: Sizes.fixPadding - 5.0,
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
  dontAccountTextStyle: {
    textAlign: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding + 5.0,
    ...Fonts.grayColor16Regular,
  },
  animatedView: {
    backgroundColor: Colors.lightBlackColor,
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});
