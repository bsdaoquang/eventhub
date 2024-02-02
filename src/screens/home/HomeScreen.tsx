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
import {CircleComponent, RowComponent, TextComponent} from '../../components';
import {ArrowDown, HambergerMenu, Notification} from 'iconsax-react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
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
          <TouchableOpacity>
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
