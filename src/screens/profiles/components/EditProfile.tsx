import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TagComponent,
  TextComponent,
} from '../../../components';
import {ProfileModel} from '../../../models/ProfileModel';
import {useNavigation} from '@react-navigation/native';
import {appColors} from '../../../constants/appColors';
import {globalStyles} from '../../../styles/globalStyles';
import {Edit, Edit2} from 'iconsax-react-native';
import ModalSelectCategories from '../../../modals/ModalSelectCategories';

interface Props {
  profile: ProfileModel;
}

const EditProfile = (props: Props) => {
  const {profile} = props;

  const [isVisibleModalCategory, setIsVisibleModalCategory] = useState(false);

  const navigation: any = useNavigation();

  return (
    <SectionComponent>
      <RowComponent>
        <ButtonComponent
          styles={{
            borderWidth: 1,
            borderColor: appColors.primary,
            backgroundColor: appColors.white,
          }}
          text="Edit profile"
          onPress={() =>
            navigation.navigate('EditProfileScreen', {
              profile,
            })
          }
          textColor={appColors.primary}
          type="primary"
        />
      </RowComponent>
      <SpaceComponent height={20} />
      <TextComponent text="About" title size={18} />
      <TextComponent text={profile.bio} />
      <SpaceComponent height={20} />
      <>
        <RowComponent>
          <TextComponent flex={1} text="Interests" title size={18} />
          <RowComponent onPress={() => setIsVisibleModalCategory(true)}>
            <Edit2 size={18} color={appColors.text} />
            <SpaceComponent width={8} />
            <TextComponent text="Change" />
          </RowComponent>
          {/* <ButtonComponent
            styles={[
              globalStyles.tag,
              {
                backgroundColor: appColors.primary,
                marginBottom: 0,
                margin: 0,
                paddingHorizontal: 12,
              },
            ]}
            text="Change"
            type="primary"
          /> */}
        </RowComponent>
        <RowComponent styles={{flexWrap: 'wrap', justifyContent: 'flex-start'}}>
          {Array.from({length: 9}).map((item, index) => (
            <TagComponent
              key={`tag${index}`}
              bgColor="#e0e0e0"
              label="Music"
              styles={{
                marginRight: 8,
                marginBottom: 12,
              }}
              onPress={() => {}}
            />
          ))}
        </RowComponent>
      </>

      <ModalSelectCategories
        seletected={[]}
        onSelected={vals => {
          console.log(vals);
          setIsVisibleModalCategory(false);
          navigation.navigate('ProfileScreen', {
            isUpdated: true,
            id: profile.uid,
          });
        }}
        onClose={() => setIsVisibleModalCategory(false)}
        visible={isVisibleModalCategory}
      />
    </SectionComponent>
  );
};

export default EditProfile;
