import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {TextComponent} from '.';

interface Props {
  isLoading: boolean;
  values: number;
  mess?: string;
}

const LoadingComponent = (props: Props) => {
  const {isLoading, values, mess} = props;

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        values === 0 && <TextComponent text={mess ?? 'Data not found!'} />
      )}
    </View>
  );
};

export default LoadingComponent;
