import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../constants/appColors';
import {
  CircleComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {
  ArrowDown,
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  const auth = useSelector(authSelector);

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          backgroundColor: appColors.primary,
          height: 179,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
          paddingHorizontal: 16,
        }}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <HambergerMenu size={24} color={appColors.white} />
          </TouchableOpacity>
          <View style={[{flex: 1, alignItems: 'center'}]}>
            <RowComponent>
              <TextComponent
                text="Current Location"
                color={appColors.white2}
                size={12}
              />
              <MaterialIcons
                name="arrow-drop-down"
                size={18}
                color={appColors.white}
              />
            </RowComponent>
            <TextComponent
              text="New York, USA"
              flex={0}
              color={appColors.white}
              font={fontFamilies.medium}
              size={13}
            />
          </View>

          <CircleComponent color="#524CE0" size={36}>
            <View>
              <Notification size={18} color={appColors.white} />
              <View
                style={{
                  backgroundColor: '#02E9FE',
                  width: 10,
                  height: 10,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: '#524CE0',
                  position: 'absolute',
                  top: -2,
                  right: -2,
                }}
              />
            </View>
          </CircleComponent>
        </RowComponent>
        <SpaceComponent height={24} />
        <RowComponent>
          <RowComponent
            styles={{flex: 1}}
            onPress={() =>
              navigation.navigate('SearchEvents', {
                isFilter: false,
              })
            }>
            <SearchNormal1
              variant="TwoTone"
              size={22}
              color={appColors.white}
            />
            <View
              style={{
                width: 1,
                height: 18,
                marginHorizontal: 12,
                backgroundColor: '#A29EF0',
              }}
            />
            <TextComponent text="Search..." color={`#A29EF0`} flex={1} />
          </RowComponent>
          <RowComponent
            onPress={() =>
              navigation.navigate('SearchEvents', {
                isFilter: true,
              })
            }
            styles={{
              backgroundColor: '#5D56F3',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 100,
            }}>
            <CircleComponent size={19.3} color={`#A29EF0`}>
              <Sort size={12} color={appColors.primary} />
            </CircleComponent>
            <SpaceComponent width={8} />
            <TextComponent text="Filters" color={appColors.white} />
          </RowComponent>
        </RowComponent>
      </View>
      <View
        style={[
          {
            flex: 1,
          },
        ]}></View>
    </View>
  );
};

export default HomeScreen;
