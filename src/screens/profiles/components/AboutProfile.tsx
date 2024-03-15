import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import Feather from 'react-native-vector-icons/Feather';
import {appColors} from '../../../constants/appColors';
import {globalStyles} from '../../../styles/globalStyles';
import {fontFamilies} from '../../../constants/fontFamilies';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutProfile = () => {
  return (
    <>
      <SectionComponent>
        <RowComponent>
          <TouchableOpacity
            style={[
              globalStyles.button,
              {flex: 1, backgroundColor: appColors.primary},
            ]}>
            <Feather name="user-plus" size={20} color={appColors.white} />
            <SpaceComponent width={12} />
            <TextComponent
              text="Follow"
              color={appColors.white}
              font={fontFamilies.medium}
            />
          </TouchableOpacity>
          <SpaceComponent width={20} />

          <TouchableOpacity
            style={[
              globalStyles.button,
              {flex: 1, borderColor: appColors.primary, borderWidth: 1},
            ]}>
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={appColors.primary}
            />
            <SpaceComponent width={12} />
            <TextComponent
              text="Massages"
              color={appColors.primary}
              font={fontFamilies.medium}
            />
          </TouchableOpacity>
          {/* <ButtonComponent
            iconFlex="left"
            icon={
              
            }
            text="Follow"
            type="primary"
            styles={{width: 'auto', flex: 1}}
          />
          <SpaceComponent height={20} />
          <ButtonComponent
            iconFlex="left"
            icon={
              <Feather name="user-plus" size={20} color={appColors.white} />
            }
            text="Follow"
            type="link"
            styles={{width: 'auto'}}
          /> */}
        </RowComponent>
      </SectionComponent>
    </>
  );
};

export default AboutProfile;
