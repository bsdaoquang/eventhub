import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Facebook, Google} from '../../../assets/svgs';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import authenticationAPI from '../../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Settings,
  LoginManager,
  Profile,
  LoginButton,
} from 'react-native-fbsdk-next';
import {LoadingModal} from '../../../modals';

GoogleSignin.configure({
  webClientId:
    '51183564123-pf81s6h2gnkmudbcnhe2j6ke2eapt6l1.apps.googleusercontent.com',
  iosClientId:
    '51183564123-ftijaqo23c9thm2kfe9ssgqq6p92ru72.apps.googleusercontent.com',
});

Settings.setAppID('684546690239906');

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const api = `/google-signin`;
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      const user = userInfo.user;

      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );

      dispatch(addAuth(res.data));

      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithFacebook = async () => {
    setIsLoading(true);
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);

      if (!result.isCancelled) {
        const profile = await Profile.getCurrentProfile();

        if (profile) {
          const userInfo = {
            name: profile.name,
            givenName: profile.firstName,
            familyName: profile.lastName,
            email: profile.email ?? '',
            photoUrl: profile.imageURL,
          };

          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            userInfo,
            'post',
          );

          setIsLoading(false);
          dispatch(addAuth(res.data));

          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <SectionComponent>
      <TextComponent
        styles={{textAlign: 'center'}}
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamilies.medium}
      />
      <SpaceComponent height={16} />

      <ButtonComponent
        type="primary"
        onPress={handleLoginWithGoogle}
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Google />}
      />

      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Facebook"
        onPress={handleLoginWithFacebook}
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Facebook />}
      />
      <LoadingModal visible={isLoading} />
    </SectionComponent>
  );
};

export default SocialLogin;
