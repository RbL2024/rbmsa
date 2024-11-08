import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="bikes" options={{headerShown: false}} />
      <Stack.Screen name="lock" options={{}} />
      <Stack.Screen name="timetrack" options={{}} />
    </Stack>
  );
}
