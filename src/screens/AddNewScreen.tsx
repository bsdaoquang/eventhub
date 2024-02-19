import React from 'react';
import {
  ContainerComponent,
  SectionComponent,
  TextComponent,
} from '../components';

const AddNewScreen = () => {
  return (
    <ContainerComponent back isScroll title="Add New">
      <SectionComponent>
        <TextComponent text="fafs" />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
