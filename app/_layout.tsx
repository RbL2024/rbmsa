import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import useConnection from "@/hooks/useConnection";
import ToastManager, { Toast } from "toastify-react-native";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isConnected } = useConnection(); // State to track server connection

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    mplus: require("../assets/fonts/MPLUS1p-Regular.ttf"),
    mplusb: require("../assets/fonts/MPLUS1p-Bold.ttf"),
    jsans: require("../assets/fonts/JosefinSans-Regular.ttf"),
    jsansb: require("../assets/fonts/JosefinSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(()=>{
    if(isConnected){
      Toast.success("connected now.");
    }
  },[isConnected])

  if (!loaded) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <ToastManager position="bottom" height={45} textStyle={{fontSize:12}} duration={2000} showCloseIcon={false}/>
      <Stack
        screenOptions={{
          statusBarStyle: "light",
          statusBarColor: "#355E3B",
          // statusBarColor: '#D6D6CA'
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(HomeScreens)" options={{ headerShown: false }}/>
        <Stack.Screen name="(bikePrevRes)" options={{ headerShown: false }}/>
        <Stack.Screen name="(account)" options={{ headerShown: false }}/>
        <Stack.Screen name="(allbikes)" options={{ headerShown: false }}/>
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
}
