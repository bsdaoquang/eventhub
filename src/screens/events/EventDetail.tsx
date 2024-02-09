import {ArrowLeft, ArrowRight, Calendar, Location} from 'iconsax-react-native';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  AvatarGroup,
  ButtonComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {EventModel} from '../../models/EventModel';
import {globalStyles} from '../../styles/globalStyles';
import {fontFamilies} from '../../constants/fontFamilies';

const EventDetail = ({navigation, route}: any) => {
  const {item}: {item: EventModel} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ImageBackground
        source={require('../../assets/images/event-image.png')}
        style={{flex: 1, height: 244}}
        imageStyle={{
          resizeMode: 'cover',
        }}>
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
                styles={[globalStyles.noSpaceCard, {width: 36, height: 36}]}
                color="#ffffff4D">
                <MaterialIcons
                  name="bookmark"
                  color={appColors.white}
                  size={22}
                />
              </CardComponent>
            </RowComponent>
          </RowComponent>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingTop: 244 - 130,
          }}>
          <SectionComponent>
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
                <AvatarGroup size={36} />
                <TouchableOpacity
                  style={[
                    globalStyles.button,
                    {backgroundColor: appColors.primary, paddingVertical: 8},
                  ]}>
                  <TextComponent text="Invite" color={appColors.white} />
                </TouchableOpacity>
              </RowComponent>
            </View>
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
                  <Calendar
                    variant="Bold"
                    color={appColors.primary}
                    size={24}
                  />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    height: 48,
                    justifyContent: 'space-around',
                  }}>
                  <TextComponent
                    text="14 December, 2021"
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <TextComponent
                    text="Tuesday, 4:00PM - 9:00PM"
                    color={appColors.gray}
                  />
                </View>
              </RowComponent>
              <RowComponent styles={{marginBottom: 20}}>
                <CardComponent
                  styles={[globalStyles.noSpaceCard, {width: 48, height: 48}]}
                  color={`${appColors.primary}4D`}>
                  <Location
                    variant="Bold"
                    color={appColors.primary}
                    size={24}
                  />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    height: 48,
                    justifyContent: 'space-around',
                  }}>
                  <TextComponent
                    text={item.location.title}
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <TextComponent
                    text={item.location.address}
                    color={appColors.gray}
                  />
                </View>
              </RowComponent>
              <RowComponent styles={{marginBottom: 20}}>
                <Image
                  source={{
                    uri: 'https://gamek.mediacdn.vn/133514250583805952/2022/5/18/photo-1-16528608926331302726659.jpg',
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
                    text="Son Tung MTP"
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <TextComponent
                    text="Tuesday, 4:00PM - 9:00PM"
                    color={appColors.gray}
                  />
                </View>
              </RowComponent>
            </SectionComponent>
            <TabBarComponent title="About Event" />
            <SectionComponent>
              <TextComponent
                text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis necessitatibus ratione asperiores odit exercitationem repellat aliquam at officiis, quasi natus? Consequatur, amet! Iusto velit vitae quidem autem maxime qui exercitationem.`}
              />
            </SectionComponent>
          </View>
        </ScrollView>
      </ImageBackground>

      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 1)']}
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
    </View>
  );
};

export default EventDetail;
