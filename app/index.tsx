import { Button, Text, View } from "react-native";
import * as Notifications from "expo-notifications";

export default function Index() {
  const triggerNotif = async () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello",
        body: "World",
        data: {
          someData: "hello",
          otherData: "world",
        },
      },
      trigger: {
        channelId: "default-channel",
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Click to trigger notif</Text>
      <Button title="Trigger notif" onPress={triggerNotif} />
    </View>
  );
}
