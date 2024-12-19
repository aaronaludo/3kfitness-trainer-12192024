import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { withTranslation } from 'react-i18next';
import i18n from '../languages/index';//don't remove this line

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

function Route() {

  const [loaded] = useFonts({
    Montserrat_Regular: require("../assets/fonts/Montserrat-Regular.ttf"),
    Montserrat_Medium: require("../assets/fonts/Montserrat-Medium.ttf"),
    Montserrat_SemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    Montserrat_Bold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding/onboardingScreen" options={{ gestureEnabled: false }} />
      <Stack.Screen name="auth/signinScreen" options={{ gestureEnabled: false }} />
      <Stack.Screen name="auth/signupScreen" />
      <Stack.Screen name="auth/forgotPasswordScreen" />
      <Stack.Screen name="auth/otpVerification" />
      <Stack.Screen name="auth/newPasswordScreen" />
      <Stack.Screen name="genderSelection/genderSelectionScreen" />
      <Stack.Screen name="levelSelection/levelSelectionScreen" />
      <Stack.Screen name="goalSelection/goalSelectionScreen" />
      <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      <Stack.Screen name="scheduleWorkoutAndDiet/scheduleWorkoutAndDietScreen" />
      <Stack.Screen name="notification/notificationScreen" />
      <Stack.Screen name="trainerProfile/trainerProfileScreen" />
      <Stack.Screen name="subscriptionDetail/subscriptionDetailScreen" />
      <Stack.Screen name="chooseTime/chooseTimeScreen" />
      <Stack.Screen name="selectPaymentMethod/selectPaymentMethodScreen" />
      <Stack.Screen name="successPayment/successPaymentScreen" options={{ gestureEnabled: false }} />
      <Stack.Screen name="workoutCategoryDetail/workoutCategoryDetailScreen" />
      <Stack.Screen name="videos/videosScreen" />
      <Stack.Screen name="userProgram/userProgramScreen" />
      <Stack.Screen name="trainers/trainersScreen" />
      <Stack.Screen name="dietCategories/dietCategoriesScreen" />
      <Stack.Screen name="mealCategoryVideo/mealCategoryVideoScreen" />
      <Stack.Screen name="dietCategoryDetail/dietCategoryDetailScreen" />
      <Stack.Screen name="dietDetail/dietDetailScreen" />
      <Stack.Screen name="progressReport/progressReportScreen" />
      <Stack.Screen name="editProfile/editProfileScreen" />
      <Stack.Screen name="privacyPolicy/privacyPolicyScreen" />
      <Stack.Screen name="about/aboutScreen" />
      <Stack.Screen name="favorite/favoriteScreen" />
      <Stack.Screen name="downloads/downloadsScreen" />
      <Stack.Screen name="help/helpScreen" />
      <Stack.Screen name="userSubscription/userSubscriptionScreen" />
      <Stack.Screen name="languages/languagesScreen" />
      <Stack.Screen name="qrcode/qrcodeScreen" />
      <Stack.Screen name="attendance/attendanceScreen" />
    </Stack>
  );
}

const ReloadAppOnLanguageChange = withTranslation('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(Route);

export default App = () => {
  return (
    <ReloadAppOnLanguageChange />
  );
}
