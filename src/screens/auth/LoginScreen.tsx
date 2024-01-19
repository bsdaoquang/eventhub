import {ContainerComponent, TextComponent} from '@components/index';
import React, {useState} from 'react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ContainerComponent isImageBackground>
      <TextComponent text="fafa fasfs" flex={0} />
      {/* <InputComponent
        value={email}
        placeholder="Email"
        onChange={val => setEmail(val)}
        // isPassword
        allowClear
        affix={<Sms size={22} color={appColors.gray} />}
      />
      <InputComponent
        value={password}
        placeholder="Password"
        onChange={val => setPassword(val)}
        isPassword
        allowClear
        affix={<Lock size={22} color={appColors.gray} />}
      /> */}
    </ContainerComponent>
  );
};

export default LoginScreen;
