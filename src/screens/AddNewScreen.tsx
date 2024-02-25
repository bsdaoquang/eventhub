import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ChoiceLocation,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  TextComponent,
} from '../components';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';

const initValues = {
  title: '',
  description: '',
  location: {
    title: '',
    address: '',
  },
  imageUrl: '',
  users: [''],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);

  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });

  const handleChangeValue = (key: string, value: string) => {
    const items = {...eventData};
    items[`${key}`] = value;

    setEventData(items);
  };

  const handleAddEvent = async () => {
    console.log(eventData);
  };

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new" title />
      </SectionComponent>
      <SectionComponent>
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
        <InputComponent
          placeholder="Title Address"
          multiline
          numberOfLine={3}
          allowClear
          value={eventData.location.title}
          onChange={val =>
            handleChangeValue('location', {...eventData.location, title: val})
          }
        />
        <ChoiceLocation />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="Add New"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
