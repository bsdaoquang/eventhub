import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import userAPI from '../apis/userApi';
import {Platform} from 'react-native';

export class HandleNotification {
  static checkNotificationPersion = async () => {
    const authStatus = await messaging().requestPermission();

    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      if (Platform.OS === 'ios') {
        try {
          await messaging().registerDeviceForRemoteMessages();
        } catch (error) {
          console.log(error);
        }
      } else {
        this.getFcmToken();
      }
    }
  };

  static getFcmToken = async () => {
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');

    if (!fcmtoken) {
      const token = await messaging().getToken();

      if (token) {
        await AsyncStorage.setItem('fcmtoken', token);
        this.updateTokenForUser(token);
      }
    } else {
      this.updateTokenForUser(fcmtoken);
    }
  };

  static updateTokenForUser = async (token: string) => {
    const res = await AsyncStorage.getItem('auth');

    if (res) {
      const auth = JSON.parse(res);
      const {fcmTokens} = auth;

      if (fcmTokens && !fcmTokens.includes(token)) {
        fcmTokens.push(token);

        await this.Update(auth.id, fcmTokens);
      }
    }
  };

  static Update = async (id: string, fcmTokens: string[]) => {
    try {
      await userAPI.HandleUser(
        '/update-fcmtoken',
        {
          uid: id,
          fcmTokens,
        },
        'post',
      );
    } catch (error) {
      console.log(`Can not update tokens ${error}`);
    }
  };
}
