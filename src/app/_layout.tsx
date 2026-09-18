import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="room-detail"
        options={{
          title: 'Chi tiết phòng',
        }}
      />
    </Stack>
  );
}