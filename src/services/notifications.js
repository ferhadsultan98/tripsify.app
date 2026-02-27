import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import firestore from "@react-native-firebase/firestore";
import { Platform, PermissionsAndroid } from "react-native";

export async function initNotifications() {
  try {
    // 1. Android 13+ üçün icazə istəmək
    if (Platform.OS === "android" && Platform.Version >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }

    // 2. Notifee kanalını yaratmaq (Səsli və vacib bildiriş üçün)
    await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH, // Bildiriş ekranda görünsün
      sound: "default",
    });

    // 3. Firebase icazəsi (iOS üçün vacibdir) 
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }

    const token = await messaging().getToken();
    console.log("FCM Token:", token);

    if (token) {
      await firestore().collection("pushtokens").doc(token).set({
        active: true,
        platform: Platform.OS,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    }

    // 5. YENİ: "all_users" kanalına abunə olmaq (Update bildirişi üçün vacibdir)
    await messaging().subscribeToTopic('all_users');
    console.log("Subscribed to 'all_users' topic");

    // 6. Tətbiq açıq olanda gələn bildirişi göstərmək
    messaging().onMessage(async (remoteMessage) => {
      console.log("Foreground message:", remoteMessage);

      await notifee.displayNotification({
        title: remoteMessage.notification?.title || "Yeni bildiriş",
        body: remoteMessage.notification?.body || "",
        android: {
          channelId: "default",
          smallIcon: "ic_launcher", 
          pressAction: {
            id: "default",
          },
        },
      });
    });

 
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Background message handled:", remoteMessage);
    
    });

  } catch (error) {
    console.error("Notification init error:", error);
  }
}
