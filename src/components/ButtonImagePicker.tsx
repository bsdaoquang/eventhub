import {View, Text, Modal, Touchable, TouchableOpacity} from 'react-native';
import React, {ReactNode, useRef, useState} from 'react';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {Camera, Image, Link} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import ImageCropPicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import {globalStyles} from '../styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  onSelect: (val: {type: 'url' | 'file'; value: string | ImageOrVideo}) => void;
}

const ButtonImagePicker = (props: Props) => {
  const {onSelect} = props;

  const modalizeRef = useRef<Modalize>();

  const [imageUrl, setImageUrl] = useState('');
  const [isVisibleModalAddUrl, setIsVisibleModalAddUrl] = useState(false);

  const options: Options = {
    cropping: true,
    mediaType: 'photo',
  };

  const choiceImages = [
    {
      key: 'camera',
      title: 'Take a picture',
      icon: <Camera size={22} color={appColors.text} />,
    },
    {
      key: 'library',
      title: 'From libary',
      icon: <Image size={22} color={appColors.text} />,
    },
    {
      key: 'url',
      title: 'From url',
      icon: <Link size={22} color={appColors.text} />,
    },
  ];

  const renderItem = (item: {icon: ReactNode; key: string; title: string}) => (
    <RowComponent
      key={item.key}
      styles={{marginBottom: 20}}
      onPress={() => handleChoiceImage(item.key)}>
      {item.icon}
      <SpaceComponent width={12} />
      <TextComponent text={item.title} flex={1} font={fontFamilies.medium} />
    </RowComponent>
  );

  const handleChoiceImage = (key: string) => {
    switch (key) {
      case 'library':
        ImageCropPicker.openPicker(options).then(res => {
          onSelect({type: 'file', value: res});
        });
        break;

      case 'camera':
        ImageCropPicker.openCamera(options).then(res => {
          onSelect({type: 'file', value: res});
        });
        break;
      default:
        setIsVisibleModalAddUrl(true);
        break;
    }

    modalizeRef.current?.close();
  };

  return (
    <View style={{marginBottom: 20}}>
      <ButtonComponent
        text="Upload image"
        onPress={() => modalizeRef.current?.open()}
        type="link"
      />
      <Portal>
        <Modalize
          adjustToContentHeight
          ref={modalizeRef}
          handlePosition="inside">
          <View style={{marginVertical: 30, paddingHorizontal: 20}}>
            {choiceImages.map(item => renderItem(item))}
          </View>
        </Modalize>
      </Portal>

      <Modal
        visible={isVisibleModalAddUrl}
        statusBarTranslucent
        style={{flex: 1}}
        transparent
        animationType="slide">
        <View
          style={[
            globalStyles.container,
            {
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <View
            style={{
              backgroundColor: appColors.white,
              margin: 20,
              borderRadius: 12,
              width: '90%',
              padding: 20,
            }}>
            <RowComponent justify="flex-end">
              <TouchableOpacity
                onPress={() => {
                  setImageUrl('');
                  setIsVisibleModalAddUrl(false);
                }}>
                <AntDesign name="close" size={24} color={appColors.text} />
              </TouchableOpacity>
            </RowComponent>

            <TextComponent text="Image URL" title size={18} />
            <InputComponent
              placeholder="URL"
              value={imageUrl}
              onChange={val => setImageUrl(val)}
              allowClear
            />
            <RowComponent justify="flex-end">
              <ButtonComponent
                type="link"
                text="Agree"
                onPress={() => {
                  setIsVisibleModalAddUrl(false);
                  onSelect({type: 'url', value: imageUrl});
                  setImageUrl('');
                }}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ButtonImagePicker;
