import React, {useEffect, useRef, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSelector} from 'react-redux';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  UserComponent,
} from '../components';
import {authSelector} from '../redux/reducers/authReducer';
import {fontFamilies} from '../constants/fontFamilies';
import {SearchNormal1, TickCircle} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import {Alert, Share, View} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalInvite = (props: Props) => {
  const {visible, onClose} = props;

  const [friendIds, setFriendIds] = useState<string[]>([]);
  const [useSelected, setUseSelected] = useState<string[]>([]);

  const modalizeRef = useRef<Modalize>();
  const auth = useSelector(authSelector);

  useEffect(() => {
    if (auth.following && auth.following.length > 0) {
      setFriendIds(auth.following);
    }
  }, [auth]);

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);

  const handleSelectedId = (id: string) => {
    const items: string[] = [...useSelected];
    const index = items.findIndex(element => element === id);

    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push(id);
    }

    setUseSelected(items);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <Portal>
      <Modalize
        handlePosition="inside"
        adjustToContentHeight
        ref={modalizeRef}
        FooterComponent={
          <SectionComponent>
            <ButtonComponent text="Invite" onPress={onShare} type="primary" />
          </SectionComponent>
        }
        onClose={onClose}>
        <SectionComponent styles={{paddingTop: 30}}>
          <TextComponent
            title
            text="Invite Friend"
            size={24}
            font={fontFamilies.medium}
          />
          <InputComponent
            styles={{marginTop: 12, marginBottom: 24}}
            placeholder="Search"
            value=""
            suffix={<SearchNormal1 size={20} color={appColors.primary} />}
            onChange={val => console.log('')}
          />
          {friendIds.length ? (
            friendIds.map((id: string) => (
              <RowComponent key={id}>
                <View style={{flex: 1}}>
                  <UserComponent
                    type="Invite"
                    onPress={() => handleSelectedId(id)}
                    userId={id}
                  />
                </View>

                <TickCircle
                  variant="Bold"
                  size={24}
                  color={
                    useSelected.includes(id)
                      ? appColors.primary
                      : appColors.gray2
                  }
                />
              </RowComponent>
            ))
          ) : (
            <TextComponent text="No friends" />
          )}
        </SectionComponent>
      </Modalize>
    </Portal>
  );
};

export default ModalInvite;
