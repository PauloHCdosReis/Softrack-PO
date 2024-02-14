import Clock from "@/components/date";
import { useColorScheme } from "nativewind";
import { Stack } from "expo-router";
import { View, Image, StyleSheet } from "react-native";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const styles = StyleSheet.create({
    stretch: {
      width: 250,
      height: 48,
      marginLeft: 10,
      resizeMode: "stretch",
    },
  })

  const logoUrl =
    colorScheme === "dark"
      ? require("../../../assets/image/LogoSoftrackdark.png")
      : require("../../../assets/image/LogoSoftracklight.png");

  return (
    <>
      <View className="p-4 flex flex-row items-center justify-between bg-light-fundo dark:bg-dark-fundo">
        <View className="items-center">
          <Image style={styles.stretch} source={logoUrl} />
        </View>
        <View className="mr-5">
          <Clock />
        </View>
      </View>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
