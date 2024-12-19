import { StyleSheet, Text, View, Modal, ScrollView, TextInput, ImageBackground, Dimensions, TouchableOpacity, Platform, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');

const EditProfileScreen = () => {

    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    function tr(key) {
        return t(`editProfileScreen:${key}`);
    }

    const isRtl = i18n.dir() === 'rtl';

    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
        email: '',
        showBottomSheet: false,
    });
    
    const { first_name, last_name, address, phone_number, email, showBottomSheet } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const handleLogin = async () => {
        if (!email || !first_name || !last_name || !address || !phone_number) {
            Alert.alert('Error', 'Please Enter All Fields');
            return;
        }
    
        const token = await AsyncStorage.getItem("token");
    
        if (!token) {
            Alert.alert('Error', 'No token found');
            return;
        }
    
        try {
            const response = await axios.post(
                'https://3kfitness.web-create.online/api/trainers/edit-profile',
                {
                    first_name: first_name,
                    last_name: last_name,
                    address: address,
                    phone_number: phone_number,
                    email: email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
    
            const user = response.data.user;
    
            await AsyncStorage.setItem('user', JSON.stringify(user));
    
            Alert.alert('Success', 'Edit Profile successful');
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Edit Profile failed');
        }
    };
    

    useEffect(() => {
        const fetchUser = async () => {
            try {
              const user = await AsyncStorage.getItem("user");
      
              if (user) {
                setState({
                    first_name: JSON.parse(user).first_name,
                    last_name: JSON.parse(user).last_name,
                    address: JSON.parse(user).address,
                    phone_number: JSON.parse(user).phone_number,
                    email: JSON.parse(user).email,
                    showBottomSheet: false,
                })
              }
            } catch (error) {
              console.error("Error fetching user email:", error);
            }
          };
      
          fetchUser();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {profilePicWithChangeOption()}
                    {nameInfo()}
                    {lastNameInfo()}
                    {emailInfo()}
                    {phoneNumberInfo()}
                    {addressInfo()}
                    {/* {passwordInfo()}
                    {passwordConfirmationInfo()} */}
                    {updateButton()}
                </ScrollView>
            </View>
            {changeProfilePicOptionsSheet()}
        </View>
    );

    function changeProfilePicOptionsSheet() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showBottomSheet}
                onRequestClose={() => {
                    updateState({ showBottomSheet: false });
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        updateState({ showBottomSheet: false });
                    }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{ ...styles.bottomSheetStyle }}
                        >
                            <View>
                                <Text style={{ textAlign: 'center', ...Fonts.blackColor18Bold }}>
                                    {tr('sheetTitle')}
                                </Text>
                                <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
                                    {profilePicOptionShort({ title: tr('cameraOption'), onPress: () => { updateState({ showBottomSheet: false }) } })}
                                    {profilePicOptionShort({ title: tr('galleryOption'), onPress: () => { updateState({ showBottomSheet: false }) } })}
                                    {profilePicOptionShort({ title: tr('remove'), onPress: () => { updateState({ showBottomSheet: false }) } })}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }

    function profilePicOptionShort({ title, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', marginBottom: Sizes.fixPadding + 5.0 }}
            >
                <Text>•</Text>
                <Text style={{ marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0, ...Fonts.blackColor16Regular }}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }

    function updateButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleLogin}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('update')}
                </Text>
            </TouchableOpacity>
        );
    }

    // function passwordConfirmationInfo() {
    //     return (
    //         <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
    //             <Text style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
    //                 {tr('passwordConfirmation')}
    //             </Text>
    //             <TextInput
    //                 value={password_confirmation}
    //                 onChangeText={(text) => updateState({ password_confirmation: text })}
    //                 style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left' }}
    //                 selectionColor={Colors.primaryColor}
    //                 secureTextEntry
    //             />
    //         </View>
    //     );
    // }

    // function passwordInfo() {
    //     return (
    //         <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
    //             <Text style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
    //                 {tr('password')}
    //             </Text>
    //             <TextInput
    //                 value={password}
    //                 onChangeText={(text) => updateState({ password: text })}
    //                 style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left' }}
    //                 selectionColor={Colors.primaryColor}
    //                 secureTextEntry
    //             />
    //         </View>
    //     );
    // }

    function addressInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                    {tr('address')}
                </Text>
                <TextInput
                    value={address}
                    onChangeText={(text) => updateState({ address: text })}
                    style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left' }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        );
    }

    function phoneNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                    {tr('phoneNumber')}
                </Text>
                <TextInput
                    value={phone_number}
                    onChangeText={(text) => updateState({ phone_number: text })}
                    style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left' }}
                    selectionColor={Colors.primaryColor}
                    keyboardType="phone-pad"
                />
            </View>
        );
    }

    function emailInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                    {tr('email')}
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => updateState({ email: text })}
                    style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left' }}
                    selectionColor={Colors.primaryColor}
                    keyboardType="email-address"
                />
            </View>
        );
    }

    function lastNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                    {tr('lastName')}
                </Text>
                <TextInput
                    value={last_name}
                    onChangeText={(text) => updateState({ last_name: text })}
                    style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left' }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        );
    }

    function nameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                    {tr('firstName')}
                </Text>
                <TextInput
                    value={first_name}
                    onChangeText={(text) => updateState({ first_name: text })}
                    style={{ ...styles.textFieldStyle, textAlign: isRtl ? 'right' : 'left' }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        );
    }

    function profilePicWithChangeOption() {
        return (
            <ImageBackground
                source={require('../../assets/images/user/user1.png')}
                style={styles.profilePicStyle}
                borderRadius={(width / 3.3) / 2.0}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => updateState({ showBottomSheet: true })}
                    style={styles.addIconWrapStyle}
                >
                    <MaterialIcons name="add" size={15} color={Colors.whiteColor} />
                </TouchableOpacity>
            </ImageBackground>
        );
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
        );
    }
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    addIconWrapStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: 22.0,
        height: 22.0,
        borderRadius: 11.0,
        borderColor: Colors.whiteColor,
        borderWidth: 1.5,
        position: 'absolute',
        right: 10.0,
        bottom: 0.0,
    },
    profilePicStyle: {
        width: width / 3.3,
        height: width / 3.3,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 2.5,
    },
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        elevation: 1,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        ...CommonStyles.shadow,
        shadowOpacity: 0.1,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Platform.OS === 'ios' ? Sizes.fixPadding + 3.0 : Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 1.2,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
    },
    bottomSheetStyle: {
        backgroundColor: Colors.whiteColor,
        paddingBottom: 20,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
    },
});
