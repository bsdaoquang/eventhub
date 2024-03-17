import {ArrowLeft, ArrowRight, Calendar, Location} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import eventAPI from '../../apis/eventApi';
import {
  AvatarGroup,
  ButtonComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfo} from '../../constants/appInfos';
import {fontFamilies} from '../../constants/fontFamilies';
import {LoadingModal} from '../../modals';
import {EventModel} from '../../models/EventModel';
import {
  AuthState,
  authSelector,
  updateFollowing,
} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import {DateTime} from '../../utils/DateTime';
import {UserHandle} from '../../utils/UserHandlers';
import userAPI from '../../apis/userApi';
import {ProfileModel} from '../../models/ProfileModel';
import ModalInvite from '../../modals/ModalInvite';

const EventDetail = ({navigation, route}: any) => {
  const {item}: {item: EventModel} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState<string[]>([]);
  const [profile, setProfile] = useState<ProfileModel>();
  const [isVisibleModalinvite, setIsVisibleModalinvite] = useState(false);

  const auth: AuthState = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (item) {
      getFollowersById();
      getProfile(item.authorId);
    }
  }, [item]);

  const getFollowersById = async () => {
    const api = `/followers?id=${item._id}`;

    try {
      const res = await eventAPI.HandleEvent(api);
      res && res.data && setFollowers(res.data);
    } catch (error) {
      console.log(`Can not get followers by event id ${error}`);
    }
  };

  const handleFlower = () => {
    const items = [...followers];

    if (items.includes(auth.id)) {
      const index = items.findIndex(element => element === auth.id);

      if (index !== -1) {
        items.splice(index, 1);
      }
    } else {
      items.push(auth.id);
    }

    setFollowers(items);

    handleUpdateFollowers(items);
  };

  const handleUpdateFollowers = async (data: string[]) => {
    await UserHandle.getFollowersById(auth.id, dispatch);

    const api = `/update-followes`;

    try {
      await eventAPI.HandleEvent(
        api,
        {
          id: item._id,
          followers: data,
        },
        'post',
      );
    } catch (error) {
      console.log(`Can not update followers in Event detail line 63, ${error}`);
    }
  };

  const getProfile = async (id: string) => {
    const api = `/get-profile?uid=${id}`;

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

  const handleToggleFollowing = async (id: string) => {
    const api = `/update-following`;

    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser(
        api,
        {
          uid: auth.id,
          authorId: id,
        },
        'put',
      );
      dispatch(updateFollowing(res.data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{position: 'absolute', top: 0, right: 0, zIndex: 1, left: 0}}>
        <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}>
          <RowComponent
            styles={{
              padding: 16,
              alignItems: 'flex-end',
              paddingTop: 42,
            }}>
            <RowComponent styles={{flex: 1}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  width: 48,
                  height: 48,
                  justifyContent: 'center',
                }}>
                <ArrowLeft size={28} color={appColors.white} />
              </TouchableOpacity>
              <TextComponent
                flex={1}
                text="Event Details"
                title
                color={appColors.white}
              />
              <CardComponent
                onPress={handleFlower}
                styles={[globalStyles.noSpaceCard, {width: 36, height: 36}]}
                color={
                  auth.follow_events && auth.follow_events.includes(item._id)
                    ? '#ffffffB3'
                    : '#ffffff4D'
                }>
                <MaterialIcons
                  name="bookmark"
                  color={
                    auth.follow_events && auth.follow_events.includes(item._id)
                      ? appColors.danger2
                      : appColors.white
                  }
                  size={22}
                />
              </CardComponent>
            </RowComponent>
          </RowComponent>
        </LinearGradient>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        <Image
          source={{uri: item.photoUrl}}
          style={{width: appInfo.sizes.WIDTH, height: 240, resizeMode: 'cover'}}
        />
        <SectionComponent styles={{marginTop: -20}}>
          {item.users.length > 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <RowComponent
                justify="space-between"
                styles={[
                  globalStyles.shadow,
                  {
                    backgroundColor: appColors.white,
                    borderRadius: 100,
                    paddingHorizontal: 12,
                    width: '90%',
                  },
                ]}>
                <AvatarGroup userIds={item.users} size={36} />
                <TouchableOpacity
                  onPress={() => setIsVisibleModalinvite(true)}
                  style={[
                    globalStyles.button,
                    {backgroundColor: appColors.primary, paddingVertical: 8},
                  ]}>
                  <TextComponent text="Invite" color={appColors.white} />
                </TouchableOpacity>
              </RowComponent>
            </View>
          ) : (
            <>
              <ButtonComponent
                onPress={() => setIsVisibleModalinvite(true)}
                text="Invite"
                styles={{borderRadius: 100}}
                type="primary"
              />
            </>
          )}
        </SectionComponent>
        <View
          style={{
            backgroundColor: appColors.white,
          }}>
          <SectionComponent>
            <TextComponent
              title
              size={34}
              font={fontFamilies.medium}
              text={item.title}
            />
          </SectionComponent>
          <SectionComponent>
            <RowComponent styles={{marginBottom: 20}}>
              <CardComponent
                styles={[globalStyles.noSpaceCard, {width: 48, height: 48}]}
                color={`${appColors.primary}4D`}>
                <Calendar variant="Bold" color={appColors.primary} size={24} />
              </CardComponent>
              <SpaceComponent width={16} />
              <View
                style={{
                  flex: 1,
                  height: 48,
                  justifyContent: 'space-around',
                }}>
                <TextComponent
                  text={`${DateTime.GetDate(new Date(item.date))}`}
                  font={fontFamilies.medium}
                  size={16}
                />
                <TextComponent
                  text={`${
                    appInfo.dayNames[new Date(item.date).getDay()]
                  }, ${DateTime.GetStartAndEnd(item.startAt, item.endAt)}`}
                  color={appColors.gray}
                />
              </View>
            </RowComponent>
            <RowComponent styles={{marginBottom: 20, alignItems: 'flex-start'}}>
              <CardComponent
                styles={[globalStyles.noSpaceCard, {width: 48, height: 48}]}
                color={`${appColors.primary}4D`}>
                <Location variant="Bold" color={appColors.primary} size={24} />
              </CardComponent>
              <SpaceComponent width={16} />
              <View
                style={{
                  flex: 1,
                  minHeight: 48,
                  justifyContent: 'space-around',
                }}>
                <TextComponent
                  text={item.locationTitle}
                  font={fontFamilies.medium}
                  size={16}
                />
                <TextComponent
                  text={item.locationAddress}
                  color={appColors.gray}
                />
              </View>
            </RowComponent>
            {profile && (
              <RowComponent
                styles={{marginBottom: 20}}
                onPress={() =>
                  navigation.navigate('ProfileScreen', {
                    id: item.authorId,
                  })
                }>
                <Image
                  source={{
                    uri: profile.photoUrl
                      ? profile.photoUrl
                      : 'https://img.icons8.com/cute-clipart/64/user-male-circle.png',
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    resizeMode: 'cover',
                  }}
                />
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    height: 48,
                    justifyContent: 'space-around',
                  }}>
                  <TextComponent
                    text={profile.name ? profile.name : profile?.email}
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <TextComponent
                    text={profile.type ? profile.type : 'Personal'}
                    color={appColors.gray}
                  />
                </View>

                <TagComponent
                  label={
                    auth.following && auth.following.includes(item.authorId)
                      ? 'Unfollow'
                      : 'Follow'
                  }
                  onPress={() => handleToggleFollowing(item.authorId)}
                  styles={{
                    backgroundColor: `${appColors.primary}20`,
                    borderRadius: 12,
                  }}
                  textStyles={{fontFamily: fontFamilies.regular}}
                  textColor={appColors.primary}
                />
              </RowComponent>
            )}
          </SectionComponent>
          <TabBarComponent title="About Event" />
          <SectionComponent>
            <TextComponent text={item.description} />
          </SectionComponent>
        </View>
        <SpaceComponent height={80} />
      </ScrollView>

      <LinearGradient
        colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 1)']}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 12,
        }}>
        <ButtonComponent
          text="BUY TICKET $120"
          type="primary"
          onPress={() => {}}
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor: '#3D56F0',
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
        />
      </LinearGradient>

      <LoadingModal visible={isLoading} />

      <ModalInvite
        visible={isVisibleModalinvite}
        onClose={() => setIsVisibleModalinvite(false)}
      />
    </View>
  );
};

export default EventDetail;
