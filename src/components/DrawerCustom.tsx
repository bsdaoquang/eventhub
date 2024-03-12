import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  Bookmark2,
  Calendar,
  Logout,
  Message2,
  MessageQuestion,
  Setting2,
  Sms,
  User,
} from 'iconsax-react-native';
import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {LoginManager} from 'react-native-fbsdk-next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {AvatarComponent, RowComponent, SpaceComponent, TextComponent} from '.';
import {appColors} from '../constants/appColors';
import {authSelector, removeAuth} from '../redux/reducers/authReducer';
import {globalStyles} from '../styles/globalStyles';
import {HandleNotification} from '../utils/handleNotification';

const DrawerCustom = ({navigation}: any) => {
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const size = 20;
  const color = appColors.gray;

  const profileMenu = [
    {
      key: 'MyProfile',
      title: 'My Profile',
      icon: <User size={size} color={color} />,
    },
    {
      key: 'Message',
      title: 'Message',
      icon: <Message2 size={size} color={color} />,
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: 'Bookmark',
      title: 'Bookmark',
      icon: <Bookmark2 size={size} color={color} />,
    },
    {
      key: 'ContactUs',
      title: 'Contact Us',
      icon: <Sms size={size} color={color} />,
    },
    {
      key: 'Settings',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />,
    },
    {
      key: 'HelpAndFAQs',
      title: 'Help & FAQs',
      icon: <MessageQuestion size={size} color={color} />,
    },
    {
      key: 'SignOut',
      title: 'Sign Out',
      icon: <Logout size={size} color={color} />,
    },
  ];

  const handleLogout = async () => {
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
  };

  const handleNavigation = (key: string) => {
    switch (key) {
      case 'SignOut':
        handleLogout();
        break;

      case 'MyProfile':
        navigation.navigate('Profile', {
          screen: 'ProfileScreen',
          params: {
            id: auth.ud,
          },
        });
        break;
      default:
        console.log(key);
        break;
    }

    navigation.closeDrawer();
  };

  return (
    <View style={[localStyles.container]}>
      <AvatarComponent
        onPress={() => handleNavigation('MyProfile')}
        photoURL={auth.photoURL}
        name={auth.name ? auth.name : auth.email}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{flex: 1, marginVertical: 20}}
        renderItem={({item, index}) => (
          <RowComponent
            styles={[localStyles.listItem]}
            onPress={() => handleNavigation(item.key)}>
            {item.icon}
            <TextComponent
              text={item.title}
              styles={localStyles.listItemText}
            />
          </RowComponent>
        )}
      />
      <RowComponent justify="flex-start">
        <TouchableOpacity
          style={[
            globalStyles.button,
            {backgroundColor: '#00F8FF33', height: 'auto'},
          ]}>
          <MaterialCommunityIcons name="crown" size={22} color={'#00F8FF'} />
          <SpaceComponent width={8} />
          <TextComponent color="#00F8FF" text="Upgrade Pro" />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

export default DrawerCustom;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },

  listItemText: {
    paddingLeft: 12,
  },
});
