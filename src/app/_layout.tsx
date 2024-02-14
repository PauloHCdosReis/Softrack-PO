import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, ToastProvider, extendTheme } from "native-base";
export const unstable_settings = {
  initialRouteName: "/(tabs)/index",
};
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    UniviaProBold: require("../../assets/fonts/UniviaPro-Bold.ttf"),
    UniviaProRegular: require("../../assets/fonts/UniviaPro-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}
const config = {
  useSystemColorMode: true,
};
const customTheme = extendTheme({ config });

function RootLayoutNav() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <ToastProvider>
        <Stack>
          <Stack.Screen
            name="(MenuInferior)"
            options={{ headerShown: false }}
          />
        </Stack>
        <StatusBar hidden />
      </ToastProvider>
    </NativeBaseProvider>
  );
}
