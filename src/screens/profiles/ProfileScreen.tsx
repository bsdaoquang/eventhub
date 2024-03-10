import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {ButtonComponent, ContainerComponent} from '../../components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
import {useDispatch, useSelector} from 'react-redux';
import {
  AuthState,
  authSelector,
  removeAuth,
} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HandleNotification} from '../../utils/handleNotification';
import {LoadingModal} from '../../modals';

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const auth: AuthState = useSelector(authSelector);

  const handleLogout = async () => {
    setIsLoading(true);

    const fcmtoken = await AsyncStorage.getItem('fcmtoken');

    if (fcmtoken) {
      if (auth.fcmTokens && auth.fcmTokens.length > 0) {
        const items = [...auth.fcmTokens];
        const index = items.findIndex(element => element === fcmtoken);

        if (index !== -1) {
          items.splice(index, 1);
        }

        await HandleNotification.Update(auth.id, items);
      }
    }

    await GoogleSignin.signOut();
    LoginManager.logOut();

    // clear local storage
    await AsyncStorage.removeItem('auth');

    dispatch(removeAuth({}));

    setIsLoading(false);
  };
  return (
    <ContainerComponent back>
      <Text>ProfileScreen</Text>

      <ButtonComponent type="primary" text="Logout" onPress={handleLogout} />
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default ProfileScreen;
