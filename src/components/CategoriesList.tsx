import React, {ReactNode} from 'react';
import {FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TagComponent} from '.';
import {KnifeFork} from '../assets/svgs';
import {appColors} from '../constants/appColors';

interface Props {
  isFill?: boolean;
}

interface Category {
  icon: ReactNode;
  color: string;
  label: string;
  key: string;
}

const CategoriesList = (props: Props) => {
  const {isFill} = props;

  const categories: Category[] = [
    {
      key: 'sports',
      label: 'Sports',
      icon: (
        <FontAwesome5
          name="basketball-ball"
          color={isFill ? appColors.white : '#F0635A'}
          size={20}
        />
      ),
      color: '#F0635A',
    },
    {
      key: 'mucsic',
      label: 'Music',
      icon: (
        <FontAwesome5
          name="music"
          color={isFill ? appColors.white : '#F59762'}
          size={20}
        />
      ),
      color: '#F59762',
    },
    {
      key: 'food',
      label: 'Food',
      icon: <KnifeFork color={isFill ? appColors.white : '#29D697'} />,
      color: '#29D697',
    },
    {
      key: 'art',
      label: 'Art',
      icon: (
        <Ionicons
          name="color-palette"
          color={isFill ? appColors.white : '#46CDFB'}
        />
      ),
      color: '#46CDFB',
    },
  ];

  return (
    <FlatList
      style={{paddingHorizontal: 16}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({item, index}) => (
        <TagComponent
          styles={{
            marginRight: index === categories.length - 1 ? 28 : 12,
            minWidth: 82,
          }}
          bgColor={isFill ? item.color : appColors.white}
          onPress={() => {}}
          icon={item.icon}
          label={item.label}
        />
      )}
    />
  );
};

export default CategoriesList;
