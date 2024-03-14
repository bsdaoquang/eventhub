import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import userAPI from '../../apis/userApi';
import {
  AvatarComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ProfileModel} from '../../models/ProfileModel';
import {
  AuthState,
  addAuth,
  authSelector,
} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import AboutProfile from './components/AboutProfile';
import EditProfile from './components/EditProfile';

const ProfileScreen = ({navigation, route}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileModel>();
  const [userFollowers, setUserFollowers] = useState<string[]>([]);
  const [profileId, setProfileId] = useState('');

  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector);

  useEffect(() => {
    if (route.params) {
      const {id} = route.params;
      setProfileId(id);

      if (route.params.isUpdated) {
        getProfile();
      }
    } else {
      setProfileId(auth.id);
    }
  }, [route]);

  useEffect(() => {
    if (profileId) {
      getProfile();
      getFollowersByUid();
    }
  }, [profileId]);

  const getProfile = async () => {
    const api = `/get-profile?uid=${profileId}`;

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

  const getFollowersByUid = async () => {
    const api = `/get-followers?uid=${profileId}`;

    try {
      const res = await userAPI.HandleUser(api);
      setUserFollowers(res.data);
    } catch (error) {
      console.log();
    }
  };

  console.log(profile);

  return (
    <ContainerComponent back title="Profile">
      {isLoading ? (
        <ActivityIndicator />
      ) : profile ? (
        <>
          <SectionComponent styles={[globalStyles.center]}>
            <RowComponent>
              <AvatarComponent
                photoURL={profile.photoUrl}
                name={profile.name ? profile.name : profile.email}
                size={120}
              />
            </RowComponent>
            <SpaceComponent height={16} />
            <TextComponent
              text={
                profile.name
                  ? profile.name
                  : profile.familyName && profile.givenName
                  ? `${profile.familyName} ${profile.givenName}`
                  : profile.email
              }
              title
              size={24}
            />
            <SpaceComponent height={16} />
            <RowComponent>
              <View style={[globalStyles.center, {flex: 1}]}>
                <TextComponent
                  title
                  text={`${profile.following.length}`}
                  size={20}
                />
                <TextComponent text="Following" />
              </View>
              <View style={[globalStyles.center, {flex: 1}]}>
                <TextComponent
                  title
                  text={`${userFollowers.length}`}
                  size={20}
                />
                <TextComponent text="Followers" />
              </View>
            </RowComponent>
          </SectionComponent>
          {auth.id !== profileId ? (
            <AboutProfile />
          ) : (
            <EditProfile profile={profile} />
          )}
        </>
      ) : (
        <TextComponent text="profile not found!" />
      )}
    </ContainerComponent>
  );
};

export default ProfileScreen;
