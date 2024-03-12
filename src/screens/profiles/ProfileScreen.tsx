import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
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
import userAPI from '../../apis/userApi';
import {ProfileModel} from '../../models/ProfileModel';
import {globalStyles} from '../../styles/globalStyles';

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileModel>();

  const dispatch = useDispatch();

  const auth: AuthState = useSelector(authSelector);

  useEffect(() => {
    if (auth) {
      getProfile();
    }
  }, []);

  const getProfile = async () => {
    const api = `/get-profile?uid=${auth.id}`;

    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser(api);
      res && res.data && setProfile(res.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent back title="Profile">
      {isLoading ? (
        <ActivityIndicator />
      ) : profile ? (
        <>
          <SectionComponent>
            <RowComponent>
              <AvatarComponent
                photoURL={profile.photoUrl}
                name={profile.name ? profile.name : profile.email}
                size={120}
              />
            </RowComponent>
          </SectionComponent>
        </>
      ) : (
        <TextComponent text="profile not found!" />
      )}
    </ContainerComponent>
  );
};

export default ProfileScreen;
