import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ButtonImagePicker,
  ChoiceLocation,
  ContainerComponent,
  DateTimePicker,
  DropdownPicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import userAPI from '../apis/userApi';
import {SelectModel} from '../models/SelectModel';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {Validate} from '../utils/validate';
import {appColors} from '../constants/appColors';

const initValues = {
  title: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  imageUrl: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);

  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });
  const [usersSelects, setUsersSelects] = useState<SelectModel[]>([]);
  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items = {...eventData};
    items[`${key}`] = value;

    setEventData(items);
  };
  const [fileSelected, setFileSelected] = useState<any>();
  const [errorText, setErrorText] = useState<string[]>([]);

  const categories = [
    {
      value: 'sports',
      label: 'Sports',
    },
    {
      value: 'mucsic',
      label: 'Music',
    },
    {
      value: 'food',
      label: 'Food',
    },
    {
      value: 'art',
      label: 'Art',
    },
  ];

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    const errors = Validate.Event(eventData);

    setErrorText(errors);
  }, [eventData]);

  const handleGetAllUsers = async () => {
    const api = `/get-all`;

    try {
      const res: any = await userAPI.HandleUser(api);

      if (res && res.data) {
        const items: SelectModel[] = [];

        res.data.forEach(
          (item: any) =>
            item.email &&
            items.push({
              label: item.email,
              value: item.id,
            }),
        );

        setUsersSelects(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEvent = async () => {
    const validateEvent = Validate.Event(eventData);
    if (validateEvent.length > 0) {
      setErrorText(validateEvent);
    } else {
      setErrorText([]);
      console.log('OK');
    }
  };

  const handleFileSelected = (val: ImageOrVideo) => {
    setFileSelected(val);
    handleChangeValue('imageUrl', val.path);
  };

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new" title />
      </SectionComponent>
      <SectionComponent>
        {eventData.imageUrl ? (
          <Image
            source={{
              uri: eventData.imageUrl,
            }}
            style={{width: '100%', height: 250, marginBottom: 12}}
            resizeMode="cover"
          />
        ) : (
          <></>
        )}
        <ButtonImagePicker
          onSelect={(val: any) =>
            val.type === 'url'
              ? handleChangeValue('imageUrl', val.value as string)
              : handleFileSelected(val.value)
          }
        />
        <InputComponent
          placeholder="Title"
          value={eventData.title}
          allowClear
          onChange={val => handleChangeValue('title', val)}
        />
        <InputComponent
          placeholder="Description"
          multiline
          numberOfLine={3}
          allowClear
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
        />
        <DropdownPicker
          label="Category"
          values={categories}
          selected={eventData.category}
          onSelect={val => handleChangeValue('category', val)}
        />
        <RowComponent>
          <DateTimePicker
            label="Start at: "
            type="time"
            onSelect={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt}
          />
          <SpaceComponent width={20} />
          <DateTimePicker
            label="End at:"
            type="time"
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt}
          />
        </RowComponent>

        <DateTimePicker
          label="Date:"
          type="date"
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date}
        />

        <DropdownPicker
          label="Invited users"
          values={usersSelects}
          onSelect={(val: string | string[]) =>
            handleChangeValue('users', val as string[])
          }
          selected={eventData.users}
          multible
        />
        <InputComponent
          placeholder="Title Address"
          allowClear
          value={eventData.locationTitle}
          onChange={val => handleChangeValue('locationTitle', val)}
        />
        <ChoiceLocation
          onSelect={val => {
            handleChangeValue('locationAddress', val.address);
            handleChangeValue('position', val.postion);
          }}
        />
        <InputComponent
          placeholder="Price"
          allowClear
          type="number-pad"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionComponent>
      {errorText.length > 0 && (
        <SectionComponent>
          {errorText.map((text, index) => (
            <TextComponent
              key={`error${index}`}
              text={text}
              color={appColors.danger}
              styles={{marginBottom: 12}}
            />
          ))}
        </SectionComponent>
      )}
      <SectionComponent>
        <ButtonComponent
          disable={errorText.length > 0}
          text="Add New"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
