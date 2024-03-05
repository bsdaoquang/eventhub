import GeoLocation from '@react-native-community/geolocation';
import {ArrowLeft2} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import eventAPI from '../../apis/eventApi';
import {KnifeFork_Color} from '../../assets/svgs';
import {
  CardComponent,
  CategoriesList,
  EventItem,
  InputComponent,
  MakerCustom,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfo} from '../../constants/appInfos';
import {EventModel} from '../../models/EventModel';
import {globalStyles} from '../../styles/globalStyles';

const MapScreen = ({navigation}: any) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();
  const [events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    GeoLocation.getCurrentPosition(
      (position: any) => {
        if (position.coords) {
          setCurrentLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        }
      },
      (error: any) => {
        console.log(error);
      },
      {},
    );
  }, []);

  useEffect(() => {
    currentLocation && getNearbyEvents();
  }, [currentLocation]);

  const getNearbyEvents = async () => {
    const api = `/get-events?lat=${currentLocation?.lat}&long=${
      currentLocation?.long
    }&distance=${5}`;

    try {
      const res = await eventAPI.HandleEvent(api);

      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />

      {currentLocation ? (
        <MapView
          style={{
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
          }}
          showsMyLocationButton
          showsUserLocation
          initialRegion={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.001,
            longitudeDelta: 0.015,
          }}
          mapType="standard">
          {events.length > 0 &&
            events.map((event, index) => (
              <Marker
                key={`event${index}`}
                title={event.title}
                description=""
                onPress={() => console.log('fafa')}
                coordinate={{
                  longitude: event.position.long,
                  latitude: event.position.lat,
                }}>
                <MakerCustom type={event.category} />
              </Marker>
            ))}
        </MapView>
      ) : (
        <></>
      )}

      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          top: 0,
          right: 0,
          left: 0,
          padding: 20,
          paddingTop: 48,
        }}>
        <RowComponent>
          <View style={{flex: 1}}>
            <InputComponent
              styles={{marginBottom: 0}}
              affix={
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Explore', {
                      screen: 'HomeScreen',
                    })
                  }>
                  <ArrowLeft2 size={24} color={appColors.text} />
                </TouchableOpacity>
              }
              placeholder="Search"
              value=""
              onChange={val => console.log(val)}
            />
          </View>
          <SpaceComponent width={12} />
          <CardComponent
            onPress={getNearbyEvents}
            styles={[globalStyles.noSpaceCard, {width: 56, height: 56}]}
            color={appColors.white}>
            <MaterialIcons
              name="my-location"
              size={28}
              color={appColors.primary}
            />
          </CardComponent>
        </RowComponent>
        <SpaceComponent height={20} />
        <CategoriesList />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 0,
          left: 0,
        }}>
        <FlatList
          initialScrollIndex={0}
          data={events}
          renderItem={({item}) => <EventItem item={item} type="list" />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default MapScreen;
