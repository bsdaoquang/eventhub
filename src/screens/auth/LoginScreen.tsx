import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';

const LoginScreen = () => {
  return (
    <View style={[globalStyles.container]}>
      <Text>LoginScreen</Text>
      {/* <Button
        title="Login"
        onPress={async () =>
          await AsyncStorage.setItem('assetToken', 'fafafafa')
        }
      /> */}

      <ButtonComponent
        text="forget password!!!"
        onPress={() => console.log('Login')}
        type="link"
        icon={
          <View>
            <Text>N</Text>
          </View>
        }
      />
    </View>
  );
};

export default LoginScreen;
