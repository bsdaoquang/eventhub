import React from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../constants/appColors';
import {
  CategoriesList,
  CircleComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
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
          height: Platform.OS === 'android' ? 166 : 182,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}>
        <View style={{paddingHorizontal: 16}}>
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
          <SpaceComponent height={20} />
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
                color={appColors.white}
                size={20}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.gray2,
                  marginHorizontal: 10,
                  height: 20,
                }}
              />
              <TextComponent
                flex={1}
                text="Search..."
                color={appColors.gray2}
                size={16}
              />
            </RowComponent>
            <TagComponent
              bgColor={'#5D56F3'}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: true,
                })
              }
              label="Filters"
              icon={
                <CircleComponent size={20} color="#B1AEFA">
                  <Sort size={16} color="#5D56F3" />
                </CircleComponent>
              }
            />
          </RowComponent>
          <SpaceComponent height={20} />
        </View>
        <View style={{marginBottom: -16}}>
          <CategoriesList isFill />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            flex: 1,
            marginTop: 16,
          },
        ]}>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 20}}>
          <TabBarComponent title="Upcoming Events" onPress={() => {}} />
          <FlatList
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={item} type="card" />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
