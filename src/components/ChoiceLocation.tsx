import {ArrowRight2, Location} from 'iconsax-react-native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RowComponent, SpaceComponent, TextComponent} from '.';
import {appColors} from '../constants/appColors';
import {globalStyles} from '../styles/globalStyles';
import ModalLocation from '../modals/ModalLocation';

const ChoiceLocation = () => {
  const [isVibleModalLocation, setIsVibleModalLocation] = useState(false);

  return (
    <>
      <RowComponent
        onPress={() => setIsVibleModalLocation(!isVibleModalLocation)}
        styles={[globalStyles.inputContainer]}>
        <Location variant="Bold" size={22} color={`${appColors.primary}80`} />

        <SpaceComponent width={12} />
        <TextComponent text="Newyork, USA" flex={1} />
        <ArrowRight2 color={appColors.primary} size={22} />
      </RowComponent>

      <ModalLocation
        visible={isVibleModalLocation}
        onClose={() => setIsVibleModalLocation(false)}
        onSelect={val => console.log(val)}
      />
    </>
  );
};

export default ChoiceLocation;
