import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const AppRouters = () => {
  const {getItem} = useAsyncStorage('auth');

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const res = await getItem();

    console.log(res);
    res && dispatch(addAuth(JSON.parse(res)));
  };

  console.log(auth.accesstoken);

  return <>{auth.accesstoken ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppRouters;
