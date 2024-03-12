import React from 'react';
import {
  Image,
  ImageProps,
  StyleProp,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextComponent} from '.';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  photoURL?: string;
  name: string;
  size?: number;
  styles?: StyleProp<ImageProps>;
  onPress?: () => void;
}

const AvatarComponent = (props: Props) => {
  const {photoURL, name, size, styles, onPress} = props;

  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      {photoURL ? (
        <Image
          source={{uri: photoURL}}
          style={[
            {
              width: size ?? 40,
              height: size ?? 40,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: appColors.white,
            },
            styles,
          ]}
        />
      ) : (
        <View
          style={[
            globalStyles.center,
            {
              width: size ?? 40,
              height: size ?? 40,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: appColors.white,
              backgroundColor: appColors.gray2,
            },
          ]}>
          <TextComponent
            text={name.substring(0, 1).toLocaleUpperCase()}
            font={fontFamilies.bold}
            color={appColors.white}
            size={size ? size / 3 : 14}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AvatarComponent;
